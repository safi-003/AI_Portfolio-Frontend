"use client";

import Image from "next/image";
import { useContext } from "react";
import { ChatContext } from "@/app/context/context";
import { aboutMe } from "@/app/data/aboutMe";
import { hero } from "@/app/data/hero";
import { ArrowLeft, Copy, EnvelopeSimple, Target } from "@phosphor-icons/react";

function About() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("ChatContext not found");
  }

  const { setActiveView } = context;
  const paragraphs = aboutMe.description.split("\n\n");

  const handleContactClick = () => {};

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

      <div className="w-full min-w-0 rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 shadow-sm">
        <div className="flex flex-col items-center text-center w-full min-w-0">
          <Image
            src={hero.image}
            alt={hero.name}
            width={160}
            height={160}
            priority
            className="
              w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44
              rounded-full object-cover
              border-[3px] border-zinc-200
              shadow-lg shadow-zinc-200/60
              mb-4 sm:mb-5
            "
          />

          <div className="space-y-1 w-full min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900">
              {aboutMe.title}
            </h2>
            <div className="h-0.5 w-12 rounded-full bg-[#00d692]/60 mx-auto" />
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 w-full min-w-0">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-sm sm:text-sm md:text-base text-zinc-600 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <button
          type="button"
          onClick={handleContactClick}
          className="
            group relative w-full
            inline-flex items-center justify-between gap-3
            px-4 py-3 sm:px-5 sm:py-3.5
            rounded-xl
            border border-zinc-200 bg-zinc-50
            text-left
            hover:border-[#00d692]/40 hover:bg-[#00d692]/5
            transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d692]/30
          "
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-zinc-200 text-zinc-600 group-hover:text-[#00a870] group-hover:border-[#00d692]/30 transition-colors">
              <EnvelopeSimple size={18} weight="duotone" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                Contact
              </p>
              <p className="text-sm sm:text-base font-medium text-zinc-900 truncate">
                {hero.contact}
              </p>
            </div>
          </div>

          <div
            className="
              flex items-center justify-center w-8 h-8 rounded-lg
              bg-white border border-zinc-200
              text-zinc-400 group-hover:text-[#00a870] group-hover:border-[#00d692]/30
              opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
              transition-all duration-200
            "
          >
            <Copy size={16} weight="duotone" />
          </div>
        </button>

        <div className="w-full min-w-0 rounded-lg sm:rounded-xl border border-[#00d692]/20 bg-[#00d692]/5 p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <Target
              size={18}
              weight="duotone"
              className="text-[#00a870] shrink-0 mt-0.5"
            />
            <div className="space-y-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-semibold text-zinc-800">
                Current Focus
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {aboutMe.currentFocus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
