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
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" [class.shadow-sm]="isScrolled()">
      <nav
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between glass-panel rounded-b-2xl sm:mt-2 sm:rounded-2xl sm:mx-4 lg:mx-auto border border-slate-200/80"
        aria-label="Main Navigation"
      >
        <!-- Logo / Name -->
        <a
          href="#home"
          (click)="onNavClick($event, 'home')"
          class="flex items-center gap-2.5 font-bold text-lg tracking-tight text-slate-900 group"
        >
          <span class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono text-base font-bold shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
            JV
          </span>
          <span class="flex flex-col">
            <span class="leading-none text-slate-900 font-semibold">{{ profile.name }}</span>
            <span class="text-[10px] text-slate-500 font-normal leading-tight tracking-normal">Software & AI</span>
          </span>
        </a>

        <!-- Desktop Navigation Items -->
        <div class="hidden xl:flex items-center gap-1">
          @for (item of navLinks; track item.id) {
            <a
              [href]="'#' + item.fragment"
              (click)="onNavClick($event, item.fragment)"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              [class.bg-blue-50]="scrollSpy.activeSection() === item.fragment"
              [class.text-blue-600]="scrollSpy.activeSection() === item.fragment"
              [class.font-semibold]="scrollSpy.activeSection() === item.fragment"
              [class.text-slate-600]="scrollSpy.activeSection() !== item.fragment"
              [class.hover:text-slate-900]="scrollSpy.activeSection() !== item.fragment"
              [class.hover:bg-slate-100/70]="scrollSpy.activeSection() !== item.fragment"
            >
              {{ item.label }}
            </a>
          }
        </div>

        <!-- Medium Screens Navigation (Key Links) -->
        <div class="hidden md:flex xl:hidden items-center gap-1.5">
          @for (item of primaryLinks; track item.id) {
            <a
              [href]="'#' + item.fragment"
              (click)="onNavClick($event, item.fragment)"
              class="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              [class.bg-blue-50]="scrollSpy.activeSection() === item.fragment"
              [class.text-blue-600]="scrollSpy.activeSection() === item.fragment"
              [class.text-slate-600]="scrollSpy.activeSection() !== item.fragment"
            >
              {{ item.label }}
            </a>
          }
        </div>

        <!-- Action CTA + Mobile Menu Button -->
        <div class="flex items-center gap-2.5">
          <a
            href="#resume"
            (click)="onNavClick($event, 'resume')"
            class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm transition-all duration-200"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Resume</span>
          </a>

          <!-- Mobile Menu Trigger -->
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="xl:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            [attr.aria-expanded]="mobileMenuOpen()"
            aria-label="Toggle navigation menu"
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
      </nav>

      <!-- Mobile Dropdown Menu -->
      @if (mobileMenuOpen()) {
        <div
          class="xl:hidden mx-4 mt-2 p-4 rounded-2xl glass-panel border border-slate-200 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div class="grid grid-cols-2 gap-2">
            @for (item of navLinks; track item.id) {
              <a
                [href]="'#' + item.fragment"
                (click)="onNavClick($event, item.fragment)"
                class="px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                [class.bg-blue-50]="scrollSpy.activeSection() === item.fragment"
                [class.text-blue-600]="scrollSpy.activeSection() === item.fragment"
                [class.text-slate-700]="scrollSpy.activeSection() !== item.fragment"
                [class.hover:bg-slate-100]="scrollSpy.activeSection() !== item.fragment"
              >
                {{ item.label }}
              </a>
            }
          </div>

          <div class="mt-4 pt-3 border-t border-slate-200 flex gap-2">
            <a
              href="#resume"
              (click)="onNavClick($event, 'resume')"
              class="flex-1 py-2 rounded-lg text-xs font-semibold text-center bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              View Resume
            </a>
            <a
              href="#contact"
              (click)="onNavClick($event, 'contact')"
              class="flex-1 py-2 rounded-lg text-xs font-semibold text-center bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      }
    </header>
  `
})
export class NavbarComponent {
  readonly scrollSpy = inject(ScrollSpyService);
  readonly navLinks = NAV_LINKS;
  readonly profile = PROFILE_DATA;

  readonly mobileMenuOpen = signal<boolean>(false);
  readonly isScrolled = signal<boolean>(false);

  // Key links for tablets
  readonly primaryLinks = NAV_LINKS.filter((item) =>
    ['home', 'skills', 'featured', 'projects', 'analytics', 'architecture', 'contact'].includes(item.fragment)
  );

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 20);
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.mobileMenuOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  onNavClick(event: Event, fragment: string): void {
    event.preventDefault();
    this.scrollSpy.scrollToSection(fragment);
    this.mobileMenuOpen.set(false);
  }
}

