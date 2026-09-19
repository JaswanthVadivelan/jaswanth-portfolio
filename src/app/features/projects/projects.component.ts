import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECTS_DATA } from '../../data/projects.data';
import { ProjectItem } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="py-20 bg-slate-50 border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-10">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-200/80 text-slate-700 text-xs font-semibold font-mono mb-3">
            <span>06</span>
            <span>/</span>
            <span>PROJECT PORTFOLIO</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Verified Engineering Projects
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Applied systems spanning AI conversational agents, multi-dimensional predictive data analytics, and embedded IoT architectures.
          </p>
        </div>

        <!-- Filter Buttons -->
        <div class="flex flex-wrap gap-2 mb-8">
          @for (filter of categories; track filter) {
            <button
              type="button"
              (click)="selectedCategory.set(filter)"
              class="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              [class.bg-blue-600]="selectedCategory() === filter"
              [class.text-white]="selectedCategory() === filter"
              [class.shadow-xs]="selectedCategory() === filter"
              [class.bg-white]="selectedCategory() !== filter"
              [class.text-slate-700]="selectedCategory() !== filter"
              [class.border]="selectedCategory() !== filter"
              [class.border-slate-200]="selectedCategory() !== filter"
              [class.hover:bg-slate-100]="selectedCategory() !== filter"
            >
              {{ filter }}
            </button>
          }
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of filteredProjects(); track project.id) {
            <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
              <div>
                <!-- Category Badge -->
                <div class="flex items-center justify-between mb-3">
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {{ project.category }}
                  </span>
                  @if (project.isFeatured) {
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      FLAGSHIP
                    </span>
                  }
                </div>

                <!-- Title & Subtitle -->
                <h3 class="text-lg font-bold text-slate-900 tracking-tight mb-1">
                  {{ project.title }}
                </h3>
                <p class="text-xs font-medium text-slate-500 mb-3">
                  {{ project.subtitle }}
                </p>

                <!-- Description -->
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {{ project.description }}
                </p>

                <!-- Key Highlights -->
                <div class="mb-4">
                  <span class="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                    Key Highlights:
                  </span>
                  <ul class="space-y-1 text-xs text-slate-700 list-disc list-inside">
                    @for (hl of project.keyHighlights; track hl) {
                      <li class="leading-relaxed">{{ hl }}</li>
                    }
                  </ul>
                </div>
              </div>

              <!-- Tech Stack Footer -->
              <div class="pt-4 border-t border-slate-100">
                <div class="flex flex-wrap gap-1.5">
                  @for (tech of project.technologies; track tech) {
                    <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-50 text-slate-700 border border-slate-200">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class ProjectsComponent {
  readonly allProjects: ProjectItem[] = PROJECTS_DATA;

  readonly categories = [
    'All Projects',
    'Enterprise / MES',
    'AI / Data Science',
    'IoT / Robotics'
  ];

  readonly selectedCategory = signal<string>('All Projects');

  readonly filteredProjects = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All Projects') {
      return this.allProjects;
    }
    return this.allProjects.filter((p) => p.category === cat);
  });
}

