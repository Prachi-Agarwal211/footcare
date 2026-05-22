"use client";
import React, { useEffect, useState, useRef } from "react";

interface StatsCounterProps {
  target: number;
  duration?: number; // in ms
  suffix?: string;
  prefix?: string;
}

export default function StatsCounter({
  target,
  duration = 1500,
  suffix = "",
  prefix = "",
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease-out expo transition for smooth deceleration
            const easeOutExpo = 1 - Math.pow(2, -10 * percentage);
            const currentCount = Math.floor(easeOutExpo * target);

            setCount(currentCount);

            if (percentage < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <span ref={elementRef} className="stats-counter-value">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
