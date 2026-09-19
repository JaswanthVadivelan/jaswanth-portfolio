import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE_DATA } from '../../data/profile.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-20 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold font-mono mb-3">
            <span>02</span>
            <span>/</span>
            <span>ABOUT ME</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineering Rigor & Data-Driven Intelligence
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            A software developer with a strong foundation in Artificial Intelligence, Data Science, and enterprise application architectures.
          </p>
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <!-- Narrative (7 cols) -->
          <div class="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed">
            <p class="text-base sm:text-lg">
              I completed my <strong>B.Tech in Artificial Intelligence and Data Science</strong> from <strong>Prince Dr. K. Vasudevan College of Engineering and Technology</strong> (2021–2025) with a cumulative GPA of <strong>8.41 / 10.0</strong>.
            </p>
            <p>
              My engineering approach centers on delivering reliable, maintainable software systems. Whether building full-scale manufacturing solutions like <strong>Enterprise MES platforms</strong>, structuring optimized relational databases with PostgreSQL, or developing RAG-powered AI chatbots, I emphasize clean architecture, robust testing, and measurable performance.
            </p>
            <p>
              I bridge the gap between high-level frontend interfaces (Angular, Tailwind CSS) and robust backend logic (Django REST Framework, Python), supported by deep analytical capability across Power BI, Tableau, and automated data pipelines.
            </p>

            <!-- Quick Value Highlights -->
            <div class="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="font-bold text-slate-900 text-sm mb-1">Full-Stack Discipline</div>
                <div class="text-xs text-slate-600">
                  Clean separation of concerns with standalone Angular components and secure Django REST endpoints.
                </div>
              </div>
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="font-bold text-slate-900 text-sm mb-1">Database & Analytics</div>
                <div class="text-xs text-slate-600">
                  Optimized PostgreSQL schemas, indexed queries, and interactive Power BI / Chart.js visualizations.
                </div>
              </div>
            </div>
          </div>

          <!-- Fast Facts & Profile Card (5 cols) -->
          <div class="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <h3 class="text-base font-bold text-slate-900 pb-3 border-b border-slate-200 flex items-center justify-between">
              <span>Candidate Snapshot</span>
              <span class="text-xs font-mono font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                Verified Info
              </span>
            </h3>

            <div class="space-y-4 text-xs sm:text-sm">
              <div class="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span class="text-slate-500 font-medium">Full Name</span>
                <span class="font-semibold text-slate-900">{{ profile.name }}</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span class="text-slate-500 font-medium">Degree</span>
                <span class="font-semibold text-slate-900 text-right">B.Tech AI & Data Science</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span class="text-slate-500 font-medium">Institution</span>
                <span class="font-semibold text-slate-900 text-right max-w-[220px] truncate" title="Prince Dr. K. Vasudevan College of Engineering and Technology">
                  Prince Dr. K. Vasudevan College
                </span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span class="text-slate-500 font-medium">Graduation Timeline</span>
                <span class="font-semibold text-slate-900">2021 – 2025</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span class="text-slate-500 font-medium">Academic CGPA</span>
                <span class="font-semibold text-emerald-600 font-mono">8.41 / 10.0</span>
              </div>
              <div class="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span class="text-slate-500 font-medium">Primary Focus</span>
                <span class="font-semibold text-slate-900">Full-Stack & Data/AI</span>
              </div>
              <div class="flex justify-between items-center py-1">
                <span class="text-slate-500 font-medium">Location</span>
                <span class="font-semibold text-slate-900">{{ profile.location }}</span>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-blue-50/80 border border-blue-200 text-xs text-blue-800 leading-normal">
              <strong>Recruiter Note:</strong> Open to immediate software development, full-stack, data engineering, and AI engineering opportunities.
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class AboutComponent {
  readonly profile = PROFILE_DATA;
}

