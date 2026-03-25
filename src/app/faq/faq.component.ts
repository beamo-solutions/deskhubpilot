import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InViewDirective } from '../directives/in-view.directive';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  imports: [CommonModule, InViewDirective]
})
export class FaqComponent {
  activeIndex: number | null = null;

  faqs = [
    {
      question: 'What is DeskHubPilot and how does it work?',
      answer: 'DeskHubPilot is a machine usage and attendance monitoring system that runs in the background, tracking login/logout time and allowing centralized remote management.'
    },
    {
      question: 'Who should use DeskHubPilot?',
      answer: 'DeskHubPilot is designed for internet cafés, co-working spaces, training centers, BPOs, schools, and offices that manage shared computer usage.'
    },
    {
      question: 'Does DeskHubPilot work offline?',
      answer: 'Yes. DeskHubPilot continues to track activity offline and automatically syncs data once the internet connection is restored. (...coming soon)'
    },
    {
      question: 'Can I control computers remotely?',
      answer: 'Yes. You can restart, shut down, lock, log out users, block USB devices, and manage updates remotely through the admin dashboard.'
    },
    {
      question: 'How is pricing calculated?',
      answer: 'Pricing is based on the number of machines and feature tier. We offer Starter, Business, and Enterprise plans with custom pricing available.'
    }
  ];

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
  
}
