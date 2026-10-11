import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA } from '../../data/profile.data';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="resume" class="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="section-badge mb-3">
            <span>08 / RESUME & CREDENTIALS</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Resume & Professional Summary
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Consolidated overview of full-stack engineering, industrial MES experience, and academic distinctions.
          </p>
        </div>

        <!-- Resume Action Card -->
        <div class="clean-card p-8 sm:p-10 max-w-4xl hover:border-blue-300">
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
                    {{ profile.role }} • {{ profile.company }}
                  </p>
                </div>
              </div>

              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Covers full-stack industrial software development (Angular, Django REST, PostgreSQL), AI gesture robotics engineering, game development, and B.Tech in AI & Data Science (CGPA 8.5/10, Distinction).
              </p>

              <!-- Highlights Badges -->
              <div class="flex flex-wrap gap-2 pt-1">
                <span class="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold">
                  🎓 B.Tech AI & DS (8.5 CGPA • Rank 3)
                </span>
                <span class="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                  🏭 ProdXP.ai MES Developer
                </span>
                <span class="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold">
                  🐍 Python • Django • Angular • PostgreSQL
                </span>
              </div>
            </div>

            <!-- Right Download / Request Action (4 cols) -->
            <div class="md:col-span-4 flex flex-col items-stretch gap-3">
              @if (isPdfAvailable()) {
                <a
                  href="assets/documents/Jaswanth_V_Resume.pdf"
                  download="Jaswanth_V_Resume.pdf"
                  class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 transition-all duration-200"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Resume PDF</span>
                </a>
              } @else {
                <!-- Genuinely disabled button when file not present -->
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  title="Resume PDF update pending upload. Please connect via LinkedIn."
                >
                  <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Resume on Request</span>
                </button>
              }

              <!-- Direct LinkedIn Contact Link -->
              <a
                [href]="profile.socials.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <span>Connect on LinkedIn →</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  `
})
export class ResumeComponent implements OnInit {
  readonly profile = PROFILE_DATA;
  readonly isPdfAvailable = signal<boolean>(false);

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      fetch('assets/documents/Jaswanth_V_Resume.pdf', { method: 'HEAD' })
        .then((res) => {
          if (res.ok) {
            this.isPdfAvailable.set(true);
          }
        })
        .catch(() => {
          this.isPdfAvailable.set(false);
        });
    }
  }
}
