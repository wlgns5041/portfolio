import { projects } from "../../data/projects";
import { SectionTitle } from "../common/SectionTitle";

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="min-h-screen bg-slate-950 flex items-center"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <SectionTitle
          eyebrow="Projects"
          title="프로젝트"
          description="주도적으로 개발한 프로젝트들입니다."
        />

        <div className="space-y-20">
          {projects.map((project, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-3xl font-bold text-slate-100">
                {project.title}
              </h3>

              <p className="text-slate-400">{project.period}</p>

              <p className="text-lg text-slate-300 max-w-3xl">
                {project.summary}
              </p>

              <p className="text-slate-400">{project.role}</p>

              <ul className="flex flex-wrap gap-4 text-slate-400 text-sm">
                {project.techStack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>

              <div className="flex gap-8 pt-2">
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    className="text-teal-400 hover:underline"
                  >
                    Demo →
                  </a>
                )}
                {project.links?.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    className="text-teal-400 hover:underline"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
