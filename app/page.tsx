"use client";

import { useContext, useEffect } from "react";
import Top from "./Fn_components/Top";
import Middle from "./Fn_components/Middle";
import Bottom from "./Fn_components/Bottom";
import { ChatContext } from "@/app/context/context";
import { useIsMobile, useVisualViewport } from "@/app/hooks/useVisualViewport";

export default function PortfolioPage() {
  const context = useContext(ChatContext);
  const isMobile = useIsMobile();
  const isChat = context?.activeView === "chat";
  const useKeyboardLayout = isChat && isMobile;
  const viewport = useVisualViewport(useKeyboardLayout);

  if (context === undefined) {
    throw new Error("ChatContext not found");
  }

  const { setIsChatOpen, setActiveView } = context;

  const openChat = () => {
    setIsChatOpen(true);
    setActiveView("chat");
  };

  useEffect(() => {
    if (!useKeyboardLayout) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [useKeyboardLayout]);

  return (
    <div
      className={`relative flex flex-col max-w-[100vw] overflow-hidden bg-white text-zinc-900 ${
        useKeyboardLayout ? "fixed left-0 w-full z-50" : "h-dvh"
      }`}
      style={
        useKeyboardLayout
          ? {
              top: viewport?.offsetTop ?? 0,
              height: viewport?.height ?? "100dvh",
            }
          : undefined
      }
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,214,146,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(99,102,241,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_0%_80%,rgba(220,201,182,0.08),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <Top />

      <Middle />

      <footer
        className={`shrink-0 z-50 w-full min-w-0 max-w-[100vw] overflow-hidden bg-white ${
          isChat
            ? "px-2 pt-0 pb-[max(0.25rem,env(safe-area-inset-bottom))] sm:px-4 sm:pb-4 md:pb-6"
            : "px-2 sm:px-4 md:px-6 pb-[max(0.375rem,env(safe-area-inset-bottom))] sm:pb-4 md:pb-6 pt-0"
        }`}
      >
        <div
          className={`w-full min-w-0 mx-auto box-border ${
            isChat ? "max-w-[min(100%,19rem)] sm:max-w-4xl" : "max-w-[min(100%,22rem)] sm:max-w-4xl"
          }`}
        >
          <Bottom onActivate={openChat} />
        </div>
      </footer>
    </div>
  );
}
