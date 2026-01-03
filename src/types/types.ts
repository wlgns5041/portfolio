export interface Skill {
  name: string;
  level?: "basic" | "intermediate" | "advanced";
  category?: string; 
}

export interface Capability {
  title: string;     
  summary: string;   
  points: string[];  
  tags?: string[];   
}

export interface ExperienceCase {
  title: string; 
  project?: string; 
  items: {
    label: "문제" | "해결" | "성과" | "배운점";
    text: string;
  }[];
}

export interface Project {
  id: string;
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
   pdfUrl?: string;
   detailImages?: string[];
}

export interface ContactLink {
  label: string;  
  href: string;
  type?: "github" | "blog" | "email" | "phone" | "etc";
}