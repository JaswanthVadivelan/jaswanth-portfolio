import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA } from '../../data/profile.data';
import { NAV_LINKS } from '../../data/navigation.data';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <!-- Identity Column -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-2.5 mb-4">
              <span class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono text-base font-bold shadow-md shadow-blue-500/20">
                JV
              </span>
              <span class="text-white font-bold text-lg tracking-tight">{{ profile.name }}</span>
            </div>
            <p class="text-sm text-slate-400 max-w-md leading-relaxed mb-4">
              {{ profile.role }}
            </p>
            <p class="text-xs text-slate-500">
              {{ profile.educationHighlights }} • {{ profile.location }}
            </p>
          </div>

          <!-- Quick Navigation -->
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Navigation
            </h4>
            <ul class="space-y-2 text-xs">
              @for (item of navLinks.slice(0, 7); track item.id) {
                <li>
                  <a
                    [href]="'#' + item.fragment"
                    (click)="onNavClick($event, item.fragment)"
                    class="hover:text-blue-400 transition-colors"
                  >
                    {{ item.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Deep Dives -->
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Engineering
            </h4>
            <ul class="space-y-2 text-xs">
              @for (item of navLinks.slice(7); track item.id) {
                <li>
                  <a
                    [href]="'#' + item.fragment"
                    (click)="onNavClick($event, item.fragment)"
                    class="hover:text-blue-400 transition-colors"
                  >
                    {{ item.label }}
                  </a>
                </li>
              }
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {{ currentYear }} {{ profile.name }}. All rights reserved.</p>
          <div class="flex items-center gap-4">
            <span class="inline-flex items-center gap-1.5 text-slate-400">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Available for Software & Data Roles</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly profile = PROFILE_DATA;
  readonly navLinks = NAV_LINKS;
  readonly currentYear = new Date().getFullYear();
  private readonly scrollSpy = inject(ScrollSpyService);

  onNavClick(event: Event, fragment: string): void {
    event.preventDefault();
    this.scrollSpy.scrollToSection(fragment);
  }
}

