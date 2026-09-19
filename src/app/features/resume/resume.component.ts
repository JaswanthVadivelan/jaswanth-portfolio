import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA } from '../../data/profile.data';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="resume" class="py-20 bg-slate-50 border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-200/80 text-slate-700 text-xs font-semibold font-mono mb-3">
            <span>12</span>
            <span>/</span>
            <span>CURRICULUM VITAE</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Resume & Professional Summary
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Consolidated overview of educational qualifications, technical capabilities, and engineering deliverables ready for recruiter review.
          </p>
        </div>

        <!-- Resume Action Card -->
        <div class="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm max-w-4xl">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <!-- Left Info (8 cols) -->
            <div class="md:col-span-8 space-y-4">
              <div class="flex items-center gap-3">
                <span class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                <div>
                  <h3 class="text-xl font-bold text-slate-900 tracking-tight">
                    {{ profile.name }} — Official Resume
                  </h3>
                  <p class="text-xs text-slate-500 font-mono">
                    Updated for 2025/2026 Recruitment • PDF Format
                  </p>
                </div>
              </div>

              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Highlights B.Tech coursework (CGPA 8.41), full-stack project engineering with Angular & Django REST Framework, PostgreSQL optimization, AI chatbot architectures, and testing pipelines.
              </p>

              <!-- Quick Highlights Badges -->
              <div class="flex flex-wrap gap-2 pt-1">
                <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                  🎓 B.Tech AI & DS (8.41 CGPA)
                </span>
                <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                  ⚙️ Enterprise MES Architecture
                </span>
                <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                  🐍 Python • Django • SQL
                </span>
              </div>
            </div>

            <!-- Right Download / Request Action (4 cols) -->
            <div class="md:col-span-4 flex flex-col items-stretch gap-3">
              <button
                type="button"
                (click)="handleDownload()"
                class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 transition-all duration-200"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Resume</span>
              </button>

              <button
                type="button"
                (click)="onContactClick($event)"
                class="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <span>Request Direct Copy</span>
              </button>
            </div>

          </div>

          <!-- Notification Banner if Download clicked -->
          @if (showNotification()) {
            <div class="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start justify-between gap-3 animate-in fade-in duration-200">
              <div class="flex items-start gap-2">
                <svg class="w-4 h-4 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  {{ notificationMessage() }}
                </span>
              </div>
              <button
                type="button"
                (click)="showNotification.set(false)"
                class="text-blue-500 hover:text-blue-700 font-bold"
                aria-label="Close message"
              >
                ✕
              </button>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class ResumeComponent {
  readonly profile = PROFILE_DATA;
  readonly showNotification = signal<boolean>(false);
  readonly notificationMessage = signal<string>('');
  private readonly scrollSpy = inject(ScrollSpyService);

  handleDownload(): void {
    // Check if resume PDF exists at assets
    const resumePath = 'assets/resume/Jaswanth_V_Resume.pdf';
    
    // We attempt fetch or window.open; if missing, show friendly recruiter toast
    fetch(resumePath, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          window.open(resumePath, '_blank');
        } else {
          this.notificationMessage.set(
            'Resume PDF is being synchronized for latest revisions. Please use the contact form below or reach out via email for an immediate copy.'
          );
          this.showNotification.set(true);
        }
      })
      .catch(() => {
        this.notificationMessage.set(
          'Resume PDF is being synchronized for latest revisions. Please use the contact form below or reach out via email for an immediate copy.'
        );
        this.showNotification.set(true);
      });
  }

  onContactClick(event: Event): void {
    event.preventDefault();
    this.scrollSpy.scrollToSection('contact');
  }
}

