import { Component, inject, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA, ABOUT_ME_DATA } from '../../data/profile.data';
import { JourneyStateService } from '../../core/services/journey-state.service';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="station-origin" class="relative py-20 lg:py-24 overflow-hidden bg-slate-950 text-white min-h-[calc(100vh-4.5rem)] flex flex-col justify-center">
      <!-- Architectural background dot grid -->
      <div class="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <!-- Station Sector Header -->
        <div class="flex items-center justify-between gap-4 pb-4 mb-8 border-b border-slate-800">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-mono font-semibold">
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>STATION 01 // COMMAND DECK & IDENTITY ORIGIN</span>
          </div>
          <div class="font-mono text-[11px] text-slate-400 hidden sm:flex items-center gap-2">
            <span>SYS: <strong class="text-emerald-400">ONLINE</strong></span>
            <span>•</span>
            <span>WAYPOINT: <strong class="text-cyan-300">13.0827° N, 80.2707° E</strong></span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- Left Column: Introduction, Identity & Primary CTAs -->
          <div class="lg:col-span-7 flex flex-col items-start text-left">
            
            <!-- Company & Status Pill -->
            <div class="hero-stagger-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold mb-5 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="font-mono text-[11px] uppercase tracking-wider text-slate-300 font-semibold">{{ profile.company }}</span>
              <span class="text-blue-400">•</span>
              <span class="text-cyan-300 font-bold">{{ profile.role }}</span>
            </div>

            <!-- Headline -->
            <h1 class="hero-stagger-item text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
              {{ profile.headline }}
            </h1>

            <!-- Introduction Paragraphs -->
            <div class="space-y-3.5 text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              @for (paragraph of profile.introduction; track $index) {
                <p class="hero-stagger-item" [class.font-semibold]="$index === 0" [class.text-white]="$index === 0">
                  {{ paragraph }}
                </p>
              }
            </div>

            <!-- Action Buttons / Expedition Starter -->
            <div class="hero-stagger-item flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto">
              <!-- Initiate Journey CTA -->
              <button
                type="button"
                (click)="onScrollTo('station-mes')"
                class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 active:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all duration-200 cursor-pointer group hover:scale-105"
              >
                <span>Initiate Expedition (Next Station)</span>
                <span class="font-bold text-white group-hover:translate-x-1 transition-transform">➔</span>
              </button>

              <!-- World Map Quick Open -->
              <button
                type="button"
                (click)="journeyState.openMap()"
                class="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 text-cyan-300 font-semibold text-sm hover:bg-slate-800 border border-slate-700 transition-all duration-200 cursor-pointer"
              >
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>Open World Map [M]</span>
              </button>

              <!-- Resume Details CTA -->
              <button
                type="button"
                (click)="onScrollTo('station-comms')"
                class="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-slate-400 hover:text-white font-medium text-sm transition-colors cursor-pointer"
              >
                <span>Resume &amp; Comms →</span>
              </button>
            </div>

            <!-- Social Links & Coordinates -->
            <div class="hero-stagger-item flex items-center gap-6 pt-5 border-t border-slate-800 w-full">
              <div class="flex items-center gap-2.5">
                <a
                  [href]="profile.socials.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2.5 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 border border-slate-800 transition-all duration-200"
                  aria-label="Jaswanth V. on LinkedIn"
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63c.9 0 1.63-.73 1.63-1.63s-.73-1.63-1.63-1.63Z"/>
                  </svg>
                </a>
                <a
                  [href]="profile.socials.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all duration-200"
                  aria-label="Jaswanth V. on GitHub"
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                  </svg>
                </a>
              </div>
              <div class="text-xs text-slate-400 font-mono">
                📍 {{ profile.location }}
              </div>
            </div>
          </div>

          <!-- Right Column: Interactive Portrait Chassis & Telemetry Orbiters -->
          <div class="lg:col-span-5 flex justify-center">
            <div class="relative w-full max-w-sm">
              
              <!-- Floating Orbiter Badges -->
              <div class="hidden sm:flex absolute -top-4 -left-6 z-20 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl text-[11px] font-mono font-semibold text-cyan-300 items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Angular 22</span>
              </div>

              <div class="hidden sm:flex absolute -bottom-3 -left-4 z-20 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl text-[11px] font-mono font-semibold text-slate-300 items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Django REST</span>
              </div>

              <div class="hidden sm:flex absolute top-1/2 -right-6 z-20 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl text-[11px] font-mono font-semibold text-emerald-400 items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>PostgreSQL</span>
              </div>

              <!-- Main Chassis Card with 3D Tilt -->
              <div
                #cardContainer
                (mousemove)="onMouseMove($event)"
                (mouseleave)="onMouseLeave()"
                class="relative rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-2xl transition-transform duration-200 ease-out"
                [style.transform]="cardTransform()"
              >
                <!-- Chassis Top Bar -->
                <div class="flex items-center justify-between pb-3 px-1 text-[11px] font-mono text-slate-400">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span class="font-semibold text-slate-200 uppercase">SYS: ONLINE</span>
                  </div>
                  <span>PRODXP.AI MES</span>
                </div>

                <!-- Portrait Photo Box -->
                <div class="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                  @if (imageLoaded()) {
                    <img
                      src="assets/images/Jaswanth-self-portrait.png"
                      alt="Jaswanth V. - Full-stack Software Developer"
                      (error)="onImageError()"
                      class="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  } @else {
                    <!-- Monogram Fallback Avatar -->
                    <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-6">
                      <span class="text-4xl font-bold font-mono tracking-wider">JV</span>
                      <span class="text-xs font-mono text-blue-200 mt-2">Jaswanth V.</span>
                      <span class="text-[10px] text-blue-300 font-mono mt-1">Full-stack Developer</span>
                    </div>
                  }
                </div>

                <!-- Chassis Bottom Telemetry Ribbon -->
                <div class="pt-3 px-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span class="text-cyan-400 font-semibold">CHENNAI // IND</span>
                  <span class="text-slate-500">B.TECH AI &amp; DS</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- Core Impact Metrics Ticker -->
        <div class="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <div class="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">8.5</div>
            <div class="text-xs font-semibold text-slate-200 mt-1">B.Tech CGPA</div>
            <div class="text-[11px] text-slate-400">Distinction Grade</div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <div class="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">#3</div>
            <div class="text-xs font-semibold text-slate-200 mt-1">Department Rank</div>
            <div class="text-[11px] text-slate-400">AI &amp; Data Science</div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <div class="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">4</div>
            <div class="text-xs font-semibold text-slate-200 mt-1">Engineering Roles</div>
            <div class="text-[11px] text-slate-400">Full-time &amp; Research</div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <div class="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono">100%</div>
            <div class="text-xs font-semibold text-slate-200 mt-1">Production Focus</div>
            <div class="text-[11px] text-slate-400">Industrial Scalability</div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  readonly profile = PROFILE_DATA;
  readonly aboutData = ABOUT_ME_DATA;

  readonly journeyState = inject(JourneyStateService);
  private readonly anim = inject(AnimationService);

  @ViewChild('cardContainer') cardContainer!: ElementRef<HTMLDivElement>;

  readonly imageLoaded = signal<boolean>(true);
  readonly cardTransform = signal<string>('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  ngAfterViewInit(): void {
    const isReduced = this.anim.isReducedMotion();
    if (!isReduced) {
      const staggerTargets = document.querySelectorAll('#station-origin .hero-stagger-item');
      if (staggerTargets.length > 0) {
        this.anim.staggerFadeUp(Array.from(staggerTargets), {
          duration: 600,
          stagger: 70
        });
      }
    }
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.cardContainer?.nativeElement || this.anim.isReducedMotion()) return;
    const rect = this.cardContainer.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;
    this.cardTransform.set(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`);
  }

  onMouseLeave(): void {
    this.cardTransform.set('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  }

  onImageError(): void {
    this.imageLoaded.set(false);
  }

  onScrollTo(id: string): void {
    this.journeyState.goToStation(id, 'next');
  }

  ngOnDestroy(): void {}
}
