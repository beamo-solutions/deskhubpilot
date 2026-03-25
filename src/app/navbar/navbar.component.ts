import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = false;
  activeSection = '';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Smooth scroll to section and close mobile menu
  goToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.isMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 50;

    // Update active section
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const offset = (section as HTMLElement).offsetTop - 120;
      if (window.scrollY >= offset) {
        current = section.getAttribute('id') || '';
      }
    });
    this.activeSection = current;
  }
}
