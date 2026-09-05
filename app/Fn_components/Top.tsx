"use client";

import Image from "next/image";
import { hero } from "@/app/data/hero";
import { getResumeDocumentUrl, resumeDocument } from "@/app/data/resume";
import { useContext, useState } from "react";
import { ChatContext } from "@/app/context/context";
import ResumeViewer from "@/app/Fn_components/ResumeViewer";

const name = hero.name;
const roles = [hero.role, ...hero.skills];

function Top() {
  const context = useContext(ChatContext);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  if (context === undefined) {
    throw new Error("ChatContext not found");
  }

  const { setActiveView, activeView } = context;
  const isHome = activeView === "home";
  const isChat = activeView === "chat";

  const openResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResumeOpen(true);
  };

  return (
    <>
    <header
      className={`
        shrink-0 z-50 flex justify-center w-full min-w-0
        px-2 sm:px-4 md:px-6
        bg-white cursor-pointer
        ${isHome
          ? "pt-3 sm:pt-6 md:pt-8 pb-1.5 sm:pb-3"
          : isChat
            ? "pt-2 sm:pt-4 md:pt-6 pb-0.5 sm:pb-2"
            : "pt-3 sm:pt-4 md:pt-6 pb-1 sm:pb-2"
        }
      `}
      onClick={() => setActiveView("home")}
    >
      <div
        className={`
          w-full max-w-4xl min-w-0 flex flex-col items-center text-center px-0.5 sm:px-0
          ${isHome ? "gap-2 sm:gap-3" : isChat ? "gap-1 sm:gap-1.5" : "gap-1.5 sm:gap-1.5"}
        `}
      >
        <h1
          className={`
            w-full font-bold tracking-tight text-zinc-900 leading-tight
            ${isHome
              ? "text-2xl sm:text-3xl md:text-4xl lg:text-4xl"
              : isChat
                ? "text-base sm:text-xl md:text-2xl lg:text-3xl"
                : "text-lg sm:text-xl md:text-2xl lg:text-3xl"
            }
          `}
        >
          {name}
        </h1>

        <div
          className="
            flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-2 gap-y-1
            w-full min-w-0 px-0.5
          "
        >
          {roles.map((role, index) => (
            <span key={role} className="flex items-center gap-1 sm:gap-1.5">
              {index > 0 && (
                <span
                  className={`text-zinc-300 select-none ${isHome ? "text-sm sm:text-sm" : "text-xs sm:text-xs"}`}
                  aria-hidden
                >
                  |
                </span>
              )}
              <span
                className={`
                  text-zinc-500 font-medium tracking-wide
                  ${isHome
                    ? "text-sm sm:text-sm md:text-base"
                    : isChat
                      ? "text-xs sm:text-xs md:text-sm"
                      : "text-xs sm:text-xs md:text-sm"
                  }
                `}
              >
                {role}
              </span>
            </span>
          ))}
        </div>



       {/* for debugging the socials and resume - this renders the resume icon next to the socials */}
       {isHome && (
        <>
          <p className="w-full max-w-full sm:max-w-lg text-zinc-600 leading-relaxed text-sm sm:text-[15px] px-0.5">
            {hero.description}
          </p>

          <div
            className="flex items-center justify-center gap-1.5 sm:gap-3 pt-0"
            onClick={(e) => e.stopPropagation()}
          >
            {hero.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                title={s.name}
                className="
                  w-9 h-9 sm:w-11 sm:h-11
                  rounded-xl
                  flex items-center justify-center
                  bg-zinc-100 border border-zinc-200
                  hover:bg-zinc-200 hover:border-zinc-300
                  transition-all duration-200
                  group
                "
              >
                <Image
                  src={s.icon}
                  alt={s.name}
                  width={22}
                  height={18}
                  className="rounded-sm opacity-75 group-hover:opacity-100 transition-opacity"
                />
              </a>
            ))}


            {/* Resume Button */}
            <button
              type="button"
              onClick={openResume}
              className="
                mt-0 sm:mt-1
                px-4 sm:px-6 py-2 sm:py-3
                rounded-full
                bg-[#00d692] text-zinc-900
                text-xs sm:text-base font-semibold
                shadow-md shadow-[#00d692]/25
                hover:bg-[#00c484] hover:shadow-lg hover:shadow-[#00d692]/30
                active:scale-[0.98]
                transition-all duration-200
              "
            >
              View Resume
            </button>
          </div>
        </>
)}





        {/* {isHome && (
          <>
            <p className="w-full max-w-full sm:max-w-lg text-zinc-600 leading-relaxed text-sm sm:text-[15px] px-0.5">
              {hero.description}
            </p>

            <div
              className="flex items-center justify-center gap-1.5 sm:gap-3 pt-0"
              onClick={(e) => e.stopPropagation()}
            >
              {hero.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  title={s.name}
                  className="
                    w-9 h-9 sm:w-11 sm:h-11
                    rounded-xl
                    flex items-center justify-center
                    bg-zinc-100 border border-zinc-200
                    hover:bg-zinc-200 hover:border-zinc-300
                    transition-all duration-200
                    group
                  "
                >
                  <Image
                    src={s.icon}
                    alt={s.name}
                    width={22}
                    height={18}
                    className="rounded-sm opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={handleResumeAction}
              onMouseEnter={() => setResumeHovered(true)}
              onMouseLeave={() => setResumeHovered(false)}
              className="
                mt-0 sm:mt-1
                px-4 sm:px-6 py-2 sm:py-3
                rounded-full
                bg-[#00d692] text-zinc-900
                text-xs sm:text-base font-semibold
                shadow-md shadow-[#00d692]/25
                hover:bg-[#00c484] hover:shadow-lg hover:shadow-[#00d692]/30
                active:scale-[0.98]
                transition-all duration-200
              "
            >
              {resumeHovered
                ? copied
                  ? "Email Copied!"
                  : "Copy Email"
                : "View Resume"}
            </button>
          </>
        )} */}
      </div>
    </header>

    <ResumeViewer
      isOpen={isResumeOpen}
      onClose={() => setIsResumeOpen(false)}
      documentUrl={getResumeDocumentUrl()}
      downloadUrl={getResumeDocumentUrl(true)}
      downloadFilename={resumeDocument.filename}
      title={resumeDocument.title}
    />
    </>
  );
}

export default Top;
