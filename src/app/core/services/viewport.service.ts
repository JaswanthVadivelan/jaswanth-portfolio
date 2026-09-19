import { Injectable, signal, NgZone, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  private readonly ngZone = inject(NgZone);

  readonly prefersReducedMotion = signal<boolean>(false);
  readonly isDocumentVisible = signal<boolean>(true);
  readonly isWebGLAvailable = signal<boolean>(true);
  readonly isMobile = signal<boolean>(false);

  constructor() {
    this.initChecks();
  }

  private initChecks(): void {
    if (typeof window === 'undefined') return;

    // Check reduced motion safely for SSR/JSDOM environments
    if (typeof window.matchMedia === 'function') {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motionQuery) {
        this.prefersReducedMotion.set(motionQuery.matches);
        if (typeof motionQuery.addEventListener === 'function') {
          motionQuery.addEventListener('change', (e) => {
            this.ngZone.run(() => this.prefersReducedMotion.set(e.matches));
          });
        }
      }
    }

    // Check document visibility
    if (typeof document !== 'undefined') {
      this.isDocumentVisible.set(document.visibilityState === 'visible');
      document.addEventListener('visibilitychange', () => {
        this.ngZone.run(() => this.isDocumentVisible.set(document.visibilityState === 'visible'));
      });
    }

    // Check WebGL support
    this.isWebGLAvailable.set(this.checkWebGL());

    // Check mobile viewport
    this.checkMobile();
    window.addEventListener('resize', () => {
      this.checkMobile();
    });
  }

  private checkMobile(): void {
    if (typeof window !== 'undefined') {
      this.isMobile.set(window.innerWidth < 768);
    }
  }

  private checkWebGL(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  }
}

