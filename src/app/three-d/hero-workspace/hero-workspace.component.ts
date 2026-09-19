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
  selector: 'app-hero-workspace',
  standalone: true,
  imports: [CommonModule, ThreeFallbackComponent],
  template: `
    <div #container class="relative w-full h-full min-h-[380px] lg:min-h-[460px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-xl">
      <!-- Static fallback rendered while loading or if WebGL is unavailable / reduced motion requested -->
      @if (!isThreeLoaded() || viewportService.prefersReducedMotion() || !viewportService.isWebGLAvailable()) {
        <app-three-fallback
          title="Digital Engineering Workspace Visualizer"
          badge="Interactive 3D Workspace"
          subtitle="Software Architecture • Relational Databases • AI Pipelines • Cloud"
        />
      }

      <!-- Interactive 3D Canvas Container -->
      <div
        #canvasContainer
        class="w-full h-full absolute inset-0 transition-opacity duration-700"
        [class.opacity-0]="!isThreeLoaded() || viewportService.prefersReducedMotion()"
        [class.opacity-100]="isThreeLoaded() && !viewportService.prefersReducedMotion()"
        aria-hidden="true"
      ></div>

      <!-- Subtle HUD overlay controls -->
      @if (isThreeLoaded() && !viewportService.prefersReducedMotion()) {
        <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-slate-950/70 backdrop-blur text-[11px] font-mono text-slate-400 border border-slate-700/50 pointer-events-none flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Interactive 3D Workspace</span>
        </div>
      }
    </div>
  `
})
export class HeroWorkspaceComponent implements OnInit, OnDestroy {
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

  // Scene object references for animation
  private centralGroup: any = null;
  private dbCylinder: any = null;
  private cloudGroup: any = null;
  private aiGroup: any = null;
  private particlesMesh: any = null;

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

    // Wait a tick for containerRef to be bound
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
      const height = container.clientHeight || 400;

      // 1. Scene
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x090d16, 0.04);

      // 2. Camera
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      this.camera.position.set(0, 1.5, 5.5);

      // 3. Renderer with capped DPR & low power mode
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x090d16, 1);
      container.appendChild(this.renderer.domElement);

      // 4. Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      this.scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
      dirLight.position.set(5, 8, 4);
      this.scene.add(dirLight);

      const pointLight = new THREE.PointLight(0x818cf8, 3, 10);
      pointLight.position.set(-3, 2, 2);
      this.scene.add(pointLight);

      // 5. Procedural Workspace Assembly
      this.centralGroup = new THREE.Group();

      // Workstation Desk / Baseplate
      const deskGeo = new THREE.BoxGeometry(2.4, 0.08, 1.4);
      const deskMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.8 });
      const desk = new THREE.Mesh(deskGeo, deskMat);
      desk.position.set(0, -0.6, 0);
      this.centralGroup.add(desk);

      // Dual Monitor Stand & Screens
      const screenGeo = new THREE.BoxGeometry(0.9, 0.55, 0.04);
      const screenMat1 = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, emissive: 0x1e3a8a, emissiveIntensity: 0.4 });
      const screen1 = new THREE.Mesh(screenGeo, screenMat1);
      screen1.position.set(-0.5, -0.15, -0.2);
      screen1.rotation.y = 0.2;
      this.centralGroup.add(screen1);

      const screenMat2 = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, emissive: 0x065f46, emissiveIntensity: 0.4 });
      const screen2 = new THREE.Mesh(screenGeo, screenMat2);
      screen2.position.set(0.5, -0.15, -0.2);
      screen2.rotation.y = -0.2;
      this.centralGroup.add(screen2);

      // Relational Database Cylinder
      const dbGroup = new THREE.Group();
      const cylinderGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.12, 24);
      const dbMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.7, roughness: 0.3 });
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true });

      for (let i = 0; i < 3; i++) {
        const disc = new THREE.Mesh(cylinderGeo, dbMat);
        disc.position.y = i * 0.16;
        const ring = new THREE.Mesh(cylinderGeo, ringMat);
        ring.position.y = i * 0.16;
        ring.scale.set(1.02, 1.02, 1.02);
        dbGroup.add(disc);
        dbGroup.add(ring);
      }
      dbGroup.position.set(1.4, 0.2, 0.4);
      this.dbCylinder = dbGroup;
      this.centralGroup.add(dbGroup);

      // Cloud Nodes / Orbital System
      const cloudGroup = new THREE.Group();
      const sphereGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const cloudMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3, emissive: 0x0284c7, emissiveIntensity: 0.3 });
      const cloudCenter = new THREE.Mesh(sphereGeo, cloudMat);
      cloudGroup.add(cloudCenter);

      for (let j = 0; j < 3; j++) {
        const subNode = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), cloudMat);
        const angle = (j / 3) * Math.PI * 2;
        subNode.position.set(Math.cos(angle) * 0.4, Math.sin(angle) * 0.2, Math.sin(angle) * 0.3);
        cloudGroup.add(subNode);
      }
      cloudGroup.position.set(-1.4, 0.5, 0.2);
      this.cloudGroup = cloudGroup;
      this.centralGroup.add(cloudGroup);

      // AI Neural Graph Nodes
      const aiGroup = new THREE.Group();
      const octaGeo = new THREE.OctahedronGeometry(0.22, 0);
      const aiMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, wireframe: true });
      const coreNode = new THREE.Mesh(octaGeo, aiMat);
      aiGroup.add(coreNode);
      aiGroup.position.set(0, 0.9, -0.3);
      this.aiGroup = aiGroup;
      this.centralGroup.add(aiGroup);

      // Floating Data Particles
      const particleCount = 40;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let p = 0; p < particleCount * 3; p += 3) {
        positions[p] = (Math.random() - 0.5) * 4;
        positions[p + 1] = (Math.random() - 0.5) * 3;
        positions[p + 2] = (Math.random() - 0.5) * 3;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.035 });
      this.particlesMesh = new THREE.Points(particleGeo, particleMat);
      this.scene.add(this.particlesMesh);

      this.scene.add(this.centralGroup);

      // Add Mouse Interactivity
      container.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        this.targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.targetMouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      });

      // Window resize listener
      window.addEventListener('resize', this.onResize);

      this.isThreeLoaded.set(true);
      this.startAnimationLoop();
    } catch (err) {
      console.warn('Three.js failed to initialize, using accessible fallback:', err);
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

        // Smooth mouse damping
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

        // Subtle camera and group tilt
        if (this.centralGroup) {
          this.centralGroup.rotation.y = this.mouseX * 0.35;
          this.centralGroup.rotation.x = -this.mouseY * 0.2;
        }

        // Procedural animations
        if (this.dbCylinder) {
          this.dbCylinder.rotation.y += 0.01;
        }
        if (this.cloudGroup) {
          this.cloudGroup.rotation.y += 0.015;
          this.cloudGroup.position.y = 0.5 + Math.sin(Date.now() * 0.002) * 0.05;
        }
        if (this.aiGroup) {
          this.aiGroup.rotation.x += 0.01;
          this.aiGroup.rotation.z += 0.012;
        }
        if (this.particlesMesh) {
          this.particlesMesh.rotation.y += 0.002;
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

