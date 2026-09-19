import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SKILLS_DATA } from '../../data/skills.data';
import { SkillItem } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="skills" class="py-20 bg-slate-50 border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-10">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-200/80 text-slate-700 text-xs font-semibold font-mono mb-3">
            <span>03</span>
            <span>/</span>
            <span>TECHNICAL SKILLS</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Categorized Technical Competencies
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            A comprehensive, verified taxonomy of programming languages, modern frameworks, database engines, AI/ML tools, and testing methodologies.
          </p>
        </div>

        <!-- Filter Controls & Search -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <!-- Category Tabs -->
          <div class="flex flex-wrap gap-1.5" role="tablist" aria-label="Skill Categories">
            @for (cat of categories; track cat) {
              <button
                type="button"
                role="tab"
                (click)="selectedCategory.set(cat)"
                class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                [class.bg-blue-600]="selectedCategory() === cat"
                [class.text-white]="selectedCategory() === cat"
                [class.shadow-xs]="selectedCategory() === cat"
                [class.bg-white]="selectedCategory() !== cat"
                [class.text-slate-700]="selectedCategory() !== cat"
                [class.border]="selectedCategory() !== cat"
                [class.border-slate-200]="selectedCategory() !== cat"
                [class.hover:bg-slate-100]="selectedCategory() !== cat"
                [attr.aria-selected]="selectedCategory() === cat"
              >
                {{ cat }}
              </button>
            }
          </div>

          <!-- Search Input -->
          <div class="relative w-full md:w-64">
            <input
              type="text"
              [ngModel]="searchQuery()"
              (ngModelChange)="searchQuery.set($event)"
              placeholder="Search technology..."
              class="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
              aria-label="Filter skills by keyword"
            />
            <svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Skills Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          @for (skill of filteredSkills(); track skill.name) {
            <div
              class="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div class="flex items-start justify-between gap-2 mb-2">
                <span class="text-sm font-bold text-slate-900 tracking-tight">{{ skill.name }}</span>
                <span
                  class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                  [class.bg-blue-50]="skill.level === 'Advanced'"
                  [class.text-blue-700]="skill.level === 'Advanced'"
                  [class.border]="true"
                  [class.border-blue-200]="skill.level === 'Advanced'"
                  [class.bg-emerald-50]="skill.level === 'Proficient'"
                  [class.text-emerald-700]="skill.level === 'Proficient'"
                  [class.border-emerald-200]="skill.level === 'Proficient'"
                  [class.bg-slate-100]="skill.level === 'Familiar'"
                  [class.text-slate-600]="skill.level === 'Familiar'"
                  [class.border-slate-200]="skill.level === 'Familiar'"
                >
                  {{ skill.level }}
                </span>
              </div>
              <span class="text-[11px] text-slate-500 font-medium">{{ skill.category }}</span>
            </div>
          }
        </div>

        @if (filteredSkills().length === 0) {
          <div class="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
            No technical skills found matching "{{ searchQuery() }}".
          </div>
        }

      </div>
    </section>
  `
})
export class SkillsComponent {
  readonly allSkills: SkillItem[] = SKILLS_DATA;

  readonly categories = [
    'All',
    'Languages',
    'Frameworks & Frontend',
    'Databases & Backend',
    'AI & Data Science',
    'Data & BI',
    'Testing & Tools',
    'Emerging Tech'
  ];

  readonly selectedCategory = signal<string>('All');
  readonly searchQuery = signal<string>('');

  readonly filteredSkills = computed(() => {
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.allSkills.filter((skill) => {
      const matchesCat = cat === 'All' || skill.category === cat;
      const matchesQuery = query === '' || skill.name.toLowerCase().includes(query) || skill.category.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });
  });
}

