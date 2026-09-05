import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ChatProvider from "@/app/context/context";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio showcasing skills of Syed Mohammed Safiuddin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html
      lang="en"
      className={cn(jetbrainsMono.variable)}
    >
      <body className="bg-white antialiased overflow-x-hidden overflow-y-hidden max-w-[100vw]">
      

      <ChatProvider>


        {children}
      
      </ChatProvider>
      </body>
    
    </html>
  );
}
