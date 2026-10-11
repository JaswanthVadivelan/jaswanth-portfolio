import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyStateService } from '../../core/services/journey-state.service';


@Component({
  selector: 'app-game-station',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="station-game" class="relative py-20 lg:py-28 bg-slate-900 text-white overflow-hidden border-t border-slate-800">
      
      <!-- Subtle Grid Background -->
      <div class="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Station Sector Header -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/80 text-amber-300 text-xs font-mono font-semibold mb-3">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>STATION 04 // SIMULATION & ENGINE STUDIO</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Shogun Run — 3D Game Engine Diagnostics
            </h2>
            <p class="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              Game and AR/VR Developer internship at <strong class="text-amber-300 font-semibold">Monolith Research and Training Labs</strong> (Aug 2024 – Nov 2024). Focused on gameplay mechanics, performance profiling, draw-call optimization, and Windows platform validation.
            </p>
          </div>

          <div class="flex items-center gap-3 self-start lg:self-auto font-mono text-xs text-slate-400 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            <span class="text-slate-500">TARGET:</span>
            <span class="text-amber-400 font-bold">WIN64 / D3D11</span>
            <span class="text-slate-600">•</span>
            <span class="text-emerald-400 font-semibold">V-SYNC: LOCKED</span>
          </div>
        </div>

        <!-- Main Station Environment Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Interactive Diagnostics Terminal (8 cols) -->
          <div class="lg:col-span-8 bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
            
            <!-- Terminal Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800 mb-6">
              <div class="flex items-center gap-2.5">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Runtime Profiler & Telemetry HUD
                </span>
              </div>

              <!-- FPS Mode Switcher -->
              <div class="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
                <button
                  type="button"
                  (click)="setMode('60fps')"
                  class="px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
                  [class.bg-emerald-600]="fpsMode() === '60fps'"
                  [class.text-white]="fpsMode() === '60fps'"
                  [class.text-slate-400]="fpsMode() !== '60fps'"
                >
                  60 FPS (OPTIMIZED)
                </button>
                <button
                  type="button"
                  (click)="setMode('30fps')"
                  class="px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
                  [class.bg-amber-600]="fpsMode() === '30fps'"
                  [class.text-white]="fpsMode() === '30fps'"
                  [class.text-slate-400]="fpsMode() !== '30fps'"
                >
                  30 FPS (UNOPTIMIZED)
                </button>
              </div>
            </div>

            <!-- Live Performance Gauges (4 metrics) -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              
              <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div class="text-[10px] font-mono text-slate-500 uppercase mb-1">Frame Time</div>
                <div class="text-2xl font-mono font-bold" [class.text-emerald-400]="fpsMode() === '60fps'" [class.text-amber-400]="fpsMode() === '30fps'">
                  {{ fpsMode() === '60fps' ? '16.6 ms' : '33.3 ms' }}
                </div>
                <div class="text-[10px] text-slate-400 mt-1 font-mono">Target budget</div>
              </div>

              <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div class="text-[10px] font-mono text-slate-500 uppercase mb-1">Draw Calls / Frame</div>
                <div class="text-2xl font-mono font-bold" [class.text-emerald-400]="fpsMode() === '60fps'" [class.text-amber-400]="fpsMode() === '30fps'">
                  {{ fpsMode() === '60fps' ? '42 calls' : '188 calls' }}
                </div>
                <div class="text-[10px] text-slate-400 mt-1 font-mono">Dynamic batching</div>
              </div>

              <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div class="text-[10px] font-mono text-slate-500 uppercase mb-1">RAM Working Set</div>
                <div class="text-2xl font-mono font-bold text-cyan-400">
                  {{ fpsMode() === '60fps' ? '280 MB' : '490 MB' }}
                </div>
                <div class="text-[10px] text-slate-400 mt-1 font-mono">Asset streaming</div>
              </div>

              <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div class="text-[10px] font-mono text-slate-500 uppercase mb-1">Physics Tick</div>
                <div class="text-2xl font-mono font-bold text-violet-400">
                  50.0 Hz
                </div>
                <div class="text-[10px] text-slate-400 mt-1 font-mono">Fixed update</div>
              </div>

            </div>

            <!-- Simulated Endless Runner Obstacle Canvas -->
            <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 mb-6">
              <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                <span class="text-amber-300 font-bold">GAMEPLAY SIMULATION: JUMP / SLIDE MECHANIC</span>
                <span>STATE: RUNNING</span>
              </div>

              <!-- Track visualization -->
              <div class="relative h-24 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-end px-4 pb-3">
                <!-- Ground Rail -->
                <div class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-amber-600 via-emerald-500 to-cyan-500"></div>

                <!-- Animated Runner Icon -->
                <div
                  class="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-lg transition-transform duration-300 select-none"
                  [style.transform]="activeAction() === 'jump' ? 'translateY(-30px)' : activeAction() === 'slide' ? 'scaleY(0.5) translateY(10px)' : 'none'"
                >
                  🥷
                </div>

                <!-- Animated Obstacle approaching -->
                <div class="ml-auto flex items-center gap-3">
                  <div class="w-6 h-8 rounded bg-red-500/80 border border-red-400 flex items-center justify-center text-[10px] font-bold text-white">
                    ▲
                  </div>
                  <div class="text-[11px] font-mono text-slate-500">OBSTACLE #408</div>
                </div>
              </div>

              <!-- Quick action triggers -->
              <div class="flex items-center gap-2 mt-3">
                <button
                  type="button"
                  (click)="triggerAction('jump')"
                  class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-colors cursor-pointer"
                >
                  Trigger Jump [Space]
                </button>
                <button
                  type="button"
                  (click)="triggerAction('slide')"
                  class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-colors cursor-pointer"
                >
                  Trigger Slide [Down]
                </button>
                <button
                  type="button"
                  (click)="triggerAction('run')"
                  class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Reset Run
                </button>
              </div>
            </div>

            <!-- Windows Platform Validation Matrix -->
            <div>
              <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                Windows Platform Compatibility Matrix
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span class="text-slate-300">DirectX 11 / D3D11 Backend:</span>
                  <span class="text-emerald-400 font-bold">PASSED</span>
                </div>
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span class="text-slate-300">XInput Controller Handling:</span>
                  <span class="text-emerald-400 font-bold">PASSED</span>
                </div>
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span class="text-slate-300">Resolution Scaling (1080p / 1440p):</span>
                  <span class="text-emerald-400 font-bold">PASSED</span>
                </div>
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span class="text-slate-300">Garbage Collection Spikes:</span>
                  <span class="text-emerald-400 font-bold">&lt; 1.5ms</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Studio Achievements & Context (4 cols) -->
          <div class="lg:col-span-4 space-y-6">
            
            <div class="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl">
              <div class="flex items-center gap-2 mb-4">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
                  Internship Core Highlights
                </h3>
              </div>
              <ul class="space-y-3 text-xs text-slate-300">
                <li class="flex items-start gap-2.5">
                  <span class="text-amber-400 font-bold text-sm leading-none">•</span>
                  <span>Engineered responsive runner gameplay mechanics (jump, slide, obstacle collision response).</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="text-amber-400 font-bold text-sm leading-none">•</span>
                  <span>Reduced draw calls by 75% using mesh batching and texture atlas bundling.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="text-amber-400 font-bold text-sm leading-none">•</span>
                  <span>Conducted extensive Windows platform stress testing and crash dump analysis.</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="text-amber-400 font-bold text-sm leading-none">•</span>
                  <span>Collaborated with AVGC-XR team on immersive asset integration workflows.</span>
                </li>
              </ul>
            </div>

            <div class="bg-slate-950/80 rounded-3xl p-6 border border-slate-800">
              <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                Technologies & Pipelines
              </h4>
              <div class="flex flex-wrap gap-1.5">
                <span class="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800">Game Engine</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800">C# Gameplay Logic</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800">Performance Profiling</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800">Windows Validation</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800">Draw Call Batching</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800">AVGC-XR</span>
              </div>
            </div>

          </div>

        </div>

        <!-- Station Navigation Strip -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
          <button
            type="button"
            (click)="journeyState.prevStation()"
            class="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            ⬅ Prev Station (03. Robotics Lab)
          </button>
          <span class="text-slate-500 text-[11px]">* Shogun Run 3D gameplay engine diagnostics & Windows profiling.</span>
          <button
            type="button"
            (click)="journeyState.nextStation()"
            class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors cursor-pointer"
          >
            Next Station (05. Knowledge Vault) ➔
          </button>
        </div>

      </div>
    </section>
  `
})
export class GameStationComponent {
  readonly journeyState = inject(JourneyStateService);
  readonly fpsMode = signal<'60fps' | '30fps'>('60fps');
  readonly activeAction = signal<'run' | 'jump' | 'slide'>('run');

  setMode(mode: '60fps' | '30fps'): void {
    this.fpsMode.set(mode);
  }

  triggerAction(action: 'run' | 'jump' | 'slide'): void {
    this.activeAction.set(action);
    if (action !== 'run') {
      setTimeout(() => {
        this.activeAction.set('run');
      }, 700);
    }
  }
}


