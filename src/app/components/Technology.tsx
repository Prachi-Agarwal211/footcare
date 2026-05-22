"use client";
import React, { useRef } from "react";
import styles from "./Technology.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { use3DTilt } from "../hooks/use3DTilt";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const TECHS = [
  {
    num: "01",
    title: "Microprocessor-Controlled Prosthetics",
    short: "MPC Knees & Feet",
    desc: "Smart prosthetic knees, feet, and hands use sensors and microprocessors to analyse walking patterns, speed, and terrain in real time.",
    benefits: [
      "Enhanced stability on any terrain",
      "Smoother, more natural gait",
      "Reduced chances of falls",
      "Natural movement on slopes & stairs",
    ],
    color: "green",
  },
  {
    num: "02",
    title: "Myoelectric Prosthetic Hands",
    short: "Myo-Electric Arms",
    desc: "Myoelectric arms and hands use electrical signals from the user's muscles to control grip, wrist rotation, and fine hand movements.",
    benefits: [
      "Multiple grip patterns",
      "Precise muscle-signal control",
      "Improved daily-function performance",
      "Natural-looking appearance",
    ],
    color: "blue",
  },
  {
    num: "03",
    title: "Carbon Fiber & Composite Materials",
    short: "Carbon Fiber",
    desc: "Artificial limbs today are made with ultra-lightweight and extremely strong carbon-fiber composites for superior performance.",
    benefits: [
      "High durability & strength",
      "Shock absorption",
      "Energy return for active walking",
      "Lightweight — less fatigue",
    ],
    color: "green",
  },
  {
    num: "04",
    title: "3D Scanning & CAD–CAM Systems",
    short: "Digital Fabrication",
    desc: "Digital scanning and CAD–CAM designing allow highly accurate measurements and custom shapes for sockets, insoles, and braces.",
    benefits: [
      "Perfect custom fit",
      "Faster fabrication cycle",
      "Less trial-and-error in fitting",
      "Repeatable precision results",
    ],
    color: "blue",
  },
  {
    num: "05",
    title: "Silicone & Advanced Polymer Technologies",
    short: "Silicone Liners",
    desc: "Soft, flexible, medical-grade silicone is widely used in cosmetic prostheses, liners, and sleeves for comfort and function.",
    benefits: [
      "Maximum comfort & skin protection",
      "Natural cosmetic appearance",
      "Reduces socket friction",
      "Waterproof options available",
    ],
    color: "green",
  },
  {
    num: "06",
    title: "Hydraulic & Pneumatic Systems",
    short: "Fluid-Control Joints",
    desc: "High-mobility prosthetic knees and feet incorporate hydraulic or pneumatic cylinders for controlled, smooth movement.",
    benefits: [
      "Controlled knee flexion",
      "Smooth, fluid motion",
      "Customizable resistance levels",
      "Enhanced slope & stair descent",
    ],
    color: "blue",
  },
  {
    num: "07",
    title: "Functional Electrical Stimulation",
    short: "FES Therapy",
    desc: "FES devices help activate weak or paralyzed muscles using controlled electrical signals — restoring movement naturally.",
    benefits: [
      "Foot drop correction",
      "Stroke rehabilitation support",
      "Neuromuscular re-education",
      "Non-invasive muscle activation",
    ],
    color: "green",
  },
  {
    num: "08",
    title: "Custom Orthotic Technologies",
    short: "Smart Orthotics",
    desc: "Modern AFOs, KAFOs, spinal braces, and diabetic foot orthoses use advanced materials and computerized analysis for precision.",
    benefits: [
      "Thermoforming materials",
      "Carbon fiber reinforcements",
      "Computerized gait analysis",
      "Pressure mapping systems",
    ],
    color: "blue",
  },
];

interface TechCardProps {
  t: (typeof TECHS)[0];
}

function TechCard({ t }: TechCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  use3DTilt(cardRef, { max: 8, perspective: 1000 });

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${
        t.color === "green" ? styles.cardGreen : styles.cardBlue
      }`}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardHead}>
          <span className={styles.cardNum}>{t.num}</span>
          <span className={styles.cardShort}>{t.short}</span>
        </div>
        <h3 className={styles.cardTitle}>{t.title}</h3>
        <p className={styles.cardDesc}>{t.desc}</p>
        <ul className={styles.benefits}>
          {t.benefits.map((b, i) => (
            <li key={i}>
              <span className={styles.benefitIcon}>→</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Technology() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
        Array.from(gridRef.current?.children ?? []),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id="technology" className={styles.section} ref={sectionRef}>
      <div className={styles.bgLines} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.wrap}>
        <div className={styles.head} ref={headRef}>
          <span className="section-tag section-tag-light">Advanced Technology</span>
          <h2 className={styles.title}>
            Advanced Technologies in<br />
            <span className={styles.titleGreen}>Prosthetics &amp; Orthotics</span>
          </h2>
          <p className={styles.desc}>
            Modern Prosthetics &amp; Orthotics has transformed dramatically with cutting-edge technology. At Foot Care Jaipur (Est. 1998), we adopt globally accepted technologies to deliver personalized, high-performance solutions for every patient.
          </p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {TECHS.map((t) => (
            <TechCard key={t.num} t={t} />
          ))}
        </div>

        <div className={styles.bottomNote}>
          <div className={styles.noteInner}>
            <p>
              Every prosthesis is <strong>Prescribed, Designed, Fabricated &amp; Fitted</strong> for rapid customization.
              Post-Fitment Training ensures the patient&apos;s confidence, comfort, and resolves any teething issues.
            </p>
            <p>
              At Foot Care Jaipur, we continuously upgrade our expertise and equipment to bring world-class prosthetic
              and orthotic technology within reach for patients across India and abroad.
              <strong> Our mission: To restore mobility, independence, and confidence.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
