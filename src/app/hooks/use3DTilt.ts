/*
  CHANGELOG - use3DTilt.ts
  - Added 3D tilt calculation based on cursor relative offset to element center
  - Sets CSS variables --rx, --ry, and --tz dynamically
  - Checks window.innerWidth and prefers-reduced-motion to gracefully bypass tilt calculations
*/

import { useEffect, RefObject } from "react";

export function use3DTilt(
  ref: RefObject<HTMLElement | null>,
  options = { max: 12, perspective: 1000 }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Gracefully bypass calculations on mobile viewports (< 640px)
    // or if the user prefers reduced motion
    const checkMotionAndViewport = () => {
      const isMobile = window.innerWidth <= 640;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return isMobile || prefersReduced;
    };

    if (checkMotionAndViewport()) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xc = rect.width / 2;
      const yc = rect.height / 2;

      // Calculate rotations (-max to +max degrees)
      const rx = -((yc - y) / yc) * options.max;
      const ry = ((xc - x) / xc) * options.max;

      // Calculate cursor position percentages for spotlight gloss reflections
      const mx = (x / rect.width) * 100;
      const my = (y / rect.height) * 100;

      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--tz", "12px");
      el.style.setProperty("--mx", `${mx.toFixed(2)}%`);
      el.style.setProperty("--my", `${my.toFixed(2)}%`);
    };

    const handleMouseEnter = () => {
      el.style.transition = "transform 0.1s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1)";
    };

    const handleMouseLeave = () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--tz", "0px");
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, options.max, options.perspective]);
}
