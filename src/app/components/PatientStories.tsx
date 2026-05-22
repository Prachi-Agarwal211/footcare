"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./PatientStories.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { use3DTilt } from "../hooks/use3DTilt";
import { motion } from "framer-motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STORIES = [
  {
    id: "quadruple-amputee",
    label: "Quadruple Amputee",
    tag: "USA → Jaipur",
    title: "A Journey from Despair to Confidence",
    patient: "52-year-old Indian-origin US citizen",
    condition: "Lost all four limbs due to severe COVID-19 complications",
    challenge: "Multiple surgeries in USA followed by exhaustive rehabilitation. Continued struggling with mobility, balance, and repeated falls despite extensive treatment abroad.",
    journey: "She came across Foot Care Jaipur through relatives in the USA. With hope and courage, she travelled to Jaipur for a fresh evaluation.",
    clinical: [
      "Below-knee amputation in one leg",
      "Loss of all five toes in the other foot",
      "Below-elbow amputation in one hand",
      "Loss of all four fingers on the other hand",
    ],
    solution: "Dr. Rajiv Agrawal designed a personalized first-phase rehabilitation plan focusing on Below-Knee Prosthesis and Partial Foot Prosthesis.",
    outcome: "Once fitted and trained, she began walking with renewed confidence. Within a short time, she could walk comfortably, climb stairs, and perform daily tasks with stability and safety.",
    quote: "She expressed immense satisfaction with her decision to choose Foot Care Jaipur. Today, she walks without any support.",
  },
  {
    id: "13-boy",
    label: "Congenital Anomaly",
    tag: "South India → Jaipur",
    title: "A 13-Year Journey to His First Steps",
    patient: "13-year-old boy from South India",
    condition: "Rare congenital anomaly — leg with no knee joint, deformed foot rotated upward",
    challenge: "Since birth, he had never walked on his own feet. His only way to move was by using crutches. Every expert across the country gave the same opinion — amputation.",
    journey: "When they reached Foot Care Jaipur, the family asked: 'Can our child ever walk on his own feet without amputation?' This became the foundation of one of our biggest challenges.",
    clinical: [
      "Leg with no knee joint from birth",
      "Small, deformed foot rotated upward",
      "Complex residual limb structure",
      "Years of failed prosthetic attempts elsewhere",
    ],
    solution: "After detailed clinical evaluation and multiple discussions, Dr. Rajiv Agrawal designed a customized prosthetic prescription through innovative planning and biomechanical analysis.",
    outcome: "For the first time since birth, the young boy stood and walked on his own feet. His parents were overwhelmed — tears of joy as they watched their child take steps they had only dreamed of.",
    quote: "His excitement knew no bounds. For Team Foot Care Jaipur, this moment was just as emotional and fulfilling.",
  },
  {
    id: "snake-bite-amputee",
    label: "Below-Knee Amputee",
    tag: "South India → Jaipur",
    title: "From Struggle to Stability: Walking Again with Confidence",
    patient: "55-year-old gentleman from South India",
    condition: "Below-knee amputation following severe snake bite complications",
    challenge: "Nearly a decade of walking with a lathi (walking stick). A free-distributed prosthetic limb didn't fit properly — felt heavy and uncomfortable, adding to his discomfort rather than improving mobility.",
    journey: "Encouraged by a known contact, he travelled all the way to Foot Care Jaipur — a decision that would redefine his life. From the very first consultation, the approach was different.",
    clinical: [
      "Below-knee amputation (right limb)",
      "Long-term disuse and muscle adaptation",
      "Poorly fitting previous prosthesis",
      "Altered gait pattern from years of crutch use",
    ],
    solution: "Dr. Agrawal's team designed a customized below-knee prosthesis with accurate socket fitting, proper alignment for natural gait, and advanced component selection suited to his daily activities.",
    outcome: "He stood up without his lathi for the first time in years. Step by step, he began walking — not just walking, but walking confidently, comfortably, and almost normally.",
    quote: "\"Mujhe laga main phir se chalna seekh gaya hoon… par is baar sahi tareeke se.\" (I felt like I learned to walk again — but this time the right way.)",
  },
];

interface StoryCardProps {
  s: (typeof STORIES)[0];
  expanded: boolean;
  onToggle: () => void;
  isActive: boolean;
  slideWidth: number;
}

