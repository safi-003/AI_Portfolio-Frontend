"use client";

import Image from "next/image";
import { hero } from "../data/hero";
import { socials } from "../data/socials";
import { useContext } from "react";
import { ChatContext } from "@/app/context/context";

const topicTiles = [
  { label: "About Me", icon: "👤" },
  { label: "Projects", icon: "⚡" },
  { label: "Tech Stack", icon: "🛠" },
];

export default function Profile() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("ChatContext not found");
  }

  const { isChatOpen } = context;

  /* ─── SIDEBAR MODE ─── */
  // if (isChatOpen) {
  //   return (
  //     <aside
  //       className="
  //         flex flex-col
  //         w-[min(42vw,260px)] sm:w-[260px]
  //         min-w-[148px] sm:min-w-[260px]
  //         h-screen shrink-0
  //         bg-zinc-900/70 backdrop-blur-xl
  //         border-r border-zinc-800/80
  //         px-3 sm:px-5 pt-8 sm:pt-10 pb-6 sm:pb-8
  //         gap-5 sm:gap-8
  //         overflow-y-auto
  //         animate-fade-in
  //         transition-all duration-500 ease-in-out
  //       "
  //     >
  //       {/* Avatar */}
  //       <div className="flex flex-col items-center gap-3 sm:gap-5">
  //         <div className="relative">
  //           <Image
  //             src={hero.image}
  //             alt={hero.name}
  //             width={200}
  //             height={200}
  //             priority
  //             className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full object-cover border-2 border-zinc-600/80 shadow-lg shadow-black/40"
  //           />
  //           {/* <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border-2 border-zinc-900" /> */}
  //         </div>

  //         <div className="text-center space-y-1 sm:space-y-2 w-full">
  //           <p className="text-[8px] sm:text-[10px] font-semibold tracking-[0.15em] sm:tracking-[0.2em] text-blue-400/90 uppercase leading-tight">
  //             {hero.role}
  //           </p>
  //           <h1 className="text- sm:text-sm font-bold text-white tracking-tight leading-tight">
  //             {hero.name}
  //           </h1>
  //         </div>
  //       </div>

  //       {/* Description */}
  //       <p className="hidden sm:block text-[11px] text-zinc-400 text-center leading-relaxed px-1">
  //         {hero.description}
  //       </p>

  //       {/* Social icons */}
  //       <div className="flex justify-center gap-2 sm:gap-3">
  //         {socials.map((s) => (
  //           <a
  //             key={s.name}
  //             href={s.url}
  //             target="_blank"
  //             rel="noreferrer"
  //             title={s.name}
  //             className="
  //               w-8 h-8 sm:w-9 sm:h-9 rounded-lg
  //               flex items-center justify-center
  //               bg-zinc-800/60
  //               hover:bg-zinc-700/80
  //               transition-all duration-200
  //             "
  //           >
  //             <Image src={s.icon} alt={s.name} width={14} height={14} className="rounded-sm opacity-80" />
  //           </a>
  //         ))}
  //       </div>

  //       <div className="w-full h-px bg-zinc-800/80" />

  //       {/* Topic tiles */}
  //       <div className="flex flex-col gap-1.5 sm:gap-2.5 w-full">
  //         {topicTiles.map((tile) => (
  //           <button
  //             key={tile.label}
  //             type="button"
  //             className="
  //               w-full flex items-center gap-2 sm:gap-3
  //               px-2 sm:px-3 py-2 sm:py-3
  //               rounded-lg sm:rounded-xl
  //               border border-zinc-700/40
  //               bg-zinc-800/25
  //               text-zinc-300 hover:text-white
  //               hover:border-zinc-600 hover:bg-zinc-800/60
  //               transition-all duration-200
  //               text-[10px] sm:text-xs font-medium
  //               text-left
  //             "
  //           >
  //             <span className="text-sm sm:text-base leading-none">{tile.icon}</span>
  //             {tile.label}
  //           </button>
  //         ))}

          
  //       </div>
  //     </aside>
  //   );
  // }

  console.log("In profile")

  /* ─── CENTER MODE ─── */
  return (
    <section
      className="
        flex flex-col items-center text-center
        gap-4 sm:gap-6 md:items-center
        w-full max-w-lg
        animate-fade-in
        transition-all duration-500 ease-in-out
        px-2
      "
    >
      {/* Avatar */}
      <div className="relative">
        <Image
          src={hero.image}
          alt={hero.name}
          width={144}
          height={144}
          priority
          className="
            w-32 h-32 sm:w-36 sm:h-36
            rounded-full object-cover
            border-[3px] border-zinc-700/80
            shadow-2xl shadow-black/50 
          "
        />
        {/* <span className="absolute bottom-1 right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-400 border-2 border-zinc-950 shadow" /> */}
      </div>

      {/* Name & Role */}
      <div className="space-y-1.5 sm:space-y-2.5">
        <p className="text-[14px] sm:text-[16px] font-semibold tracking-[0.2em] sm:tracking-[0.25em] text-blue-400/90 uppercase">
          {hero.role}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {hero.name}
        </h1>
      </div>

      {/* Description */}
      <p className="max-w-xs sm:max-w-sm text-zinc-400/90 leading-relaxed text-xs sm:text-[15px] px-1">
        {hero.description}
      </p>

      {/* Social — icon squares, distinct from suggestion pills */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 pt-0.5">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            title={s.name}
            className="
              w-11 h-11 sm:w-12 sm:h-12
              rounded-xl
              flex items-center justify-center
              bg-zinc-800/50
              hover:bg-zinc-700/70
              transition-all duration-200
              group
            "
          >
            <Image
              src={s.icon}
              alt={s.name}
              width={28}
              height={20}
              className="rounded-sm opacity-75 group-hover:opacity-100 transition-opacity"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
