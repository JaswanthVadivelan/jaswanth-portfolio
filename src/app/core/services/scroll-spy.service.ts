import { Injectable, signal, NgZone, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService {
  private readonly ngZone = inject(NgZone);

  readonly activeSection = signal<string>('station-origin');
  readonly currentStationIndex = signal<number>(0);

  private observer: IntersectionObserver | null = null;
  readonly stationIds: string[] = [
    'station-origin',
    'station-mes',
    'station-robotics',
    'station-game',
    'station-vault',
    'station-comms'
  ];

  private readonly sectionAliases: Record<string, string> = {
    'home': 'station-origin',
    'about': 'station-origin',
    'architecture': 'station-mes',
    'mes': 'station-mes',
    'robotics': 'station-robotics',
    'game': 'station-game',
    'skills': 'station-vault',
    'experience': 'station-vault',
    'education': 'station-vault',
    'achievements': 'station-vault',
    'resume': 'station-comms',
    'contact': 'station-comms'
  };

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
              const rawId = topEntry.target.id;
              const canonicalId = this.sectionAliases[rawId] || rawId;
              
              if (this.activeSection() !== canonicalId) {
                this.activeSection.set(canonicalId);
                const idx = this.stationIds.indexOf(canonicalId);
                if (idx !== -1) {
                  this.currentStationIndex.set(idx);
                }
              }
            }
          }
        });
      },
      {
        rootMargin: '-10% 0px -40% 0px',
        threshold: [0, 0.15, 0.4, 0.7]
      }
    );

    // Observe all canonical stations and legacy anchors
    const allIdsToObserve = Array.from(new Set([...this.stationIds, ...Object.keys(this.sectionAliases)]));
    allIdsToObserve.forEach((id) => {
      const el = document.getElementById(id);
      if (el && this.observer) {
        this.observer.observe(el);
      }
    });
  }

  scrollToSection(id: string): void {
    if (typeof window === 'undefined') return;
    const targetId = this.sectionAliases[id] || id;
    const element = document.getElementById(targetId) || document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection.set(targetId);
      const idx = this.stationIds.indexOf(targetId);
      if (idx !== -1) {
        this.currentStationIndex.set(idx);
      }
      window.history.replaceState(null, '', `#${targetId}`);
    }
  }

  nextStation(): void {
    const currentIdx = this.currentStationIndex();
    if (currentIdx < this.stationIds.length - 1) {
      this.scrollToSection(this.stationIds[currentIdx + 1]);
    }
  }

  prevStation(): void {
    const currentIdx = this.currentStationIndex();
    if (currentIdx > 0) {
      this.scrollToSection(this.stationIds[currentIdx - 1]);
    }
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

