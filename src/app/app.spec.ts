import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the portfolio app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the 6 stations of the spatial journey', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check main landmark & HUD
    expect(compiled.querySelector('main')).toBeTruthy();
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    
    // Check the 6 visual stations
    expect(compiled.querySelector('app-hero')).toBeTruthy();
    expect(compiled.querySelector('app-architecture')).toBeTruthy();
    expect(compiled.querySelector('app-robotics-station')).toBeTruthy();
    expect(compiled.querySelector('app-game-station')).toBeTruthy();
    expect(compiled.querySelector('app-vault-station')).toBeTruthy();
    expect(compiled.querySelector('app-contact')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should display authentic identity in the hero origin station', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Jaswanth V.');
    expect(compiled.textContent).toContain('ProdXP.ai');
  });
});
