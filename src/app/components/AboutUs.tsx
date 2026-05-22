/*
  CHANGELOG - AboutUs.tsx
  - AUDIT: Ensured GSAP ScrollTrigger utilizes once:true and fromTo transitions to prevent blank rendering bugs
  - MOTION: Hooked Doctor Rajiv Agrawal's card to use3DTilt for 3D cursor perspective tilt effects
  - STYLING: Shifted all visual elements (icons, borders, badges) to the Green, Blue, White, Black system
  - Standardized font weights and clamp sizes for readability
*/

"use client";
import React, { useRef } from "react";
import styles from "./AboutUs.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { use3DTilt } from "../hooks/use3DTilt";
import StatsCounter from "./StatsCounter";
import Image from "next/image";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: "1998", label: "Founded" },
  { num: "25+", label: "Years of Excellence" },
  { num: "50,000+", label: "Patients Served" },
  { num: "12+", label: "Countries Served" },
];

const SERVICES_LIST = [
  "Artificial Limbs for amputees (Above Knee, Below Knee, Upper Limb Prosthesis)",
  "Conservative Treatment — Flat Foot, Diabetic Foot, Foot Pain, Bunions, Corns & Calluses, Charcot Foot, Foot Ulcers",
  "Custom Orthotics & Insoles for Pain Relief and Posture Correction",
  "Knee, Hip & Back Pain | Scoliosis | Kyphosis | Cervical Spondylosis",
  "Polio, Hemiplegia, Paraplegia, Foot Drop, Posture & Gait Issues",
  "Osteoarthritis, Rheumatoid Arthritis, Lymphedema, Varicose Veins, DVT",
  "Post-burn & Post-surgery Rehabilitation | Cosmetic Restorations",
  "Mastectomy Lymphedema & Breast Prosthesis | Club Foot (CTEV) Management",
];

const RECOGNITIONS = [
  { icon: "✦", text: "Empaneled as Fabricating Agency for ALIMCO (Government of India) for rehabilitation camps." },
  { icon: "✦", text: "Rajasthan's First private artificial limb center — strong legacy of innovation and compassion." },
  { icon: "✦", text: "Trusted by celebrities, athletes, and patients worldwide for personalized, professional care." },
];

function StatCard({ num, label }: { num: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  use3DTilt(ref, { max: 4, perspective: 1000 });
  
  // Parse target and suffix from num (e.g. "50,000+" or "1998")
  const numericVal = parseInt(num.replace(/,/g, ""), 10);
  const suffix = num.includes("+") ? "+" : "";

  return (
    <div ref={ref} className={styles.statBox}>
      <span className={styles.statNum}>
        <StatsCounter target={numericVal} suffix={suffix} />
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt interaction for Doctor's biography card
  use3DTilt(cardRef, { max: 8, perspective: 1200 });

  useGSAP(() => {
    gsap.fromTo(
      headRef.current?.children ?? [],
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%", once: true },
      }
    );

    gsap.fromTo(
      Array.from(statsRef.current?.children ?? []),
      { opacity: 0, y: 25, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 82%", once: true },
      }
    );

    gsap.fromTo(
      leftRef.current?.querySelectorAll("[data-r]") ?? [],
      { opacity: 0, x: -25 },
      {
        opacity: 1,
        x: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 80%", once: true },
      }
    );

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 80%", once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="about" className={styles.section} ref={sectionRef}>
      <div className={styles.bgAccent} aria-hidden="true" />

      <div className={styles.wrap}>
        {/* Header */}
        <div className={styles.head} ref={headRef}>
          <span className="section-tag section-tag-light">About Us</span>
          <h2 className={styles.title}>
            Foot Care Jaipur<br />
            <span className={styles.titleGreen}>Artificial Limb Clinic Since 1998</span>
          </h2>
          <p className={styles.lead}>
            Rajasthan&apos;s First Private Artificial Limb &amp; Prosthetics Clinic — Trusted by Patients Worldwide.
          </p>
        </div>

        {/* Stats */}
        <div className={styles.stats} ref={statsRef}>
          {STATS.map((s) => (
            <StatCard key={s.label} num={s.num} label={s.label} />
          ))}
        </div>

        {/* Main grid */}
        <div className={styles.mainGrid}>
          {/* Left: story + services */}
          <div className={styles.leftCol} ref={leftRef}>
            <p className={styles.bodyText} data-r>
              Founded in 1998, Foot Care Jaipur is Rajasthan&apos;s first private Artificial Limb Clinic and one of the world&apos;s leading centers for prosthetics, orthotics, and rehabilitation services. For over 25 years, we have been restoring mobility, confidence, and quality of life for patients from across India and around the world.
            </p>
            <p className={styles.bodyText} data-r>
              Our clinic specializes in the design, fitting, and customization of artificial limbs, braces, and orthotic supports — providing world-class care under one roof.
            </p>

            <div className={styles.servicesBlock} data-r>
              <h3 className={styles.subHead}>Our Specialized Services</h3>
              <ul className={styles.servicesList}>
                {SERVICES_LIST.map((s, i) => (
                  <li key={i} className={styles.serviceItem}>
                    <span className={styles.serviceCheck}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.recBlock} data-r>
              <h3 className={styles.subHead}>Accreditations &amp; Recognitions</h3>
              {RECOGNITIONS.map((r, i) => (
                <div key={i} className={styles.recRow}>
                  <span className={styles.recIcon}>{r.icon}</span>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>

            <div className={styles.commitBlock} data-r>
              <p>
                At Foot Care Jaipur, we blend medical expertise with compassion, ensuring each patient receives individualized assessment, advanced technology, and lifelong support. We continue to lead in artificial limb innovation, foot orthotics, and rehabilitation care — helping people rediscover the freedom to move, live, and smile again.
              </p>
            </div>
          </div>

          {/* Right: Doctor card with 3D perspective hover */}
          <div className={styles.rightCol}>
            <div className={styles.doctorCard} ref={cardRef}>
              <div className={styles.cardGlow} aria-hidden="true" />
              <div className={styles.doctorImageContainer}>
                <Image
                  src="/dr-rajiv.png"
                  alt="Portrait of Dr. Rajiv Agrawal, Clinical Director of Foot Care Jaipur"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className={styles.doctorImage}
                  priority
                />
              </div>
              <div className={styles.cardBadge}>Clinical Director</div>
              <h3 className={styles.doctorName}>Dr. Rajiv Agrawal</h3>
              <p className={styles.doctorTitle}>Prosthetist &amp; Orthotist</p>
              <p className={styles.doctorRci}>Registered — Rehabilitation Council of India (RCI)</p>

              <div className={styles.divider} />

              <blockquote className={styles.quote}>
                <span className={styles.quoteLabel}>Clinical Philosophy</span>
                <p>&ldquo;Enriching Lives with CARE.&rdquo;</p>
              </blockquote>

              <p className={styles.cardBody}>
                With nearly 30 years of clinical experience and having successfully managed millions of patients, Dr. Agrawal is globally renowned for handling complex cases of amputation and limb loss, foot, ankle, knee and spinal deformities, and chronic pain and biomechanical issues.
              </p>

              <ul className={styles.doctorPoints}>
                <li><span className={styles.dot} />Amputee rehabilitation &amp; limb loss diagnostics</li>
                <li><span className={styles.dot} />Foot, Ankle, Knee &amp; complex spinal deformities</li>
                <li><span className={styles.dot} />Chronic pain &amp; biomechanical imbalances</li>
              </ul>

              <div className={styles.cardFooter}>
                <p>&ldquo;Prescribed to the condition, fabricated to perfection, maximum comfort, precise fit, and improved function.&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
