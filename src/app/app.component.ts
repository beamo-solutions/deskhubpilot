// app.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CarouselComponent } from './carousel-gallery/carousel.component';
import { TrackingService } from './common/tracking.service';
import { CtaComponent } from './cta/cta.component';
import { DeskhubPilotComponent } from './deskhubpilot/deskhubpilot.component';
import { FaqComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { LeadModalComponent } from './lead-modal/lead-modal.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { PricingComponent } from './pricing/pricing.component';
import { ServicesComponent } from './services/services.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { WorkflowComponent } from './workflow/workflow.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, LeadModalComponent, FooterComponent, HeroComponent, ServicesComponent, DeskhubPilotComponent, WorkflowComponent, PricingComponent, TestimonialsComponent, CtaComponent, CarouselComponent, FaqComponent, NavbarComponent]
})
export class AppComponent {
  // showLeadModal = false;

  // openLeadModal() { this.showLeadModal = true; }
  // closeLeadModal() { this.showLeadModal = false; }

  constructor(public trackingService: TrackingService, private router: Router, private title: Title, private meta: Meta) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.trackingService.pushEvent('page_view', {
          page_path: event.urlAfterRedirects
        });
      })
  }

  ngOnInit() {

    // Set meta tags
    this.meta.addTags([
      { name: 'description', content: 'DeskHubPilot helps offices, co-working spaces, and BPOs manage PCs remotely, track usage, and automate billing.' },
      { name: 'keywords', content: 'DeskHubPilot, SaaS, remote PC management,  track, monetize, computer usage, co-working space software, office management' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'DeskHubPilot - Control, Track, and Monetize Computer Usage' },
      { property: 'og:description', content: 'DeskHubPilot helps offices, co-working spaces, and BPOs manage PCs remotely, track usage, and automate billing.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://deskhubpilot.com/assets/hdp_logo.png' },
      { property: 'og:url', content: 'https://deskhubpilot.com' }
    ]);
    
  }
}
