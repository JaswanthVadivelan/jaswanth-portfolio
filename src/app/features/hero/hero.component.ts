import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA } from '../../data/profile.data';
import { HeroWorkspaceComponent } from '../../three-d/hero-workspace/hero-workspace.component';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, HeroWorkspaceComponent],
  template: `
    <section id="home" class="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      <!-- Background subtle decorative grid -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- Left Column: Content & Positioning (7 cols) -->
          <div class="lg:col-span-7 space-y-6 text-left">
            
            <!-- Availability Badge -->
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs">
              <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Available for Software Development & Data Engineering Roles</span>
            </div>

            <!-- Main Heading -->
            <div>
              <p class="text-sm font-semibold tracking-wide uppercase text-slate-500 mb-1 font-mono">
                Portfolio & Engineering Showcase
              </p>
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Hi, I'm <span class="text-blue-600">{{ profile.name }}</span>
              </h1>
              <p class="mt-3 text-lg sm:text-xl font-medium text-slate-700 leading-snug">
                {{ profile.role }}
              </p>
            </div>

            <!-- Subtitle / Bio summary -->
            <p class="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {{ profile.subTagline }}
            </p>

            <!-- Key Domain Pill Tags -->
            <div class="flex flex-wrap gap-2 pt-1">
              <span class="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                Angular 22+ Standalone
              </span>
              <span class="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                Django REST Framework
              </span>
              <span class="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                PostgreSQL & Query Optimization
              </span>
              <span class="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                AI & Machine Learning (RAG)
              </span>
              <span class="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                Enterprise MES Architecture
              </span>
            </div>

            <!-- Call to Actions -->
            <div class="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#featured"
                (click)="onNavigate($event, 'featured')"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 transition-all duration-200"
              >
                <span>Explore Enterprise MES</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href="#resume"
                (click)="onNavigate($event, 'resume')"
                class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 active:bg-slate-100 shadow-xs transition-all duration-200"
              >
                <svg class="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>View Resume</span>
              </a>

              <a
                href="#contact"
                (click)="onNavigate($event, 'contact')"
                class="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
              >
                <span>Get In Touch</span>
              </a>
            </div>

            <!-- Recruiter Quick Facts -->
            <div class="pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div>
                <span class="block text-xs text-slate-500 font-medium">Education</span>
                <span class="text-sm font-bold text-slate-900">B.Tech AI & Data Science</span>
              </div>
              <div>
                <span class="block text-xs text-slate-500 font-medium">Academic CGPA</span>
                <span class="text-sm font-bold text-slate-900">8.41 / 10.0</span>
              </div>
              <div>
                <span class="block text-xs text-slate-500 font-medium">Location</span>
                <span class="text-sm font-bold text-slate-900">{{ profile.location }}</span>
              </div>
            </div>

          </div>

          <!-- Right Column: Interactive 3D Digital Workspace (5 cols) -->
          <div class="lg:col-span-5 w-full">
            <app-hero-workspace />
          </div>

        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  readonly profile = PROFILE_DATA;
  private readonly scrollSpy = inject(ScrollSpyService);

  onNavigate(event: Event, fragment: string): void {
    event.preventDefault();
    this.scrollSpy.scrollToSection(fragment);
  }
}

