export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  subTagline: string;
  bio: string[];
  educationHighlights: string;
  location: string;
  socials: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface SkillItem {
  name: string;
  level: 'Advanced' | 'Proficient' | 'Familiar';
  category: 'Languages' | 'Frameworks & Frontend' | 'AI & Data Science' | 'Data & BI' | 'Databases & Backend' | 'Testing & Tools' | 'Emerging Tech';
  iconName?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  type: 'Education' | 'Internship' | 'Project Engineering';
  highlights: string[];
  technologies: string[];
}

export interface ProjectModule {
  title: string;
  description: string;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  isFeatured?: boolean;
  category: 'Enterprise / MES' | 'AI / Data Science' | 'Web & Backend' | 'IoT / Robotics';
  technologies: string[];
  modules?: ProjectModule[];
  keyHighlights: string[];
  architectureNotes?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  layer: 'Client Layer' | 'API & Business Logic' | 'Data & Storage' | 'Analytics & Processing';
  tech: string[];
  description: string;
}

export interface AnalyticsKpi {
  label: string;
  value: string;
  trend: string;
  isPositive: boolean;
  description: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  badgeText?: string;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  skills: string[];
}

export interface NavLink {
  id: string;
  label: string;
  fragment: string;
}

