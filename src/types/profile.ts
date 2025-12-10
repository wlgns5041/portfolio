export interface Skill {
  name: string;
  level?: "basic" | "intermediate" | "advanced";
  category?: string; 
}

export interface Experience {
  company: string;
  role: string;
  period: string;       
  description: string[]; 
}

export interface Project {
  title: string;
  period: string;
  techStack: string[];
  summary: string;
  role: string;
  links?: {
    demo?: string;
    repo?: string;
  };
}

export interface ContactLink {
  label: string;  
  href: string;
  type?: "github" | "blog" | "email" | "phone" | "etc";
}