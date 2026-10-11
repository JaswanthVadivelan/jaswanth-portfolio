import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA } from '../../data/profile.data';
import { JourneyStateService } from '../../core/services/journey-state.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="station-comms" class="relative py-20 lg:py-24 bg-slate-950 text-white min-h-[calc(100vh-4.5rem)] flex flex-col justify-center overflow-hidden">
      
      <!-- Subtle Background Grid -->
      <div class="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <!-- Station Sector Header -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono font-semibold mb-3">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>STATION 06 // TRANSMISSION BASE & COMMS RELAY</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Connect, Collaborate & Dispatch Resume
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Direct communication channels for software engineering roles, technical inquiries, and verified candidate dossier requests.
            </p>
          </div>

          <div class="flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>UPLINK: <strong class="text-cyan-300">ONLINE</strong></span>
          </div>
        </div>

        <!-- ==================== RESUME DOSSIER DISPATCHER ==================== -->
        <div class="bg-slate-900 rounded-3xl p-6 sm:p-8 mb-6 border border-slate-800 shadow-2xl">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <!-- Left Details (8 cols) -->
            <div class="lg:col-span-8 space-y-4">
              <div class="flex items-center gap-3.5">
                <span class="w-12 h-12 rounded-2xl bg-blue-950 border border-blue-800 text-cyan-400 flex items-center justify-center font-bold text-xl shadow-md">
                  📄
                </span>
                <div>
                  <h3 class="text-xl font-bold text-white tracking-tight">
                    {{ profile.name }} — Official Engineering Resume
                  </h3>
                  <p class="text-xs text-slate-400 font-mono">
                    {{ profile.role }} • {{ profile.company }}
                  </p>
                </div>
              </div>

              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Summary of full-stack industrial software development (Angular, Django REST Framework, PostgreSQL), AI gesture robotics engineering, game dev optimization, and B.Tech in AI &amp; Data Science (CGPA 8.5/10, Department 3rd Rank, Distinction).
              </p>

              <!-- Highlights Badges -->
              <div class="flex flex-wrap gap-2 pt-1">
                <span class="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold">
                  🎓 B.Tech AI &amp; DS (8.5 CGPA • Rank 3)
                </span>
                <span class="px-2.5 py-1 rounded-md bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
                  🏭 ProdXP.ai MES Developer
                </span>
                <span class="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold">
                  🐍 Python • Django • Angular • PostgreSQL
                </span>
              </div>
            </div>

            <!-- Right Download / Request Action (4 cols) -->
            <div class="lg:col-span-4 flex flex-col items-stretch gap-3">
              @if (isPdfAvailable()) {
                <a
                  href="assets/documents/Jaswanth_V_Resume.pdf"
                  download="Jaswanth_V_Resume.pdf"
                  class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 shadow-md shadow-blue-500/20 transition-all duration-200 cursor-pointer"
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
                  class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-950 text-slate-500 border border-slate-800 cursor-not-allowed"
                  title="Resume PDF update pending upload. Please connect via LinkedIn."
                >
                  <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                class="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              >
                <svg class="w-3.5 h-3.5 fill-blue-400" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63c.9 0 1.63-.73 1.63-1.63s-.73-1.63-1.63-1.63Z"/>
                </svg>
                <span>Connect on LinkedIn</span>
              </a>
            </div>

          </div>
        </div>

        <!-- ==================== COMMUNICATION CONDUITS ==================== -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- LinkedIn Conduit -->
          <a
            [href]="profile.socials.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-blue-500 shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div class="w-12 h-12 rounded-2xl bg-blue-950 text-cyan-400 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63s.73 1.63 1.63 1.63c.9 0 1.63-.73 1.63-1.63s-.73-1.63-1.63-1.63Z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                Connect on LinkedIn
              </h3>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                Connect professionally, send a direct transmission, or view recommendations and mutual network.
              </p>
            </div>
            <div class="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>linkedin.com/in/jaswanthvadivelan</span>
              <span>→</span>
            </div>
          </a>

          <!-- GitHub Conduit -->
          <a
            [href]="profile.socials.github"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-slate-600 shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div class="w-12 h-12 rounded-2xl bg-slate-950 text-slate-300 flex items-center justify-center mb-5 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                Explore on GitHub
              </h3>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                Explore open-source repositories, developer activity, and code contributions.
              </p>
            </div>
            <div class="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 group-hover:translate-x-1 transition-transform">
              <span>github.com/JaswanthVadivelan</span>
              <span>→</span>
            </div>
          </a>

        </div>

        <!-- Station Navigation Strip -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
          <button
            type="button"
            (click)="journeyState.prevStation()"
            class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            ⬅ Prev Station (05. Knowledge Vault)
          </button>
          <span class="text-slate-500 text-[11px]">* Transmission base & verified professional contact conduits.</span>
          <button
            type="button"
            (click)="journeyState.goToStation(0, 'warp')"
            class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors cursor-pointer"
          >
            Return to Station 01 (Origin) ↺
          </button>
        </div>

      </div>
    </section>
  `
})
export class ContactComponent implements OnInit {
  readonly journeyState = inject(JourneyStateService);
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
