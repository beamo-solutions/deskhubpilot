import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { InViewDirective } from "../directives/in-view.directive";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [CommonModule, InViewDirective]
})
export class CarouselComponent implements OnInit, OnDestroy {
  slides = [
    { title: 'Dashboard Overview', desc: 'See all machines and usage stats', image: 'assets/monitor-devices.png' },
    { title: 'Desktop Locked', desc: 'Custom Desktop Screen Locked When unused', image: 'assets/ui-davon.png' },
    { title: 'Remote Control', desc: 'Lock, logout, restart machines remotely', image: 'assets/device-info-commands.png' },
    { title: 'Usage Reports', desc: 'Detailed per-user, per-machine reports', image: 'assets/summary.png' },
    { title: 'Machine Management', desc: 'Manage machine availability easily', image: 'assets/device-info.png' }
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoplay() {
    this.intervalId = setInterval(() => this.next(), 5000);
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
