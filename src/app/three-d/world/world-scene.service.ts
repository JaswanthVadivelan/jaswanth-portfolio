import { Injectable, signal, NgZone, inject } from '@angular/core';
import { ViewportService } from '../../core/services/viewport.service';

export interface SpatialWaypoint {
  position: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
  zoneName: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorldSceneService {
  private readonly ngZone = inject(NgZone);
  private readonly viewportService = inject(ViewportService);

  readonly isWorldReady = signal<boolean>(false);
  readonly currentZone = signal<string>('Command Center');
  readonly hoveredNode = signal<string | null>(null);

  private renderer: any = null;
  private scene: any = null;
  private camera: any = null;
  private animFrameId: number | null = null;

  // Raycasting
  private raycaster: any = null;
  private mouseVector: any = null;
  private interactiveNodes: any[] = [];
  private onNodeClickCallback: ((sectionId: string) => void) | null = null;

  // Camera animation interpolation targets
  private targetCamPos = { x: 0, y: 2, z: 7 };
  private currentCamPos = { x: 0, y: 2, z: 7 };
  private targetLookAt = { x: 0, y: 0, z: 0 };
  private currentLookAt = { x: 0, y: 0, z: 0 };

  // Mouse Parallax
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  // Scene object groups
  private commandCenterGroup: any = null;
  private factoryFloorGroup: any = null;
  private dataPipelineGroup: any = null;
  private particlesMesh: any = null;
  private movingPayloads: any[] = [];

  readonly waypoints: Record<string, SpatialWaypoint> = {
    home: { position: { x: 0, y: 2, z: 7 }, target: { x: 0, y: 0, z: 0 }, zoneName: 'Command Center' },
    about: { position: { x: -2.5, y: 2.2, z: 5.5 }, target: { x: -1, y: 0.5, z: 0 }, zoneName: 'Engineering Core' },
    skills: { position: { x: 3.2, y: 2.8, z: 5.5 }, target: { x: 1.5, y: 0.5, z: 0 }, zoneName: 'Tech Radar Matrix' },
    experience: { position: { x: -3.5, y: 2.6, z: 4.8 }, target: { x: -1.5, y: 0, z: 0 }, zoneName: 'Operations Track' },
    featured: { position: { x: 0, y: 3.5, z: 5.8 }, target: { x: 0, y: 0, z: -1.5 }, zoneName: 'Digital Factory Floor (MES)' },
    projects: { position: { x: 3, y: 2.5, z: 5.2 }, target: { x: 1.2, y: 0.5, z: -0.5 }, zoneName: 'Systems Grid' },
    analytics: { position: { x: -3, y: 3.2, z: 5 }, target: { x: -1.2, y: 0.5, z: -1 }, zoneName: 'Telemetry Deck' },
    architecture: { position: { x: 0, y: 3, z: 5.5 }, target: { x: 0, y: 0.8, z: 0 }, zoneName: 'Multi-Tier Pipeline' },
    achievements: { position: { x: 2.5, y: 2.2, z: 5.8 }, target: { x: 1, y: 0.5, z: 0 }, zoneName: 'Milestones Hub' },
    education: { position: { x: -2.2, y: 2, z: 5.8 }, target: { x: -0.8, y: 0.5, z: 0 }, zoneName: 'Academic Terminal' },
    certifications: { position: { x: 2.8, y: 2, z: 5.8 }, target: { x: 1.2, y: 0.5, z: 0 }, zoneName: 'Credentials Vault' },
    resume: { position: { x: 0, y: 2.2, z: 6.2 }, target: { x: 0, y: 0.5, z: 0 }, zoneName: 'CV Terminal' },
    contact: { position: { x: 0, y: 2.5, z: 7 }, target: { x: 0, y: 0, z: 0 }, zoneName: 'Communication Port' }
  };

  async initWorld(container: HTMLElement, onNodeClick?: (sectionId: string) => void): Promise<void> {
    if (this.viewportService.prefersReducedMotion() || !this.viewportService.isWebGLAvailable()) {
      return;
    }

    this.onNodeClickCallback = onNodeClick || null;

    try {
      const THREE = await import('three');

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // 1. Scene & Atmosphere
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x060913, 0.035);

      // 2. Camera
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      this.camera.position.set(this.currentCamPos.x, this.currentCamPos.y, this.currentCamPos.z);
      this.camera.lookAt(this.currentLookAt.x, this.currentLookAt.y, this.currentLookAt.z);

      // 3. Renderer with capped DPR
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x060913, 1);
      container.appendChild(this.renderer.domElement);

      // 4. Raycaster & Pointer
      this.raycaster = new THREE.Raycaster();
      this.mouseVector = new THREE.Vector2();

      // 5. Dynamic Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      this.scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
      mainLight.position.set(8, 12, 6);
      this.scene.add(mainLight);

      const accentLight = new THREE.PointLight(0x818cf8, 4, 15);
      accentLight.position.set(-6, 4, 4);
      this.scene.add(accentLight);

      const floorLight = new THREE.PointLight(0x34d399, 2.5, 12);
      floorLight.position.set(0, -1, 2);
      this.scene.add(floorLight);

      // 6. Build 3D Spatial Zones
      this.buildSpatialWorld(THREE);

      // 7. Event Handlers
      container.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        this.targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.targetMouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

        this.mouseVector.x = this.targetMouseX;
        this.mouseVector.y = this.targetMouseY;
      });

      container.addEventListener('click', () => {
        this.checkRaycastClick();
      });

      window.addEventListener('resize', this.onResize);

      this.isWorldReady.set(true);
      this.startAnimationLoop();
    } catch (err) {
      console.warn('Three.js Spatial World failed to initialize, falling back to static visual:', err);
      this.isWorldReady.set(false);
    }
  }

  private buildSpatialWorld(THREE: any): void {
    // A. Shared Grid Ground Plane
    const gridHelper = new THREE.GridHelper(24, 24, 0x1d4ed8, 0x1e293b);
    gridHelper.position.y = -1;
    this.scene.add(gridHelper);

    // B. Zone 1: Central Command Station (Workstation, DB cylinders, Hologram Core)
    this.commandCenterGroup = new THREE.Group();
    
    // Core Hologram Ring
    const torusGeo = new THREE.TorusGeometry(1.2, 0.04, 16, 64);
    const torusMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.6, wireframe: true });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 2;
    this.commandCenterGroup.add(torus);

    // Database Relational Tower
    const dbCylinderGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.14, 24);
    const dbMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.8, roughness: 0.2 });
    for (let i = 0; i < 4; i++) {
      const disc = new THREE.Mesh(dbCylinderGeo, dbMat);
      disc.position.set(1.6, -0.6 + i * 0.2, 0.5);
      this.commandCenterGroup.add(disc);
    }

    // AI Octahedron Node (Clickable)
    const octaGeo = new THREE.OctahedronGeometry(0.35, 0);
    const octaMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, wireframe: true });
    const aiNode = new THREE.Mesh(octaGeo, octaMat);
    aiNode.position.set(-1.6, 0.6, 0.5);
    aiNode.userData = { sectionId: 'skills', name: 'AI & Skills Node' };
    this.interactiveNodes.push(aiNode);
    this.commandCenterGroup.add(aiNode);

    this.scene.add(this.commandCenterGroup);

    // C. Zone 3: Smart Factory Floor (Conveyor & Machines)
    this.factoryFloorGroup = new THREE.Group();
    this.factoryFloorGroup.position.set(0, -0.5, -2.5);

    const conveyorGeo = new THREE.BoxGeometry(4.2, 0.12, 0.5);
    const conveyorMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5, roughness: 0.5 });
    const conveyor = new THREE.Mesh(conveyorGeo, conveyorMat);
    this.factoryFloorGroup.add(conveyor);

    // CNC Machines
    const cncGeo = new THREE.BoxGeometry(0.8, 0.9, 0.8);
    const cncMat = new THREE.MeshStandardMaterial({ color: 0x0f766e, metalness: 0.7, roughness: 0.3 });
    const cnc1 = new THREE.Mesh(cncGeo, cncMat);
    cnc1.position.set(-1.2, 0.45, -0.8);
    cnc1.userData = { sectionId: 'featured', name: 'MES Shop-Floor CNC' };
    this.interactiveNodes.push(cnc1);
    this.factoryFloorGroup.add(cnc1);

    const cnc2 = new THREE.Mesh(cncGeo, cncMat);
    cnc2.position.set(1.2, 0.45, -0.8);
    cnc2.userData = { sectionId: 'featured', name: 'MES Assembly Cell' };
    this.interactiveNodes.push(cnc2);
    this.factoryFloorGroup.add(cnc2);

    // Moving Payloads
    this.movingPayloads = [];
    const payloadGeo = new THREE.BoxGeometry(0.2, 0.16, 0.2);
    const payloadMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2 });
    for (let p = 0; p < 5; p++) {
      const payload = new THREE.Mesh(payloadGeo, payloadMat);
      payload.position.set(-1.8 + p * 0.9, 0.14, 0);
      this.factoryFloorGroup.add(payload);
      this.movingPayloads.push(payload);
    }

    this.scene.add(this.factoryFloorGroup);

    // D. Zone 4: Multi-Tier Data Architecture Floating Panels
    this.dataPipelineGroup = new THREE.Group();
    this.dataPipelineGroup.position.set(0, 0.8, 0);

    const tierGeo = new THREE.BoxGeometry(1.8, 0.08, 0.9);
    const tierColors = [0x2563eb, 0x0284c7, 0x10b981];
    const tierSections = ['architecture', 'architecture', 'architecture'];

    for (let t = 0; t < 3; t++) {
      const tierMat = new THREE.MeshStandardMaterial({ color: tierColors[t], roughness: 0.3, metalness: 0.6, transparent: true, opacity: 0.85 });
      const tier = new THREE.Mesh(tierGeo, tierMat);
      tier.position.set(0, t * 0.4, 0);
      tier.userData = { sectionId: tierSections[t], name: `Architecture Layer 0${t + 1}` };
      this.interactiveNodes.push(tier);
      this.dataPipelineGroup.add(tier);
    }
    this.scene.add(this.dataPipelineGroup);

    // E. Floating Ambient Data Particles
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.045 });
    this.particlesMesh = new THREE.Points(particleGeo, particleMat);
    this.scene.add(this.particlesMesh);
  }

  setWaypoint(sectionId: string): void {
    const wp = this.waypoints[sectionId] || this.waypoints['home'];
    this.targetCamPos = { ...wp.position };
    this.targetLookAt = { ...wp.target };
    this.currentZone.set(wp.zoneName);
  }

  private checkRaycastClick(): void {
    if (!this.raycaster || !this.camera || !this.interactiveNodes.length) return;
    this.raycaster.setFromCamera(this.mouseVector, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveNodes, true);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const sectionId = hit.userData?.sectionId;
      if (sectionId && this.onNodeClickCallback) {
        this.onNodeClickCallback(sectionId);
      }
    }
  }

  private onResize = (): void => {
    if (!this.renderer || !this.camera) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
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

        // Smooth camera lerping towards target waypoint
        this.currentCamPos.x += (this.targetCamPos.x + this.mouseX * 0.4 - this.currentCamPos.x) * 0.05;
        this.currentCamPos.y += (this.targetCamPos.y - this.mouseY * 0.3 - this.currentCamPos.y) * 0.05;
        this.currentCamPos.z += (this.targetCamPos.z - this.currentCamPos.z) * 0.05;

        this.currentLookAt.x += (this.targetLookAt.x - this.currentLookAt.x) * 0.05;
        this.currentLookAt.y += (this.targetLookAt.y - this.currentLookAt.y) * 0.05;
        this.currentLookAt.z += (this.targetLookAt.z - this.currentLookAt.z) * 0.05;

        this.camera.position.set(this.currentCamPos.x, this.currentCamPos.y, this.currentCamPos.z);
        this.camera.lookAt(this.currentLookAt.x, this.currentLookAt.y, this.currentLookAt.z);

        // Procedural continuous animations
        if (this.commandCenterGroup) {
          this.commandCenterGroup.rotation.y += 0.005;
        }

        if (this.movingPayloads.length) {
          this.movingPayloads.forEach((payload) => {
            payload.position.x += 0.008;
            if (payload.position.x > 2.0) {
              payload.position.x = -2.0;
            }
          });
        }

        if (this.particlesMesh) {
          this.particlesMesh.rotation.y += 0.001;
        }

        this.renderer.render(this.scene, this.camera);
        this.animFrameId = requestAnimationFrame(animate);
      };

      this.animFrameId = requestAnimationFrame(animate);
    });
  }

  stopAnimationLoop(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  destroy(): void {
    this.stopAnimationLoop();

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
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

