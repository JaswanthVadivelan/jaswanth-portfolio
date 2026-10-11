import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECTS_DATA } from '../../data/projects.data';
import { ProjectItem } from '../../core/models/portfolio.models';
import { RoboticsVisualizerComponent } from './robotics-visualizer.component';
import { ShogunVisualizerComponent } from './shogun-visualizer.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RoboticsVisualizerComponent, ShogunVisualizerComponent],
  template: `
    <section id="projects" class="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="section-badge mb-3">
            <span>04 / FEATURED ENGINEERING PROJECTS</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Applied Systems & Creative Implementations
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Three distinctive technical domains: industrial manufacturing software, AI & robotics IoT hardware integration, and interactive game systems.
          </p>
        </div>

        <!-- Project Selector Tabs -->
        <div class="flex flex-wrap gap-2 mb-10" role="tablist">
          @for (proj of projects; track proj.id) {
            <button
              type="button"
              role="tab"
              (click)="selectedProjectId.set(proj.id)"
              class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2"
              [class.bg-blue-600]="selectedProjectId() === proj.id"
              [class.text-white]="selectedProjectId() === proj.id"
              [class.shadow-md]="selectedProjectId() === proj.id"
              [class.bg-slate-50]="selectedProjectId() !== proj.id"
              [class.text-slate-700]="selectedProjectId() !== proj.id"
              [class.border]="selectedProjectId() !== proj.id"
              [class.border-slate-200]="selectedProjectId() !== proj.id"
              [class.hover:bg-slate-100]="selectedProjectId() !== proj.id"
              [attr.aria-selected]="selectedProjectId() === proj.id"
            >
              <span>{{ proj.title }}</span>
            </button>
          }
        </div>

        <!-- Active Project Display -->
        @if (activeProject(); as project) {
          <div class="space-y-8 animate-in fade-in duration-300">
            
            <!-- Project Header & Context Card -->
            <div class="clean-card p-6 sm:p-8">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
                <div>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2 inline-block">
                    {{ project.category }}
                  </span>
                  <h3 class="text-2xl font-bold text-slate-900 tracking-tight">
                    {{ project.title }}
                  </h3>
                </div>
                @if (project.period) {
                  <span class="text-xs font-mono font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md self-start sm:self-auto">
                    {{ project.period }}
                  </span>
                }
              </div>

              <p class="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                {{ project.description }}
              </p>

              <!-- Highlights -->
              <div class="mb-6">
                <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Key Technical Achievements:</h4>
                <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                  @for (hl of project.highlights; track hl) {
                    <li class="leading-relaxed">{{ hl }}</li>
                  }
                </ul>
              </div>

              <!-- Tech Stack -->
              <div class="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                @for (tech of project.technologies; track tech) {
                  <span class="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-50 border border-slate-200/90 text-slate-700">
                    {{ tech }}
                  </span>
                }
              </div>
            </div>

            <!-- Bespoke Interactive Visualizer Container -->
            @if (project.id === 'mes-industrial-software') {
              <div class="p-6 sm:p-8 rounded-3xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span class="text-xs font-mono uppercase tracking-wider font-semibold text-blue-700 block mb-1">
                    Signature Technical Showcase
                  </span>
                  <h4 class="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                    Explore the Interactive 5-Stage MES Process Flow
                  </h4>
                  <p class="text-xs sm:text-sm text-slate-600">
                    See how shop-floor execution connects with production planning, job orders, quality inspection, and OEE analytics.
                  </p>
                </div>
                <a
                  href="#architecture"
                  class="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                >
                  <span>Open MES Pipeline Visualizer ↓</span>
                </a>
              </div>
            } @else if (project.id === 'ai-robotic-arm') {
              <app-robotics-visualizer />
            } @else if (project.id === 'shogun-run') {
              <app-shogun-visualizer />
            }

          </div>
        }

      </div>
    </section>
  `
})
export class ProjectsComponent {
  readonly projects: ProjectItem[] = PROJECTS_DATA;
  readonly selectedProjectId = signal<string>(this.projects[0].id);

  activeProject(): ProjectItem | undefined {
    return this.projects.find((p) => p.id === this.selectedProjectId());
  }
}
