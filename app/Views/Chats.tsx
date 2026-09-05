"use client";

import { ChatContext } from "@/app/context/context";
import { useContext } from "react";
import { hero } from "@/app/data/hero";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message";

function Chatting() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("ChatContext not found");
  }

  const { chats, scrollRef, middleScrollRef } = context;

  console.log(chats)


  return (
    <div
      ref={middleScrollRef}
      className="flex flex-col flex-1 min-h-0 w-full min-w-0 max-w-full overflow-y-auto overflow-x-hidden overscroll-y-contain"
    >
      <div className="flex flex-col gap-2.5 sm:gap-4 w-full min-w-0 max-w-full pt-0.5 sm:pt-2 pb-2 sm:pb-2 px-0.5 sm:px-0">
        {chats.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 min-h-[8rem] py-6 sm:py-10 text-center px-4">
            <p className="text-base sm:text-lg font-medium text-zinc-700">
              Start a conversation
            </p>
            <p className="text-sm text-zinc-500 mt-1 max-w-xs">
              Ask me anything about my work, skills, or projects.
            </p>
          </div>
        )}

        {chats.map((chat) => {
          const isUser = chat.role === "user";

          return (
            <div
              key={chat.id}
              className={`flex w-full min-w-0 max-w-full ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              <Message
                align={isUser ? "end" : "start"}
                className={`min-w-0 gap-2 sm:gap-2.5 ${
                  isUser 
                    ? "w-auto max-w-[90%] sm:max-w-[85%] md:max-w-[78%]"
                    : "w-full max-w-full"
                }`}
              >
                {!isUser && (
                  <MessageAvatar className="self-end mb-0.5 shrink-0">
                    <Avatar size="lg" className="ring-2 ring-zinc-200 size-8 sm:size-10">
                      <AvatarImage src={hero.image} alt="SyedGPT" />
                      <AvatarFallback className="bg-zinc-200 text-zinc-700 text-xs font-semibold">
                        SG
                      </AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                )}

                <MessageContent className="gap-1 flex-1 min-w-0 w-auto max-w-full">
                  {!isUser && (
                    <span className="text-xs sm:text-[13px] font-semibold tracking-wide text-zinc-500 px-1">
                      SyedGPT
                    </span>
                  )}

                  {isUser ? (
                    <Bubble align="end" variant="user">
                      <BubbleContent className="rounded-2xl rounded-br-md px-3 py-2 sm:px-4 sm:py-2.5 text-[14px] sm:text-[15px] leading-[1.5]">
                        <p className="m-0 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                          {chat.content}
                        </p>
                      </BubbleContent>
                    </Bubble>
                  ) : (
                    <Bubble align="start" variant="llm">
                      <BubbleContent className="rounded-2xl rounded-bl-md px-3 py-2 sm:px-4 sm:py-2.5 text-[14px] sm:text-[15px] leading-[1.5] shadow-sm border border-zinc-200">
                        {chat.status === "pending" ? (
                          <span className="inline-flex items-center gap-1 py-0.5">
                            <span className="size-2 rounded-full bg-zinc-400 animate-bounce" />
                            <span className="size-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.15s]" />
                            <span className="size-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.3s]" />
                          </span>
                        ) : chat.status === "error" ? (
                          <p className="m-0 text-red-600 text-[14px] sm:text-[15px]">{chat.errorDesc}</p>
                        ) : (
                          <p className="m-0 whitespace-pre-wrap break-words [overflow-wrap:anywhere] text-zinc-900">
                            {chat.content.length < 1 ? chat.errorDesc : chat.content}
                          </p>
                        )}
                      </BubbleContent>
                    </Bubble>
                  )}
                </MessageContent>
              </Message>
            </div>
          );
        })}
        <div ref={scrollRef} className="shrink-0 h-px w-full" aria-hidden />
      </div>
    </div>
  );
}

export default Chatting;
