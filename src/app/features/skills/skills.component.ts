import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SKILLS_DATA } from '../../data/skills.data';
import { SkillCategory } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="skills" class="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="section-badge mb-3">
            <span>02 / TECHNICAL SKILLS</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Categorized Technical Competencies
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Organized across full-stack web engineering, relational databases, AI/Robotics hardware integration, and industrial quality validation.
          </p>
        </div>

        <!-- Controls: Category Tabs & Search Filter -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          
          <!-- Category Tabs -->
          <div class="flex flex-wrap gap-1.5" role="tablist">
            @for (cat of categoryTabOptions; track cat) {
              <button
                type="button"
                role="tab"
                (click)="selectedCategoryTab.set(cat)"
                class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
                [class.bg-blue-600]="selectedCategoryTab() === cat"
                [class.text-white]="selectedCategoryTab() === cat"
                [class.shadow-xs]="selectedCategoryTab() === cat"
                [class.bg-slate-50]="selectedCategoryTab() !== cat"
                [class.text-slate-700]="selectedCategoryTab() !== cat"
                [class.border]="selectedCategoryTab() !== cat"
                [class.border-slate-200]="selectedCategoryTab() !== cat"
                [class.hover:bg-slate-100]="selectedCategoryTab() !== cat"
                [attr.aria-selected]="selectedCategoryTab() === cat"
              >
                {{ cat }}
              </button>
            }
          </div>

          <!-- Live Keyword Filter Input -->
          <div class="relative w-full lg:w-72">
            <input
              type="text"
              [ngModel]="searchQuery()"
              (ngModelChange)="searchQuery.set($event)"
              placeholder="Search skill (e.g. Django, Angular, OpenCV)..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-all"
              aria-label="Filter skills by keyword"
            />
            <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

        </div>

        <!-- Skills Grid: 6 Distinctive Domain Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (category of filteredCategories(); track category.title) {
            <div class="clean-card p-6 flex flex-col justify-between hover:border-blue-300">
              <div>
                <!-- Category Header -->
                <div class="flex items-center justify-between mb-3">
                  <h3 class="font-bold text-slate-900 text-base leading-tight">{{ category.title }}</h3>
                  <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                    {{ category.skills.length }} Skills
                  </span>
                </div>

                <p class="text-xs text-slate-500 mb-5 leading-relaxed">
                  {{ category.description }}
                </p>

                <!-- Skill Badges -->
                <div class="flex flex-wrap gap-2">
                  @for (skill of category.skills; track skill) {
                    <span
                      class="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-800 border border-slate-200/90 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                    >
                      {{ skill }}
                    </span>
                  }
                </div>
              </div>
            </div>
          }
        </div>

        @if (filteredCategories().length === 0) {
          <div class="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No technical skills found matching "{{ searchQuery() }}".
          </div>
        }

      </div>
    </section>
  `
})
export class SkillsComponent {
  readonly allCategories: SkillCategory[] = SKILLS_DATA;
  readonly searchQuery = signal<string>('');
  readonly selectedCategoryTab = signal<string>('All');

  readonly categoryTabOptions = [
    'All',
    'Frontend',
    'Backend',
    'Databases',
    'Cloud',
    'AI & Robotics',
    'Quality & MES'
  ];

  readonly filteredCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const tab = this.selectedCategoryTab();

    return this.allCategories
      .filter((cat) => {
        if (tab === 'All') return true;
        if (tab === 'Frontend') return cat.title.includes('Frontend');
        if (tab === 'Backend') return cat.title.includes('Backend');
        if (tab === 'Databases') return cat.title.includes('Databases');
        if (tab === 'Cloud') return cat.title.includes('Cloud');
        if (tab === 'AI & Robotics') return cat.title.includes('AI');
        if (tab === 'Quality & MES') return cat.title.includes('Quality');
        return true;
      })
      .map((cat) => {
        if (!query) return cat;
        return {
          ...cat,
          skills: cat.skills.filter((s) => s.toLowerCase().includes(query))
        };
      })
      .filter((cat) => !query || cat.skills.length > 0 || cat.title.toLowerCase().includes(query));
  });
}
