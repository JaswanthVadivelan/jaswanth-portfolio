import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECTS_DATA } from '../../data/projects.data';
import { MesFactoryComponent } from '../../three-d/mes-factory/mes-factory.component';

@Component({
  selector: 'app-featured-project',
  standalone: true,
  imports: [CommonModule, MesFactoryComponent],
  template: `
    @if (featuredProject) {
      <section id="featured" class="py-20 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden">
        
        <!-- Background subtle glow -->
        <div class="absolute -top-40 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-40 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Section Badge & Header -->
          <div class="max-w-3xl mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-semibold font-mono mb-3">
              <span>05</span>
              <span>/</span>
              <span>FEATURED ENTERPRISE SYSTEM</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {{ featuredProject.title }}
            </h2>
            <p class="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
              {{ featuredProject.subtitle }}
            </p>
          </div>

          <!-- Top Grid: Narrative & 3D Visualizer -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            
            <!-- Left Info (6 cols) -->
            <div class="lg:col-span-6 space-y-6">
              <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                {{ featuredProject.description }}
              </p>

              <!-- Technical Architecture Note -->
              @if (featuredProject.architectureNotes) {
                <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
                  <div class="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 mb-1">
                    System Data Pipeline
                  </div>
                  <div class="text-xs sm:text-sm font-mono text-slate-200">
                    {{ featuredProject.architectureNotes }}
                  </div>
                </div>
              }

              <!-- Architectural Highlights -->
              <div class="space-y-2">
                <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400">Core Engineering Achievements:</h4>
                <ul class="space-y-1.5 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                  @for (hl of featuredProject.keyHighlights; track hl) {
                    <li class="leading-relaxed">{{ hl }}</li>
                  }
                </ul>
              </div>

              <!-- Tech Stack Badges -->
              <div class="pt-2">
                <h4 class="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Verified Technology Stack:</h4>
                <div class="flex flex-wrap gap-2">
                  @for (tech of featuredProject.technologies; track tech) {
                    <span class="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-slate-800 text-blue-300 border border-slate-700">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>
            </div>

            <!-- Right 3D Visualizer (6 cols) -->
            <div class="lg:col-span-6">
              <app-mes-factory />
            </div>

          </div>

          <!-- MES Modules Breakdown Grid (8 Verified Modules) -->
          @if (featuredProject.modules) {
            <div class="mt-12 pt-10 border-t border-slate-800">
              <div class="mb-6 flex items-center justify-between">
                <h3 class="text-xl font-bold text-white tracking-tight">
                  Enterprise MES Architecture & Functional Sub-Systems
                </h3>
                <span class="text-xs font-mono text-slate-400">
                  8 Core Functional Modules
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                @for (mod of featuredProject.modules; track mod.title) {
                  <div class="p-5 rounded-xl bg-slate-800/60 border border-slate-700/70 hover:border-blue-500/60 transition-colors flex flex-col justify-between">
                    <div>
                      <h4 class="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span>{{ mod.title }}</span>
                      </h4>
                      <p class="text-xs text-slate-300 leading-relaxed mb-4">
                        {{ mod.description }}
                      </p>
                    </div>
                    <div class="flex flex-wrap gap-1">
                      @for (tag of mod.tags; track tag) {
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                          {{ tag }}
                        </span>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          }

        </div>
      </section>
    }
  `
})
export class FeaturedProjectComponent {
  readonly featuredProject = PROJECTS_DATA.find((p) => p.isFeatured) || PROJECTS_DATA[0];
}

