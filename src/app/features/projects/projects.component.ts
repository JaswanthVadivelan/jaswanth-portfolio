import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROJECTS_DATA } from '../../data/projects.data';
import { ProjectItem, MesWorkflowStage } from '../../core/models/portfolio.models';

interface GesturePreset {
  name: string;
  icon: string;
  angle: number;
  topic: string;
  payload: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mb-12">
          <div class="section-badge mb-3">
            <span>03 / FEATURED PROJECTS</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Applied Engineering & Technical Solutions
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Real-world software systems spanning industrial manufacturing execution, AI-driven computer vision robotics, and interactive game performance engineering.
          </p>
        </div>

        <!-- Project Tabs -->
        <div class="flex flex-wrap gap-2.5 mb-10" role="tablist">
          @for (proj of projects; track proj.id) {
            <button
              type="button"
              role="tab"
              (click)="selectedProjectId.set(proj.id)"
              class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer flex items-center gap-2"
              [class.bg-blue-600]="selectedProjectId() === proj.id"
              [class.text-white]="selectedProjectId() === proj.id"
              [class.shadow-sm]="selectedProjectId() === proj.id"
              [class.bg-slate-50]="selectedProjectId() !== proj.id"
              [class.text-slate-700]="selectedProjectId() !== proj.id"
              [class.border]="selectedProjectId() !== proj.id"
              [class.border-slate-200]="selectedProjectId() !== proj.id"
              [class.hover:bg-slate-100]="selectedProjectId() !== proj.id"
              [attr.aria-selected]="selectedProjectId() === proj.id"
            >
              <span>{{ proj.title }}</span>
            </button>
          }
        </div>

        <!-- Active Project Details -->
        @if (activeProject(); as project) {
          <div class="space-y-8">
            
            <!-- Core Project Overview Card -->
            <div class="clean-card p-6 sm:p-8">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
                <div>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2 inline-block">
                    {{ project.category }}
                  </span>
                  <h3 class="text-2xl font-bold text-slate-900 tracking-tight">
                    {{ project.title }}
                  </h3>
                </div>
                @if (project.period) {
                  <span class="text-xs font-mono font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md self-start sm:self-auto">
                    {{ project.period }}
                  </span>
                }
              </div>

              <p class="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                {{ project.description }}
              </p>

              <!-- Technical Highlights -->
              <div class="mb-6">
                <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Key Technical Highlights:</h4>
                <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                  @for (hl of project.highlights; track hl) {
                    <li class="leading-relaxed">{{ hl }}</li>
                  }
                </ul>
              </div>

              <!-- Tech Stack Badges -->
              <div class="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                @for (tech of project.technologies; track tech) {
                  <span class="px-2.5 py-1 rounded text-xs font-mono font-medium bg-slate-50 border border-slate-200 text-slate-700">
                    {{ tech }}
                  </span>
                }
              </div>
            </div>

