import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { InteractiveWorldComponent } from './three-d/world/interactive-world.component';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { FeaturedProjectComponent } from './features/featured-project/featured-project.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { ArchitectureComponent } from './features/architecture/architecture.component';
import { AchievementsComponent } from './features/achievements/achievements.component';
import { EducationComponent } from './features/education/education.component';
import { CertificationsComponent } from './features/certifications/certifications.component';
import { ResumeComponent } from './features/resume/resume.component';
import { ContactComponent } from './features/contact/contact.component';
import { ScrollSpyService } from './core/services/scroll-spy.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    InteractiveWorldComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    FeaturedProjectComponent,
    ProjectsComponent,
    AnalyticsComponent,
    ArchitectureComponent,
    AchievementsComponent,
    EducationComponent,
    CertificationsComponent,
    ResumeComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly scrollSpy = inject(ScrollSpyService);

  ngOnInit(): void {
    setTimeout(() => {
      this.scrollSpy.initSpy();
    }, 100);
  }
}
