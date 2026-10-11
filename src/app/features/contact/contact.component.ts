import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA } from '../../data/profile.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contact" class="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="section-badge mb-3">
            <span>05 / GET IN TOUCH</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Connect, Collaborate &amp; Resume
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Reach out directly for software development opportunities, technical inquiries, or to request verified candidate credentials.
          </p>
        </div>

        <!-- Resume Dossier Card -->
        <div class="clean-card p-6 sm:p-8 max-w-5xl mb-8">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <!-- Left Info (8 cols) -->
            <div class="md:col-span-8 space-y-4">
              <div class="flex items-center gap-3">
                <span class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                  📄
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
                Covers full-stack industrial software development (Angular, Django REST Framework, PostgreSQL), AI gesture robotics engineering, game development, and B.Tech in AI &amp; Data Science (CGPA 8.5/10, Distinction).
              </p>

              <!-- Highlights Badges -->
              <div class="flex flex-wrap gap-2 pt-1">
                <span class="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold">
                  🎓 B.Tech AI &amp; DS (8.5 CGPA • Rank 3)
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
                  class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 transition-all duration-150 cursor-pointer"
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
                <span>Connect on LinkedIn</span>
                <span>→</span>
              </a>
            </div>

          </div>
        </div>

        <!-- Contact Options Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          
          <!-- LinkedIn Card -->
          <a
            [href]="profile.socials.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="clean-card p-8 group hover:border-blue-500 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63c.9 0 1.63-.73 1.63-1.63s-.73-1.63-1.63-1.63Z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                Connect on LinkedIn
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Connect professionally, send a direct transmission, or view mutual network recommendations.
              </p>
            </div>
            <div class="flex items-center gap-2 text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>linkedin.com/in/jaswanthvadivelan</span>
              <span>→</span>
            </div>
          </a>

          <!-- GitHub Card -->
          <a
            [href]="profile.socials.github"
            target="_blank"
            rel="noopener noreferrer"
            class="clean-card p-8 group hover:border-slate-800 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-slate-900 group-hover:text-slate-900 transition-colors mb-2">
                Explore on GitHub
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Explore open-source repositories, developer activity, and software engineering contributions.
              </p>
            </div>
            <div class="flex items-center gap-2 text-xs font-semibold text-slate-800 group-hover:translate-x-1 transition-transform">
              <span>github.com/JaswanthVadivelan</span>
              <span>→</span>
            </div>
          </a>

        </div>

        <!-- Location Notice -->
        <div class="mt-8 max-w-5xl p-5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-600 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-lg">📍</span>
            <span>Operating from <strong>{{ profile.location }}</strong></span>
          </div>
          <span class="text-xs font-mono font-semibold text-blue-600">Open for Opportunities</span>
        </div>

      </div>
    </section>
  `
})
export class ContactComponent implements OnInit {
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
