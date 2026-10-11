import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPERIENCE_DATA } from '../../data/experience.data';
import { ExperienceItem } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="section-badge mb-3">
            <span>03 / PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Software Development & Engineering Timeline
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Practical engineering delivery across industrial Manufacturing Execution Systems, AI & robotics IoT integration, and interactive game systems.
          </p>
        </div>

        <!-- Experience Timeline with Glowing Connecting Trace -->
        <div class="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-indigo-500 before:to-slate-300">
          @for (item of experiences; track item.id; let idx = $index; let isFirst = $first) {
            <div class="relative flex items-start gap-4 sm:gap-6 group">
              
              <!-- Glowing Marker Node -->
              <div
                class="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-xs sm:text-sm font-bold shadow-md transition-all duration-300"
                [class.bg-blue-600]="isFirst"
                [class.text-white]="isFirst"
                [class.shadow-blue-500/30]="isFirst"
                [class.ring-4]="isFirst"
                [class.ring-blue-100]="isFirst"
                [class.bg-white]="!isFirst"
                [class.text-slate-800]="!isFirst"
                [class.border-2]="!isFirst"
                [class.border-blue-500]="!isFirst"
              >
                <span>0{{ idx + 1 }}</span>
              </div>

              <!-- Content Card -->
              <div
                class="flex-1 clean-card p-6 sm:p-7 hover:border-blue-400 relative transition-all duration-200"
                [class.border-l-4]="isFirst"
                [class.border-l-blue-600]="isFirst"
              >
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3">
                  <div>
                    <h3 class="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      {{ item.role }}
                    </h3>
                    <div class="text-sm font-semibold text-blue-600 flex items-center gap-1.5 mt-0.5">
                      <span>{{ item.company }}</span>
                      <span class="text-slate-300">•</span>
                      <span class="text-slate-500 font-normal">{{ item.location }}</span>
                    </div>
                  </div>
                  <div class="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                    <span class="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-mono font-semibold text-slate-700">
                      {{ item.period }}
                    </span>
                    <span
                      class="px-2.5 py-1 rounded-md text-xs font-semibold"
                      [class.bg-blue-50]="item.employmentType === 'Full-time'"
                      [class.text-blue-700]="item.employmentType === 'Full-time'"
                      [class.border]="item.employmentType === 'Full-time'"
                      [class.border-blue-200]="item.employmentType === 'Full-time'"
                      [class.bg-slate-100]="item.employmentType === 'Internship'"
                      [class.text-slate-700]="item.employmentType === 'Internship'"
                    >
                      {{ item.employmentType }}
                    </span>
                  </div>
                </div>

                <!-- Description -->
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {{ item.description }}
                </p>

                <!-- Responsibilities List -->
                <div class="mb-5">
                  <div class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Key Responsibilities & Contributions:</div>
                  <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                    @for (resp of item.responsibilities; track resp) {
                      <li class="leading-relaxed">{{ resp }}</li>
                    }
                  </ul>
                </div>

                <!-- Technology Pills -->
                <div class="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                  @for (tech of item.technologies; track tech) {
                    <span class="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-50 border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
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
