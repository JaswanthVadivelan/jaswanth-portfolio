import { Injectable, signal, computed, inject, NgZone } from '@angular/core';
import { JOURNEY_STATIONS } from '../../data/navigation.data';
import { JourneyStation } from '../models/portfolio.models';
import anime from 'animejs';

export type JourneyViewMode = 'station' | 'map';

@Injectable({
  providedIn: 'root'
})
export class JourneyStateService {
  private readonly ngZone = inject(NgZone);

  readonly stations: JourneyStation[] = JOURNEY_STATIONS;

  readonly currentView = signal<JourneyViewMode>('station');
  readonly activeStationIndex = signal<number>(0);
  readonly isTransitioning = signal<boolean>(false);
  readonly transitionDirection = signal<'next' | 'prev' | 'warp'>('next');
  readonly transitProgress = signal<number>(0);

  readonly activeStation = computed<JourneyStation>(() => {
    return this.stations[this.activeStationIndex()] || this.stations[0];
  });

  readonly isFirstStation = computed<boolean>(() => this.activeStationIndex() === 0);
  readonly isLastStation = computed<boolean>(() => this.activeStationIndex() === this.stations.length - 1);

  constructor() {
    this.initKeyboardListeners();
  }

  private initKeyboardListeners(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        this.toggleView();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        if (this.currentView() === 'station') {
          this.nextStation();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        if (this.currentView() === 'station') {
          this.prevStation();
        }
      } else if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        const targetIdx = parseInt(e.key, 10) - 1;
        this.goToStation(targetIdx, 'warp');
      } else if (e.key === 'Escape') {
        if (this.currentView() === 'map') {
          this.closeMap();
        }
      }
    });
  }

  openMap(): void {
    if (this.isTransitioning()) return;
    this.currentView.set('map');
  }

  closeMap(): void {
    if (this.isTransitioning()) return;
    this.currentView.set('station');
  }

  toggleView(): void {
    if (this.isTransitioning()) return;
    this.currentView.update((v) => (v === 'map' ? 'station' : 'map'));
  }

  goToStation(target: number | string, direction: 'next' | 'prev' | 'warp' = 'warp'): void {
    if (this.isTransitioning()) return;

    let targetIndex = 0;
    if (typeof target === 'number') {
      targetIndex = Math.max(0, Math.min(this.stations.length - 1, target));
    } else {
      const idx = this.stations.findIndex((s) => s.id === target);
      if (idx !== -1) {
        targetIndex = idx;
      }
    }

    if (this.currentView() === 'station' && targetIndex === this.activeStationIndex()) {
      return;
    }

    this.transitionDirection.set(direction);
    this.isTransitioning.set(true);

    // Play transit sequence (~400ms)
    setTimeout(() => {
      this.activeStationIndex.set(targetIndex);
      this.currentView.set('station');
      
      // Scroll to top of viewport cleanly
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      setTimeout(() => {
        this.isTransitioning.set(false);
      }, 250);
    }, 350);
  }

  nextStation(): void {
    if (this.activeStationIndex() < this.stations.length - 1) {
      this.goToStation(this.activeStationIndex() + 1, 'next');
    }
  }

  prevStation(): void {
    if (this.activeStationIndex() > 0) {
      this.goToStation(this.activeStationIndex() - 1, 'prev');
    }
  }
}
