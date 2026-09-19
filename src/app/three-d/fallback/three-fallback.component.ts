import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-three-fallback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative w-full h-full min-h-[360px] flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white border border-slate-700/60 shadow-xl overflow-hidden"
      role="img"
      [attr.aria-label]="title() || 'Interactive engineering workspace schematic'"
    >
      <!-- Background subtle grid pattern -->
      <div class="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <!-- Schematic SVG Container -->
      <div class="relative z-10 w-full max-w-md flex flex-col items-center justify-center text-center">
        <svg
          class="w-48 h-48 md:w-56 md:h-56 drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Central Hub -->
          <circle cx="100" cy="100" r="32" class="fill-blue-600/30 stroke-blue-400 stroke-2" />
          <circle cx="100" cy="100" r="16" class="fill-blue-500" />

          <!-- Orbit Rings -->
          <circle cx="100" cy="100" r="65" class="stroke-slate-600 stroke-[1.5] stroke-dasharray-[4_4] opacity-50" />
          <circle cx="100" cy="100" r="85" class="stroke-slate-700 stroke-[1] stroke-dasharray-[6_6] opacity-40" />

          <!-- Node 1: Workstation / Code (Top) -->
          <g transform="translate(100, 35)">
            <circle cx="0" cy="0" r="14" class="fill-slate-800 stroke-cyan-400 stroke-2" />
            <path d="M-6 -2L-2 -6M-6 2L-2 6M6 -2L2 -6M6 2L2 6" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
          </g>

          <!-- Node 2: Database (Right) -->
          <g transform="translate(165, 100)">
            <circle cx="0" cy="0" r="14" class="fill-slate-800 stroke-emerald-400 stroke-2" />
            <path d="M-6 -4C-6 -6 6 -6 6 -4C6 -2 -6 -2 -6 -4ZM-6 0C-6 -2 6 -2 6 0C6 2 -6 2 -6 0ZM-6 4C-6 2 6 2 6 4C6 6 -6 6 -6 4Z" stroke="#34d399" stroke-width="1.5" />
          </g>

          <!-- Node 3: AI / Neural (Bottom) -->
          <g transform="translate(100, 165)">
            <circle cx="0" cy="0" r="14" class="fill-slate-800 stroke-violet-400 stroke-2" />
            <circle cx="-4" cy="-3" r="2" fill="#a78bfa" />
            <circle cx="4" cy="-3" r="2" fill="#a78bfa" />
            <circle cx="0" cy="4" r="2" fill="#a78bfa" />
            <path d="M-4 -3L4 -3L0 4Z" stroke="#a78bfa" stroke-width="1" />
          </g>

          <!-- Node 4: Cloud & Testing (Left) -->
          <g transform="translate(35, 100)">
            <circle cx="0" cy="0" r="14" class="fill-slate-800 stroke-amber-400 stroke-2" />
            <path d="M-5 1C-5 -2 -2 -4 1 -3C3 -4 6 -2 6 1C6 3 4 4 1 4C-3 4 -5 3 -5 1Z" stroke="#fbbf24" stroke-width="1.5" />
          </g>

          <!-- Connector Lines -->
          <line x1="100" y1="49" x2="100" y2="84" class="stroke-cyan-400/60 stroke-2" stroke-dasharray="3 3" />
          <line x1="151" y1="100" x2="116" y2="100" class="stroke-emerald-400/60 stroke-2" stroke-dasharray="3 3" />
          <line x1="100" y1="151" x2="100" y2="116" class="stroke-violet-400/60 stroke-2" stroke-dasharray="3 3" />
          <line x1="49" y1="100" x2="84" y2="100" class="stroke-amber-400/60 stroke-2" stroke-dasharray="3 3" />
        </svg>

        <div class="mt-4">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            {{ badge() || 'Digital Engineering Architecture' }}
          </span>
          <p class="text-sm font-medium text-slate-300 mt-2">
            {{ subtitle() || 'Software Systems • Databases • AI Pipelines • MES Platform' }}
          </p>
        </div>
      </div>
    </div>
  `
})
export class ThreeFallbackComponent {
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly badge = input<string>('');
}

