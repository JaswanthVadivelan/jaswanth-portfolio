import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './features/hero/hero.component';
import { ArchitectureComponent } from './features/architecture/architecture.component';
import { RoboticsStationComponent } from './features/robotics-station/robotics-station.component';
import { GameStationComponent } from './features/game-station/game-station.component';
import { VaultStationComponent } from './features/vault-station/vault-station.component';
import { ContactComponent } from './features/contact/contact.component';

describe('Station 01: Hero & Command Deck', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent]
    }).compileComponents();
  });

  it('should initialize and render authentic profile details', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.profile.name).toBe('Jaswanth V.');
    expect(component.profile.company).toBe('ProdXP.ai');
  });
});

describe('Station 02: ProdXP MES Command Hub', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureComponent]
    }).compileComponents();
  });

  it('should initialize with 5 conceptual workflow stages', () => {
    const fixture = TestBed.createComponent(ArchitectureComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.stages.length).toBe(5);
    expect(component.currentStage().name).toBe('Production Planning');
  });

  it('should jump between stages accurately', () => {
    const fixture = TestBed.createComponent(ArchitectureComponent);
    const component = fixture.componentInstance;
    component.jumpToStage(3);
    expect(component.activeStageIndex()).toBe(3);
    expect(component.currentStage().name).toBe('Quality Inspection');
  });
});

describe('Station 03: SMTP AI Robotics Vision Lab', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoboticsStationComponent]
    }).compileComponents();
  });

  it('should initialize with 4 gesture triggers and default to Open Palm', () => {
    const fixture = TestBed.createComponent(RoboticsStationComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.gestures.length).toBe(4);
    expect(component.activeGesture().id).toBe('open_palm');
  });

  it('should update gesture and gripper state on selection', () => {
    const fixture = TestBed.createComponent(RoboticsStationComponent);
    const component = fixture.componentInstance;
    const fistGesture = component.gestures.find((g) => g.id === 'fist')!;
    component.selectGesture(fistGesture);
    expect(component.activeGesture().id).toBe('fist');
    expect(component.gripperState()).toBe('CLOSED');
  });
});

describe('Station 04: Monolith Shogun Game Engine Studio', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameStationComponent]
    }).compileComponents();
  });

  it('should toggle between 60 FPS and 30 FPS modes', () => {
    const fixture = TestBed.createComponent(GameStationComponent);
    const component = fixture.componentInstance;
    expect(component.fpsMode()).toBe('60fps');
    component.setMode('30fps');
    expect(component.fpsMode()).toBe('30fps');
  });
});

describe('Station 05: Tech Arsenal & Academic Vault', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultStationComponent]
    }).compileComponents();
  });

  it('should filter skill categories by search query', () => {
    const fixture = TestBed.createComponent(VaultStationComponent);
    const component = fixture.componentInstance;
    component.searchQuery.set('Angular');
    const filtered = component.filteredSkillCategories();
    expect(filtered.some((cat) => cat.skills.includes('Angular'))).toBe(true);
  });
});

describe('Station 06: Transmission Base & Comms Relay', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    }).compileComponents();
  });

  it('should initialize with verified LinkedIn and GitHub links', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    expect(component.profile.socials.linkedin).toContain('linkedin.com/in/jaswanthvadivelan');
    expect(component.profile.socials.github).toContain('github.com/JaswanthVadivelan');
  });
});
