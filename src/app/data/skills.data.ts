import { SkillCategory } from '../core/models/portfolio.models';

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Frontend Development',
    description: 'Engineering responsive, performant, component-driven user interfaces.',
    icon: 'layout',
    skills: [
      'Angular',
      'TypeScript',
      'HTML',
      'CSS',
      'Responsive UI Development'
    ]
  },
  {
    title: 'Backend Development',
    description: 'Architecting scalable server-side applications and secure RESTful services.',
    icon: 'server',
    skills: [
      'Python',
      'Django',
      'Django REST Framework',
      'REST API Development'
    ]
  },
  {
    title: 'Databases & Storage',
    description: 'Designing relational database schemas, indexes, and queries.',
    icon: 'database',
    skills: [
      'PostgreSQL',
      'SQL'
    ]
  },
  {
    title: 'Cloud & Development Tooling',
    description: 'Version control, cloud infrastructure, performance profiling, and debugging.',
    icon: 'cloud',
    skills: [
      'AWS',
      'Git',
      'GitHub',
      'Application Debugging',
      'Performance Optimization'
    ]
  },
  {
    title: 'AI & Robotics',
    description: 'Applied machine learning, computer vision, and IoT hardware integration.',
    icon: 'bot',
    skills: [
      'Artificial Intelligence',
      'Machine Learning',
      'TensorFlow',
      'OpenCV',
      'Computer Vision',
      'IoT',
      'Arduino',
      'Raspberry Pi',
      'MQTT'
    ]
  },
  {
    title: 'Quality & Manufacturing Domain',
    description: 'Industrial shop-floor workflows and production-focused feature validation.',
    icon: 'factory',
    skills: [
      'Functional Testing',
      'Feature Validation',
      'Bug Investigation',
      'Shop-Floor Workflow Understanding',
      'Manufacturing Execution Systems'
    ]
  }
];
