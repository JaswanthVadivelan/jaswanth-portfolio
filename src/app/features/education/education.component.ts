import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EDUCATION_DATA } from '../../data/education.data';
import { EducationItem } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="education" class="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="section-badge mb-3">
            <span>07 / ACADEMIC BACKGROUND</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Education & Academic Foundation
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Formal engineering degree curriculum and higher secondary education in Computer Science and Mathematics.
          </p>
        </div>

        <!-- Education Cards Stack -->
        <div class="space-y-6 max-w-4xl">
          @for (edu of education; track edu.degree; let isFirst = $first) {
            <div
              class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-blue-300 transition-colors"
              [class.ring-1]="isFirst"
              [class.ring-blue-100]="isFirst"
            >
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div class="flex items-center gap-2 mb-1.5">
                    <span
                      class="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      [class.bg-blue-50]="isFirst"
                      [class.text-blue-700]="isFirst"
                      [class.border]="isFirst"
                      [class.border-blue-200]="isFirst"
                      [class.bg-slate-100]="!isFirst"
                      [class.text-slate-700]="!isFirst"
                    >
                      {{ isFirst ? 'Undergraduate Degree' : 'Secondary Education' }}
                    </span>
                    @if (isFirst) {
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Distinction & Rank 3
                      </span>
                    }
                  </div>
                  <h3 class="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {{ edu.degree }} @if (edu.field) { <span>— {{ edu.field }}</span> }
                  </h3>
                  <p class="text-sm font-semibold text-blue-600 mt-0.5">
                    {{ edu.institution }}
                  </p>
                </div>

                <div class="flex sm:flex-col items-start sm:items-end justify-between gap-1">
                  <span class="text-xs font-mono font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md">
                    {{ edu.period }}
                  </span>
                  <span class="text-sm font-bold text-emerald-700 font-mono mt-1">
                    {{ edu.scoreType }}: {{ edu.score }}
                  </span>
                </div>
              </div>

              <!-- Description -->
              @if (edu.description) {
                <p class="pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {{ edu.description }}
                </p>
              }

              <!-- Highlights / Achievements (if present) -->
              @if (edu.achievements && edu.achievements.length > 0) {
                <div class="mt-4 pt-4 border-t border-slate-100">
                  <div class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Academic Highlights:</div>
                  <ul class="space-y-1 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                    @for (ach of edu.achievements; track ach) {
                      <li class="leading-relaxed">{{ ach }}</li>
                    }
                  </ul>
                </div>
              }
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class EducationComponent {
  readonly education: EducationItem[] = EDUCATION_DATA;
}
