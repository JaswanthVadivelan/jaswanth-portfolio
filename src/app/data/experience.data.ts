import { ExperienceItem } from '../core/models/portfolio.models';

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    title: 'Full Stack & Enterprise Software Developer',
    organization: 'Enterprise Manufacturing & Operations Engineering (Confidential)',
    location: 'Chennai, India',
    period: '2024 – 2025',
    type: 'Project Engineering',
    highlights: [
      'Architected end-to-end Manufacturing Execution System (MES) modules spanning production logs, job order routing, and quality inspection workflows under NDA.',
      'Engineered high-performance REST APIs in Django REST Framework and PostgreSQL database schemas with query optimization and indexing.',
      'Implemented dynamic frontend interfaces using Angular, Tailwind CSS, and Angular Material with real-time tabular data and bulk Excel upload integration (OpenPyXL).'
    ],
    technologies: ['Angular', 'Django', 'Django REST Framework', 'PostgreSQL', 'Python', 'Tailwind CSS', 'OpenPyXL']
  },
  {
    id: 'exp-2',
    title: 'Data Science & AI Developer',
    organization: 'Applied AI & Predictive Analytics Engineering',
    location: 'Chennai, India',
    period: '2023 – 2024',
    type: 'Project Engineering',
    highlights: [
      'Designed machine learning predictive models and conversational AI pipelines using RAG architecture.',
      'Created data visualization dashboards in Power BI, Tableau, and Matplotlib for operational analysis.',
      'Executed robust unit and integration testing pipelines to validate data integrity and API contracts.'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Power BI', 'SQL']
  }
];
