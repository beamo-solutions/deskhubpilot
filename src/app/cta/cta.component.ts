import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InViewDirective } from '../directives/in-view.directive';
import { LeadModalService } from '../lead-modal/lead-modal.service';

@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.scss'],
  imports: [CommonModule, InViewDirective]
})
export class CtaComponent {
  constructor(public leadModal: LeadModalService) {}

  openModal() {
    this.leadModal.open();
  }
}