            <!-- ==================== MES PROJECT ARCHITECTURE ==================== -->
            @if (project.id === 'mes-industrial-software' && project.conceptualWorkflow) {
              <div class="clean-card p-6 sm:p-8">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <span class="text-xs font-mono uppercase tracking-wider font-semibold text-blue-600 block mb-1">
                      System Architecture
                    </span>
                    <h4 class="text-xl font-bold text-slate-900">
                      5-Stage Industrial Workflow Flow
                    </h4>
                  </div>
                  <span class="text-xs text-slate-500 font-mono">* Conceptual workflow demonstration</span>
                </div>

                <!-- 5 Workflow Step Pills -->
                <div class="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-6">
                  @for (stage of project.conceptualWorkflow; track stage.step; let idx = $index) {
                    <button
                      type="button"
                      (click)="selectedMesStep.set(idx)"
                      class="text-left p-3 rounded-xl border transition-colors cursor-pointer"
                      [class.bg-blue-50]="selectedMesStep() === idx"
                      [class.border-blue-500]="selectedMesStep() === idx"
                      [class.text-blue-900]="selectedMesStep() === idx"
                      [class.bg-slate-50]="selectedMesStep() !== idx"
                      [class.border-slate-200]="selectedMesStep() !== idx"
                      [class.text-slate-700]="selectedMesStep() !== idx"
                    >
                      <div class="text-[10px] font-mono font-bold text-slate-400 mb-0.5">0{{ stage.step }}</div>
                      <div class="text-xs font-bold leading-tight">{{ stage.name }}</div>
                    </button>
                  }
                </div>

                <!-- Selected Stage Deep-Dive Card -->
                @if (project.conceptualWorkflow[selectedMesStep()]; as activeStep) {
                  <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div class="flex items-center justify-between">
                      <h5 class="text-base font-bold text-slate-900">
                        {{ activeStep.name }} — <span class="text-blue-600 font-semibold">{{ activeStep.subtitle }}</span>
                      </h5>
                      <span class="text-xs font-mono font-semibold text-slate-500">Stage 0{{ activeStep.step }} of 5</span>
                    </div>

                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {{ activeStep.description }}
                    </p>

                    <!-- Key Aspects -->
                    <div>
                      <div class="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">Key Operational Aspects:</div>
                      <div class="flex flex-wrap gap-2">
                        @for (aspect of activeStep.keyAspects; track aspect) {
                          <span class="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-mono text-slate-700">
                            ✓ {{ aspect }}
                          </span>
                        }
                      </div>
                    </div>

                    <!-- Tech Stack Connection -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs font-mono">
                      <div class="p-2.5 rounded-lg bg-white border border-slate-200">
                        <div class="text-[10px] text-slate-500 uppercase">Frontend</div>
                        <div class="text-slate-900 font-bold mt-0.5">Angular 22 Reactive Controls</div>
                      </div>
                      <div class="p-2.5 rounded-lg bg-white border border-slate-200">
                        <div class="text-[10px] text-slate-500 uppercase">Backend</div>
                        <div class="text-blue-600 font-bold mt-0.5">Django REST Business ViewSets</div>
                      </div>
                      <div class="p-2.5 rounded-lg bg-white border border-slate-200">
                        <div class="text-[10px] text-slate-500 uppercase">Database</div>
                        <div class="text-emerald-600 font-bold mt-0.5">PostgreSQL ACID Transaction Log</div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }

            <!-- ==================== AI ROBOTICS PROJECT ==================== -->
            @if (project.id === 'ai-robotic-arm') {
              <div class="clean-card p-6 sm:p-8">
                <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <span class="text-xs font-mono uppercase tracking-wider font-semibold text-blue-600 block mb-1">
                      System Architecture
                    </span>
                    <h4 class="text-xl font-bold text-slate-900">
                      Touchless Human-Machine Interface Pipeline
                    </h4>
                  </div>
                  <span class="text-xs text-slate-500 font-mono">SMTP Groups Internship</span>
                </div>

                <!-- 4 Pipeline Stages Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div class="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">01 / Input</div>
                    <div class="text-sm font-bold text-slate-900">Video Capture</div>
                    <div class="text-xs text-slate-500 mt-1">OpenCV 640x480 @ 30 FPS</div>
                  </div>
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div class="text-[10px] font-mono font-bold text-blue-600 uppercase mb-1">02 / AI Model</div>
                    <div class="text-sm font-bold text-slate-900">Hand Landmarks</div>
                    <div class="text-xs text-slate-500 mt-1">TensorFlow on Raspberry Pi</div>
                  </div>
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div class="text-[10px] font-mono font-bold text-indigo-600 uppercase mb-1">03 / Messaging</div>
                    <div class="text-sm font-bold text-slate-900">MQTT Protocol</div>
                    <div class="text-xs text-slate-500 mt-1">Low-latency pub/sub broker</div>
                  </div>
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div class="text-[10px] font-mono font-bold text-emerald-600 uppercase mb-1">04 / Actuator</div>
                    <div class="text-sm font-bold text-slate-900">Arduino Servo</div>
                    <div class="text-xs text-slate-500 mt-1">3D-printed multi-axis arm</div>
                  </div>
                </div>

                <!-- Interactive Gesture Presets -->
                <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 font-mono">
                    Verified Gesture Actions & Servos:
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    @for (gesture of gestures; track gesture.name) {
                      <div class="p-3 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
                        <div class="text-2xl mb-1">{{ gesture.icon }}</div>
                        <div class="text-xs font-bold text-slate-900">{{ gesture.name }}</div>
                        <div class="text-[10px] font-mono text-slate-500 mt-1">Servo: {{ gesture.angle }}°</div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }

            <!-- ==================== SHOGUN RUN PROJECT ==================== -->
            @if (project.id === 'shogun-run') {
              <div class="clean-card p-6 sm:p-8">
                <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <span class="text-xs font-mono uppercase tracking-wider font-semibold text-blue-600 block mb-1">
                      Game Engineering
                    </span>
                    <h4 class="text-xl font-bold text-slate-900">
                      Performance Profiling & Platform Validation
                    </h4>
                  </div>
                  <span class="text-xs text-slate-500 font-mono">Monolith Labs</span>
                </div>

                <!-- Metrics Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div class="text-2xl font-bold font-mono text-emerald-600">60 FPS</div>
                    <div class="text-xs font-semibold text-slate-800 mt-1">Target Frame Rate</div>
                    <div class="text-[10px] text-slate-500">16.6ms frame budget</div>
                  </div>
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div class="text-2xl font-bold font-mono text-blue-600">-75%</div>
                    <div class="text-xs font-semibold text-slate-800 mt-1">Draw Call Reduction</div>
                    <div class="text-[10px] text-slate-500">Dynamic mesh batching</div>
                  </div>
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div class="text-2xl font-bold font-mono text-indigo-600">D3D11</div>
                    <div class="text-xs font-semibold text-slate-800 mt-1">DirectX 11 Backend</div>
                    <div class="text-[10px] text-slate-500">Windows validated</div>
                  </div>
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div class="text-2xl font-bold font-mono text-slate-900">50 Hz</div>
                    <div class="text-xs font-semibold text-slate-800 mt-1">Physics Tick Rate</div>
                    <div class="text-[10px] text-slate-500">Fixed timestep collision</div>
                  </div>
                </div>

                <!-- Windows Validation Checklist -->
                <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 font-mono">Windows Platform Quality Gates:</div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-700">
                    <div class="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <span>DirectX 11 Shader Compatibility:</span>
                      <span class="text-emerald-600 font-bold">PASSED</span>
                    </div>
                    <div class="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <span>XInput Controller Handling:</span>
                      <span class="text-emerald-600 font-bold">PASSED</span>
                    </div>
                    <div class="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <span>Resolution Scaling (1080p / 1440p):</span>
                      <span class="text-emerald-600 font-bold">PASSED</span>
                    </div>
                    <div class="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <span>Garbage Collection Spikes:</span>
                      <span class="text-emerald-600 font-bold">&lt; 1.5ms</span>
                    </div>
                  </div>
                </div>
              </div>
            }

          </div>
        }

      </div>
    </section>
  `
})
export class ProjectsComponent {
  readonly projects: ProjectItem[] = PROJECTS_DATA;
  readonly selectedProjectId = signal<string>(this.projects[0].id);
  readonly selectedMesStep = signal<number>(0);

  readonly gestures: GesturePreset[] = [
    { name: 'Open Palm', icon: '✋', angle: 90, topic: 'robot/arm/state', payload: '{"cmd":"REST","angle":90}' },
    { name: 'Fist', icon: '✊', angle: 30, topic: 'robot/arm/state', payload: '{"cmd":"GRASP","angle":30}' },
    { name: 'Pinch', icon: '🤏', angle: 45, topic: 'robot/arm/state', payload: '{"cmd":"PINCH","angle":45}' },
    { name: 'Point', icon: '👉', angle: 120, topic: 'robot/arm/state', payload: '{"cmd":"EXTEND","angle":120}' }
  ];

  activeProject(): ProjectItem | undefined {
    return this.projects.find((p) => p.id === this.selectedProjectId());
  }
}
