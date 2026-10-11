import { Component, signal, inject, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../core/services/animation.service';
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
  selector: 'app-robotics-visualizer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl overflow-hidden relative">
      <!-- Background subtle grid -->
      <div class="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none"></div>

      <!-- Header -->
      <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800 mb-6">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse"></span>
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-violet-400">
              Interactive IoT & CV Pipeline
            </span>
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
            AI-Powered Gesture Robotic Arm Simulation
          </h3>
        </div>
        <span class="text-[11px] font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 self-start sm:self-auto">
          SMTP Groups Research Project
        </span>
      </div>

      <!-- 4-Stage Visual Pipeline -->
      <div class="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        <!-- Stage 1: Camera Frame -->
        <div class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[10px] font-mono font-bold text-slate-400 uppercase">01 / Video Input</span>
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <div class="py-3 text-center">
            <div class="text-3xl mb-1">{{ activeGesture().icon }}</div>
            <div class="text-xs font-bold text-white">{{ activeGesture().name }}</div>
            <div class="text-[10px] font-mono text-slate-400">640x480 @ 30 FPS</div>
          </div>
          <div class="text-[10px] font-mono text-slate-400 text-center border-t border-slate-700/60 pt-2">
            OpenCV VideoCapture
          </div>
        </div>

        <!-- Stage 2: Computer Vision Inference -->
        <div class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[10px] font-mono font-bold text-violet-400 uppercase">02 / AI Inference</span>
            <span class="text-[10px] font-mono text-violet-300 font-bold">TensorFlow</span>
          </div>
          <div class="py-2 space-y-1 text-xs">
            <div class="flex justify-between text-[11px]">
              <span class="text-slate-400">Model:</span>
              <span class="font-mono text-white">HandLandmark</span>
            </div>
            <div class="flex justify-between text-[11px]">
              <span class="text-slate-400">Keypoints:</span>
              <span class="font-mono text-violet-300">21 Coordinates</span>
            </div>
            <div class="flex justify-between text-[11px]">
              <span class="text-slate-400">Device:</span>
              <span class="font-mono text-white">Raspberry Pi</span>
            </div>
          </div>
          <div class="text-[10px] font-mono text-violet-300 text-center border-t border-slate-700/60 pt-2">
            Gesture Classified: <strong>{{ activeGesture().name }}</strong>
          </div>
        </div>

        <!-- Stage 3: MQTT Message Broker -->
        <div class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[10px] font-mono font-bold text-cyan-400 uppercase">03 / MQTT Telemetry</span>
            <span class="text-[10px] font-mono text-cyan-300 font-bold">QoS 0</span>
          </div>
          <div class="py-2 text-[11px] font-mono space-y-1 bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/50">
            <div class="text-slate-500 truncate">TOPIC: {{ activeGesture().mqttTopic }}</div>
            <div class="text-cyan-300 truncate">PAYLOAD: {{ activeGesture().payload }}</div>
          </div>
          <div class="text-[10px] font-mono text-cyan-400 text-center border-t border-slate-700/60 pt-2">
            Low Latency IoT Packet
          </div>
        </div>

        <!-- Stage 4: Arduino & Robotic Arm -->
        <div class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[10px] font-mono font-bold text-amber-400 uppercase">04 / Servo Actuation</span>
            <span class="text-[10px] font-mono text-amber-300 font-bold">Arduino</span>
          </div>
          <div class="py-2 text-center">
            <div class="text-xs text-slate-400 mb-1">Target Servo Angle:</div>
            <div class="text-2xl font-bold font-mono text-amber-400">{{ activeGesture().servoAngle }}°</div>
            <div class="text-[10px] text-slate-400">3D-Printed Actuator</div>
          </div>
          <div class="text-[10px] font-mono text-amber-300 text-center border-t border-slate-700/60 pt-2">
            Movement Executed
          </div>
        </div>

      </div>

      <!-- Interactive Gesture Trigger Bar -->
      <div class="relative z-10 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="text-xs text-slate-400">
          <strong class="text-white">Simulate Gesture Input:</strong> Click any gesture below to transmit real-time telemetry:
        </div>
        <div class="flex flex-wrap gap-2">
          @for (gesture of gestures; track gesture.id) {
            <button
              type="button"
              (click)="selectGesture(gesture)"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              [class.bg-violet-600]="activeGesture().id === gesture.id"
              [class.text-white]="activeGesture().id === gesture.id"
              [class.shadow-md]="activeGesture().id === gesture.id"
              [class.bg-slate-800]="activeGesture().id !== gesture.id"
              [class.text-slate-300]="activeGesture().id !== gesture.id"
              [class.hover:bg-slate-700]="activeGesture().id !== gesture.id"
            >
              <span>{{ gesture.icon }}</span>
              <span>{{ gesture.name }}</span>
            </button>
          }
        </div>
      </div>

      <!-- Conceptual Note -->
      <div class="mt-4 text-[10px] text-slate-500 font-mono text-center">
        * Simulated interactive representation of SMTP Groups AI & Robotics IoT gesture pipeline.
      </div>
    </div>
  `
})
export class RoboticsVisualizerComponent {
  readonly gestures: GestureOption[] = [
    {
      id: 'open-palm',
      name: 'Open Palm',
      icon: '✋',
      servoAngle: 180,
      mqttTopic: 'robot/arm/actuator',
      payload: '{"state":"OPEN","angle":180}'
    },
    {
      id: 'fist',
      name: 'Fist Grip',
      icon: '✊',
      servoAngle: 0,
      mqttTopic: 'robot/arm/actuator',
      payload: '{"state":"GRIP","angle":0}'
    },
    {
      id: 'pinch',
      name: 'Precision Pinch',
      icon: '🤏',
      servoAngle: 45,
      mqttTopic: 'robot/arm/actuator',
      payload: '{"state":"PINCH","angle":45}'
    },
    {
      id: 'point',
      name: 'Index Point',
      icon: '👉',
      servoAngle: 90,
      mqttTopic: 'robot/arm/actuator',
      payload: '{"state":"POINT","angle":90}'
    }
  ];

  readonly activeGesture = signal<GestureOption>(this.gestures[0]);

  selectGesture(gesture: GestureOption): void {
    this.activeGesture.set(gesture);
  }
}

