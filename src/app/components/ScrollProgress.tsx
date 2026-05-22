"use client";
import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scaleX, setScaleX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setScaleX(0);
        return;
      }
      const scrolled = window.scrollY / scrollHeight;
      setScaleX(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${scaleX})` }}
      aria-hidden="true"
    />
  );
}
