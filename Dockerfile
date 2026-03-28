# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build-prod

# Stage 2: Production
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000

# Copy only the built output
COPY --from=build /app/dist/deskhubpilot-landing ./dist/deskhubpilot-landing

EXPOSE 4000

# Run the Angular SSR server
CMD ["node", "dist/deskhubpilot-landing/server/server.mjs"]