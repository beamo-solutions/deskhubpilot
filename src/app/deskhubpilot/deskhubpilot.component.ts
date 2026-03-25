// deskhubpilot.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InViewDirective } from '../directives/in-view.directive';
import { LeadModalService } from '../lead-modal/lead-modal.service';

@Component({
  selector: 'app-deskhubpilot',
  templateUrl: './deskhubpilot.component.html',
  styleUrls: ['./deskhubpilot.component.scss'],
  imports: [CommonModule, InViewDirective]
})
export class DeskhubPilotComponent {
  constructor(public leadModal: LeadModalService) {}

  features = [
    'Track login/logout and actual usage',
    'Remote restart/shutdown and screen lock',
    'Perform updates and maintenance remotely',
    'Block USB ports and control access',
    'Automated billing per hourly usage',
    'Central admin dashboard'
  ];
}
