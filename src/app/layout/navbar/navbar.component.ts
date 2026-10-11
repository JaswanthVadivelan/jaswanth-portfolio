import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { NAV_LINKS } from '../../data/navigation.data';
import { PROFILE_DATA } from '../../data/profile.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs sm:mt-2 sm:rounded-2xl sm:mx-4 lg:mx-auto sm:border"
        aria-label="Main Navigation"
      >
        <div class="flex items-center justify-between gap-4">
          
          <!-- Logo / Identity -->
          <a
            href="#about"
            (click)="onNavClick($event, 'about')"
            class="flex items-center gap-2.5 font-bold text-lg tracking-tight text-slate-900 group"
          >
            <span class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono text-sm font-bold shadow-xs shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              JV
            </span>
            <span class="flex flex-col">
              <span class="leading-none text-slate-900 font-bold text-sm sm:text-base">{{ profile.name }}</span>
              <span class="text-[11px] text-slate-500 font-normal leading-tight">{{ profile.role }}</span>
            </span>
          </a>

          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center gap-1">
            @for (item of navLinks; track item.id) {
              <a
                [href]="item.href"
                (click)="onNavClick($event, item.id)"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150"
                [class.bg-blue-50]="scrollSpy.activeSection() === item.id"
                [class.text-blue-600]="scrollSpy.activeSection() === item.id"
                [class.text-slate-600]="scrollSpy.activeSection() !== item.id"
                [class.hover:text-slate-900]="scrollSpy.activeSection() !== item.id"
                [class.hover:bg-slate-100]="scrollSpy.activeSection() !== item.id"
              >
                {{ item.label }}
              </a>
            }
          </div>

          <!-- Right Action: Resume / Contact CTA & Mobile Toggle -->
          <div class="flex items-center gap-2">
            <a
              href="#contact"
              (click)="onNavClick($event, 'contact')"
              class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-xs transition-colors"
            >
              <span>Get in Touch</span>
              <span>→</span>
            </a>

            <!-- Mobile Hamburger Button -->
            <button
              type="button"
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              [attr.aria-expanded]="mobileMenuOpen()"
              aria-label="Toggle navigation"
            >
              @if (!mobileMenuOpen()) {
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              } @else {
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
            </button>
          </div>

        </div>

        <!-- Mobile Drawer -->
        @if (mobileMenuOpen()) {
          <div class="md:hidden pt-3 mt-3 border-t border-slate-100 space-y-1">
            @for (item of navLinks; track item.id) {
              <a
                [href]="item.href"
                (click)="onNavClick($event, item.id)"
                class="block px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                [class.bg-blue-50]="scrollSpy.activeSection() === item.id"
                [class.text-blue-600]="scrollSpy.activeSection() === item.id"
                [class.text-slate-700]="scrollSpy.activeSection() !== item.id"
              >
                {{ item.label }}
              </a>
            }
          </div>
        }
      </nav>
    </header>
  `
})
export class NavbarComponent {
  readonly scrollSpy = inject(ScrollSpyService);
  readonly profile = PROFILE_DATA;
  readonly navLinks = NAV_LINKS;

  readonly mobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  onNavClick(event: Event, id: string): void {
    event.preventDefault();
    this.mobileMenuOpen.set(false);
    this.scrollSpy.scrollToSection(id);
  }
}
