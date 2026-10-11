import { Component, signal, inject, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA, ABOUT_ME_DATA } from '../../data/profile.data';
import { AnimationService } from '../../core/services/animation.service';
import anime from 'animejs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" #aboutSection class="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="section-badge mb-3">
            <span>01 / ABOUT ME</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {{ aboutData.headline }}
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Full-stack software developer bridging web software architecture with real-world shop-floor operations and applied intelligence.
          </p>
        </div>

        <!-- Metric Counter Badges with Anime.js Numbers -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 about-stat-cards">
          <div class="clean-card p-4 text-center">
            <div class="text-2xl sm:text-3xl font-black font-mono text-blue-600">
              {{ cgpaCount().toFixed(1) }}
            </div>
            <div class="text-[11px] text-slate-500 font-medium mt-0.5">B.Tech CGPA / 10</div>
          </div>
          <div class="clean-card p-4 text-center">
            <div class="text-2xl sm:text-3xl font-black font-mono text-emerald-600">
              Rank {{ rankCount() }}
            </div>
            <div class="text-[11px] text-slate-500 font-medium mt-0.5">Department Distinction</div>
          </div>
          <div class="clean-card p-4 text-center">
            <div class="text-2xl sm:text-3xl font-black font-mono text-indigo-600">
              {{ rolesCount() }} Roles
            </div>
            <div class="text-[11px] text-slate-500 font-medium mt-0.5">MES, AI & Game Dev</div>
          </div>
          <div class="clean-card p-4 text-center">
            <div class="text-2xl sm:text-3xl font-black font-mono text-amber-600">
              {{ prodCount() }}%
            </div>
            <div class="text-[11px] text-slate-500 font-medium mt-0.5">Production-Focused</div>
          </div>
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <!-- Narrative (7 cols) -->
          <div class="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-base sm:text-lg">
            @for (para of aboutData.paragraphs; track $index) {
              <p>
                {{ para }}
              </p>
            }

            <!-- Key Engineering Pillars -->
            <div class="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              @for (pillar of aboutData.keyPillars; track pillar.title) {
                <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
                  <div class="font-bold text-slate-900 text-sm mb-1.5">{{ pillar.title }}</div>
                  <div class="text-xs text-slate-600 leading-relaxed">
                    {{ pillar.description }}
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Professional Snapshot Card (5 cols) -->
          <div class="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 class="text-base font-bold text-slate-900">
                Professional Snapshot
              </h3>
              <span class="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Verified Details
              </span>
            </div>

            <div class="space-y-3.5 text-xs sm:text-sm">
              <div class="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span class="text-slate-500 font-medium">Full Name</span>
                <span class="font-semibold text-slate-900">{{ profile.name }}</span>
              </div>
              <div class="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span class="text-slate-500 font-medium">Current Role</span>
                <span class="font-semibold text-slate-900">{{ profile.role }}</span>
              </div>
              <div class="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span class="text-slate-500 font-medium">Current Company</span>
                <span class="font-semibold text-blue-600 font-mono">{{ profile.company }}</span>
              </div>
              <div class="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span class="text-slate-500 font-medium">Education</span>
                <span class="font-semibold text-slate-900 text-right">B.Tech AI & DS (8.5 CGPA)</span>
              </div>
              <div class="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span class="text-slate-500 font-medium">Department Rank</span>
                <span class="font-semibold text-emerald-700 font-mono">Third Rank (Distinction)</span>
              </div>
              <div class="flex justify-between items-center py-1.5">
                <span class="text-slate-500 font-medium">Location</span>
                <span class="font-semibold text-slate-900">{{ profile.location }}</span>
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 leading-relaxed">
              <strong>Domain Focus:</strong> Developing reliable web-based Manufacturing Execution Systems (MES) bridging frontend, backend REST APIs, PostgreSQL data persistence, and industrial workflows.
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  readonly profile = PROFILE_DATA;
  readonly aboutData = ABOUT_ME_DATA;

  readonly cgpaCount = signal<number>(0);
  readonly rankCount = signal<number>(0);
  readonly rolesCount = signal<number>(0);
  readonly prodCount = signal<number>(0);

  private readonly animationService = inject(AnimationService);
  private observer: IntersectionObserver | null = null;

  @ViewChild('aboutSection') sectionRef!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if (this.sectionRef?.nativeElement) {
      this.observer = this.animationService.observeSection(
        this.sectionRef.nativeElement,
        () => this.runCounterAnimations()
      );
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private runCounterAnimations(): void {
    if (this.animationService.isReducedMotion()) {
      this.cgpaCount.set(8.5);
      this.rankCount.set(3);
      this.rolesCount.set(4);
      this.prodCount.set(100);
      return;
    }

    // Animate numbers using Anime.js
    const stats = { cgpa: 0, rank: 0, roles: 0, prod: 0 };

    anime({
      targets: stats,
      cgpa: 8.5,
      rank: 3,
      roles: 4,
      prod: 100,
      round: 1,
      duration: 1400,
      easing: 'easeOutQuart',
      update: () => {
        this.cgpaCount.set(stats.cgpa);
        this.rankCount.set(Math.round(stats.rank));
        this.rolesCount.set(Math.round(stats.roles));
        this.prodCount.set(Math.round(stats.prod));
      }
    });

    this.animationService.staggerFadeUp('.about-stat-cards > div', {
      duration: 600,
      stagger: 60
    });
  }
}
