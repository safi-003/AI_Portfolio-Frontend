"use client";

import { useEffect, useState } from "react";

type VisualViewportLayout = {
  height: number;
  offsetTop: number;
};

export function useVisualViewport(enabled: boolean) {
  const [layout, setLayout] = useState<VisualViewportLayout | null>(() => {
    if (typeof window === "undefined" || !enabled) return null;
    const vv = window.visualViewport;
    if (!vv) return null;
    return { height: vv.height, offsetTop: vv.offsetTop };
  });

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      setLayout(null);
      return;
    }

    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      setLayout({
        height: vv.height,
        offsetTop: vv.offsetTop,
      });
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    window.addEventListener("orientationchange", update);

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      window.removeEventListener("orientationchange", update);
    };
  }, [enabled]);

  return layout;
}

export function useIsMobile(breakpoint = 639) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
