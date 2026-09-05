"use client"

import { createContext, useContext, useState, useRef } from 'react';


export type chatStructure = {

        id: string;
        role: "user" | "llm";
        content: string,
        status: "pending" | "resolved" | "streaming" | "error";
        errorDesc?: string

}

export type view = "home" | "chat" | "about" | "projects" | "blog"

type ChatContextType = {
    isChatOpen: boolean;
    setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
    chats: chatStructure[];
    setChats: React.Dispatch<React.SetStateAction<chatStructure[]>>;
    scrollRef: React.RefObject<HTMLDivElement | null>
    middleScrollRef: React.RefObject<HTMLDivElement | null>
    activeView: view;
    setActiveView: React.Dispatch<React.SetStateAction<view>>

};

// Create Context
export const ChatContext = createContext<ChatContextType | undefined>(undefined);



// Provider
export default function ChatProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    
    const [activeView, setActiveView] = useState<view>("home");

    const [isChatOpen, setIsChatOpen] = useState(false)
    const [chats, setChats] = useState<chatStructure[]>([])
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const middleScrollRef = useRef<HTMLDivElement | null>(null);

    

    return(

        <ChatContext.Provider
        
            value={{
                isChatOpen, 
                setIsChatOpen,
                chats, setChats,
                scrollRef,
                middleScrollRef,
                activeView, setActiveView
                
            }}
        >

            {children}

            </ChatContext.Provider>
    )

}

