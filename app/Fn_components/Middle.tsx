"use client";

import { useContext } from "react";
import { ChatContext } from "@/app/context/context";
import Home from "@/app/Views/Home";
import Chatting from "@/app/Views/Chats";
import About from "@/app/Views/About";
import Projects from "@/app/Views/Projects";
import Blog from "@/app/Views/Blog";

function Middle() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("ChatContext not found");
  }

  const { activeView, middleScrollRef } = context;
  const isHome = activeView === "home";
  const isChat = activeView === "chat";

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <Home />;
      case "chat":
        return <Chatting />;
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "blog":
        return <Blog />;
      default:
        return <Home />;
    }
  };

  return (
    <main className="relative flex flex-1 min-h-0 w-full min-w-0 overflow-hidden">
      <div className={`flex h-full w-full min-w-0 justify-center box-border ${isChat ? "px-3 sm:px-4 md:px-6" : "px-4 sm:px-4 md:px-6"}`}>
        <div
          ref={isChat ? undefined : middleScrollRef}
          className={`
            h-full w-full min-w-0 max-w-[min(100%,20rem)] sm:max-w-5xl overscroll-y-contain box-border
            ${isHome
              ? "flex items-stretch justify-center overflow-y-auto overflow-x-hidden py-2 sm:py-3"
              : isChat
                ? "flex flex-col overflow-hidden py-0 sm:py-2 md:py-4 max-w-full sm:max-w-5xl"
                : "overflow-y-auto overflow-x-hidden py-2 sm:py-4 md:py-6"
            }
          `}
        >
          <div
            className={`w-full min-w-0 animate-in fade-in duration-300 ${
              isHome
                ? "flex flex-col flex-1 min-h-0"
                : isChat
                  ? "flex flex-col flex-1 min-h-0 overflow-hidden"
                  : "flex flex-col items-stretch"
            }`}
          >
            {renderView()}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Middle;
