import { ProjectItem } from '../core/models/portfolio.models';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'enterprise-mes-platform',
    title: 'Enterprise Manufacturing Execution System (MES)',
    subtitle: 'Confidential Enterprise Project • Sanitized Architecture & Operations Platform',
    description: 'An enterprise-tier smart manufacturing platform engineered to digitize shop-floor execution, monitor real-time machine telemetry, calculate OEE metrics, and optimize industrial supply chains with automated reporting. (Details sanitized for confidentiality).',
    isFeatured: true,
    category: 'Enterprise / MES',
    technologies: ['Angular', 'Django', 'Django REST Framework', 'PostgreSQL', 'Python', 'REST APIs', 'Tailwind CSS', 'Angular Material', 'OpenPyXL'],
    modules: [
      {
        title: 'Production Logging Subsystem',
        description: 'Real-time shift activity recording, operator audit logging, and hourly yield metrics capture.',
        tags: ['Shift Tracking', 'Audit Trail', 'Yield']
      },
      {
        title: 'Plan vs Actual Engine',
        description: 'Comparative throughput analytics comparing planned production schedule against realized shop-floor output.',
        tags: ['Throughput', 'Variance Analysis']
      },
      {
        title: 'OEE Telemetry Dashboard',
        description: 'Real-time computation of Overall Equipment Effectiveness across Availability, Performance, and Quality.',
        tags: ['OEE', 'KPI Dashboard', 'Telemetry']
      },
      {
        title: 'Quality Inspection Module',
        description: 'Multi-stage defect categorization, rejection Pareto analysis, and tolerance compliance recording.',
        tags: ['Quality Assurance', 'Defect Log']
      },
      {
        title: 'Supply Chain Management (SCM)',
        description: 'Raw material inventory buffers, work-in-progress (WIP) tracking, and replenishment triggers.',
        tags: ['WIP Tracking', 'Inventory', 'Logistics']
      },
      {
        title: 'Costing & Resource Analytics',
        description: 'Direct labor allocation, machine downtime cost distribution, and unit variance modeling.',
        tags: ['Cost Modeling', 'Margin Analysis']
      },
      {
        title: 'Job Order Routing',
        description: 'End-to-end work order routing from order creation to machining, inspection, and dispatch.',
        tags: ['Routing', 'Work Orders']
      },
      {
        title: 'High-Throughput Ingestion & Reports',
        description: 'Excel parsing and data validation powered by OpenPyXL with automated report generation pipelines.',
        tags: ['OpenPyXL', 'Data Ingestion', 'Automated Reports']
      }
    ],
    keyHighlights: [
      'Engineered normalized PostgreSQL relational schemas optimized for high write-frequency telemetry and historical querying.',
      'Constructed modular Angular standalone frontend with reusable reactive tables, dynamic filter bars, and modal workflows.',
      'Secured Django REST Framework API endpoints with token authentication, role-based access, and strict input validation.'
    ],
    architectureNotes: 'Angular Standalone Client ➔ Django REST Framework API Layer ➔ PostgreSQL Relational Store + OpenPyXL Engine (Confidential Enterprise Scope)'
  },
  {
    id: 'ai-knowledge-chatbot',
    title: 'Intelligent AI Chatbot & Knowledge Retrieval Engine',
    subtitle: 'Context-Aware Conversational Assistant Powered by RAG',
    description: 'Engineered a conversational AI agent designed for rapid knowledge querying and document synthesis, integrating semantic search and embeddings for precise domain retrieval.',
    isFeatured: false,
    category: 'AI / Data Science',
    technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'RAG', 'REST APIs', 'Pandas', 'PostgreSQL'],
    keyHighlights: [
      'Implemented vector search retrieval pipeline to minimize hallucination and enhance response accuracy.',
      'Created modular REST endpoints for chat session persistence and token usage telemetry.',
      'Built a responsive web client with real-time markdown streaming and reference citation badges.'
    ]
  },
  {
    id: 'predictive-analytics-suite',
    title: 'Operations Analytics & Predictive Modeling Suite',
    subtitle: 'Statistical Forecasting and Multi-Dimensional BI Dashboards',
    description: 'An analytical workbench combining statistical data preprocessing, time-series forecasting, and interactive multi-dimensional business dashboards.',
    isFeatured: false,
    category: 'AI / Data Science',
    technologies: ['Python', 'Pandas', 'NumPy', 'Power BI', 'Tableau', 'Matplotlib', 'SQL'],
    keyHighlights: [
      'Developed automated ETL scripts in Python and SQL to clean, normalize, and aggregate high-volume operational records.',
      'Built Power BI & Tableau interactive executive dashboards with DAX calculated measures.',
      'Trained scikit-learn regression and classification models to identify operational bottlenecks.'
    ]
  },
  {
    id: 'iot-robotics-controller',
    title: 'IoT Telemetry & Embedded Robotics Controller',
    subtitle: 'Hardware-to-Cloud Sensor Ingestion and Actuator Telemetry',
    description: 'Engineered an embedded sensor-actuator interface for real-time environmental monitoring and machine telemetry transmission over serial/network protocols.',
    isFeatured: false,
    category: 'IoT / Robotics',
    technologies: ['C/C++', 'Python', 'IoT Protocols', 'SQL', 'Data Logging'],
    keyHighlights: [
      'Interfaced microcontrollers with digital sensor arrays for low-latency telemetry acquisition.',
      'Built a lightweight Python gateway daemon to buffer and forward sensor payloads to backend storage.',
      'Designed fail-safe error handling and watchdog monitoring routines.'
    ]
  }
];
