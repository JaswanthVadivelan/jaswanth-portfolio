import { Component, signal, inject, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesWorkflowStage } from '../../core/models/portfolio.models';
import { PROJECTS_DATA } from '../../data/projects.data';
import { JourneyStateService } from '../../core/services/journey-state.service';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="station-mes" class="relative py-20 lg:py-24 bg-slate-900 text-white min-h-[calc(100vh-4.5rem)] flex flex-col justify-center overflow-hidden">
      
      <!-- Architectural Background Dot Grid -->
      <div class="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <!-- Station Header -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-mono font-semibold mb-3">
              <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>STATION 02 // PRODXP MES INDUSTRIAL COMMAND HUB</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Manufacturing Execution System (MES) Exploded Flow
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Full-stack industrial software architecture demonstrating how shop-floor operational requirements connect planning to real-time machine execution, quality inspection, and executive analytics.
            </p>
          </div>

          <!-- Active Stage Badge & Coordinates -->
          <div class="flex items-center gap-3 self-start lg:self-auto font-mono text-xs text-slate-400 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            <span class="text-slate-500">STAGE:</span>
            <span class="text-cyan-400 font-bold">0{{ activeStageIndex() + 1 }} / 05</span>
            <span class="text-slate-600">•</span>
            <span class="text-emerald-400 font-semibold">ACID: ACTIVE</span>
          </div>
        </div>

        <!-- Main Interactive Stage Panel -->
        <div class="bg-slate-950 rounded-3xl p-6 lg:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <!-- SVG Continuous Pipeline Track (Desktop) -->
          <div class="hidden lg:block relative mb-6 px-6 select-none">
            <svg viewBox="0 0 1000 60" class="w-full h-14 overflow-visible">
              <!-- Background Rail -->
              <path
                d="M 100 30 L 300 30 L 500 30 L 700 30 L 900 30"
                fill="none"
                stroke="#1e293b"
                stroke-width="8"
                stroke-linecap="round"
              />

              <!-- Active Colored Connecting Stroke -->
              <path
                d="M 100 30 L 300 30 L 500 30 L 700 30 L 900 30"
                fill="none"
                stroke="url(#mesScrubGradient)"
                stroke-width="3.5"
                stroke-linecap="round"
              />

              <!-- Gradients -->
              <defs>
                <linearGradient id="mesScrubGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#2563eb" />
                  <stop offset="50%" stop-color="#38bdf8" />
                  <stop offset="100%" stop-color="#10b981" />
                </linearGradient>
              </defs>

              <!-- Data Packet Node -->
              <circle
                #scrubbedPacket
                [attr.cx]="100 + activeStageIndex() * 200"
                cy="30"
                r="8"
                fill="#38bdf8"
                stroke="#ffffff"
                stroke-width="2.5"
                class="shadow-lg transition-all duration-300"
              />
            </svg>

            <!-- Node Number Badges -->
            <div class="absolute inset-0 flex items-center justify-between px-16 pointer-events-none">
              @for (stg of stages; track stg.step; let idx = $index) {
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300"
                  [class.bg-blue-600]="activeStageIndex() === idx"
                  [class.text-white]="activeStageIndex() === idx"
                  [class.ring-4]="activeStageIndex() === idx"
                  [class.ring-blue-500/30]="activeStageIndex() === idx"
                  [class.scale-110]="activeStageIndex() === idx"
                  [class.bg-slate-900]="activeStageIndex() !== idx"
                  [class.text-slate-400]="activeStageIndex() !== idx"
                  [class.border]="activeStageIndex() !== idx"
                  [class.border-slate-700]="activeStageIndex() !== idx"
                >
                  0{{ stg.step }}
                </div>
              }
            </div>
          </div>

          <!-- 5 Interactive Stage Selector Tabs -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6 relative z-10">
            @for (stage of stages; track stage.step; let idx = $index) {
              <button
                type="button"
                (click)="jumpToStage(idx)"
                class="text-left rounded-2xl p-4 border transition-all duration-200 cursor-pointer flex flex-col justify-between"
                [class.border-blue-500]="activeStageIndex() === idx"
                [class.bg-blue-950/80]="activeStageIndex() === idx"
                [class.shadow-lg]="activeStageIndex() === idx"
                [class.border-slate-800]="activeStageIndex() !== idx"
                [class.bg-slate-900/60]="activeStageIndex() !== idx"
                [class.hover:border-slate-700]="activeStageIndex() !== idx"
                [attr.aria-pressed]="activeStageIndex() === idx"
              >
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-[10px] font-mono font-bold text-slate-400 uppercase">LAYER 0{{ stage.step }}</span>
                    @if (activeStageIndex() === idx) {
                      <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    }
                  </div>
                  <h3 class="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
                    {{ stage.name }}
                  </h3>
                </div>
              </button>
            }
          </div>

          <!-- Active Layer Technical Telemetry & Exploded Breakdown -->
          @if (currentStage(); as activeStage) {
            <div class="p-5 sm:p-7 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl relative z-10 animate-in fade-in duration-200">
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800 mb-4">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                      Layer 0{{ activeStage.step }} • Real-Time Architecture Inspector
                    </span>
                  </div>
                  <h4 class="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {{ activeStage.name }} — {{ activeStage.subtitle }}
                  </h4>
                </div>
                <span class="text-[10px] font-mono text-emerald-400 bg-slate-950 border border-slate-700 px-3 py-1 rounded-full self-start sm:self-auto">
                  ● SIMULATED MES PIPELINE
                </span>
              </div>

              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {{ activeStage.description }}
              </p>

              <!-- Core Workflows Checklist -->
              <div class="mb-5">
                <span class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
                  Key Shop-Floor Logic & Operations:
                </span>
                <div class="flex flex-wrap gap-2">
                  @for (aspect of activeStage.keyAspects; track aspect) {
                    <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-950 border border-slate-800 text-slate-200">
                      ✓ {{ aspect }}
                    </span>
                  }
                </div>
              </div>

              <!-- Technical Stack Integration -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs font-mono">
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-slate-500 uppercase">Frontend Layer</div>
                  <div class="text-white font-bold mt-0.5">Angular 22 Reactive Form Controls</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-slate-500 uppercase">Backend Layer</div>
                  <div class="text-blue-300 font-bold mt-0.5">Django REST Business ViewSets</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div class="text-[10px] text-slate-500 uppercase">Persistence Layer</div>
                  <div class="text-emerald-400 font-bold mt-0.5">PostgreSQL ACID Transaction Log</div>
                </div>
              </div>

            </div>
          }

          <!-- Station Navigation Strip -->
          <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
            <button
              type="button"
              (click)="journeyState.prevStation()"
              class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              ⬅ Prev Station (01. Origin)
            </button>
            <span class="text-slate-500 text-[11px]">* Illustrative architectural visualization of industrial MES workflows.</span>
            <button
              type="button"
              (click)="journeyState.nextStation()"
              class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors cursor-pointer"
            >
              Next Station (03. Robotics Lab) ➔
            </button>
          </div>

        </div>

      </div>
    </section>
  `
})
export class ArchitectureComponent {
  readonly journeyState = inject(JourneyStateService);
  readonly stages: MesWorkflowStage[] = PROJECTS_DATA[0].conceptualWorkflow || [];

  readonly activeStageIndex = signal<number>(0);

  currentStage(): MesWorkflowStage {
    return this.stages[this.activeStageIndex()] || this.stages[0];
  }

  jumpToStage(index: number): void {
    this.activeStageIndex.set(index);
  }
}
