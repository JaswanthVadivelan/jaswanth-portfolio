import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ACHIEVEMENTS_DATA } from '../../data/achievements.data';
import { AchievementItem } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="achievements" class="py-20 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold font-mono mb-3">
            <span>09</span>
            <span>/</span>
            <span>ACHIEVEMENTS</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Key Academic & Project Milestones
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Notable academic distinctions, capstone architectural leadership, and competitive engineering contributions.
          </p>
        </div>

        <!-- Achievements Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (item of achievements; track item.id) {
            <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-mono font-bold text-sm">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </span>
                  @if (item.badgeText) {
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      {{ item.badgeText }}
                    </span>
                  }
                </div>

                <h3 class="text-base font-bold text-slate-900 tracking-tight mb-1">
                  {{ item.title }}
                </h3>
                <div class="text-xs font-medium text-slate-500 mb-3">
                  {{ item.issuer }} • {{ item.year }}
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

