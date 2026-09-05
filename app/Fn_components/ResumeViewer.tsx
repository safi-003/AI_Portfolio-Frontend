"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DownloadSimple, FileText, X } from "@phosphor-icons/react";
import axios from "axios";

type ResumeViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  documentUrl: string;
  downloadUrl: string;
  downloadFilename: string;
  title?: string;
};

function ResumeViewer({
  isOpen,
  onClose,
  documentUrl,
  downloadUrl,
  downloadFilename,
  title = "Resume",
}: ResumeViewerProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const url = process.env.NEXT_PUBLIC_BACKEND_URL


  



  // Visual open/close and body overflow logic
  useEffect(() => {
    if (!isOpen) {
      setVisible(false);
      return;
    }

    const frame = requestAnimationFrame(() => setVisible(true));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        
        onClose();
        }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);



  



  // Active time tracking for when the viewer is OPEN
  const page = useRef<number | null>(null);
  const totalTime = useRef(0);

  

  useEffect(() => {
    // Only run time tracking when the modal is actually open
    if (!isOpen) return;

    // Reset total time when modal opens
    totalTime.current = 0;

    if (document.visibilityState === "visible") {
      page.current = Date.now();
    }

    const handleVisibilityFn = () => {
      if (document.visibilityState === "visible") {
        page.current = Date.now();
      } else if (page.current !== null) {
        totalTime.current += Date.now() - page.current;
        page.current = null;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityFn);


    // Cleanup when modal closes or unmounts
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityFn);

      if (page.current !== null) {
        totalTime.current += Date.now() - page.current;
        page.current = null;
      }

      console.log(`Total active time viewing resume: ${(totalTime.current / 1000).toFixed(2)}s`);

      console.log(totalTime)
    };

      
    
  }, [isOpen]); // <-- Triggers every time isOpen changes to true/false




  

  const  sendResumeEvent = async (action : "View" | "Download")  => {

    if(page.current != null) totalTime.current += Date.now() - page.current

    console.log("Before sending to backend" ,totalTime.current)

    await axios.post(`http://${url}/resume_events?action=${action}&timeSpent=${(totalTime.current / 1000).toFixed(2)}`)
  }


  

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget){

        onClose();


      } 
    },
    [onClose],
  );

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className={`
        fixed inset-0 z-[100]
        flex items-center justify-center
        p-3 sm:p-5 md:p-8
        transition-opacity duration-300 ease-out
        ${visible ? "opacity-100" : "opacity-0"}
      `}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={handleBackdropClick}
    >
      <div
        className={`
          absolute inset-0
          bg-zinc-950/70 backdrop-blur-md
          transition-opacity duration-300
          ${visible ? "opacity-100" : "opacity-0"}
        `}
        aria-hidden
      />

      <div
        className={`
          relative flex flex-col
          w-full h-full max-w-6xl max-h-[94dvh]
          rounded-2xl sm:rounded-3xl
          bg-white
          shadow-[0_25px_80px_-12px_rgba(0,0,0,0.45)]
          border border-zinc-200/80
          overflow-hidden
          transition-all duration-300 ease-out
          ${visible ? "scale-100 translate-y-0" : "scale-[0.97] translate-y-3"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative shrink-0 border-b border-zinc-200/80 bg-gradient-to-r from-white via-zinc-50 to-white">
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d692]/40 to-transparent"
            aria-hidden
          />

          <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="
                  flex items-center justify-center shrink-0
                  w-9 h-9 sm:w-10 sm:h-10
                  rounded-xl
                  bg-[#00d692]/10 border border-[#00d692]/20
                  text-[#00a870]
                "
              >
                <FileText size={20} weight="duotone" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm sm:text-base font-semibold text-zinc-900 tracking-tight truncate">
                  {title}
                </h2>
                <p className="text-[11px] sm:text-xs text-zinc-500 truncate">
                  {downloadFilename}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <a
                href={downloadUrl}
                download={downloadFilename}
                className="
                  group inline-flex items-center gap-2
                  px-3.5 py-2 sm:px-5 sm:py-2.5
                  rounded-full
                  bg-[#00d692] text-zinc-900
                  text-xs sm:text-sm font-semibold
                  shadow-md shadow-[#00d692]/30
                  hover:bg-[#00c484] hover:shadow-lg hover:shadow-[#00d692]/35
                  active:scale-[0.97]
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d692]/50 focus-visible:ring-offset-2
                "
              > 
                <DownloadSimple
                  size={17}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
                <span 
                
                onClick={() => {

                  sendResumeEvent("Download")
                  onClose()

                }}
                >Download</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  sendResumeEvent("View")
                  onClose()
                }
              }
                aria-label="Close resume viewer"
                className="
                  inline-flex items-center justify-center
                  w-9 h-9 sm:w-10 sm:h-10
                  rounded-full
                  bg-zinc-100 text-zinc-500
                  border border-zinc-200
                  hover:bg-zinc-200 hover:text-zinc-800 hover:border-zinc-300
                  active:scale-[0.95]
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2
                "
              >
                <X size={18} weight="bold" />
              </button>
            </div>
          </div>
        </div>

        {/* Document */}
        <div className="relative flex-1 min-h-0 bg-zinc-100/80 p-2 sm:p-3">
          <div
            className="
              w-full h-full rounded-xl sm:rounded-2xl
              overflow-hidden
              bg-white
              border border-zinc-200/70
              shadow-inner shadow-zinc-200/50
            "
          >
            <iframe
              src={documentUrl}
              title={title}
              className="w-full h-full border-0 bg-white"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ResumeViewer;