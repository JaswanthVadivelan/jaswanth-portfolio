import { ArchitectureNode } from '../core/models/portfolio.models';

export const ARCHITECTURE_FLOW: ArchitectureNode[] = [
  {
    id: 'frontend-layer',
    title: 'Frontend Client Layer',
    layer: 'Client Layer',
    tech: ['Angular 22+', 'TypeScript (Strict)', 'Tailwind CSS', 'Angular Signals', 'Lucide Icons'],
    description: 'Standalone component architecture with modular sub-views, reactive signal-based state management, client-side validation, and accessible UI controls.'
  },
  {
    id: 'api-layer',
    title: 'Backend & API Layer',
    layer: 'API & Business Logic',
    tech: ['Python', 'Django', 'Django REST Framework', 'JWT Authentication', 'REST Endpoints'],
    description: 'Stateless REST API gateway handling authenticated requests, business rule execution, payload validation, and batch transaction processing.'
  },
  {
    id: 'database-layer',
    title: 'Data Persistence & Storage',
    layer: 'Data & Storage',
    tech: ['PostgreSQL', 'DBeaver', 'Relational Schemas', 'Indexing & Query Optimization'],
    description: 'Normalized transactional relational database with optimized indexes for high-frequency telemetry logs, job orders, and audit records.'
  },
  {
    id: 'analytics-layer',
    title: 'Analytics & Processing Engine',
    layer: 'Analytics & Processing',
    tech: ['Python', 'Pandas', 'NumPy', 'OpenPyXL', 'Power BI / Chart.js'],
    description: 'High-throughput data transformations, automated Excel/PDF report generation, real-time OEE statistical aggregations, and ML inference pipelines.'
  }
];

