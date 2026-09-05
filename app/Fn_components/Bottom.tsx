"use client";

import { FaLocationArrow } from "react-icons/fa";

import { useContext, useEffect, useRef, useState } from "react";

import { ChatContext } from "@/app/context/context";

import type { chatStructure } from "@/app/context/context";

import axios from "axios";

import NavBar from "./NavBar";

import { v4 as uuid } from "uuid";



function Bottom({ onActivate }: { onActivate?: () => void }) {

  const [Qn, setQn] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 172.22.112.1:8000\

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  console.log("THe url is ", url)


  const context = useContext(ChatContext);



  if (context === undefined) {

    throw new Error("ChatContext not found");

  }



  const {

    chats,

    setChats,

    scrollRef,

    middleScrollRef,

    activeView,

    setActiveView,

  } = context;



  const showChatbox = activeView === "home" || activeView === "chat";

  const isChat = activeView === "chat";



  const suggestions = [

    { icon: "👤", text: "Tell me about yourself" },

    { icon: "⭐", text: "What makes you stand out?" },

    { icon: "⚡", text: "Best project" },

    { icon: "🛠", text: "Tech toolkit" },

    // { icon: "📬", text: "Get in touch" },

  ];



  useEffect(() => {

    const container = middleScrollRef.current;

    const anchor = scrollRef.current;



    if (!container || !anchor) return;



    requestAnimationFrame(() => {

      container.scrollTop = container.scrollHeight;

    });

  }, [chats, middleScrollRef, scrollRef]);



  const askLLM = async () => {

    const trimmed = Qn.trim();

    if (!trimmed) return;



    setActiveView("chat");



    const qn: chatStructure = {

      id: uuid(),

      role: "user",

      content: trimmed,

      status: "resolved",

    };



    setQn("");



    const llmId = uuid();



    const llmDraft: chatStructure = {

      id: llmId,

      role: "llm",

      content: "",

      status: "pending",

    };



    setChats((prev) => [...prev, qn, llmDraft]);



    const controller = new AbortController();

    const abortReq = setTimeout(() => controller.abort(), 11000);



    try {

      console.log("Sending req to backend")
      
      const response = await axios.post(

        `http://${url}/ingest/chat`,

        {

          query : trimmed
        },

        { signal: controller.signal }

      );

      console.log(response)

      clearTimeout(abortReq);

      chatStreaming(llmId, response.data);

    } catch (error) {

      clearTimeout(abortReq);



      if (axios.isCancel(error)) {

        setChats((prev) =>

          prev.map((chatObj) =>

            chatObj.id === llmId

              ? { ...chatObj, status: "error", errorDesc: "Request was aborted" }

              : chatObj

          )

        );

      }



      let err = "Something Went Wrong";
  


      if (axios.isAxiosError(error)) {

        console.log("Axios err encountered")
        console.log(error.response?.data)

        err = `${error.response?.data["detail"] || "Some error occured. Please try again later..."}`;

      }



      setChats((prev) =>

        prev.map((chatObj) =>

          chatObj.id === llmId

            ? { ...chatObj, status: "error", errorDesc: err }

            : chatObj

        )

      );

    }

  };



  const chatStreaming = (id: string, response: string) => {


    setChats((prev) =>

      prev.map((chatObj) =>

        chatObj.id === id

          ? { ...chatObj, content: response || "Some Error occured. Please Try Again....", status: "resolved" }

          : chatObj

      )

    );

  };



  if (!showChatbox) {

    return <NavBar />;

  }



  return (

    <div

      className={`

        w-full min-w-0 max-w-full box-border relative flex flex-col

        ${isChat ? "gap-1 pt-0 pb-0 sm:gap-1.5 sm:pt-1 sm:pb-1" : "gap-1 sm:gap-1.5"}

      `}

    >

      {activeView === "home" && (

        <div className="w-full min-w-0 max-w-full sm:max-w-4xl mx-auto flex flex-col gap-1.5 sm:gap-1.5 box-border">

          <h2 className="text-center text-sm sm:text-lg font-semibold text-zinc-600 sm:text-zinc-700">

            Ask SyedGPT

          </h2>



          <div className="hidden w-full min-w-0 max-w-full flex items-center gap-2 sm:gap-2 overflow-x-auto sm:flex-wrap sm:justify-center sm:overflow-visible pb-0.5 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x">

            {suggestions.map((chip) => (

              <button

                key={chip.text}

                type="button"

                onClick={() => setQn(chip.text)}

                className="

                  shrink-0 px-3.5 py-2 sm:px-4 sm:py-2 rounded-full

                  bg-zinc-100 border border-zinc-200

                  text-zinc-700 text-xs sm:text-sm whitespace-nowrap

                  hover:bg-zinc-200 hover:border-zinc-300 transition-colors

                "

              >

                {chip.text}

              </button>

            ))}

          </div>

        </div>

      )}



      <div

        className={`

          relative flex items-end gap-2 w-full min-w-0 max-w-full mx-auto box-border

          rounded-2xl sm:rounded-3xl

          border border-zinc-200/90

          bg-white

          shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_2px_8px_-2px_rgba(0,0,0,0.04)]

          hover:shadow-[0_8px_32px_-6px_rgba(0,0,0,0.1),0_4px_12px_-4px_rgba(0,0,0,0.05)]

          transition-shadow duration-200

          ${isChat

            ? "py-1 px-1.5 sm:py-1 sm:px-2"

            : "py-1.5 px-2 sm:py-2 sm:px-2.5"

          }

        `}

      >

        <textarea

          ref={textareaRef}

          rows={1}

          placeholder="Ask me anything..."

          onFocus={() => onActivate?.()}

          className={`

            relative box-border bg-zinc-50

            border border-zinc-200/80

            focus-within:border-[#00d692]/60 focus-within:ring-2 focus-within:ring-[#00d692]/15

            transition-all duration-200

            text-zinc-900 placeholder:text-zinc-400

            w-full max-w-full resize-none overflow-hidden outline-none

            ${isChat

              ? "min-h-[2.25rem] max-h-24 rounded-2xl text-[13px] leading-snug pl-3 pr-10 py-2 sm:min-h-[2.75rem] sm:max-h-28 sm:text-base sm:pl-4 sm:pr-12 sm:py-2.5 sm:rounded-3xl"

              : "min-h-[3rem] max-h-20 rounded-2xl text-[14px] leading-snug pl-3.5 pr-11 py-2.5 sm:min-h-[2.75rem] sm:max-h-16 sm:text-base sm:pl-4 sm:pr-12 sm:py-2.5 sm:rounded-3xl"

            }

          `}

          value={Qn}

          onChange={(e) => setQn(e.target.value)}

          autoComplete="off"

          onKeyDown={(e) => {

            if (e.key === "Enter" && !e.shiftKey) {

              e.preventDefault();

              askLLM();

            }

          }}

        />



        <button

          type="button"

          aria-label="Send message"

          className={`

            rounded-full flex items-center justify-center shrink-0

            absolute bg-[#00d692] text-zinc-900

            font-bold hover:bg-[#00c484] transition-colors

            ${isChat

              ? "w-7 h-7 sm:w-8 sm:h-8 text-xs right-2 bottom-2 sm:right-2.5 sm:bottom-2.5"

              : "w-8 h-8 sm:w-8 sm:h-8 text-sm right-2 bottom-2 sm:right-2.5 sm:bottom-2.5"

            }

          `}

          onClick={askLLM}

        >

          <FaLocationArrow />

        </button>

      </div>

    </div>

  );

}



export default Bottom;

