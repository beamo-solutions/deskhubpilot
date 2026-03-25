// hero.component.ts
import { Component } from '@angular/core';
import { InViewDirective } from '../directives/in-view.directive';
import { LeadModalService } from '../lead-modal/lead-modal.service';
import { ScrollToComponent } from '../scroll-to/scroll-to.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  imports: [ScrollToComponent, InViewDirective]
})
export class HeroComponent {
  constructor(public leadModal: LeadModalService) {}
}
