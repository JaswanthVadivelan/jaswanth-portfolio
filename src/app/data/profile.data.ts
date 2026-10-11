import { ProfileData } from '../core/models/portfolio.models';

export const PROFILE_DATA: ProfileData = {
  name: 'Jaswanth V.',
  role: 'Full-stack Software Developer',
  headline: 'Building Software That Connects Technology with the Real World.',
  company: 'ProdXP.ai',
  location: 'Chennai, Tamil Nadu, India',
  introduction: [
    "Hi, I'm Jaswanth V.",
    "I'm a Full-stack Software Developer building practical software solutions for real-world problems. Currently, I work at ProdXP.ai, developing a Manufacturing Execution System that supports industrial manufacturing workflows.",
    "I enjoy working across frontend, backend, databases, and application testing, while exploring technologies in AI, robotics, and interactive application development."
  ],
  socials: {
    linkedin: 'https://www.linkedin.com/in/jaswanthvadivelan',
    github: 'https://github.com/JaswanthVadivelan'
  }
};

export const ABOUT_ME_DATA = {
  headline: 'Bridging Software Architecture with Real Shop-Floor Operations',
  paragraphs: [
    "I'm a Full-stack Software Developer based in Chennai, India, currently working at ProdXP.ai on a Manufacturing Execution System for industrial manufacturing workflows.",
    "My work spans frontend development, backend APIs, database operations, debugging, and feature validation. Working in a startup environment has given me opportunities to contribute across different parts of the application and understand how software requirements connect with real shop-floor operations.",
    "My background in Artificial Intelligence and Data Science, along with my experience in robotics, IoT, and game development, has shaped my interest in building practical and reliable technology solutions."
  ],
  keyPillars: [
    {
      title: 'Full-Stack Engineering',
      description: 'Building end-to-end web applications with Angular, Django REST Framework, and PostgreSQL.'
    },
    {
      title: 'Industrial Manufacturing Domain',
      description: 'Understanding shop-floor operational workflows to design and validate reliable MES features.'
    },
    {
      title: 'AI, Robotics & Applied Tech',
      description: 'Foundational experience in computer vision, microcontroller systems, IoT, and interactive development.'
    }
  ]
};
