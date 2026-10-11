import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyStateService } from '../../core/services/journey-state.service';

@Component({
  selector: 'app-route-transit',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (journeyState.isTransitioning()) {
      <div class="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
        
        <!-- Cyber Warp Speed Streaks -->
        <div class="absolute inset-0 overflow-hidden opacity-50">
          <div class="warp-line top-[20%] left-0 w-full animate-warp"></div>
          <div class="warp-line top-[40%] left-0 w-full animate-warp [animation-delay:100ms]"></div>
          <div class="warp-line top-[60%] left-0 w-full animate-warp [animation-delay:200ms]"></div>
          <div class="warp-line top-[80%] left-0 w-full animate-warp [animation-delay:50ms]"></div>
        </div>

        <!-- Central Telemetry Ticker -->
        <div class="relative z-10 p-6 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl text-center font-mono">
          <div class="flex items-center justify-center gap-2 mb-2">
            <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span class="text-xs font-bold uppercase tracking-widest text-cyan-400">
              WARP GLIDE ENGAGED
            </span>
          </div>

          <div class="text-lg font-extrabold text-white tracking-tight">
            TRANSIT TO {{ journeyState.activeStation().number }} // {{ journeyState.activeStation().name }}
          </div>

          <div class="text-xs text-slate-400 mt-1">
            COORDINATES: <span class="text-blue-400">{{ journeyState.activeStation().coordinates }}</span>
          </div>
        </div>

      </div>
    }
  `,
  styles: [`
    .warp-line {
      position: absolute;
      height: 2px;
      background: linear-gradient(90deg, transparent, #38bdf8, #2563eb, transparent);
      transform: translateX(-100%);
    }
    @keyframes warpAnimation {
      0% { transform: translateX(-100%) scaleX(0.5); opacity: 0; }
      50% { opacity: 1; transform: translateX(0%) scaleX(1.5); }
      100% { transform: translateX(100%) scaleX(0.5); opacity: 0; }
    }
    .animate-warp {
      animation: warpAnimation 0.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
    }
  `]
})
export class RouteTransitComponent {
  readonly journeyState = inject(JourneyStateService);
}
