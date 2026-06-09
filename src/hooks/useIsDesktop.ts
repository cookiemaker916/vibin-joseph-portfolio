"use client";

import { useState, useEffect } from "react";

export function useIsDesktop(minWidth = 1024) {
  // Start as null to avoid hydration mismatch between server and client
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    // Check viewport width once mounted
    setIsDesktop(window.innerWidth >= minWidth);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= minWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [minWidth]);

  return isDesktop;
}
