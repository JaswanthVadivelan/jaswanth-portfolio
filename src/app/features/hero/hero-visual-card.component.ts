import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SystemLayer {
  id: string;
  name: string;
  badge: string;
  icon: string;
  tech: string[];
  status: 'Online' | 'Active' | 'Optimized';
  metrics: string;
  description: string;
}

@Component({
  selector: 'app-hero-visual-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/70 shadow-2xl p-5 sm:p-6 text-white select-none">
      
      <!-- Top Window Header / Status Bar -->
      <div class="flex items-center justify-between pb-4 border-b border-slate-800">
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          </div>
          <span class="ml-2 text-xs font-mono font-medium text-slate-400">system-architecture.deck</span>
        </div>
        
        <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SYSTEM READY</span>
        </div>
      </div>

      <!-- Core Interactive Visual Canvas -->
      <div class="pt-5 space-y-4">
        
        <!-- System Flow Pipeline Tabs -->
        <div class="grid grid-cols-3 gap-2">
          @for (layer of layers; track layer.id) {
            <button
              type="button"
              (click)="activeLayer.set(layer)"
              class="text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer"
              [class.bg-blue-950/50]="activeLayer().id === layer.id"
              [class.border-blue-500/60]="activeLayer().id === layer.id"
              [class.shadow-md]="activeLayer().id === layer.id"
              [class.bg-slate-800/40]="activeLayer().id !== layer.id"
              [class.border-slate-800]="activeLayer().id !== layer.id"
              [class.hover:border-slate-700]="activeLayer().id !== layer.id"
            >
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">{{ layer.badge }}</span>
                <span class="w-1.5 h-1.5 rounded-full" [class.bg-emerald-400]="activeLayer().id === layer.id" [class.bg-slate-600]="activeLayer().id !== layer.id"></span>
              </div>
              <div class="text-xs font-bold text-slate-100 truncate">{{ layer.name }}</div>
            </button>
          }
        </div>

        <!-- Dynamic Layer Inspector Display -->
        <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 font-mono">
          
          <div class="flex items-center justify-between mb-3 text-xs">
            <span class="text-blue-400 font-semibold flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{{ activeLayer().name }}</span>
            </span>
            <span class="text-slate-400 text-[11px]">{{ activeLayer().metrics }}</span>
          </div>

          <p class="text-xs text-slate-300 font-sans leading-relaxed mb-3.5">
            {{ activeLayer().description }}
          </p>

          <!-- Stack Badges -->
          <div class="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
            @for (t of activeLayer().tech; track t) {
              <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-blue-300 border border-slate-700/60">
                {{ t }}
              </span>
            }
          </div>
        </div>

        <!-- System Signal Bus SVG Flow -->
        <div class="pt-2 px-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div class="flex items-center gap-1.5 text-blue-400">
            <span class="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
            <span>Angular Client</span>
          </div>
          <svg class="w-16 h-4 text-blue-500/60" viewBox="0 0 64 16" fill="none">
            <path d="M0 8h56m-6-4l6 4-6 4" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
          </svg>
          <div class="flex items-center gap-1.5 text-indigo-400">
            <span>Django REST</span>
          </div>
          <svg class="w-16 h-4 text-emerald-500/60" viewBox="0 0 64 16" fill="none">
            <path d="M0 8h56m-6-4l6 4-6 4" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
          </svg>
          <div class="flex items-center gap-1.5 text-emerald-400">
            <span>PostgreSQL</span>
          </div>
        </div>

      </div>

    </div>
  `
})
export class HeroVisualCardComponent {
  readonly layers: SystemLayer[] = [
    {
      id: 'frontend',
      name: 'Client Layer',
      badge: 'Tier 01',
      icon: 'layout',
      tech: ['Angular 22', 'TypeScript', 'Tailwind CSS', 'Signals'],
      status: 'Active',
      metrics: 'Modular UI • Reactive State',
      description: 'Clean standalone component architecture with signal-driven state management and accessible design systems.'
    },
    {
      id: 'backend',
      name: 'API Services',
      badge: 'Tier 02',
      icon: 'server',
      tech: ['Python', 'Django REST', 'JWT Auth', 'OpenPyXL'],
      status: 'Online',
      metrics: 'Stateless REST • High Throughput',
      description: 'Robust API endpoints with token authentication, payload validation, and automated report generation.'
    },
    {
      id: 'database',
      name: 'Persistence',
      badge: 'Tier 03',
      icon: 'database',
      tech: ['PostgreSQL', 'Indexed Schemas', 'ACID', 'SQL'],
      status: 'Optimized',
      metrics: 'Relational Store • Sub-ms Queries',
      description: 'Optimized relational schema design with indexing, foreign key constraints, and fast analytical query performance.'
    }
  ];

  readonly activeLayer = signal<SystemLayer>(this.layers[0]);
}
