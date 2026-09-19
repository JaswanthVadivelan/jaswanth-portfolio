import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  NgZone,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportService } from '../../core/services/viewport.service';
import { ThreeFallbackComponent } from '../fallback/three-fallback.component';

@Component({
  selector: 'app-mes-factory',
  standalone: true,
  imports: [CommonModule, ThreeFallbackComponent],
  template: `
    <div #container class="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-xl">
      <!-- Static fallback rendered while loading or if WebGL is unavailable / reduced motion requested -->
      @if (!isThreeLoaded() || viewportService.prefersReducedMotion() || !viewportService.isWebGLAvailable()) {
        <app-three-fallback
          title="ProdXP.ai MES Smart Factory Conceptual Model"
          badge="Conceptual MES Architecture"
          subtitle="Shop Floor Telemetry • CNC Machines • Quality Scanning • OEE Pipeline"
        />
      }

      <!-- Interactive 3D Canvas -->
      <div
        #canvasContainer
        class="w-full h-full absolute inset-0 transition-opacity duration-700"
        [class.opacity-0]="!isThreeLoaded() || viewportService.prefersReducedMotion()"
        [class.opacity-100]="isThreeLoaded() && !viewportService.prefersReducedMotion()"
        aria-hidden="true"
      ></div>

      <!-- Factory Telemetry HUD Overlay -->
      @if (isThreeLoaded() && !viewportService.prefersReducedMotion()) {
        <div class="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur text-xs font-mono text-slate-300 border border-slate-700/50 pointer-events-none flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>ProdXP.ai Telemetry: Online</span>
        </div>
        <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-slate-950/70 backdrop-blur text-[11px] font-mono text-slate-400 border border-slate-700/50 pointer-events-none">
          <span>Conceptual Shop-Floor 3D Cue</span>
        </div>
      }
    </div>
  `
})
export class MesFactoryComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: false }) canvasContainerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  readonly viewportService = inject(ViewportService);
  private readonly ngZone = inject(NgZone);

  readonly isThreeLoaded = signal<boolean>(false);

  private renderer: any = null;
  private scene: any = null;
  private camera: any = null;
  private animFrameId: number | null = null;
  private isIntersecting = false;
  private intersectionObserver: IntersectionObserver | null = null;

  // Scene object references
  private factoryGroup: any = null;
  private movingPayloads: any[] = [];
  private scannerLight: any = null;

  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  ngOnInit(): void {
    if (this.viewportService.prefersReducedMotion() || !this.viewportService.isWebGLAvailable()) {
      return;
    }
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.initThree();
      return;
    }

    this.intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      this.isIntersecting = !!entry?.isIntersecting;

      if (this.isIntersecting && !this.isThreeLoaded()) {
        this.initThree();
      }

      if (this.isIntersecting) {
        this.startAnimationLoop();
      } else {
        this.stopAnimationLoop();
      }
    }, { threshold: 0.1 });

    setTimeout(() => {
      if (this.containerRef?.nativeElement && this.intersectionObserver) {
        this.intersectionObserver.observe(this.containerRef.nativeElement);
      }
    }, 50);
  }

  private async initThree(): Promise<void> {
    try {
      const THREE = await import('three');

      const container = this.canvasContainerRef?.nativeElement;
      if (!container) return;

      const width = container.clientWidth || 400;
      const height = container.clientHeight || 360;

      // 1. Scene
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x0a0f1d, 0.045);

      // 2. Camera (Isometric Perspective)
      this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      this.camera.position.set(4, 3.5, 5);
      this.camera.lookAt(0, 0, 0);

      // 3. Renderer
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x0a0f1d, 1);
      container.appendChild(this.renderer.domElement);

      // 4. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
      this.scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0x60a5fa, 2.5);
      dirLight.position.set(5, 10, 5);
      this.scene.add(dirLight);

      const scannerLight = new THREE.PointLight(0x38bdf8, 3, 5);
      scannerLight.position.set(0, 1.2, 0);
      this.scene.add(scannerLight);
      this.scannerLight = scannerLight;

      // 5. Factory Assembly
      this.factoryGroup = new THREE.Group();

      // Factory Floor Base Grid
      const floorGeo = new THREE.PlaneGeometry(5, 5, 10, 10);
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x111827,
        roughness: 0.8,
        metalness: 0.2,
        wireframe: true
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -0.4;
      this.factoryGroup.add(floor);

      // Conveyor Belt
      const conveyorGeo = new THREE.BoxGeometry(3.6, 0.1, 0.4);
      const conveyorMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6, roughness: 0.4 });
      const conveyor = new THREE.Mesh(conveyorGeo, conveyorMat);
      conveyor.position.set(0, -0.3, 0);
      this.factoryGroup.add(conveyor);

      // Machine Stations (CNC Milling & Robot cell)
      const machineGeo = new THREE.BoxGeometry(0.6, 0.7, 0.6);
      const machineMat1 = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.7, roughness: 0.3 });
      const machineMat2 = new THREE.MeshStandardMaterial({ color: 0x0f766e, metalness: 0.7, roughness: 0.3 });

      const machine1 = new THREE.Mesh(machineGeo, machineMat1);
      machine1.position.set(-1.0, 0.05, -0.7);
      this.factoryGroup.add(machine1);

      const machine2 = new THREE.Mesh(machineGeo, machineMat2);
      machine2.position.set(1.0, 0.05, -0.7);
      this.factoryGroup.add(machine2);

      // Quality Inspection Sensor Arch
      const archGeo = new THREE.TorusGeometry(0.35, 0.04, 8, 24, Math.PI);
      const archMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.6 });
      const arch = new THREE.Mesh(archGeo, archMat);
      arch.position.set(0, 0.05, 0);
      this.factoryGroup.add(arch);

      // Moving Payloads on Conveyor
      this.movingPayloads = [];
      const payloadGeo = new THREE.BoxGeometry(0.18, 0.15, 0.18);
      const payloadMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });

      for (let i = 0; i < 4; i++) {
        const payload = new THREE.Mesh(payloadGeo, payloadMat);
        payload.position.set(-1.6 + i * 0.9, -0.17, 0);
        this.factoryGroup.add(payload);
        this.movingPayloads.push(payload);
      }

      this.scene.add(this.factoryGroup);

      // Mouse interactivity
      container.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        this.targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.targetMouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      });

      window.addEventListener('resize', this.onResize);

      this.isThreeLoaded.set(true);
      this.startAnimationLoop();
    } catch (err) {
      console.warn('Three.js MES visualization failed to initialize, using fallback:', err);
      this.isThreeLoaded.set(false);
    }
  }

  private onResize = (): void => {
    const container = this.canvasContainerRef?.nativeElement;
    if (!container || !this.renderer || !this.camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private startAnimationLoop(): void {
    if (this.animFrameId !== null) return;

    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        if (!this.renderer || !this.scene || !this.camera) return;

        this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

        if (this.factoryGroup) {
          this.factoryGroup.rotation.y = 0.4 + this.mouseX * 0.25;
        }

        // Animate moving payloads along conveyor
        this.movingPayloads.forEach((payload) => {
          payload.position.x += 0.008;
          if (payload.position.x > 1.8) {
            payload.position.x = -1.8;
          }
        });

        // Pulse scanner light
        if (this.scannerLight) {
          this.scannerLight.intensity = 2 + Math.sin(Date.now() * 0.005) * 1.5;
        }

        this.renderer.render(this.scene, this.camera);
        this.animFrameId = requestAnimationFrame(animate);
      };

      this.animFrameId = requestAnimationFrame(animate);
    });
  }

  private stopAnimationLoop(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  ngOnDestroy(): void {
    this.stopAnimationLoop();

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    if (this.renderer) {
      try {
        this.renderer.dispose();
        if (this.renderer.domElement && this.renderer.domElement.parentNode) {
          this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
        }
      } catch (e) {
        console.warn('Error disposing WebGL renderer:', e);
      }
    }
  }
}

