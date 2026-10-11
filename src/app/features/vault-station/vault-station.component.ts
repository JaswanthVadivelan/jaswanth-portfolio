import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SKILLS_DATA } from '../../data/skills.data';
import { EXPERIENCE_DATA } from '../../data/experience.data';
import { EDUCATION_DATA } from '../../data/education.data';
import { ACHIEVEMENTS_DATA } from '../../data/achievements.data';
import { JourneyStateService } from '../../core/services/journey-state.service';

type VaultTab = 'skills' | 'odyssey' | 'academics' | 'honors';

@Component({
  selector: 'app-vault-station',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="station-vault" class="relative py-20 lg:py-24 bg-slate-950 text-white min-h-[calc(100vh-4.5rem)] flex flex-col justify-center overflow-hidden">
      
      <!-- Subtle Tech Background Grid -->
      <div class="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <!-- Station Sector Header -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-mono font-semibold mb-3">
              <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>STATION 05 // KNOWLEDGE ARSENAL & ACADEMIC VAULT</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineering Arsenal, Career Odyssey & Academic Distinction
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Consolidated interactive repository of verified technical competencies, professional software engineering milestones, academic degree honors, and distinction accolades.
            </p>
          </div>

          <!-- Quick Vault Navigation Tabs -->
          <div class="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 self-start lg:self-auto">
            <button
              type="button"
              (click)="activeTab.set('skills')"
              class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              [class.bg-blue-600]="activeTab() === 'skills'"
              [class.text-white]="activeTab() === 'skills'"
              [class.shadow-md]="activeTab() === 'skills'"
              [class.text-slate-400]="activeTab() !== 'skills'"
            >
              <span>⚡ Skills</span>
            </button>
            <button
              type="button"
              (click)="activeTab.set('odyssey')"
              class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              [class.bg-blue-600]="activeTab() === 'odyssey'"
              [class.text-white]="activeTab() === 'odyssey'"
              [class.shadow-md]="activeTab() === 'odyssey'"
              [class.text-slate-400]="activeTab() !== 'odyssey'"
            >
              <span>🚀 Odyssey</span>
            </button>
            <button
              type="button"
              (click)="activeTab.set('academics')"
              class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              [class.bg-blue-600]="activeTab() === 'academics'"
              [class.text-white]="activeTab() === 'academics'"
              [class.shadow-md]="activeTab() === 'academics'"
              [class.text-slate-400]="activeTab() !== 'academics'"
            >
              <span>🎓 Academics</span>
            </button>
            <button
              type="button"
              (click)="activeTab.set('honors')"
              class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              [class.bg-blue-600]="activeTab() === 'honors'"
              [class.text-white]="activeTab() === 'honors'"
              [class.shadow-md]="activeTab() === 'honors'"
              [class.text-slate-400]="activeTab() !== 'honors'"
            >
              <span>🏆 Honors</span>
            </button>
          </div>
        </div>

        <!-- ==================== TAB 1: SKILLS ARSENAL ==================== -->
        @if (activeTab() === 'skills') {
          <div class="space-y-6 animate-in fade-in duration-200">
            
            <!-- Category Filter & Search Bar -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div class="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                <button
                  type="button"
                  (click)="selectedSkillCategory.set('all')"
                  class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  [class.bg-blue-600]="selectedSkillCategory() === 'all'"
                  [class.text-white]="selectedSkillCategory() === 'all'"
                  [class.bg-slate-800]="selectedSkillCategory() !== 'all'"
                  [class.text-slate-300]="selectedSkillCategory() !== 'all'"
                >
                  All Domains ({{ totalSkillsCount() }})
                </button>
                @for (cat of skillCategories; track cat.title) {
                  <button
                    type="button"
                    (click)="selectedSkillCategory.set(cat.title)"
                    class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    [class.bg-blue-600]="selectedSkillCategory() === cat.title"
                    [class.text-white]="selectedSkillCategory() === cat.title"
                    [class.bg-slate-800]="selectedSkillCategory() !== cat.title"
                    [class.text-slate-300]="selectedSkillCategory() !== cat.title"
                  >
                    {{ cat.title }}
                  </button>
                }
              </div>

              <!-- Search input -->
              <div class="w-full sm:w-64 relative">
                <input
                  type="text"
                  [ngModel]="searchQuery()"
                  (ngModelChange)="searchQuery.set($event)"
                  placeholder="Filter skills (e.g., Angular, Django)..."
                  class="w-full px-3.5 py-1.5 text-xs rounded-xl bg-slate-950 text-white border border-slate-700 focus:border-blue-500 focus:outline-none placeholder:text-slate-500 font-mono"
                />
              </div>
            </div>

            <!-- Skills Grid Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (cat of filteredSkillCategories(); track cat.title) {
                <div class="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div>
                    <div class="flex items-center gap-3 mb-3">
                      <span class="text-2xl">{{ cat.icon }}</span>
                      <div>
                        <h3 class="font-bold text-white text-base leading-tight">{{ cat.title }}</h3>
                        <p class="text-[11px] text-slate-400">{{ cat.description }}</p>
                      </div>
                    </div>
                    <div class="flex flex-wrap gap-1.5 mt-4">
                      @for (skill of cat.skills; track skill) {
                        <span class="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950 text-cyan-300 border border-slate-800">
                          {{ skill }}
                        </span>
                      }
                    </div>
                  </div>
                  <div class="text-[10px] font-mono text-slate-500 mt-5 pt-3 border-t border-slate-800">
                    {{ cat.skills.length }} verified technologies
                  </div>
                </div>
              }
            </div>

          </div>
        }

        <!-- ==================== TAB 2: CAREER ODYSSEY ==================== -->
        @if (activeTab() === 'odyssey') {
          <div class="space-y-6 animate-in fade-in duration-200">
            <div class="relative pl-6 sm:pl-8 border-l-2 border-blue-600/40 space-y-6 ml-2">
              @for (item of experienceList; track item.id) {
                <div class="relative group">
                  <!-- Glowing Node Bullet -->
                  <div class="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-4 border-blue-500 shadow-md"></div>

                  <div class="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-950 text-blue-300 border border-blue-800">
                            {{ item.employmentType }}
                          </span>
                          <span class="text-xs font-mono text-slate-400">{{ item.period }}</span>
                        </div>
                        <h3 class="text-lg sm:text-xl font-bold text-white mt-1">
                          {{ item.role }} <span class="text-cyan-400 font-semibold">@ {{ item.company }}</span>
                        </h3>
                      </div>
                      <span class="text-xs text-slate-400 font-mono">{{ item.location }}</span>
                    </div>

                    <p class="text-sm text-slate-300 leading-relaxed mb-4">
                      {{ item.description }}
                    </p>

                    <!-- Responsibilities -->
                    <ul class="space-y-1.5 text-xs text-slate-400 mb-4">
                      @for (resp of item.responsibilities; track resp) {
                        <li class="flex items-start gap-2">
                          <span class="text-blue-400 font-bold mt-0.5">•</span>
                          <span>{{ resp }}</span>
                        </li>
                      }
                    </ul>

                    <!-- Tech Stack Pills -->
                    <div class="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                      @for (tech of item.technologies; track tech) {
                        <span class="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 text-[11px] font-mono border border-slate-800">
                          {{ tech }}
                        </span>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- ==================== TAB 3: ACADEMIC MILESTONES ==================== -->
        @if (activeTab() === 'academics') {
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-200">
            @for (edu of educationList; track edu.institution) {
              <div class="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-4">
                    <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 border border-emerald-800 text-emerald-300">
                      {{ edu.scoreType }}: {{ edu.score }} (DISTINCTION)
                    </span>
                    <span class="text-xs font-mono text-slate-400">{{ edu.period }}</span>
                  </div>

                  <h3 class="text-xl font-extrabold text-white tracking-tight mb-1">
                    {{ edu.degree }}
                  </h3>
                  @if (edu.field) {
                    <div class="text-sm font-semibold text-cyan-400 mb-3">{{ edu.field }}</div>
                  }
                  <div class="text-xs font-mono text-slate-400 mb-4">{{ edu.institution }}</div>

                  @if (edu.description) {
                    <p class="text-xs text-slate-300 leading-relaxed mb-4">
                      {{ edu.description }}
                    </p>
                  }

                  @if (edu.achievements && edu.achievements.length > 0) {
                    <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div class="text-[11px] font-mono font-bold text-slate-300 uppercase">Key Academic Distinctions</div>
                      <ul class="space-y-1.5 text-xs text-slate-400">
                        @for (ach of edu.achievements; track ach) {
                          <li class="flex items-start gap-2">
                            <span class="text-emerald-400 font-bold">✓</span>
                            <span>{{ ach }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                  }
                </div>

                <div class="text-[10px] font-mono text-slate-500 mt-6 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span>Anna University Affiliation</span>
                  <span class="text-emerald-400 font-bold">First Class with Distinction</span>
                </div>
              </div>
            }
          </div>
        }

        <!-- ==================== TAB 4: HONORS & AWARDS ==================== -->
        @if (activeTab() === 'honors') {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            @for (item of achievementsList; track item.id) {
              <div class="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-amber-500/50 transition-all">
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-3xl">{{ item.icon }}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-950 text-amber-300 border border-amber-800">
                      Verified Honor
                    </span>
                  </div>
                  <h3 class="font-bold text-white text-base leading-snug mb-1">
                    {{ item.title }}
                  </h3>
                  <div class="text-xs font-semibold text-cyan-400 mb-3">{{ item.context }}</div>
                  <p class="text-xs text-slate-400 leading-relaxed">
                    {{ item.description }}
                  </p>
                </div>

                <div class="text-[10px] font-mono text-slate-500 mt-5 pt-3 border-t border-slate-800">
                  Credential Validated
                </div>
              </div>
            }
          </div>
        }

        <!-- Station Navigation Strip -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
          <button
            type="button"
            (click)="journeyState.prevStation()"
            class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            ⬅ Prev Station (04. Game Studio)
          </button>
          <span class="text-slate-500 text-[11px]">* Skills matrix, career timeline & academic degree repository.</span>
          <button
            type="button"
            (click)="journeyState.nextStation()"
            class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors cursor-pointer"
          >
            Next Station (06. Comms Base) ➔
          </button>
        </div>

      </div>
    </section>
  `
})
export class VaultStationComponent {
  readonly journeyState = inject(JourneyStateService);

  readonly activeTab = signal<VaultTab>('skills');
  readonly selectedSkillCategory = signal<string>('all');
  readonly searchQuery = signal<string>('');

  readonly skillCategories = SKILLS_DATA;
  readonly experienceList = EXPERIENCE_DATA;
  readonly educationList = EDUCATION_DATA;
  readonly achievementsList = ACHIEVEMENTS_DATA;

  readonly totalSkillsCount = computed(() => {
    return this.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  });

  readonly filteredSkillCategories = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const category = this.selectedSkillCategory();

    return this.skillCategories
      .filter((cat) => {
        if (category !== 'all' && cat.title !== category) return false;
        return true;
      })
      .map((cat) => {
        if (!query) return cat;
        const matchingSkills = cat.skills.filter((s) => s.toLowerCase().includes(query));
        if (cat.title.toLowerCase().includes(query)) return cat;
        return { ...cat, skills: matchingSkills };
      })
      .filter((cat) => cat.skills.length > 0);
  });
}
