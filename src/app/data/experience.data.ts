import { ExperienceItem } from '../core/models/portfolio.models';

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'prodxp-fulltime',
    role: 'Software Developer',
    company: 'ProdXP.ai',
    location: 'Chennai, Tamil Nadu, India',
    period: 'August 2026 – Present',
    employmentType: 'Full-time',
    description:
      'Developing and enhancing a web-based Manufacturing Execution System (MES) for industrial manufacturing operations. Working across frontend, backend, databases, and cloud technologies to implement application modules, business logic, REST APIs, and production-focused features.',
    responsibilities: [
      'Engineered core MES application modules and business logic connecting Angular frontends with Django REST APIs.',
      'Contributed to debugging, functional testing, issue resolution, application performance optimization, and feature validation.',
      'Applied practical knowledge of shop-floor workflows to help ensure that application behavior aligns with manufacturing requirements.',
      'Participated in PostgreSQL database operations and cloud-oriented application delivery on AWS.'
    ],
    technologies: [
      'Python',
      'Django',
      'Django REST Framework',
      'Angular',
      'PostgreSQL',
      'AWS',
      'REST APIs',
      'Functional Testing'
    ]
  },
  {
    id: 'prodxp-intern',
    role: 'Software Developer Intern',
    company: 'ProdXP.ai',
    location: 'Chennai, Tamil Nadu, India',
    period: 'February 2026 – August 2026',
    employmentType: 'Internship',
    description:
      'Contributed to the development of a web-based Manufacturing Execution System for industrial manufacturing operations. Worked on frontend development using Angular, backend API development using Django and Django REST Framework, and database operations using PostgreSQL.',
    responsibilities: [
      'Built responsive frontend UI components in Angular and integrated them with backend REST endpoints.',
      'Implemented backend API endpoints and business logic using Django and Django REST Framework.',
      'Managed database schema queries and operations using PostgreSQL.',
      'Participated in functional testing, debugging, issue resolution, and feature validation across application modules while collaborating with the development team.'
    ],
    technologies: [
      'Angular',
      'TypeScript',
      'Python',
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'REST APIs'
    ]
  },
  {
    id: 'smtp-groups',
    role: 'AI and Robotics Intern',
    company: 'SMTP Groups',
    location: 'Chennai, Tamil Nadu, India',
    period: 'February 2025 – May 2025',
    employmentType: 'Internship',
    description:
      'Designed and developed an AI-powered, IoT-enabled robotic arm capable of interpreting human hand gestures for remote, touchless control. Worked with computer vision, machine learning, microcontroller-based control, and robotics integration.',
    responsibilities: [
      'Developed a real-time hand gesture recognition workflow using TensorFlow and OpenCV.',
      'Implemented computer vision inference and integrated pipelines with Raspberry Pi.',
      'Integrated a 3D-printed robotic arm with Arduino-based servo actuators.',
      'Employed MQTT protocol for lightweight, low-latency communication and remote-control functionality.',
      'Explored robotics applications in assistive technology and industrial automation environments.'
    ],
    technologies: [
      'Python',
      'TensorFlow',
      'OpenCV',
      'Raspberry Pi',
      'Arduino',
      'MQTT',
      'Computer Vision',
      'Robotics'
    ]
  },
  {
    id: 'monolith-labs',
    role: 'Game and AR/VR Developer',
    company: 'Monolith Research and Training Labs',
    location: 'Chennai, Tamil Nadu, India',
    period: 'August 2024 – November 2024',
    employmentType: 'Internship',
    description:
      'Worked with the AVGC-XR and Business Development team, contributing to Shogun Run, an endless-running game set in a Japanese-inspired environment. Gained practical exposure to game development, debugging, optimization, and Windows gameplay testing. Also gained introductory exposure to AR, VR, and MR technologies.',
    responsibilities: [
      'Developed and refined game features and interactive mechanics for Shogun Run.',
      'Conducted debugging, performance profiling, and gameplay optimization.',
      'Executed Windows platform gameplay validation and testing.',
      'Collaborated within an agile development team on interactive asset pipelines and immersive technology concepts.'
    ],
    technologies: [
      'Game Development',
      'Interactive Systems',
      'Gameplay Optimization',
      'Windows Testing',
      'AR/VR Concepts',
      'Debugging'
    ]
  }
];
