import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPERIENCE_DATA } from '../../data/experience.data';
import { ExperienceItem } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-20 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold font-mono mb-3">
            <span>04</span>
            <span>/</span>
            <span>EXPERIENCE & PROJECTS</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineering Track Record
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Practical engineering delivery across full-stack applications, manufacturing systems, and analytical pipelines.
          </p>
        </div>

        <!-- Experience Timeline -->
        <div class="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-5 before:w-0.5 before:bg-slate-200">
          @for (item of experiences; track item.id) {
            <div class="relative flex items-start gap-4 sm:gap-6 group">
              <!-- Timeline Marker Node -->
              <div class="relative z-10 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-mono text-xs font-bold shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              <!-- Content Card -->
              <div class="flex-1 bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-200">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-3">
                  <div>
                    <h3 class="text-lg font-bold text-slate-900 tracking-tight">
                      {{ item.title }}
                    </h3>
                    <div class="text-sm font-semibold text-blue-600">
                      {{ item.organization }} • <span class="text-slate-500 font-normal">{{ item.location }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-mono font-medium text-slate-700">
                      {{ item.period }}
                    </span>
                    <span class="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs font-medium text-blue-700">
                      {{ item.type }}
                    </span>
                  </div>
                </div>

                <!-- Highlights List -->
                <ul class="space-y-2 mb-4 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                  @for (hl of item.highlights; track hl) {
                    <li class="leading-relaxed">{{ hl }}</li>
                  }
                </ul>

                <!-- Technology Pills -->
                <div class="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/80">
                  @for (tech of item.technologies; track tech) {
                    <span class="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-white border border-slate-200 text-slate-700">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class ExperienceComponent {
  readonly experiences: ExperienceItem[] = EXPERIENCE_DATA;
}

