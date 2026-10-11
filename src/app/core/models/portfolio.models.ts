export interface ProfileData {
  name: string;
  role: string;
  headline: string;
  company: string;
  location: string;
  introduction: string[];
  socials: {
    github: string;
    linkedin: string;
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  employmentType: 'Full-time' | 'Internship';
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface MesWorkflowStage {
  step: number;
  name: string;
  subtitle: string;
  description: string;
  keyAspects: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  period?: string;
  description: string;
  technologies: string[];
  highlights: string[];
  isConceptual?: boolean;
  conceptualWorkflow?: MesWorkflowStage[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field?: string;
  period: string;
  score: string;
  scoreType: 'CGPA' | 'Percentage';
  description?: string;
  achievements?: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  context: string;
  icon: string;
  description: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}


