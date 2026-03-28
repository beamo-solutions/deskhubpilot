# CI/CD Plan — Option 1: Self-Hosted Runner + Terraform for Proxmox

## Overview

Use a self-hosted GitHub Actions runner inside the homelab as the primary deployment path, and use Terraform for provisioning and managing the Proxmox LXC itself — not for each application release.

This app is an Angular 21 SSR app built with `npm run build-prod` and served by a Node/Express process (`dist/deskhubpilot-landing/server/server.mjs`). It requires a production secret (`googleScriptUrl`) at build time, materialized from a gitignored environment file.

**Deployment architecture:**
Proxmox host → LXC container → managed Node/Express service → Cloudflare Tunnel directly to app port

---

## Phase 1: Lock the Target Architecture

**Goal:** Agree on layout and network model before writing any automation.

- Standardize on: Proxmox host → LXC container → managed Node service → Cloudflare Tunnel pointing at the app port.
- Use a self-hosted runner on the homelab network so deployment never depends on exposing inbound SSH from the public internet.
- Decide whether the runner lives inside the app LXC itself or in a separate utility LXC.

---

## Phase 2: Stabilize the Runtime Inside the LXC

**Goal:** Replace the current plain Node process with a managed service for reliability and safe restarts.

- Recommended: `systemd` service (simpler, no extra process manager dependency).
- Alternative: PM2 (good if you want process-level restart policies and logs in one tool).
- Define and lock in:
  - App user (non-root)
  - App directory path (e.g. `/opt/deskhubpilot`)
  - Release directory layout (e.g. `/opt/deskhubpilot/releases/`, symlink `/opt/deskhubpilot/current`)
  - Node version (pinned via `.nvmrc` or `engines` field)
  - `PORT` environment variable (default 4000)
  - Log path

---

## Phase 3: Add Terraform for Infrastructure

**Goal:** Define the Proxmox LXC and base host configuration as reproducible code.

- Create `infrastructure/terraform/` in the repo with:
  - Provider config (`bpg/proxmox` or `Telmate/proxmox`)
  - LXC resource definition (CPU, memory, storage, network, startup policy)
  - Base bootstrap provisioner: Node.js install, app user creation, service definition, runner install
- If the LXC already exists and should be preserved: plan an explicit `terraform import` step before any lifecycle changes.
- Keep Terraform responsible for: provisioning, base config, and recreation.
- Keep Terraform out of: every application code release.

---

## Phase 4: Add Repository Deployment Structure

**Goal:** Create the GitHub Actions workflow files and a reusable deploy script.

Files to create:
- `.github/workflows/ci.yml` — runs on push and pull request: install, test, production build.
- `.github/workflows/deploy.yml` — runs on push to `main` and `workflow_dispatch`.
- `scripts/deploy.sh` — the runner-invoked entrypoint so both the workflow and manual ops follow one path.

---

## Phase 5: Design Secret Handling

**Goal:** Ensure production secrets never touch version control but are always present during build.

- Store in GitHub Actions secrets:
  - `GOOGLE_APPS_SCRIPT_URL` — the lead form integration URL
  - Any runner-specific connection values if needed
- During deployment, generate `src/environments/environment.prod.ts` from secrets before running `npm run build-prod`.
- Do **not** commit `environment.prod.ts` or `environment.ts` (already gitignored per README).
- Keep non-secret config (PORT, release paths) in the systemd service file or host-level env file.

---

## Phase 6: Install and Lock Down the Self-Hosted Runner

**Goal:** Register a runner that can deploy safely without over-provisioned access.

- Install the GitHub Actions runner on the target LXC or a utility LXC on the same network.
- Restrict to this repository (not org-wide).
- Run as a dedicated non-root user.
- Grant only the permissions needed: write to app directory, restart the service via `sudo systemctl restart`.
- Label it (e.g. `homelab`, `proxmox-lxc`) so only the deploy workflow targets it.
- Run the runner as a systemd service so it survives reboots.

---

## Phase 7: Implement the Deployment Workflow

