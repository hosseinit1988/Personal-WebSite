export type Language = 'fa' | 'en';
export type Theme = 'dark' | 'light';

export interface Project {
  id: string;
  title: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  fullDetails: {
    fa: string;
    en: string;
  };
  category: 'network' | 'devops' | 'security' | 'tools';
  stars: number;
  forks: number;
  tags: string[];
  githubUrl: string;
  badge?: string;
  commandSnippet?: string;
  keyFeatures: {
    fa: string[];
    en: string[];
  };
  architecture: {
    fa: string;
    en: string;
  };
}

export interface NewsArticle {
  id: string;
  title: {
    fa: string;
    en: string;
  };
  summary: {
    fa: string;
    en: string;
  };
  content: {
    fa: string;
    en: string;
  };
  category: 'network' | 'linux' | 'security' | 'cloud';
  dateShamsi: string;
  dateGregorian: string;
  readTime: string;
  author: {
    fa: string;
    en: string;
  };
  tags: string[];
  views: number;
  likes: number;
  featured?: boolean;
}

export interface SkillCategory {
  title: {
    fa: string;
    en: string;
  };
  skills: {
    name: string;
    level: number;
    icon: string;
  }[];
}
