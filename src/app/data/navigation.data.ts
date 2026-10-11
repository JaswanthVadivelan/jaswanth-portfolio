import { NavLink, JourneyStation } from '../core/models/portfolio.models';

export const JOURNEY_STATIONS: JourneyStation[] = [
  {
    id: 'station-origin',
    number: '01',
    name: 'Command Deck & Origin',
    subtitle: 'Identity & Core Telemetry',
    sector: 'ORIGIN // CHENNAI BASE',
    icon: 'compass',
    coordinates: '13.0827° N, 80.2707° E'
  },
  {
    id: 'station-mes',
    number: '02',
    name: 'ProdXP MES Command Hub',
    subtitle: 'Industrial Architecture & Live Flow',
    sector: 'INDUSTRIAL // FULL-STACK',
    icon: 'factory',
    coordinates: '12.9716° N, 77.5946° E'
  },
  {
    id: 'station-robotics',
    number: '03',
    name: 'SMTP AI & Robotics Lab',
    subtitle: 'Vision & Inverse Kinematics',
    sector: 'AI & VISION // EMBEDDED',
    icon: 'bot',
    coordinates: 'LAB // SENSOR-ARRAY-4'
  },
  {
    id: 'station-game',
    number: '04',
    name: 'Monolith Game Engine Studio',
    subtitle: 'Shogun Run Diagnostics & Profiling',
    sector: 'SIMULATION // AVGC-XR',
    icon: 'gamepad-2',
    coordinates: 'ENGINE // 60FPS-PIPELINE'
  },
  {
    id: 'station-vault',
    number: '05',
    name: 'Tech Arsenal & Academic Vault',
    subtitle: 'Skills, Career Odyssey & Honors',
    sector: 'KNOWLEDGE // DISTINCTION',
    icon: 'shield',
    coordinates: 'VAULT // CGPA-8.5-RANK-3'
  },
  {
    id: 'station-comms',
    number: '06',
    name: 'Transmission Relay & Comms',
    subtitle: 'Resume Dispatch & Direct Relay',
    sector: 'TRANSMISSION // DISPATCH',
    icon: 'radio',
    coordinates: 'COMMS // SECURE-UPLINK'
  }
];

export const NAV_LINKS: NavLink[] = [
  { id: 'station-origin', label: '01. Origin', href: '#station-origin' },
  { id: 'station-mes', label: '02. Industrial MES', href: '#station-mes' },
  { id: 'station-robotics', label: '03. Robotics Lab', href: '#station-robotics' },
  { id: 'station-game', label: '04. Game Studio', href: '#station-game' },
  { id: 'station-vault', label: '05. Knowledge Vault', href: '#station-vault' },
  { id: 'station-comms', label: '06. Comms Base', href: '#station-comms' }
];

