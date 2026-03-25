import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-testimonials',  
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
  imports: [CommonModule, MatCardModule]
})
export class TestimonialsComponent {
  testimonials = [
    { name: 'Raquel Z.', text: 'DeskHubPilot runs our shared office daily, tracking hundreds of workstation hours reliably.' }
  ];
}