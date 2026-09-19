import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldSceneService } from './world-scene.service';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { ViewportService } from '../../core/services/viewport.service';

@Component({
  selector: 'app-interactive-world',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #worldContainer
      class="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <!-- Background Canvas Host -->
      <div
        #canvasHost
        class="w-full h-full pointer-events-auto transition-opacity duration-1000"
        [class.opacity-0]="!worldScene.isWorldReady() || viewportService.prefersReducedMotion()"
        [class.opacity-100]="worldScene.isWorldReady() && !viewportService.prefersReducedMotion()"
      ></div>

      <!-- Spatial HUD Indicator -->
      @if (worldScene.isWorldReady() && !viewportService.prefersReducedMotion()) {
        <div class="fixed bottom-4 left-4 z-40 hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 shadow-lg text-xs font-mono text-slate-300 pointer-events-none">
          <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span class="text-slate-400 font-medium">3D Spatial Zone:</span>
          <span class="text-blue-300 font-bold">{{ worldScene.currentZone() }}</span>
        </div>
      }
    </div>
  `
})
export class InteractiveWorldComponent implements OnInit, OnDestroy {
  @ViewChild('canvasHost', { static: false }) canvasHostRef!: ElementRef<HTMLDivElement>;

  readonly worldScene = inject(WorldSceneService);
  readonly scrollSpy = inject(ScrollSpyService);
  readonly viewportService = inject(ViewportService);

  ngOnInit(): void {
    setTimeout(() => {
      if (this.canvasHostRef?.nativeElement) {
        this.worldScene.initWorld(this.canvasHostRef.nativeElement, (sectionId: string) => {
          this.scrollSpy.scrollToSection(sectionId);
        });
      }
    }, 50);
  }

  ngOnDestroy(): void {
    this.worldScene.destroy();
  }
}

