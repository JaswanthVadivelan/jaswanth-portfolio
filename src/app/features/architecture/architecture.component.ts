import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ARCHITECTURE_FLOW } from '../../data/architecture.data';
import { ArchitectureNode } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="architecture" class="py-20 bg-slate-50 border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-200/80 text-slate-700 text-xs font-semibold font-mono mb-3">
            <span>08</span>
            <span>/</span>
            <span>TECHNICAL ARCHITECTURE</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            System Design & Data Flow
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Multi-tier architectural blueprint representing how Angular frontend applications securely interface with Django REST services and optimized PostgreSQL relational stores.
          </p>
        </div>

        <!-- Interactive Architecture Pipeline (CSS/SVG Flow) -->
        <div class="relative bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            @for (node of nodes; track node.id; let idx = $index) {
              <div
                class="relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between cursor-pointer"
                [class.border-blue-500]="activeNode()?.id === node.id"
                [class.bg-blue-50/40]="activeNode()?.id === node.id"
                [class.shadow-md]="activeNode()?.id === node.id"
                [class.border-slate-200]="activeNode()?.id !== node.id"
                [class.bg-slate-50/70]="activeNode()?.id !== node.id"
                [class.hover:border-slate-300]="activeNode()?.id !== node.id"
                (click)="activeNode.set(node)"
                (keydown.enter)="activeNode.set(node)"
                (keydown.space)="activeNode.set(node)"
                tabindex="0"
                role="button"
                [attr.aria-pressed]="activeNode()?.id === node.id"
              >
                <div>
                  <!-- Node Badge & Step Number -->
                  <div class="flex items-center justify-between mb-3">
                    <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-mono text-xs font-bold">
                      0{{ idx + 1 }}
                    </span>
                    <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                      {{ node.layer }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h3 class="text-base font-bold text-slate-900 tracking-tight mb-2">
                    {{ node.title }}
                  </h3>

                  <!-- Description -->
                  <p class="text-xs text-slate-600 leading-relaxed mb-4">
                    {{ node.description }}
                  </p>
                </div>

                <!-- Technologies -->
                <div class="pt-3 border-t border-slate-200/80">
                  <div class="flex flex-wrap gap-1">
                    @for (t of node.tech; track t) {
                      <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-slate-700 border border-slate-200">
                        {{ t }}
                      </span>
                    }
                  </div>
                </div>
              </div>
            }

          </div>

          <!-- Connector Flow Diagram (SVG) -->
          <div class="hidden md:flex items-center justify-between mt-8 pt-6 border-t border-slate-100 px-8 text-xs font-mono text-slate-500">
            <span class="flex items-center gap-1.5 text-blue-600 font-semibold">
              <span>Client Requests</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </span>
            <span class="flex items-center gap-1.5 text-blue-600 font-semibold">
              <span>REST / JWT Contract</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </span>
            <span class="flex items-center gap-1.5 text-blue-600 font-semibold">
              <span>Indexed SQL / ACID</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </span>
            <span class="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span>Analytical Telemetry</span>
            </span>
          </div>

          <!-- Active Node Detail Card -->
          @if (activeNode()) {
            <div class="mt-8 p-5 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs sm:text-sm text-slate-800">
              <div class="font-bold text-blue-900 mb-1 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Deep Dive: {{ activeNode()?.title }}</span>
              </div>
              <p class="leading-relaxed">
                {{ activeNode()?.description }} Integrates with verified toolchain including: 
                <span class="font-semibold text-blue-900">{{ activeNode()?.tech?.join(', ') }}</span>.
              </p>
            </div>
          }

        </div>

      </div>
    </section>
  `
})
export class ArchitectureComponent {
  readonly nodes: ArchitectureNode[] = ARCHITECTURE_FLOW;
  readonly activeNode = signal<ArchitectureNode | null>(ARCHITECTURE_FLOW[0]);
}

