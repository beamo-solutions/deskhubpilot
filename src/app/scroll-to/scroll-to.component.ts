// scroll-to.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-to',
  templateUrl: './scroll-to.component.html',
  styleUrls: ['./scroll-to.component.scss']
})
export class ScrollToComponent {
  @Input() targetId: string = '';
  @Input() label: string = 'Scroll';
  scroll() {
    const el = document.getElementById(this.targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}