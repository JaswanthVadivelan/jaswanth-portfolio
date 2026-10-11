import { Injectable, signal, NgZone, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService {
  private readonly ngZone = inject(NgZone);

  readonly activeSection = signal<string>('about');

  private observer: IntersectionObserver | null = null;
  readonly sectionIds: string[] = [
    'about',
    'experience',
    'projects',
    'skills',
    'education',
    'contact'
  ];

  initSpy(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        this.ngZone.run(() => {
          const visibleEntries = entries.filter((entry) => entry.isIntersecting);
          if (visibleEntries.length > 0) {
            visibleEntries.sort((a, b) => {
              return Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top);
            });
            const topEntry = visibleEntries[0];
            if (topEntry?.target.id && this.activeSection() !== topEntry.target.id) {
              this.activeSection.set(topEntry.target.id);
            }
          }
        });
      },
      {
        rootMargin: '-15% 0px -40% 0px',
        threshold: [0, 0.2, 0.5, 0.8]
      }
    );

    this.sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el && this.observer) {
        this.observer.observe(el);
      }
    });
  }

  scrollToSection(id: string): void {
    if (typeof window === 'undefined') return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection.set(id);
      window.history.replaceState(null, '', `#${id}`);
    }
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
