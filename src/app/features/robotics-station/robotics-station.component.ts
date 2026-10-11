import { Component, signal, inject, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../core/services/animation.service';
import { JourneyStateService } from '../../core/services/journey-state.service';
import anime from 'animejs';


interface GestureOption {
  id: string;
  name: string;
  icon: string;
  servoAngle: number;
  mqttTopic: string;
  payload: string;
}

@Component({
  selector: 'app-robotics-station',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="station-robotics" class="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden border-t border-slate-800">
      
      <!-- Architectural Grid Overlay -->
      <div class="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Station Sector Header -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-800/80 text-violet-300 text-xs font-mono font-semibold mb-3">
              <span class="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
              <span>STATION 03 // SENSOR ARRAY & VISION LAB</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI-Powered Gesture Recognition & Robotic Arm
            </h2>
            <p class="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              Research project at <strong class="text-violet-300 font-semibold">SMTP Groups</strong> (Feb 2025 – May 2025). Built an end-to-end touchless human-machine interface interpreting hand gestures into multi-axis robotic actuation via computer vision, Raspberry Pi, Arduino, and MQTT.
            </p>
          </div>

          <div class="flex items-center gap-3 self-start lg:self-auto font-mono text-xs text-slate-400 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
            <span class="text-slate-500">COORDS:</span>
            <span class="text-violet-400 font-bold">LAB // VISION-03</span>
            <span class="text-slate-600">•</span>
            <span class="text-emerald-400 font-semibold">INFERENCE: 30 FPS</span>
          </div>
        </div>

        <!-- Main Station Environment Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Interactive Simulation Viewport (8 cols) -->
          <div class="lg:col-span-8 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
            
            <!-- Viewport Title Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800 mb-6">
              <div class="flex items-center gap-2.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Interactive Physics & Kinematics Canvas
                </span>
              </div>
              <span class="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
                Servo Pos: <strong class="text-violet-300">{{ activeGesture().servoAngle }}°</strong> | Gripper: <strong class="text-cyan-300">{{ gripperState() }}</strong>
              </span>
            </div>

            <!-- 4-Stage Visual Pipeline Ribbon -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              
              <!-- Step 1 -->
              <div class="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/70">
                <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>01 / VIDEO FEED</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </div>
                <div class="text-lg">{{ activeGesture().icon }}</div>
                <div class="text-xs font-bold text-white mt-1">{{ activeGesture().name }}</div>
                <div class="text-[10px] font-mono text-slate-500 mt-1">OpenCV 640x480</div>
              </div>

              <!-- Step 2 -->
              <div class="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/70">
                <div class="flex items-center justify-between text-[10px] font-mono text-violet-400 mb-1">
                  <span>02 / AI MODEL</span>
                  <span class="text-violet-400 font-bold">TF</span>
                </div>
                <div class="text-xs font-bold text-white">21 Hand Landmarks</div>
                <div class="text-[10px] text-slate-400 mt-1">Raspberry Pi Edge</div>
                <div class="text-[10px] font-mono text-violet-300 mt-1">Class: {{ activeGesture().id }}</div>
              </div>

              <!-- Step 3 -->
              <div class="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/70">
                <div class="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                  <span>03 / MQTT BROKER</span>
                  <span class="text-cyan-400 font-bold">QoS 0</span>
                </div>
                <div class="text-[10px] font-mono text-cyan-300 truncate">{{ activeGesture().mqttTopic }}</div>
                <div class="text-[10px] font-mono text-slate-400 truncate mt-1">{{ activeGesture().payload }}</div>
                <div class="text-[10px] font-mono text-cyan-400 mt-1">Latency: 12ms</div>
              </div>

              <!-- Step 4 -->
              <div class="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/70">
                <div class="flex items-center justify-between text-[10px] font-mono text-amber-400 mb-1">
                  <span>04 / ACTUATOR</span>
                  <span class="text-amber-400 font-bold">PWM</span>
                </div>
                <div class="text-xs font-bold text-white">Arduino Servo</div>
                <div class="text-[10px] text-slate-400 mt-1">PWM Pin D9</div>
                <div class="text-[10px] font-mono text-amber-300 mt-1">{{ activeGesture().servoAngle }}° Position</div>
              </div>

            </div>

            <!-- SVG 3-Axis Robotic Arm Interactive Rig -->
            <div class="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex items-center justify-center relative overflow-hidden min-h-[280px]">
              
              <svg viewBox="0 0 400 240" class="w-full max-w-md h-auto overflow-visible select-none">
                <defs>
                  <linearGradient id="armMetalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#64748b" />
                    <stop offset="50%" stop-color="#475569" />
                    <stop offset="100%" stop-color="#334155" />
                  </linearGradient>
                  <linearGradient id="jointGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#8b5cf6" />
                    <stop offset="100%" stop-color="#6d28d9" />
                  </linearGradient>
                </defs>

                <!-- Base Pedestal -->
                <rect x="140" y="210" width="120" height="20" rx="4" fill="#1e293b" stroke="#334155" stroke-width="2" />
                <rect x="175" y="195" width="50" height="15" rx="3" fill="#334155" />

                <!-- Base Pivot Joint (Origin: 200, 200) -->
                <circle cx="200" cy="200" r="14" fill="url(#jointGradient)" stroke="#a78bfa" stroke-width="2" />
                
                <!-- Lower Arm Segment (Segment 1) -->
                <g #armBaseGroup style="transform-origin: 200px 200px;">
                  <rect x="194" y="110" width="12" height="90" rx="6" fill="url(#armMetalGradient)" stroke="#64748b" stroke-width="1.5" />
                  
                  <!-- Elbow Joint (Origin: 200, 110) -->
                  <circle cx="200" cy="110" r="10" fill="url(#jointGradient)" stroke="#c4b5fd" stroke-width="2" />
                  
                  <!-- Upper Forearm & Gripper (Segment 2) -->
                  <g #armForearmGroup style="transform-origin: 200px 110px;">
                    <rect x="195" y="40" width="10" height="70" rx="5" fill="url(#armMetalGradient)" stroke="#64748b" stroke-width="1.5" />
                    
                    <!-- Wrist Joint (Origin: 200, 40) -->
                    <circle cx="200" cy="40" r="7" fill="#06b6d4" stroke="#67e8f9" stroke-width="1.5" />
                    
                    <!-- Left Finger -->
                    <path
                      #gripperLeft
                      d="M 194 40 L 184 20 L 190 12"
                      fill="none"
                      stroke="#38bdf8"
                      stroke-width="3"
                      stroke-linecap="round"
                      style="transform-origin: 194px 40px;"
                    />
                    <!-- Right Finger -->
                    <path
                      #gripperRight
                      d="M 206 40 L 216 20 L 210 12"
                      fill="none"
                      stroke="#38bdf8"
                      stroke-width="3"
                      stroke-linecap="round"
                      style="transform-origin: 206px 40px;"
                    />
                  </g>
                </g>
              </svg>

              <!-- Live Joint Status HUD Badge -->
              <div class="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300">
                <span class="text-violet-400 font-bold">IK SOLVER:</span> VALIDATED (Active)
              </div>
            </div>

          </div>

          <!-- Right Column: Interactive Gesture Control Deck (4 cols) -->
          <div class="lg:col-span-4 space-y-6">
            
            <!-- Gesture Selector Box -->
            <div class="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
              <div class="flex items-center gap-2 mb-4">
                <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                <h3 class="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
                  Simulated Gesture Trigger
                </h3>
              </div>
              <p class="text-xs text-slate-400 mb-4 leading-relaxed">
                Click any recognized gesture to trigger OpenCV vision detection and articulate the robotic arm in real time:
              </p>

              <div class="grid grid-cols-2 gap-2.5">
                @for (gesture of gestures; track gesture.id) {
                  <button
                    type="button"
                    (click)="selectGesture(gesture)"
                    class="p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-24"
                    [class.bg-violet-950]="activeGesture().id === gesture.id"
                    [class.border-violet-500]="activeGesture().id === gesture.id"
                    [class.text-white]="activeGesture().id === gesture.id"
                    [class.shadow-md]="activeGesture().id === gesture.id"
                    [class.shadow-violet-950/50]="activeGesture().id === gesture.id"
                    [class.bg-slate-800/60]="activeGesture().id !== gesture.id"
                    [class.border-slate-700/60]="activeGesture().id !== gesture.id"
                    [class.text-slate-300]="activeGesture().id !== gesture.id"
                    [class.hover:bg-slate-800]="activeGesture().id !== gesture.id"
                  >
                    <div class="flex items-center justify-between">
                      <span class="text-2xl">{{ gesture.icon }}</span>
                      @if (activeGesture().id === gesture.id) {
                        <span class="w-2 h-2 rounded-full bg-violet-400 animate-ping"></span>
                      }
                    </div>
                    <div>
                      <div class="text-xs font-bold leading-tight">{{ gesture.name }}</div>
                      <div class="text-[10px] font-mono text-slate-400 mt-0.5">{{ gesture.servoAngle }}° target</div>
                    </div>
                  </button>
                }
              </div>
            </div>

            <!-- Engineering Role & Tech Stack Box -->
            <div class="bg-slate-900/80 rounded-3xl p-6 border border-slate-800">
              <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                Research Milestones & Tech Stack
              </h4>
              <ul class="space-y-2 text-xs text-slate-300 mb-4">
                <li class="flex items-start gap-2">
                  <span class="text-violet-400 font-bold mt-0.5">•</span>
                  <span>Hand gesture classification pipeline using TensorFlow & OpenCV</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-violet-400 font-bold mt-0.5">•</span>
                  <span>Microcontroller actuation with Arduino PWM & 3D-printed joints</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-violet-400 font-bold mt-0.5">•</span>
                  <span>MQTT pub/sub architecture for low-latency wireless control</span>
                </li>
              </ul>

              <div class="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                <span class="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">Python</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">TensorFlow</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">OpenCV</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">Raspberry Pi</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">Arduino</span>
                <span class="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">MQTT</span>
              </div>
            </div>

          </div>

        </div>

        <!-- Station Navigation Strip -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
          <button
            type="button"
            (click)="journeyState.prevStation()"
            class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            ⬅ Prev Station (02. Industrial MES)
          </button>
          <span class="text-slate-500 text-[11px]">* Touchless robotics and computer vision pipeline simulation.</span>
          <button
            type="button"
            (click)="journeyState.nextStation()"
            class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors cursor-pointer"
          >
            Next Station (04. Game Studio) ➔
          </button>
        </div>

      </div>
    </section>
  `
})
export class RoboticsStationComponent implements AfterViewInit, OnDestroy {
  readonly journeyState = inject(JourneyStateService);
  private readonly anim = inject(AnimationService);

  @ViewChild('armBaseGroup') armBaseGroup!: ElementRef<SVGGElement>;
  @ViewChild('armForearmGroup') armForearmGroup!: ElementRef<SVGGElement>;
  @ViewChild('gripperLeft') gripperLeft!: ElementRef<SVGPathElement>;
  @ViewChild('gripperRight') gripperRight!: ElementRef<SVGPathElement>;

  readonly gestures: GestureOption[] = [
    { id: 'open_palm', name: 'Open Palm', icon: '✋', servoAngle: 90, mqttTopic: 'robot/arm/state', payload: '{"cmd":"REST","angle":90}' },
    { id: 'fist', name: 'Fist', icon: '✊', servoAngle: 30, mqttTopic: 'robot/arm/state', payload: '{"cmd":"GRASP","angle":30}' },
    { id: 'pinch', name: 'Pinch', icon: '🤏', servoAngle: 45, mqttTopic: 'robot/arm/state', payload: '{"cmd":"PINCH","angle":45}' },
    { id: 'point', name: 'Point', icon: '👉', servoAngle: 120, mqttTopic: 'robot/arm/state', payload: '{"cmd":"EXTEND","angle":120}' }
  ];

  readonly activeGesture = signal<GestureOption>(this.gestures[0]);
  readonly gripperState = signal<'OPEN' | 'CLOSED' | 'PINCH'>('OPEN');

  private activeAnimations: anime.AnimeInstance[] = [];

  ngAfterViewInit(): void {
    this.animateToGesture(this.activeGesture());
  }

  selectGesture(gesture: GestureOption): void {
    this.activeGesture.set(gesture);
    this.animateToGesture(gesture);
  }

  private animateToGesture(gesture: GestureOption): void {
    this.activeAnimations.forEach((a) => a.pause());
    this.activeAnimations = [];

    let baseAngle = 0;
    let forearmAngle = 0;
    let leftGripAngle = 0;
    let rightGripAngle = 0;

    switch (gesture.id) {
      case 'open_palm':
        baseAngle = -10;
        forearmAngle = 15;
        leftGripAngle = -20;
        rightGripAngle = 20;
        this.gripperState.set('OPEN');
        break;
      case 'fist':
        baseAngle = -35;
        forearmAngle = 40;
        leftGripAngle = 10;
        rightGripAngle = -10;
        this.gripperState.set('CLOSED');
        break;
      case 'pinch':
        baseAngle = -20;
        forearmAngle = 25;
        leftGripAngle = 5;
        rightGripAngle = -5;
        this.gripperState.set('PINCH');
        break;
      case 'point':
        baseAngle = 25;
        forearmAngle = -30;
        leftGripAngle = -10;
        rightGripAngle = 10;
        this.gripperState.set('OPEN');
        break;
    }

    if (this.armBaseGroup?.nativeElement) {
      const a1 = this.anim.animateJoint(this.armBaseGroup.nativeElement, 'rotate', `${baseAngle}deg`, 800);
      if (a1) this.activeAnimations.push(a1);
    }

    if (this.armForearmGroup?.nativeElement) {
      const a2 = this.anim.animateJoint(this.armForearmGroup.nativeElement, 'rotate', `${forearmAngle}deg`, 900);
      if (a2) this.activeAnimations.push(a2);
    }

    if (this.gripperLeft?.nativeElement) {
      const a3 = this.anim.animateJoint(this.gripperLeft.nativeElement, 'rotate', `${leftGripAngle}deg`, 600);
      if (a3) this.activeAnimations.push(a3);
    }

    if (this.gripperRight?.nativeElement) {
      const a4 = this.anim.animateJoint(this.gripperRight.nativeElement, 'rotate', `${rightGripAngle}deg`, 600);
      if (a4) this.activeAnimations.push(a4);
    }

  }

  ngOnDestroy(): void {
    this.activeAnimations.forEach((a) => a.pause());
    this.activeAnimations = [];
  }
}
