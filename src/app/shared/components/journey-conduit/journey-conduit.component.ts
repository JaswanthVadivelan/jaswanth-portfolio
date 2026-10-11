import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSpyService } from '../../../core/services/scroll-spy.service';

@Component({
  selector: 'app-journey-conduit',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative py-10 sm:py-16 overflow-hidden flex flex-col items-center justify-center bg-slate-900 text-white select-none">
      
      <!-- Subtle Grid Background -->
      <div class="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>

      <!-- Animated SVG Transit Conduits -->
      <div class="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">
        
        <!-- Waypoint Coordinates Header -->
        <div class="flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 shadow-md mb-6 font-mono text-[11px] text-slate-300">
          <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span class="text-cyan-400 font-semibold tracking-wider uppercase">TRANSIT CONDUIT</span>
          <span class="text-slate-500">|</span>
          <span class="text-slate-400 tracking-tight">{{ fromSector }}</span>
          <span class="text-cyan-400 font-bold">➔</span>
          <span class="text-white font-bold tracking-tight">{{ toSector }}</span>
        </div>

        <!-- Vertical Flowing Laser / Fiber Optic Track -->
        <div class="relative h-20 sm:h-28 w-1 bg-slate-800 rounded-full overflow-hidden flex items-center justify-center">
          <!-- Flowing Energy Pulse -->
          <div class="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-cyan-400 to-blue-500 rounded-full animate-bounce [animation-duration:1.5s]"></div>
        </div>

        <!-- Next Station Waypoint Warp Button -->
        <button
          type="button"
          (click)="warpToTarget()"
          class="mt-6 inline-flex items-center gap-2.5 px-5 py-2 rounded-xl bg-slate-800/90 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-200 hover:text-white text-xs font-mono font-semibold transition-all duration-300 shadow-lg cursor-pointer group hover:scale-105 active:scale-95"
        >
          <span class="text-cyan-400 group-hover:text-white">WARP TO {{ toStationNumber }}</span>
          <span class="font-sans font-bold text-white group-hover:translate-y-0.5 transition-transform">↓</span>
          <span class="text-[11px] text-slate-400 group-hover:text-blue-100 font-sans">({{ toStationName }})</span>
        </button>

      </div>
    </div>
  `
})
export class JourneyConduitComponent {
  private readonly scrollSpy = inject(ScrollSpyService);

  @Input() fromSector = 'ORIGIN';
  @Input() toSector = 'DESTINATION';
  @Input() toStationId = '';
  @Input() toStationNumber = '02';
  @Input() toStationName = 'Next Station';

  warpToTarget(): void {
    if (this.toStationId) {
      this.scrollSpy.scrollToSection(this.toStationId);
    } else {
      this.scrollSpy.nextStation();
    }
  }
}

