// lead-modal.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TrackingService } from '../common/tracking.service';
import { LeadModalService } from './lead-modal.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-lead-modal',
  templateUrl: './lead-modal.component.html',
  styleUrls: ['./lead-modal.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class LeadModalComponent implements OnInit {
  isOpen = false;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';  
  form: any;

  constructor(private leadModal: LeadModalService, private trackingService: TrackingService) {}

  ngOnInit() {
    this.leadModal.open$.subscribe(open => this.isOpen = open);
  }

  close() {
    this.isOpen = false;
    this.isSubmitting = false;
    this.submitSuccess = false;
    this.submitError = ''; 
    this.form.resetForm();       
    this.leadModal.close();
  }

  submitLead(form: NgForm) {
    // Honeypot check
    if (form.value.website) {
      return; // Bot detected — silently ignore
    }
        
    this.form = form;
    if (!form.valid) {
      this.submitError = 'Please fill in all required fields.';
      setTimeout(() => this.submitError='', 5000);
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

  const payload = {
    name: form.value.name,
    email: form.value.email,
    company: form.value.company || '',
    message: form.value.message || ''
  };

  fetch(environment.googleScriptUrl, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      this.isSubmitting = false;
      if (data.status === 'success') {
        this.submitSuccess = true;
        setTimeout(() => {this.close()}, 3000);
        form.resetForm();

        this.trackingService.pushEvent('lead_submit', {
          form_location: 'lead_modal'
        });

      } else {
        this.submitError = 'Submission failed. Please try again.';
      }
    })
    .catch(err => {
      console.error(err);
      this.isSubmitting = false;
      this.submitError = 'An error occurred. Please try again.';
    });

  }
}