import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InViewDirective } from '../directives/in-view.directive';
import { LeadModalService } from '../lead-modal/lead-modal.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrl: './workflow.component.scss',
  imports: [CommonModule, InViewDirective]
})
export class WorkflowComponent {
  constructor(public leadModal: LeadModalService) {}
  steps = [
    '✔ Usage Tracking (login/logout, hourly billing)',
    '✔ Remote Restart / Shutdown',
    '✔ Lock Screen / Force Logout',
    '✔ USB & Peripheral Control',
    '✔ Centralized Updates',
    '✔ Admin Dashboard'
  ];
}