import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA, ABOUT_ME_DATA } from '../../data/profile.data';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden bg-white">
      
      <!-- Subtle Grid Pattern Background -->
      <div class="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Main Hero Grid: Info Left / Authentic Portrait Right -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- Left Column: Introduction & Primary CTAs (7 cols) -->
          <div class="lg:col-span-7 flex flex-col items-start text-left">
            
            <!-- Company & Status Pill -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="font-mono text-[11px] uppercase tracking-wider text-slate-800 font-bold">{{ profile.company }}</span>
              <span class="text-blue-300">•</span>
              <span class="text-blue-700 font-semibold">{{ profile.role }}</span>
            </div>

            <!-- Headline -->
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-6">
              {{ profile.headline }}
            </h1>

            <!-- Introduction Paragraphs -->
            <div class="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              @for (paragraph of profile.introduction; track $index) {
                <p [class.font-semibold]="$index === 0" [class.text-slate-900]="$index === 0">
                  {{ paragraph }}
                </p>
              }
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <button
                type="button"
                (click)="onScrollTo('experience')"
                class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 transition-all duration-150 cursor-pointer"
              >
                <span>View Experience</span>
                <span>↓</span>
              </button>

              <button
                type="button"
                (click)="onScrollTo('projects')"
                class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-50 text-slate-800 font-semibold text-sm hover:bg-slate-100 border border-slate-200 transition-all duration-150 cursor-pointer"
              >
                <span>Featured Projects</span>
              </button>

              <button
                type="button"
                (click)="onScrollTo('contact')"
                class="inline-flex items-center justify-center px-4 py-3.5 text-slate-600 hover:text-blue-600 font-semibold text-sm transition-colors cursor-pointer"
              >
                <span>Get in Touch →</span>
              </button>
            </div>

            <!-- Social Links & Location -->
            <div class="flex items-center gap-6 pt-6 border-t border-slate-100 w-full">
              <div class="flex items-center gap-2.5">
                <a
                  [href]="profile.socials.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors"
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
                  class="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
                  aria-label="Jaswanth V. on GitHub"
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                  </svg>
                </a>
              </div>
              <div class="text-xs text-slate-500 font-medium">
                📍 {{ profile.location }}
              </div>
            </div>
          </div>

          <!-- Right Column: Authentic Portrait Card & Floating Tech Tags (5 cols) -->
          <div class="lg:col-span-5 flex justify-center">
            <div class="relative w-full max-w-sm">
              
              <!-- Floating Tech Badges -->
              <div class="hidden sm:flex absolute -top-4 -left-6 z-20 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-md text-[11px] font-mono font-semibold text-blue-700 items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>Angular 22</span>
              </div>

              <div class="hidden sm:flex absolute -bottom-3 -left-4 z-20 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-md text-[11px] font-mono font-semibold text-slate-800 items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                <span>Django REST</span>
              </div>

              <div class="hidden sm:flex absolute top-1/2 -right-6 z-20 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-md text-[11px] font-mono font-semibold text-emerald-700 items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>PostgreSQL</span>
              </div>

              <!-- Main Card -->
              <div class="clean-card p-4 shadow-xl">
                <!-- Top Status Header -->
                <div class="flex items-center justify-between pb-3 px-1 text-[11px] font-mono text-slate-500">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span class="font-semibold text-slate-700 uppercase">SYS: ONLINE</span>
                  </div>
                  <span>PRODXP.AI MES</span>
                </div>

                <!-- Authentic Portrait Image -->
                <div class="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                  @if (imageLoaded()) {
                    <img
                      src="assets/images/Jaswanth-self-portrait.png"
                      alt="Jaswanth V. - Full-stack Software Developer"
                      (error)="onImageError()"
                      class="w-full h-full object-cover object-top"
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

                <!-- Bottom Telemetry Ribbon -->
                <div class="pt-3 px-1 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span class="text-blue-600 font-semibold">CHENNAI // IND</span>
                  <span class="text-slate-400">B.TECH AI &amp; DS</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- Core Impact Metrics Ticker -->
        <div class="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="clean-card p-5 text-center">
            <div class="text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono">8.5</div>
            <div class="text-xs font-semibold text-slate-800 mt-1">B.Tech CGPA</div>
            <div class="text-[11px] text-slate-500">First Class Distinction</div>
          </div>

          <div class="clean-card p-5 text-center">
            <div class="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-mono">#3</div>
            <div class="text-xs font-semibold text-slate-800 mt-1">Department Rank</div>
            <div class="text-[11px] text-slate-500">AI &amp; Data Science</div>
          </div>

          <div class="clean-card p-5 text-center">
            <div class="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono">4</div>
            <div class="text-xs font-semibold text-slate-800 mt-1">Engineering Roles</div>
            <div class="text-[11px] text-slate-500">Full-time &amp; Research</div>
          </div>

          <div class="clean-card p-5 text-center">
            <div class="text-3xl sm:text-4xl font-extrabold text-cyan-600 font-mono">100%</div>
            <div class="text-xs font-semibold text-slate-800 mt-1">Production Focus</div>
            <div class="text-[11px] text-slate-500">Industrial Scalability</div>
          </div>
        </div>

        <!-- Engineering Pillars Overview -->
        <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (pillar of aboutData.keyPillars; track pillar.title) {
            <div class="clean-card p-6 flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-slate-900 text-sm mb-2">{{ pillar.title }}</h3>
                <p class="text-xs text-slate-600 leading-relaxed">{{ pillar.description }}</p>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class HeroComponent {
  readonly profile = PROFILE_DATA;
  readonly aboutData = ABOUT_ME_DATA;
  private readonly scrollSpy = inject(ScrollSpyService);

  readonly imageLoaded = signal<boolean>(true);

  onImageError(): void {
    this.imageLoaded.set(false);
  }

  onScrollTo(id: string): void {
    this.scrollSpy.scrollToSection(id);
  }
}
