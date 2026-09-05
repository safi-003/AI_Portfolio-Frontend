"use client";

import { useContext } from "react";
import { ChatContext } from "@/app/context/context";
import { ArrowLeft } from "@phosphor-icons/react";

function Blog() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("ChatContext not found");
  }

  const { setActiveView } = context;

  return (
    <section className="w-full min-w-0 max-w-full sm:max-w-2xl mx-auto space-y-6 pb-2">
      <button
        type="button"
        onClick={() => setActiveView("home")}
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-3">Blog</h2>
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
          Articles and thoughts coming soon.
        </p>
      </div>
    </section>
  );
}

export default Blog;
