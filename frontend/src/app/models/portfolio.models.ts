export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  socialLinks: SocialLink[];
  cvUrl?: string;
  formspreeId?: string;
}

export interface Skill {
  id?: number;
  name: string;
  category: string;
  level: number;
  icon: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  featured: boolean;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  companyUrl?: string;
  logoUrl?: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string;
  logoUrl?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
