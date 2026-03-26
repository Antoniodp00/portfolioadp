import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({ selector: '[appAnimateOnScroll]', standalone: true })
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  @Input() delay = 0;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const el = this.el.nativeElement as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${this.delay}ms, transform 0.55s ease ${this.delay}ms`;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          this.observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    this.observer.observe(el);
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}
