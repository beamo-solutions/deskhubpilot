// pricing.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TrackingService } from '../common/tracking.service';
import { InViewDirective } from '../directives/in-view.directive';
import { LeadModalService } from '../lead-modal/lead-modal.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  imports: [CommonModule, InViewDirective]
})

export class PricingComponent {
  constructor(public leadModal: LeadModalService, private tracking: TrackingService) {}
  tiers = [
    {
      name: 'Starter',
      tagline: 'Ideal for small internet cafés or single-location offices',
      price: '$39 / month',
      features: [
        'Up to 10 machines',
        'Usage tracking & billing',
        'Remote login/logout control',
        'Basic dashboard',
        'Email support',
        'Remote Shutdown/Restart',
        'Remote Updates'
      ],
      ctaText: 'Get Started'
    },
    {
      name: 'Business',
      tagline: 'Ideal for growing co-working spaces, offices, training centers',
      price: '$79 / month',
      features: [
        'Up to 30 machines',
        'All Starter features',
        'USB/device blocking',
        'Remote restart/shutdown',
        'Advanced reporting (per-day/user/machine)',
        'Priority support'
      ],
      ctaText: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      tagline: 'Large workspaces, Schools/Universities, multi-location setups',
      price: 'Call Us',
      features: [
        'Unlimited machines',
        'All Business features',
        'Custom Development',
        'Multi-location dashboard',
        'Dedicated account manager & support',
        'Optional hardware bundle + training'
      ],
      ctaText: 'Contact Sales'
    }
  ];

  selectPlan(planName: string, price: string) {

    this.tracking.pushEvent('pricing_click', {
      plan_name: planName,
      plan_price: price,
      currency: 'USD'
    });

    this.leadModal.open();
    // Optional: open modal or redirect
  }  
}