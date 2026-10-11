import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shogun-visualizer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl overflow-hidden relative">
      <!-- Japanese Torii inspired ambient accent -->
      <div class="absolute -top-12 -right-12 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Header -->
      <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800 mb-6">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Interactive Systems & Game Development
            </span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Shogun Run — Gameplay Optimization & Windows Validation
          </h3>
        </div>
        <span class="text-[11px] font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 self-start sm:self-auto">
          Monolith Research Labs
        </span>
      </div>

      <!-- 3-Column Game Engineering HUD -->
      <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        
        <!-- Column 1: Core Mechanics & Environment -->
        <div class="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80 flex flex-col justify-between">
          <div>
            <div class="text-xs font-mono font-bold text-amber-400 uppercase mb-2">Gameplay Mechanics</div>
            <div class="text-sm font-bold text-white mb-2">Endless Runner Architecture</div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Japanese-inspired visual theme featuring dynamic procedural obstacle generation, progressive pacing, and continuous collision handling.
            </p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap gap-1">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-amber-300">AVGC-XR</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300">Procedural Loop</span>
          </div>
        </div>

        <!-- Column 2: Performance Profiling -->
        <div class="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80 flex flex-col justify-between">
          <div>
            <div class="text-xs font-mono font-bold text-emerald-400 uppercase mb-2">Optimization Profiling</div>
            <div class="text-sm font-bold text-white mb-2">Performance & Framerate</div>
            <div class="space-y-2 mt-2">
              <div class="flex justify-between text-xs">
                <span class="text-slate-400">Target Framerate:</span>
                <span class="font-mono font-bold text-emerald-400">60 FPS Stable</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-400">Garbage Collection:</span>
                <span class="font-mono text-slate-200">Zero Mid-Run Stutter</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-400">Asset Streaming:</span>
                <span class="font-mono text-slate-200">Asynchronous Preload</span>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-700/60 text-[10px] font-mono text-emerald-400">
            ✓ Frametime Spikes Eliminated
          </div>
        </div>

        <!-- Column 3: Platform Validation -->
        <div class="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80 flex flex-col justify-between">
          <div>
            <div class="text-xs font-mono font-bold text-cyan-400 uppercase mb-2">Platform Validation</div>
            <div class="text-sm font-bold text-white mb-2">Windows Runtime Quality</div>
            <div class="space-y-1.5 text-xs text-slate-300 mt-2">
              <div class="flex items-center gap-1.5">
                <span class="text-emerald-400">✓</span>
                <span>Keyboard / Gamepad Input Polling</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="text-emerald-400">✓</span>
                <span>DirectX / Win32 Runtime Compatibility</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="text-emerald-400">✓</span>
                <span>Introductory AR/VR/MR Exploration</span>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-700/60 text-[10px] font-mono text-cyan-400">
            Validated for Windows Deployments
          </div>
        </div>

      </div>

      <!-- Engineering Takeaway Footer -->
      <div class="relative z-10 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          <strong class="text-slate-200">Engineering Takeaway:</strong> Practical exposure to runtime performance debugging, frame pacing, and cross-discipline collaboration.
        </div>
        <div class="flex gap-2">
          <span class="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono text-[11px]">C# / Interactive Logic</span>
          <span class="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono text-[11px]">Windows QA</span>
        </div>
      </div>
    </div>
  `
})
export class ShogunVisualizerComponent {}

