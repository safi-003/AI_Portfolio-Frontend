"use client";

import { useContext } from "react";
import { ChatContext, type view } from "@/app/context/context";
import {
  User,
  FolderOpen,
  Article,
  type Icon,
} from "@phosphor-icons/react";

type Tile = {
  id: view;
  label: string;
  description: string;
  icon: Icon;
};

const tiles: Tile[] = [
  {
    id: "about",
    label: "About",
    description: "Background, skills & what drives me",
    icon: User,
  },
  {
    id: "projects",
    label: "Projects",
    description: "Selected work & case studies",
    icon: FolderOpen,
  },
  {
    id: "blog",
    label: "Blog",
    description: "Articles, thoughts & learnings",
    icon: Article,
  },
];

function getGridClass(count: number) {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
}

function Home() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("ChatContext not found");
  }

  const { setActiveView } = context;
  const tileCount = tiles.length;

  return (
    <section className="w-full min-w-0 max-w-full h-full flex flex-col overflow-hidden">
      <div
        className={`
          flex-1 min-h-0 w-full max-w-full
          grid ${getGridClass(tileCount)}
          auto-rows-fr
          gap-2 sm:gap-4 md:gap-5
          content-stretch
        `}
      >
        {tiles.map((tile) => {
          const IconComponent = tile.icon;

          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => setActiveView(tile.id)}
              className="
                group relative overflow-hidden
                flex flex-row sm:flex-col items-center sm:items-start
                justify-between sm:justify-between
                gap-2 sm:gap-4
                w-full max-w-full min-w-0
                p-2.5 sm:p-6 md:p-7
                min-h-[3.75rem] sm:min-h-[10rem]
                rounded-lg sm:rounded-2xl
                text-left
                bg-white
                border border-zinc-200
                shadow-sm
                transition-all duration-300 ease-out
                hover:bg-zinc-50
                hover:border-zinc-300
                hover:shadow-md
                sm:hover:-translate-y-0.5
                active:scale-[0.98]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300
              "
            >
              <div
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  bg-gradient-to-br from-zinc-50 via-transparent to-transparent
                  transition-opacity duration-300 pointer-events-none
                "
                aria-hidden
              />

              <div className="relative flex items-center gap-2 sm:flex-col sm:items-start sm:gap-4 flex-1 min-w-0 overflow-hidden">
                <div
                  className="
                    relative flex items-center justify-center shrink-0
                    w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl
                    bg-zinc-100 border border-zinc-200
                    text-zinc-700
                    group-hover:text-zinc-900
                    group-hover:bg-zinc-200/70
                    group-hover:border-zinc-300
                    transition-all duration-300
                  "
                >
                  <IconComponent size={18} weight="duotone" className="sm:hidden" />
                  <IconComponent size={22} weight="duotone" className="hidden sm:block" />
                </div>

                <div className="relative space-y-0 sm:space-y-1.5 flex-1 min-w-0 overflow-hidden">
                  <h3 className="text-sm sm:text-lg font-semibold text-zinc-900 tracking-tight leading-tight truncate sm:whitespace-normal">
                    {tile.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 leading-snug sm:leading-relaxed group-hover:text-zinc-600 transition-colors line-clamp-2 sm:line-clamp-none break-words">
                    {tile.description}
                  </p>
                </div>
              </div>

              <span
                className="
                  relative shrink-0 ml-0.5
                  sm:mt-auto
                  text-xs font-medium text-zinc-400
                  group-hover:text-zinc-600 transition-colors duration-300
                  hidden sm:inline
                "
              >
                Explore →
              </span>

              <span
                className="
                  relative shrink-0 sm:hidden
                  text-zinc-400 group-hover:text-zinc-600
                  transition-colors text-sm
                "
                aria-hidden
              >
                →
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Home;
