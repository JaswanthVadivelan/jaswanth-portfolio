import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './features/hero/hero.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { SkillsComponent } from './features/skills/skills.component';
import { EducationComponent } from './features/education/education.component';
import { AchievementsComponent } from './features/achievements/achievements.component';
import { ContactComponent } from './features/contact/contact.component';

describe('HeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent]
    }).compileComponents();
  });

  it('should initialize and render authentic profile details and metrics', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.profile.name).toBe('Jaswanth V.');
    expect(component.profile.company).toBe('ProdXP.ai');
    expect(component.aboutData.keyPillars.length).toBe(3);
  });
});

describe('ExperienceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent]
    }).compileComponents();
  });

  it('should initialize with 4 verified professional experiences', () => {
    const fixture = TestBed.createComponent(ExperienceComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.experiences.length).toBe(4);
    expect(component.experiences[0].company).toBe('ProdXP.ai');
    expect(component.experiences[0].employmentType).toBe('Full-time');
  });
});

describe('ProjectsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent]
    }).compileComponents();
  });

  it('should initialize with 3 signature engineering projects', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.projects.length).toBe(3);
    expect(component.activeProject()?.id).toBe('mes-industrial-software');
  });

  it('should switch active project tab', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    const component = fixture.componentInstance;
    component.selectedProjectId.set('ai-robotic-arm');
    expect(component.activeProject()?.id).toBe('ai-robotic-arm');
    expect(component.activeProject()?.title).toContain('Robotic Arm');
  });
});

describe('SkillsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent]
    }).compileComponents();
  });

  it('should filter skill categories by search query', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    const component = fixture.componentInstance;
    component.searchQuery.set('Angular');
    const filtered = component.filteredCategories();
    expect(filtered.some((cat) => cat.skills.some((s) => s.toLowerCase().includes('angular')))).toBe(true);
  });

  it('should filter by category tabs', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    const component = fixture.componentInstance;
    component.selectedCategoryTab.set('Frontend');
    const filtered = component.filteredCategories();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((cat) => cat.title.includes('Frontend'))).toBe(true);
  });
});

describe('EducationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationComponent]
    }).compileComponents();
  });

  it('should display degree with 8.5 CGPA and Rank 3 distinction', () => {
    const fixture = TestBed.createComponent(EducationComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.education[0].score).toBe('8.5 / 10');
    expect(component.education[0].achievements?.[0]).toContain('Third rank');
  });
});

describe('AchievementsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementsComponent]
    }).compileComponents();
  });

  it('should initialize with 5 verified academic and technical honors', () => {
    const fixture = TestBed.createComponent(AchievementsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.achievements.length).toBe(5);
  });
});

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    }).compileComponents();
  });

  it('should initialize with verified LinkedIn and GitHub profiles', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    expect(component.profile.socials.linkedin).toContain('linkedin.com/in/jaswanthvadivelan');
    expect(component.profile.socials.github).toContain('github.com/JaswanthVadivelan');
  });
});
