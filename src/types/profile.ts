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
  people: string;
  techStack: string[];
  summary: string;
  role: string;
  image?: string;
  status?: "READY" | "WIP"; 
  thumbnailBg?: string;
  thumbnailMode?: "light" | "dark";
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