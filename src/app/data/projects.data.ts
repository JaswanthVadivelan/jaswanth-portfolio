import { ProjectItem } from '../core/models/portfolio.models';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'mes-industrial-software',
    title: 'Manufacturing Execution System (MES)',
    category: 'Industrial Software & Full-Stack',
    period: '2026 – Present',
    description:
      'Contributing to a web-based Manufacturing Execution System designed to support industrial manufacturing workflows. My work involves full-stack development, API implementation, database operations, application debugging, and functional validation.',
    technologies: [
      'Angular',
      'Python',
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'AWS'
    ],
    highlights: [
      'Full-stack architecture integrating Angular frontends with Django REST APIs',
      'Optimized relational database queries and schema operations with PostgreSQL',
      'Practical translation of shop-floor operational requirements into reliable software logic',
      'Comprehensive functional testing and performance validation for industrial reliability'
    ],
    isConceptual: true,
    conceptualWorkflow: [
      {
        step: 1,
        name: 'Production Planning',
        subtitle: 'Resource & Capacity Scheduling',
        description: 'Scheduling factory work centers, defining bills of materials (BOM), and allocating machinery capacities.',
        keyAspects: ['Work Center Routing', 'Capacity Scheduling', 'BOM Configuration']
      },
      {
        step: 2,
        name: 'Job Orders',
        subtitle: 'Work Order Dispatching',
        description: 'Generating batch orders, lot numbers, and routing instructions for operational lines.',
        keyAspects: ['Order Sequencing', 'Batch Tracking', 'Operator Assignment']
      },
      {
        step: 3,
        name: 'Shop-Floor Execution',
        subtitle: 'Real-Time Machine & Line Operations',
        description: 'Capturing real-time production counts, machine telemetry, operator logs, and shift milestones.',
        keyAspects: ['Cycle Time Tracking', 'Machine Status', 'Operator Logging']
      },
      {
        step: 4,
        name: 'Quality Inspection',
        subtitle: 'In-line QA & Compliance Checking',
        description: 'Validating tolerance limits, logging defect classifications, and enforcing gatekeeper approvals.',
        keyAspects: ['Defect Logging', 'Tolerance Verification', 'Compliance Audits']
      },
      {
        step: 5,
        name: 'Production Analytics',
        subtitle: 'OEE & Operational Yield Reporting',
        description: 'Aggregating operational equipment effectiveness (OEE), throughput yields, downtime analysis, and executive summaries.',
        keyAspects: ['OEE Calculation', 'Throughput Metrics', 'Downtime Analysis']
      }
    ]
  },
  {
    id: 'ai-robotic-arm',
    title: 'AI-Powered Gesture Recognition & Robotic Arm',
    category: 'Artificial Intelligence & Robotics / IoT',
    period: '2025',
    description:
      'An AI-powered robotic arm that interprets human hand gestures through computer vision and translates recognized gestures into robotic movements. The project combines machine learning, hardware integration, and IoT communication for touchless control.',
    technologies: [
      'Python',
      'TensorFlow',
      'OpenCV',
      'Raspberry Pi',
      'Arduino',
      'MQTT',
      'Computer Vision',
      'Robotics'
    ],
    highlights: [
      'Real-time hand gesture recognition workflow using OpenCV and TensorFlow',
      'Edge computer vision inference deployed on Raspberry Pi microcomputing unit',
      'Embedded hardware actuator control driving a 3D-printed multi-axis robotic arm via Arduino',
      'Lightweight MQTT messaging protocol for low-latency touchless control signals'
    ]
  },
  {
    id: 'shogun-run',
    title: 'Shogun Run — Interactive Game Development',
    category: 'Game Development & Interactive Systems',
    period: '2024',
    description:
      'Contributed to Shogun Run, an endless-running game set in a Japanese-themed environment during my game development internship. Worked on debugging, optimization, gameplay functionality, and Windows compatibility while gaining practical experience with interactive application development.',
    technologies: [
      'Game Development',
      'Gameplay Mechanics',
      'Performance Optimization',
      'Windows Testing',
      'AVGC-XR Pipeline'
    ],
    highlights: [
      'Endless-running gameplay mechanics and dynamic obstacle systems',
      'Japanese-inspired aesthetic environment and visual pacing',
      'Performance profiling, frame rate stabilization, and memory optimization',
      'Comprehensive Windows platform gameplay verification and debugging'
    ]
  }
];
