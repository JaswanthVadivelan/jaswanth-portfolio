import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyStateService } from '../../core/services/journey-state.service';
import { JourneyStation } from '../../core/models/portfolio.models';
import { PROFILE_DATA } from '../../data/profile.data';

interface MapNodePosition {
  id: string;
  x: number; // percentage [0, 100]
  y: number; // percentage [0, 100]
}

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative min-h-[calc(100vh-4.5rem)] pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white flex flex-col justify-between select-none overflow-hidden">
      
      <!-- Cyber Hologram Grid & Radial Glow Background -->
      <div class="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_40%,#1e3a8a25,transparent_70%)] pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto w-full flex-grow flex flex-col justify-between">
        
        <!-- Header HUD -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-6">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
            <div>
              <div class="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                OVERWORLD LEVEL SELECT // MISSION RADAR
              </div>
              <h1 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Engineering Journey Map
              </h1>
            </div>
          </div>

          <!-- Live Traveler Coordinates & Return Trigger -->
          <div class="flex items-center gap-3 font-mono text-xs text-slate-400">
            <span class="hidden md:inline bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              TRAVELER LOC: <strong class="text-cyan-300">{{ selectedStation().coordinates }}</strong>
            </span>
            <button
              type="button"
              (click)="journeyState.closeMap()"
              class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold transition-all border border-slate-700 cursor-pointer flex items-center gap-2 shadow-md"
            >
              <span>Return to Station [Esc]</span>
              <span class="text-cyan-400 font-bold">✕</span>
            </button>
          </div>
        </div>

        <!-- Main Map Area: Constellation Graph (8 cols) + Selected Station Dossier (4 cols) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow py-4">
          
          <!-- Left Column: Interactive Cyber Route Constellation (8 cols) -->
          <div class="lg:col-span-8 relative bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl min-h-[420px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
            
            <!-- SVG Connecting Circuit Energy Conduits -->
            <svg viewBox="0 0 800 460" class="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
              <defs>
                <linearGradient id="routeBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#2563eb" />
                  <stop offset="25%" stop-color="#38bdf8" />
                  <stop offset="50%" stop-color="#818cf8" />
                  <stop offset="75%" stop-color="#f59e0b" />
                  <stop offset="100%" stop-color="#10b981" />
                </linearGradient>
              </defs>

              <!-- Main Journey Pathway Circuit -->
              <path
                d="M 120 230 C 220 100, 260 100, 360 160 C 460 220, 480 340, 580 340 C 660 340, 680 180, 720 120"
                fill="none"
                stroke="#1e293b"
                stroke-width="8"
                stroke-linecap="round"
              />

              <path
                d="M 120 230 C 220 100, 260 100, 360 160 C 460 220, 480 340, 580 340 C 660 340, 680 180, 720 120"
                fill="none"
                stroke="url(#routeBeamGradient)"
                stroke-width="3"
                stroke-linecap="round"
                stroke-dasharray="6 8"
                class="animate-[dash_20s_linear_infinite]"
              />

              <!-- Traveler Node Indicator Positioned on Active Station -->
              <circle
                [attr.cx]="activeCoords().cx"
                [attr.cy]="activeCoords().cy"
                r="18"
                fill="none"
                stroke="#38bdf8"
                stroke-width="2"
                class="animate-ping origin-center"
              />
              <circle
                [attr.cx]="activeCoords().cx"
                [attr.cy]="activeCoords().cy"
                r="6"
                fill="#38bdf8"
              />
            </svg>

            <!-- 6 Interactive Station Nodes positioned on the canvas -->
            <div class="relative z-10 w-full h-full min-h-[380px]">
              
              <!-- Node 01: Origin -->
              <div class="absolute left-[10%] top-[45%] -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  (click)="selectStation(0)"
                  class="node-button group"
                  [class.active-node]="selectedIdx() === 0"
                >
                  <span class="node-number">01</span>
                  <div class="node-tooltip">
                    <span class="font-bold">01. Origin</span>
                    <span class="text-[10px] text-slate-400">Command Deck</span>
                  </div>
                </button>
              </div>

              <!-- Node 02: ProdXP MES -->
              <div class="absolute left-[30%] top-[20%] -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  (click)="selectStation(1)"
                  class="node-button group"
                  [class.active-node]="selectedIdx() === 1"
                >
                  <span class="node-number">02</span>
                  <div class="node-tooltip">
                    <span class="font-bold">02. Industrial MES</span>
                    <span class="text-[10px] text-slate-400">ProdXP Command</span>
                  </div>
                </button>
              </div>

              <!-- Node 03: SMTP Robotics -->
              <div class="absolute left-[45%] top-[35%] -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  (click)="selectStation(2)"
                  class="node-button group"
                  [class.active-node]="selectedIdx() === 2"
                >
                  <span class="node-number">03</span>
                  <div class="node-tooltip">
                    <span class="font-bold">03. Robotics Lab</span>
                    <span class="text-[10px] text-slate-400">SMTP AI Vision</span>
                  </div>
                </button>
              </div>

              <!-- Node 04: Monolith Game Studio -->
              <div class="absolute left-[60%] top-[65%] -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  (click)="selectStation(3)"
                  class="node-button group"
                  [class.active-node]="selectedIdx() === 3"
                >
                  <span class="node-number">04</span>
                  <div class="node-tooltip">
                    <span class="font-bold">04. Game Studio</span>
                    <span class="text-[10px] text-slate-400">Shogun Engine</span>
                  </div>
                </button>
              </div>

              <!-- Node 05: Tech Vault -->
              <div class="absolute left-[75%] top-[72%] -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  (click)="selectStation(4)"
                  class="node-button group"
                  [class.active-node]="selectedIdx() === 4"
                >
                  <span class="node-number">05</span>
                  <div class="node-tooltip">
                    <span class="font-bold">05. Knowledge Vault</span>
                    <span class="text-[10px] text-slate-400">Skills & Academics</span>
                  </div>
                </button>
              </div>

              <!-- Node 06: Transmission Base -->
              <div class="absolute left-[90%] top-[25%] -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  (click)="selectStation(5)"
                  class="node-button group"
                  [class.active-node]="selectedIdx() === 5"
                >
                  <span class="node-number">06</span>
                  <div class="node-tooltip">
                    <span class="font-bold">06. Comms Base</span>
                    <span class="text-[10px] text-slate-400">Resume Dispatch</span>
                  </div>
                </button>
              </div>

            </div>

          </div>

          <!-- Right Column: Station Dossier & Launch Action (4 cols) -->
          <div class="lg:col-span-4 bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl flex flex-col justify-between h-full min-h-[420px]">
            <div>
              <!-- Dossier Top Tag -->
              <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 font-mono text-[10px] text-slate-400">
                <span class="text-cyan-400 font-bold uppercase">STATION DOSSIER // {{ selectedStation().number }}</span>
                <span>{{ selectedStation().sector }}</span>
              </div>

              <!-- Title & Subtitle -->
              <h2 class="text-2xl font-extrabold text-white tracking-tight mb-1">
                {{ selectedStation().name }}
              </h2>
              <p class="text-xs font-semibold text-blue-400 mb-4">
                {{ selectedStation().subtitle }}
              </p>

              <!-- Dynamic Station Details Breakdown -->
              <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-6 space-y-2.5 text-xs text-slate-300">
                <div class="flex justify-between font-mono text-[11px]">
                  <span class="text-slate-500">COORDINATES:</span>
                  <span class="text-cyan-300">{{ selectedStation().coordinates }}</span>
                </div>
                <div class="flex justify-between font-mono text-[11px]">
                  <span class="text-slate-500">STATUS:</span>
                  <span class="text-emerald-400 font-bold">OPERATIONAL</span>
                </div>
                <div class="text-xs text-slate-400 pt-2 border-t border-slate-800 leading-relaxed">
                  {{ getStationSummary(selectedStation().id) }}
                </div>
              </div>
            </div>

            <!-- Launch Button Trigger -->
            <button
              type="button"
              (click)="launchStation(selectedIdx())"
              class="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>ENTER STATION {{ selectedStation().number }}</span>
              <span class="text-lg">➔</span>
            </button>
          </div>

        </div>

        <!-- Footer Control Strip -->
        <div class="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
          <span>Shortcuts: Press [1-6] to select node • [M] or [Esc] to exit map</span>
          <div class="flex items-center gap-3">
            <span>{{ profile.name }} ({{ profile.role }})</span>
            <span>•</span>
            <span class="text-cyan-400">CHEVRON ENGINE v2.0</span>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .node-button {
      position: relative;
      width: 3rem;
      height: 3rem;
      border-radius: 9999px;
      background-color: #0f172a;
      border: 2px solid #334155;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    }
    .node-button:hover {
      transform: scale(1.15);
      border-color: #38bdf8;
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.4);
    }
    .active-node {
      background-color: #2563eb;
      border-color: #60a5fa;
      transform: scale(1.2);
      box-shadow: 0 0 20px rgba(37, 99, 235, 0.6);
    }
    .node-number {
      font-family: monospace;
      font-size: 0.875rem;
      font-weight: 800;
      color: #ffffff;
    }
    .node-tooltip {
      position: absolute;
      top: -2.75rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(4px);
      border: 1px solid #334155;
      padding: 0.25rem 0.6rem;
      border-radius: 0.5rem;
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      align-items: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
      z-index: 30;
      font-size: 0.7rem;
    }
    .node-button:hover .node-tooltip {
      opacity: 1;
      transform: translateX(-50%) translateY(-4px);
    }
  `]
})
export class WorldMapComponent {
  readonly journeyState = inject(JourneyStateService);
  readonly profile = PROFILE_DATA;

  readonly selectedIdx = signal<number>(this.journeyState.activeStationIndex());

  readonly selectedStation = computed<JourneyStation>(() => {
    return this.journeyState.stations[this.selectedIdx()] || this.journeyState.stations[0];
  });

  // Dynamic SVG anchor positions for each station node
  readonly activeCoords = computed<{ cx: number; cy: number }>(() => {
    const coordsMap = [
      { cx: 120, cy: 230 }, // Node 1
      { cx: 280, cy: 115 }, // Node 2
      { cx: 360, cy: 160 }, // Node 3
      { cx: 480, cy: 300 }, // Node 4
      { cx: 580, cy: 340 }, // Node 5
      { cx: 720, cy: 120 }  // Node 6
    ];
    return coordsMap[this.selectedIdx()] || coordsMap[0];
  });

  selectStation(idx: number): void {
    this.selectedIdx.set(idx);
  }

  launchStation(idx: number): void {
    this.journeyState.goToStation(idx, 'warp');
  }

  getStationSummary(id: string): string {
    switch (id) {
      case 'station-origin':
        return 'Identity overview, live Chennai telemetry, holographic portrait chassis, and 8.5 CGPA distinction metrics.';
      case 'station-mes':
        return 'ProdXP.ai Manufacturing Execution System exploded workflow (Planning ➔ Execution ➔ In-line QA ➔ Analytics).';
      case 'station-robotics':
        return 'SMTP Groups gesture recognition lab with 3-axis inverse kinematics, OpenCV feed, and MQTT event broker.';
      case 'station-game':
        return 'Monolith Shogun Run 3D endless runner diagnostics, 60 FPS frame time budgeting, and Windows validation.';
      case 'station-vault':
        return '6-domain searchable skills arsenal, career odyssey timeline, B.Tech distinction, and 5 verified honors.';
      case 'station-comms':
        return 'Direct LinkedIn and GitHub connection relays with safe resume dossier dispatcher.';
      default:
        return 'Interactive engineering station.';
    }
  }
}
