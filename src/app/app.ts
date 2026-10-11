import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './features/hero/hero.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { SkillsComponent } from './features/skills/skills.component';
import { EducationComponent } from './features/education/education.component';
import { AchievementsComponent } from './features/achievements/achievements.component';
import { ContactComponent } from './features/contact/contact.component';
import { ScrollSpyService } from './core/services/scroll-spy.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    EducationComponent,
    AchievementsComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  private readonly scrollSpy = inject(ScrollSpyService);

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.scrollSpy.initSpy();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    this.scrollSpy.destroy();
  }
}
