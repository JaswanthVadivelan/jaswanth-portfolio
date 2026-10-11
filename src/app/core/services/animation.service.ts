import { Injectable, NgZone, inject } from '@angular/core';
import anime from 'animejs';

export interface StaggerOptions {
  delay?: number;
  duration?: number;
  stagger?: number;
  translateY?: [number, number];
  translateX?: [number, number];
  scale?: [number, number];
  easing?: string;
  complete?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private readonly ngZone = inject(NgZone);

  /**
   * Check if user has requested reduced motion
   */
  isReducedMotion(): boolean {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }


  /**
   * Track scroll progress [0, 1] through a sticky container element
   */
  bindScrollProgress(
    container: HTMLElement,
    onProgress: (progress: number, stepIndex: number, totalSteps: number) => void,
    totalSteps = 5
  ): () => void {
    if (typeof window === 'undefined' || this.isReducedMotion()) {
      onProgress(0, 0, totalSteps);
      return () => {};
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const totalScrollableDistance = container.offsetHeight - windowHeight;

        if (totalScrollableDistance <= 0) {
          onProgress(1, totalSteps - 1, totalSteps);
          return;
        }

        // Distance scrolled into the container
        const scrolledInto = -rect.top;
        const rawProgress = scrolledInto / totalScrollableDistance;
        const clampedProgress = Math.max(0, Math.min(1, rawProgress));

        // Compute active step index (0 to totalSteps - 1)
        const stepIndex = Math.min(
          totalSteps - 1,
          Math.floor(clampedProgress * totalSteps)
        );

        this.ngZone.run(() => {
          onProgress(clampedProgress, stepIndex, totalSteps);
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial evaluation
    handleScroll();

    // Return teardown function
    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }

  /**
   * Staggered kinetic entrance animation
   */
  staggerFadeUp(targets: anime.AnimeAnimParams['targets'], options: StaggerOptions = {}): anime.AnimeInstance | null {
    if (this.isReducedMotion()) {
      this.forceVisible(targets);
      options.complete?.();
      return null;
    }

    return this.ngZone.runOutsideAngular(() => {
      return anime({
        targets,
        opacity: [0, 1],
        translateY: options.translateY || [28, 0],
        scale: options.scale || [0.97, 1],
        duration: options.duration || 800,
        delay: anime.stagger(options.stagger || 90, { start: options.delay || 50 }),
        easing: options.easing || 'easeOutExpo',
        complete: () => {
          this.ngZone.run(() => {
            options.complete?.();
          });
        }
      });
    });
  }

  /**
   * Animated numeric counter (e.g. 0 -> 8.5 CGPA, 0 -> 100%)
   */
  animateCounter(
    targetObj: { value: number },
    targetValue: number,
    onUpdate: (val: number) => void,
    options: { duration?: number; decimals?: number; delay?: number } = {}
  ): anime.AnimeInstance | null {
    if (this.isReducedMotion()) {
      targetObj.value = targetValue;
      onUpdate(targetValue);
      return null;
    }

    return this.ngZone.runOutsideAngular(() => {
      return anime({
        targets: targetObj,
        value: targetValue,
        duration: options.duration || 1500,
        delay: options.delay || 0,
        easing: 'easeOutQuart',
        round: options.decimals ? Math.pow(10, options.decimals) : 1,
        update: () => {
          this.ngZone.run(() => {
            onUpdate(targetObj.value);
          });
        }
      });
    });
  }

  /**
   * Draw SVG path (stroke animation)
   */
  drawSvg(targets: anime.AnimeAnimParams['targets'], duration = 1200): anime.AnimeInstance | null {
    return this.drawSvgPath(targets, duration);
  }

  drawSvgPath(targets: anime.AnimeAnimParams['targets'], duration = 1200): anime.AnimeInstance | null {
    if (this.isReducedMotion()) return null;

    return this.ngZone.runOutsideAngular(() => {
      return anime({
        targets,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration
      });
    });
  }

  /**
   * Continuous organic pulse for telemetry nodes
   */
  pulseLoop(targets: anime.AnimeAnimParams['targets'], scaleRange: [number, number] = [0.96, 1.04]): anime.AnimeInstance | null {
    if (this.isReducedMotion()) return null;

    return this.ngZone.runOutsideAngular(() => {
      return anime({
        targets,
        scale: scaleRange,
        opacity: [0.75, 1],
        duration: 1800,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    });
  }

  /**
   * Spring physics bounce for robotic arm joint rotations
   */
  animateJoint(
    target: anime.AnimeAnimParams['targets'],
    property: string,
    toValue: number | string,
    duration = 900
  ): anime.AnimeInstance | null {
    if (this.isReducedMotion()) {
      if (target) {
        anime.set(target as any, { [property]: toValue });
      }
      return null;
    }

    return this.ngZone.runOutsideAngular(() => {
      return anime({
        targets: target,
        [property]: toValue,
        duration,
        easing: 'spring(1, 80, 10, 0)'
      });
    });
  }

  /**
   * Grid Ripple Stagger for tab switches and filter grids
   */
  staggerGridRipple(targets: anime.AnimeAnimParams['targets']): anime.AnimeInstance | null {
    if (this.isReducedMotion()) {
      this.forceVisible(targets);
      return null;
    }

    return this.ngZone.runOutsideAngular(() => {
      return anime({
        targets,
        scale: [0.9, 1],
        opacity: [0, 1],
        translateY: [15, 0],
        delay: anime.stagger(45, { from: 'first' }),
        duration: 500,
        easing: 'easeOutQuad'
      });
    });
  }

  /**
   * IntersectionObserver trigger for viewport entry
   */
  observeSection(
    element: HTMLElement,
    onEnter: () => void,
    threshold = 0.15
  ): IntersectionObserver | null {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      onEnter();
      return null;
    }

    if (this.isReducedMotion()) {
      onEnter();
      return null;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onEnter();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return observer;
  }

  /**
   * Safely cleanup animations
   */
  remove(targets: anime.AnimeAnimParams['targets']): void {
    if (targets) {
      anime.remove(targets);
    }
  }

  private forceVisible(targets: anime.AnimeAnimParams['targets']): void {
    if (typeof targets === 'string' && typeof document !== 'undefined') {
      const els = document.querySelectorAll(targets);
      els.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
    }
  }
}
