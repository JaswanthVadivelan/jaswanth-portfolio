import { TestBed } from '@angular/core/testing';
import { SkillsComponent } from './features/skills/skills.component';
import { ContactComponent } from './features/contact/contact.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { ResumeComponent } from './features/resume/resume.component';
import { ThreeFallbackComponent } from './three-d/fallback/three-fallback.component';
import { ScrollSpyService } from './core/services/scroll-spy.service';
import { WorldSceneService } from './three-d/world/world-scene.service';

describe('Portfolio Features & Services Suite', () => {
  describe('SkillsComponent', () => {
    let component: SkillsComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SkillsComponent]
      });
      const fixture = TestBed.createComponent(SkillsComponent);
      component = fixture.componentInstance;
    });

    it('should initialize with all skills when "All" category is selected', () => {
      expect(component.filteredSkills().length).toBe(component.allSkills.length);
    });

    it('should filter skills accurately when category is changed', () => {
      component.selectedCategory.set('Languages');
      const languages = component.filteredSkills();
      expect(languages.every((s) => s.category === 'Languages')).toBe(true);
      expect(languages.length).toBeGreaterThan(0);
    });

    it('should filter skills when search query is entered', () => {
      component.searchQuery.set('PostgreSQL');
      const results = component.filteredSkills();
      expect(results.some((s) => s.name === 'PostgreSQL')).toBe(true);
    });
  });

  describe('ContactComponent', () => {
    let component: ContactComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ContactComponent]
      });
      const fixture = TestBed.createComponent(ContactComponent);
      component = fixture.componentInstance;
    });

    it('should be invalid when initialized empty', () => {
      expect(component.contactForm.valid).toBe(false);
    });

    it('should validate proper email and required fields', () => {
      component.contactForm.setValue({
        name: 'Jane Recruiter',
        email: 'jane@enterprise.com',
        subject: 'Software Engineering Opportunity',
        message: 'We would love to discuss a full-stack role with your background.',
        honeypot: ''
      });
      expect(component.contactForm.valid).toBe(true);
    });

    it('should flag invalid email formats', () => {
      component.contactForm.patchValue({
        email: 'invalid-email-string'
      });
      expect(component.contactForm.get('email')?.valid).toBe(false);
    });

    it('should ignore submissions when honeypot is populated', () => {
      component.contactForm.setValue({
        name: 'Bot User',
        email: 'bot@spam.com',
        subject: 'Spam Opportunity',
        message: 'Automated marketing message payload',
        honeypot: 'spam-bot-value'
      });
      component.onSubmit();
      expect(component.isSubmitted()).toBe(false);
    });
  });

  describe('AnalyticsComponent', () => {
    let component: AnalyticsComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AnalyticsComponent]
      });
      const fixture = TestBed.createComponent(AnalyticsComponent);
      component = fixture.componentInstance;
    });

    it('should initialize with visual charts mode and toggle to table mode', () => {
      expect(component.showTable()).toBe(false);
      component.showTable.set(true);
      expect(component.showTable()).toBe(true);
    });

    it('should provide deterministic KPI cards', () => {
      expect(component.kpiCards.length).toBe(4);
      expect(component.kpiCards[0].label).toBe('Overall OEE');
    });
  });

  describe('ResumeComponent', () => {
    let component: ResumeComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ResumeComponent]
      });
      const fixture = TestBed.createComponent(ResumeComponent);
      component = fixture.componentInstance;
    });

    it('should render recruiter snapshot', () => {
      expect(component.profile.name).toBe('Jaswanth V.');
      expect(component.showNotification()).toBe(false);
    });
  });

  describe('ThreeFallbackComponent', () => {
    it('should render accessible fallback SVG graphic', () => {
      TestBed.configureTestingModule({
        imports: [ThreeFallbackComponent]
      });
      const fixture = TestBed.createComponent(ThreeFallbackComponent);
      fixture.componentRef.setInput('title', 'Test Schematic');
      fixture.componentRef.setInput('badge', '3D Schematic');
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('svg')).toBeTruthy();
      expect(compiled.textContent).toContain('3D Schematic');
    });
  });

  describe('ScrollSpyService & WorldSceneService', () => {
    let scrollSpy: ScrollSpyService;
    let worldScene: WorldSceneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ScrollSpyService, WorldSceneService]
      });
      scrollSpy = TestBed.inject(ScrollSpyService);
      worldScene = TestBed.inject(WorldSceneService);
    });

    it('should default active section to home and initial waypoint to Command Center', () => {
      expect(scrollSpy.activeSection()).toBe('home');
      expect(worldScene.currentZone()).toBe('Command Center');
    });

    it('should update 3D waypoint when section is scrolled or navigated', () => {
      worldScene.setWaypoint('skills');
      expect(worldScene.currentZone()).toBe('Tech Radar Matrix');
      worldScene.setWaypoint('featured');
      expect(worldScene.currentZone()).toBe('Digital Factory Floor (MES)');
    });
  });
});
