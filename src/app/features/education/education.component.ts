import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EDUCATION_DATA } from '../../data/education.data';
import { EducationItem } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="education" class="py-20 bg-slate-50 border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-200/80 text-slate-700 text-xs font-semibold font-mono mb-3">
            <span>10</span>
            <span>/</span>
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Formal Education & Degree
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Four-year engineering degree curriculum focusing on artificial intelligence, algorithmic foundations, database systems, and full-stack software development.
          </p>
        </div>

        <!-- Education Card -->
        @for (edu of education; track edu.degree) {
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-4xl">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
              <div>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2 inline-block">
                  Undergraduate Engineering
                </span>
                <h3 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {{ edu.degree }} in {{ edu.field }}
                </h3>
                <p class="text-sm font-semibold text-blue-600 mt-1">
                  {{ edu.institution }}
                </p>
              </div>

              <div class="flex sm:flex-col items-start sm:items-end justify-between gap-1">
                <span class="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                  {{ edu.period }}
                </span>
                <span class="text-sm font-bold text-emerald-600 font-mono mt-1">
                  CGPA: {{ edu.cgpa }}
                </span>
              </div>
            </div>

            <!-- Highlights -->
            <div class="pt-6 space-y-3">
              <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Curriculum Focus & Engineering Competencies:
              </h4>
              <ul class="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                @for (hl of edu.highlights; track hl) {
                  <li class="leading-relaxed">{{ hl }}</li>
                }
              </ul>
            </div>
          </div>
        }

      </div>
    </section>
  `
})
export class EducationComponent {
  readonly education: EducationItem[] = EDUCATION_DATA;
}

