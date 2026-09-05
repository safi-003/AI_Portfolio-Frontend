"use client";

import { useContext } from "react";
import { ChatContext } from "@/app/context/context";
import { ArrowLeft } from "@phosphor-icons/react";

function Contact() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("ChatContext not found");
  }

  const { setActiveView } = context;

  // actual data


  return (
    <section className="w-full min-w-0 max-w-full sm:max-w-2xl mx-auto space-y-6 pb-2">
      <button
        type="button"
        onClick={() => setActiveView("home")}
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-zinc-100 mb-3">Contact</h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Reach-out links and contact details will appear here. Content coming
          soon.
        </p>
      </div>
    </section>
  );
}

export default Contact;
