"use client";

import { useEffect } from "react";

export function useStopScroll({ isOpen }: { isOpen: boolean }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
}
