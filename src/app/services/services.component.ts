// services.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InViewDirective } from '../directives/in-view.directive';
import { LeadModalService } from '../lead-modal/lead-modal.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  imports: [CommonModule, MatCardModule, InViewDirective ]
})
export class ServicesComponent {
  constructor(public leadModal: LeadModalService) {}
  
  services = [
    {
      icon: '🏢',
      title: 'Co-working Spaces',
      desc: 'Track hourly workstation usage, manage shared computers, and bill clients accurately.',
      ctaText: 'See How It Works'
    },
    {
      icon: '🖥',
      title: 'Internet Cafés',
      desc: 'Automatically monitor logins, lock idle machines, and control access remotely.',
      ctaText: 'View Features'
    },
    {
      icon: '🎓',
      title: 'Schools & Training Centers',
      desc: 'Manage computer labs, restrict usage, and maintain full admin control.',
      ctaText: 'Explore Use Case'
    },
    {
      icon: '🏭',
      title: 'Shared Office Environments',
      desc: 'Control workstation availability and monitor usage across teams and shifts.',
      ctaText: 'Learn More'
    },
    {
      icon: '📞',
      title: 'BPO & Call Centers',
      desc: 'Enforce workstation policies, track agent login hours, and maintain operational compliance.',
      ctaText: 'View Solution'
    },
    {
      icon: '🏛',
      title: 'Government Offices',
      desc: 'Monitor workstation usage, enforce security controls, and ensure accountability.',
      ctaText: 'Contact Sales'
    }
  ];

  handleCTA(service: any) {
    if (service.actionType === 'modal') this.leadModal.open();
    else if (service.actionType === 'scroll') {
      const el = document.getElementById(service.targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}