import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyStateService } from '../../core/services/journey-state.service';
import { PROFILE_DATA } from '../../data/profile.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      
      <!-- Top Station Line Strip -->
      <div class="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600"></div>

      <!-- Main Game HUD -->
      <nav
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 bg-slate-950/95 backdrop-blur-md rounded-b-2xl sm:mt-1 sm:rounded-2xl sm:mx-4 lg:mx-auto border border-slate-800 shadow-xl text-white select-none"
        aria-label="Game HUD Navigation"
      >
        <div class="flex items-center justify-between gap-4">
          
          <!-- Logo & Status -->
          <div class="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              (click)="journeyState.goToStation(0, 'warp')"
              class="flex items-center gap-2 font-bold text-left group cursor-pointer"
            >
              <span class="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono text-sm font-bold shadow-md shadow-blue-500/20 group-hover:bg-blue-500 transition-colors">
                JV
              </span>
              <span class="flex flex-col">
                <span class="leading-none text-white font-bold text-sm">{{ profile.name }}</span>
                <span class="text-[10px] font-mono text-cyan-400 font-semibold leading-tight">SYS: ONLINE</span>
              </span>
            </button>
          </div>

          <!-- Center: 6-Station Quick Rail (Desktop) -->
          <div class="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            @for (st of journeyState.stations; track st.id; let idx = $index) {
              <button
                type="button"
                (click)="journeyState.goToStation(idx, 'warp')"
                class="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5"
                [class.bg-blue-600]="journeyState.currentView() === 'station' && journeyState.activeStationIndex() === idx"
                [class.text-white]="journeyState.currentView() === 'station' && journeyState.activeStationIndex() === idx"
                [class.shadow-md]="journeyState.currentView() === 'station' && journeyState.activeStationIndex() === idx"
                [class.text-slate-400]="!(journeyState.currentView() === 'station' && journeyState.activeStationIndex() === idx)"
                [class.hover:text-white]="!(journeyState.currentView() === 'station' && journeyState.activeStationIndex() === idx)"
                [class.hover:bg-slate-800]="!(journeyState.currentView() === 'station' && journeyState.activeStationIndex() === idx)"
              >
                <span>{{ st.number }}</span>
                <span class="hidden lg:inline text-[11px] font-sans font-medium">{{ st.name.split(' ')[0] }}</span>
              </button>
            }
          </div>

          <!-- Right Action: World Map Toggle & Stepper -->
          <div class="flex items-center gap-2 shrink-0">
            
            <!-- Quick Station Stepper [◀] [▶] -->
            <div class="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800">
              <button
                type="button"
                (click)="journeyState.prevStation()"
                [disabled]="journeyState.isFirstStation()"
                class="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Previous Station [A / ←]"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <span class="text-[10px] font-mono px-1 font-bold text-cyan-300">
                {{ journeyState.activeStation().number }}/06
              </span>

              <button
                type="button"
                (click)="journeyState.nextStation()"
                [disabled]="journeyState.isLastStation()"
                class="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Next Station [D / →]"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- World Map View Toggle Button -->
            <button
              type="button"
              (click)="journeyState.toggleView()"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
              [class.bg-cyan-500]="journeyState.currentView() === 'map'"
              [class.text-slate-950]="journeyState.currentView() === 'map'"
              [class.bg-blue-600]="journeyState.currentView() !== 'map'"
              [class.hover:bg-blue-500]="journeyState.currentView() !== 'map'"
              [class.text-white]="journeyState.currentView() !== 'map'"
            >
              @if (journeyState.currentView() === 'map') {
                <span>EXIT MAP [Esc]</span>
              } @else {
                <span class="w-2 h-2 rounded-full bg-cyan-300 animate-pulse"></span>
                <span>WORLD MAP [M]</span>
              }
            </button>

          </div>

        </div>

        <!-- Active Station Context Sub-bar -->
        <div class="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div class="flex items-center gap-2 truncate">
            <span class="text-cyan-400 font-bold">CURRENT:</span>
            <span class="text-white font-semibold truncate">{{ journeyState.activeStation().number }} // {{ journeyState.activeStation().name }}</span>
          </div>
          <span class="hidden sm:inline text-[10px] text-slate-500">{{ journeyState.activeStation().coordinates }}</span>
        </div>

      </nav>

    </header>
  `
})
export class NavbarComponent {
  readonly journeyState = inject(JourneyStateService);
  readonly profile = PROFILE_DATA;
}
