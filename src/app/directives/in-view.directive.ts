import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInView]'
})
export class InViewDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {

    // ✅ SAFETY CHECK
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: immediately show section
      this.el.nativeElement.classList.add('in-view');
      return;
    }
        
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('in-view');
          observer.unobserve(this.el.nativeElement); // only trigger once
        }
      },
      { threshold: 0.15 } // trigger when 10% of section is visible
    );

    observer.observe(this.el.nativeElement);
  }
}
