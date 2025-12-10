import { projects } from "../../data/projects";
import { SectionTitle } from "../common/SectionTitle";

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="min-h-screen px-6 md:px-12 lg:px-24 py-24 bg-slate-950 text-slate-50"
    >
      <SectionTitle
        eyebrow="Projects"
        title="대표 프로젝트"
        description="주도적으로 개발한 프로젝트들을 소개합니다."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-teal-400 transition"
          >
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              {project.title}
            </h3>

            <p className="text-sm text-slate-400 mb-2">{project.period}</p>
            <p className="text-sm text-slate-300 mb-4">{project.summary}</p>

            <div className="flex flex-wrap gap-2 my-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-sm text-slate-400 mb-3">{project.role}</p>

            <div className="flex gap-4 mt-4">
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  className="text-teal-400 hover:underline text-sm"
                >
                  Demo →
                </a>
              )}
              {project.links?.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  className="text-teal-400 hover:underline text-sm"
                >
                  GitHub →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;