"use client";

import { useContext, useState } from "react";
import { ChatContext } from "@/app/context/context";
import { projects } from "@/app/data/projects";
import {
  ArrowLeft,
  ArrowSquareOut,
  CalendarBlank,
  GithubLogo,
  Sparkle,
} from "@phosphor-icons/react";

function Projects() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("ChatContext not found");
  }

  const { setActiveView } = context;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (selectedIndex !== null) {
    const project = projects[selectedIndex];

    return (
      <section className="w-full min-w-0 max-w-full sm:max-w-4xl mx-auto space-y-4 sm:space-y-5 pb-2">
        <button
          type="button"
          onClick={() => setSelectedIndex(null)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
          All Projects
        </button>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <aside className="lg:w-56 xl:w-64 shrink-0 space-y-3 sm:space-y-4 order-2 lg:order-1">
            <div
              className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 space-y-4 shadow-sm"
              style={{ borderTopColor: project.color_code, borderTopWidth: 3 }}
            >
              <div>
                <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium bg-zinc-100 border border-zinc-200 text-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-200">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600 hover:text-[#00a870] transition-colors"
                >
                  <GithubLogo size={16} weight="duotone" />
                  View on GitHub
                </a>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500">
                  <CalendarBlank size={16} weight="duotone" />
                  {project.release_date}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0 order-1 lg:order-2">
            <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 shadow-sm">
              <div className="space-y-2">
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">
                  {project.title}
                </h1>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#00a870] hover:underline break-all"
                  >
                    <ArrowSquareOut size={14} />
                    {project.url}
                  </a>
                )}
              </div>

              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed">
                {project.description}
              </p>

              <div>
                <h2 className="flex items-center gap-2 text-sm sm:text-base font-semibold text-zinc-800 mb-2 sm:mb-3">
                  <Sparkle size={16} weight="duotone" className="text-[#00a870]" />
                  Key Features
                </h2>
                <ul className="space-y-1.5 sm:space-y-2">
                  {project.keyFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-xs sm:text-sm text-zinc-600 leading-relaxed"
                    >
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: project.color_code }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full min-w-0 max-w-full sm:max-w-3xl mx-auto space-y-4 sm:space-y-5 pb-2">
      <button
        type="button"
        onClick={() => setActiveView("home")}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
      >
        <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
        Back
      </button>

      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">Projects</h2>
        <p className="text-xs sm:text-sm text-zinc-500">
          Selected work and case studies
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="
              group relative overflow-hidden w-full text-left
              rounded-xl sm:rounded-2xl p-4 sm:p-5
              bg-white border border-zinc-200
              shadow-sm
              transition-all duration-300
              hover:bg-zinc-50 hover:border-zinc-300
              hover:shadow-md active:scale-[0.99]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300
            "
            style={{ borderLeftWidth: 4, borderLeftColor: project.color_code }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${project.color_code}12, transparent 60%)`,
              }}
              aria-hidden
            />

            <div className="relative space-y-1.5 sm:space-y-2">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-zinc-900 group-hover:text-zinc-800 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed line-clamp-2 sm:line-clamp-3 group-hover:text-zinc-600 transition-colors">
                {project.miniDescription}
              </p>
              <span className="inline-block text-[10px] sm:text-xs font-medium text-zinc-400 group-hover:text-zinc-600 transition-colors">
                View details →
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Projects;
