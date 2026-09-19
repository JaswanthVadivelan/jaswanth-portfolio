import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CERTIFICATIONS_DATA } from '../../data/certifications.data';
import { CertificationItem } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="certifications" class="py-20 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold font-mono mb-3">
            <span>11</span>
            <span>/</span>
            <span>CERTIFICATIONS & CREDENTIALS</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional & Academic Certifications
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Specialized coursework credentials across AI/ML algorithms, relational database engineering, and full-stack development.
          </p>
        </div>

        <!-- Certifications Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (cert of certifications; track cert.id) {
            <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 class="text-sm font-bold text-slate-900 tracking-tight mb-1">
                  {{ cert.name }}
                </h3>
                <p class="text-xs text-slate-500 mb-3 font-medium">
                  {{ cert.issuer }}
                </p>
              </div>

              <div class="pt-3 border-t border-slate-200/80 flex flex-wrap gap-1">
                @for (s of cert.skills; track s) {
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-slate-700 border border-slate-200">
                    {{ s }}
                  </span>
                }
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class CertificationsComponent {
  readonly certifications: CertificationItem[] = CERTIFICATIONS_DATA;
}

