"use client";

import { useContext } from "react";
import { ChatContext, type view } from "@/app/context/context";
import {
  User,
  FolderOpen,
  House,
  Article,
  FileText,
  type Icon,
} from "@phosphor-icons/react";

type NavItem = {
  id: view;
  label: string;
  icon: Icon;
};

const navItems: NavItem[] = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "home", label: "Home", icon: House },
  { id: "blog", label: "Blog", icon: Article },
];

function NavBar() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("ChatContext not found");
  }

  const { activeView, setActiveView } = context;

  const handleResumeClick = () => {};

  return (
    <nav
      aria-label="Main navigation"
      className="group/nav flex items-center justify-center gap-2 sm:gap-3 w-full min-w-0 max-w-[calc(100vw-1rem)] mx-auto py-1 box-border"
    >
      <div
        className="
          flex items-end justify-center gap-1 sm:gap-2
          px-3 py-2 sm:px-4 sm:py-2.5
          rounded-2xl sm:rounded-full
          bg-white backdrop-blur-md
          border border-zinc-200
          shadow-lg shadow-zinc-200/50
          transition-all duration-300 ease-out
          sm:group-hover/nav:gap-5 sm:group-hover/nav:px-6 sm:group-hover/nav:py-3
        "
      >
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveView(item.id)}
              className={`
                flex flex-col items-center justify-center
                min-w-[3.25rem] sm:min-w-[3.5rem]
                px-2 py-1.5 sm:py-2
                rounded-xl sm:rounded-2xl
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d692]/40
                ${isActive
                  ? "bg-[#00d692]/15 text-[#00a870]"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                }
              `}
            >
              <IconComponent
                size={22}
                weight={isActive ? "fill" : "duotone"}
                className="shrink-0"
              />
              <span
                className="
                  mt-0.5 text-[9px] sm:text-[10px] font-medium tracking-wide
                  max-h-4 opacity-70 overflow-hidden
                  sm:max-h-0 sm:opacity-0
                  sm:group-hover/nav:max-h-4 sm:group-hover/nav:opacity-100
                  transition-all duration-300
                "
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleResumeClick}
        aria-label="View Resume"
        className="
          shrink-0
          flex items-center justify-center gap-2
          px-4 py-2.5 sm:px-5 sm:py-3
          rounded-2xl sm:rounded-full
          bg-zinc-900 text-white
          shadow-lg shadow-zinc-900/20
          hover:bg-zinc-800 hover:shadow-xl
          active:scale-[0.97]
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30
        "
      >
        <FileText size={20} weight="duotone" className="shrink-0" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide">
          Resume
        </span>
      </button>
    </nav>
  );
}

export default NavBar;
