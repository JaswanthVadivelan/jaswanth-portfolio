import { Injectable, signal, NgZone, inject } from '@angular/core';
import { WorldSceneService } from '../../three-d/world/world-scene.service';

@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService {
  private readonly ngZone = inject(NgZone);
  private readonly worldScene = inject(WorldSceneService);

  readonly activeSection = signal<string>('home');

  private observer: IntersectionObserver | null = null;
  private readonly sectionIds: string[] = [
    'home',
    'about',
    'skills',
    'experience',
    'featured',
    'projects',
    'analytics',
    'architecture',
    'achievements',
    'education',
    'certifications',
    'resume',
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
            if (topEntry?.target.id) {
              const newId = topEntry.target.id;
              if (this.activeSection() !== newId) {
                this.activeSection.set(newId);
                this.worldScene.setWaypoint(newId);
              }
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1.0]
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
      this.worldScene.setWaypoint(id);
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