**Goal:** Automate the full release cycle on the runner.

Deploy workflow steps (runs on self-hosted runner):
1. Check out the repo.
2. Set up the correct Node version (`actions/setup-node` with pinned version).
3. Run `npm ci` (clean install).
4. Generate `src/environments/environment.prod.ts` from GitHub Actions secrets.
5. Optionally run tests as a production gate.
6. Run `npm run build-prod`.
7. Stage the build under a timestamped release directory on the host.
8. Install production Node dependencies in the staged release.
9. Switch the live symlink atomically.
10. Restart the systemd service.
11. Run a health check against `http://localhost:PORT` before marking the workflow successful.

Add workflow-level concurrency (`concurrency: group: production`) to prevent simultaneous deploys.

---

## Phase 8: Add Rollback and Health Checks

**Goal:** Make recovery from a bad deploy fast and low-risk.

- Keep the previous N releases on disk (e.g. last 3).
- After service restart, verify the app responds on `localhost:PORT` before the workflow exits successfully.
- Rollback = switch the symlink back to the previous release + restart the service (can be a `workflow_dispatch` with a `release` input, or a manual script).

---

## Phase 9: Verify Cloudflare Tunnel Behavior

**Goal:** Confirm the tunnel survives service restarts without config changes.

- Confirm the tunnel still routes to the correct local port after the service manager change from plain Node to systemd.
- Measure restart downtime; if it's unacceptable, plan a reverse proxy layer (Nginx or Caddy) in front of Node so the tunnel points at a stable endpoint that queues requests during Node restarts.

---

## Phase 10: Validate End to End and Document Operations

**Goal:** Prove everything works together and leave runbook documentation.

Validation checklist:
1. Provision or import the LXC with Terraform — verify network and storage match expectations.
2. Runner appears online in GitHub, restricted to this repo.
3. CI workflow: `npm ci`, tests, `npm run build-prod` all pass.
4. Deploy workflow (manual dispatch first): service restarts cleanly, app responds on the local port.
5. Site responds correctly through the Cloudflare Tunnel hostname.
6. Lead form submission fires the Google Apps Script integration with the production secret.
7. Intentional rollback to a previous release works within a defined time window.

Operations to document:
- First-time LXC provisioning with Terraform
- Normal redeploy from `main`
- Manual rollback procedure
- Log inspection (`journalctl -u <service>`)
- Secret rotation in GitHub and on the host

---

## Key Files (Workspace)

| File | Purpose |
|------|---------|
| `package.json` | Production build (`npm run build-prod`) and SSR start commands |
| `src/server.ts` | Confirms Node/Express runtime, PORT env var, PM2 compatibility |
| `src/environments/environment.example.ts` | Template for CI-generated production environment file |
| `README.md` | Update with deployment and operator instructions |
| `.github/workflows/ci.yml` | To create: validation workflow |
| `.github/workflows/deploy.yml` | To create: deployment workflow |
| `scripts/deploy.sh` | To create: runner-invoked deploy entrypoint |
| `infrastructure/terraform/` | To create: Proxmox LXC and bootstrap definitions |

---

## Decisions and Scope

- **Included:** GitHub Actions CI/CD, self-hosted runner model, Terraform for Proxmox LXC provisioning, secret handling, rollback, health checks, tunnel verification.
- **Excluded (for now):** Kubernetes, ArgoCD, blue-green, Docker, replacing Cloudflare Tunnel.
- **Terraform scope:** Provision and manage the LXC and base host config. Not responsible for individual app releases.
- **Process manager:** Prefer systemd over plain Node (current) for reliability; PM2 is a viable alternative.

---

## Further Considerations

1. **Zero-downtime deploys later:** Add a reverse proxy (Nginx/Caddy) so the tunnel targets a stable upstream and requests are queued during Node restarts.
2. **Staging environment:** Extend this same pattern with a second LXC, second runner label, and branch-based or approval-gated workflows.
3. **Existing LXC preservation:** If you want to keep the current manually created LXC, plan a `terraform import` first before any destructive reprovisioning.