function StoryCard({ s, expanded, onToggle, isActive, slideWidth }: StoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Only apply tilt to the active card
  use3DTilt(cardRef, { max: isActive ? 6 : 0, perspective: 1200 });

  return (
    <motion.div
      className={styles.cardWrapper}
      style={{ width: slideWidth }}
      animate={{
        scale: isActive ? 1.05 : 0.92,
        opacity: isActive ? 1 : 0.5,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
    >
      <div
        ref={cardRef}
        className={`${styles.card} ${expanded ? styles.cardExpanded : ""} ${
          isActive ? styles.cardActive : ""
        }`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <div className={styles.cardInner}>
          <div className={styles.cardTop}>
            <span className={styles.cardLabel}>{s.label}</span>
            <span className={styles.cardTag}>{s.tag}</span>
          </div>
          <div className={styles.starRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={styles.star}>
                ★
              </span>
            ))}
          </div>
          <h3 className={styles.cardTitle}>{s.title}</h3>
          <p className={styles.cardPatient}>
            <strong>Patient:</strong> {s.patient}
          </p>
          <p className={styles.cardCondition}>{s.condition}</p>

          <div
            className={`${styles.expandContent} ${
              expanded ? styles.expandOpen : ""
            }`}
          >
            <div className={styles.expandSection}>
              <h4 className={styles.expandLabel}>The Challenge</h4>
              <p className={styles.expandText}>{s.challenge}</p>
            </div>
            <div className={styles.expandSection}>
              <h4 className={styles.expandLabel}>Clinical Profile</h4>
              <ul className={styles.clinicalList}>
                {s.clinical.map((c, i) => (
                  <li key={i}>
                    <span className={styles.clinicalDot} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.expandSection}>
              <h4 className={styles.expandLabel}>Our Solution</h4>
              <p className={styles.expandText}>{s.solution}</p>
            </div>
            <div className={styles.expandSection}>
              <h4 className={styles.expandLabel}>The Outcome</h4>
              <p className={styles.expandText}>{s.outcome}</p>
            </div>
            <blockquote className={styles.storyQuote}>
              <p>{s.quote}</p>
            </blockquote>
          </div>

          <div
            className={styles.readMore}
            style={{ pointerEvents: "none" }}
          >
            {expanded ? "Read Less ↑" : "Read Full Story ↓"}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PatientStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(1); // Middle card focused by default
  
  const [slideWidth, setSlideWidth] = useState(480);
  const [trackX, setTrackX] = useState(0);

  // Recalculate dimensions and centered offsets dynamically on resize or index update
  useEffect(() => {
    const updateLayout = () => {
      const container = carouselContainerRef.current;
      if (!container) return;
      
      const viewportWidth = container.clientWidth;
      const isMobile = window.innerWidth <= 768;
      const w = isMobile ? viewportWidth * 0.85 : 480;
      const g = isMobile ? 16 : 32;
      
      setSlideWidth(w);
      
      // Compute the exact x position to center the activeIndex card
      const offset = (viewportWidth / 2) - (w / 2) - activeIndex * (w + g);
      setTrackX(offset);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [activeIndex]);

  useGSAP(
    () => {
      gsap.fromTo(
        headRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        carouselContainerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselContainerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
      setExpanded(null);
    }
  };

  const handleNext = () => {
    if (activeIndex < STORIES.length - 1) {
      setActiveIndex((prev) => prev + 1);
      setExpanded(null);
    }
  };

  const handleToggle = (id: string, index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      setExpanded(id);
    } else {
      setExpanded(expanded === id ? null : id);
    }
  };

  return (
    <section id="stories" className={styles.section} ref={sectionRef}>
      <div className={styles.bgAccent} aria-hidden="true" />
      <div className={styles.wrap}>
        <div className={styles.head} ref={headRef}>
          <span className="section-tag">Patient Stories</span>
          <h2 className={styles.title}>
            Restoring Mobility,<br />
            <span className={styles.titleGreen}>Restoring Lives</span>
          </h2>
          <p className={styles.desc}>
            Every patient carries a unique story of resilience and hope. Here are some of the lives we&apos;ve had the privilege of transforming.
          </p>
        </div>

        <div className={styles.carouselContainer} ref={carouselContainerRef}>
          <motion.div
            className={styles.carouselTrack}
            drag="x"
            dragConstraints={{
              left: trackX - 100,
              right: trackX + 100,
            }}
            dragElastic={0.4}
            onDragEnd={(e, info) => {
              const offsetThreshold = 80;
              const velocityThreshold = 200;
              const { offset, velocity } = info;
              
              if (offset.x < -offsetThreshold || velocity.x < -velocityThreshold) {
                if (activeIndex < STORIES.length - 1) {
                  setActiveIndex((prev) => prev + 1);
                  setExpanded(null);
                }
              } else if (offset.x > offsetThreshold || velocity.x > velocityThreshold) {
                if (activeIndex > 0) {
                  setActiveIndex((prev) => prev - 1);
                  setExpanded(null);
                }
              }
            }}
            animate={{ x: trackX }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {STORIES.map((s, idx) => (
              <StoryCard
                key={s.id}
                s={s}
                expanded={expanded === s.id}
                isActive={idx === activeIndex}
                slideWidth={slideWidth}
                onToggle={() => handleToggle(s.id, idx)}
              />
            ))}
          </motion.div>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.arrowBtn}
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous story"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          <div className={styles.dots}>
            {STORIES.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.dot} ${
                  idx === activeIndex ? styles.dotActive : ""
                }`}
                onClick={() => {
                  setActiveIndex(idx);
                  setExpanded(null);
                }}
                aria-label={`Go to story ${idx + 1}`}
              />
            ))}
          </div>

          <button
            className={styles.arrowBtn}
            onClick={handleNext}
            disabled={activeIndex === STORIES.length - 1}
            aria-label="Next story"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div className={styles.footNote}>
          <span>🌟</span>
          <p>Foot Care Jaipur — A happy, confident, and mobile patient is the greatest reward for our work.</p>
        </div>
      </div>
    </section>
  );
}
