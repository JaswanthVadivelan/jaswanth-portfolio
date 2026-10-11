import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './features/hero/hero.component';
import { ArchitectureComponent } from './features/architecture/architecture.component';
import { RoboticsStationComponent } from './features/robotics-station/robotics-station.component';
import { GameStationComponent } from './features/game-station/game-station.component';
import { VaultStationComponent } from './features/vault-station/vault-station.component';
import { ContactComponent } from './features/contact/contact.component';
import { WorldMapComponent } from './features/world-map/world-map.component';
import { RouteTransitComponent } from './features/route-transit/route-transit.component';
import { JourneyStateService } from './core/services/journey-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ArchitectureComponent,
    RoboticsStationComponent,
    GameStationComponent,
    VaultStationComponent,
    ContactComponent,
    WorldMapComponent,
    RouteTransitComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly journeyState = inject(JourneyStateService);
}
