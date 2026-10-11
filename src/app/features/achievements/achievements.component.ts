import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACHIEVEMENTS_DATA } from '../../data/achievements.data';
import { AchievementItem } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="achievements" class="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="section-badge mb-3">
            <span>06 / ACHIEVEMENTS & HONORS</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Academic Distinctions & Innovation Honors
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Verified academic excellence, departmental rank, leadership practicum, and robotics competition achievements.
          </p>
        </div>

        <!-- Achievements Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (item of achievements; track item.id) {
            <div class="clean-card p-6 sm:p-7 flex flex-col justify-between hover:border-blue-300">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <span class="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Verified
                  </span>
                </div>

                <h3 class="text-base font-bold text-slate-900 tracking-tight mb-1">
                  {{ item.title }}
                </h3>
                <div class="text-xs font-medium text-blue-600 mb-3">
                  {{ item.context }}
                </div>

                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class AchievementsComponent {
  readonly achievements: AchievementItem[] = ACHIEVEMENTS_DATA;
}
