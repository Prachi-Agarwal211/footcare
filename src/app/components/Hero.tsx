/*
  CHANGELOG - Hero.tsx
  - INTEGRATION: Imported and rendered SearchConic in the left column to filter conditions treated
  - MOTION: Applied use3DTilt to the right-side clinical HUD card for interactive cursor perspective rotations
  - STYLING: Adapted colors strictly to green, blue, white, and black theme
  - Cleaned up potential layout issues and ensured absolute responsiveness
*/

"use client";
import React, { useRef } from "react";
import styles from "./Hero.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { use3DTilt } from "../hooks/use3DTilt";
import SearchConic from "./SearchConic";

const CONDITIONS = [
  "Artificial Limbs", "Hi-Tech Prosthesis", "Jaipur Foot", "Bionic Hands", "Carbon Foot",
  "Myo-Electric Limbs", "Energy Storing Foot", "Sports Prosthesis", "MicroProcessor Controlled Knee",
  "Pneumatic Knee", "Hydraulic Knee", "Silicon Liners", "Silicon Fingers", "Prosthetic Foot",
  "Custom Orthotics", "Compression Stockings", "Foot Pain", "Pes Planus", "Pes Cavus",
  "Hallux Valgus", "Calcaneal Spur", "Heel Pain", "Ankle Pain", "Knee Pain", "Back Pain",
  "Polio", "Amputation", "Hemiplegia", "Paraplegia", "Foot Drop", "Silicon Prosthesis",
  "Paralysis", "Stroke", "Post Burn Hypertrophies", "Keloids", "Lymphoedema", "Varicose Veins",
  "DVT", "World's Cheapest Prosthetic Limbs", "CTEV", "Flat Foot", "Club Foot",
  "Post Mastectomy Lymphoedema", "Osteoarthritis", "Rheumatoid Arthritis", "Kyphosis",
  "Scoliosis", "Podiascan", "Posture Issues", "Rehabilitation", "Fracture Mal-Union / Non-Union",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  // Apply 3D tilt interaction to the HUD card
  use3DTilt(hudRef, { max: 10, perspective: 1200 });

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(badgeRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.65 }, 0.2)
      .fromTo(h1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85 }, 0.35)
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.5)
      .fromTo(searchContainerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.6)
      .fromTo(ctasRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, 0.75)
      .fromTo(hudRef.current, { opacity: 0, scale: 0.95, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.1 }, 0.45);
  }, { scope: heroRef });

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      {/* Background video overlaying shader/lines */}
      <div className={styles.videoBg}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-fallback.jpg"
          className={styles.video}
        >
          <source src="/hero-video.webm" type="video/webm" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} />
        <div className={styles.gridLines} aria-hidden="true" />
      </div>

      {/* Main hero grid */}
      <div className={styles.content}>
        <div className={styles.grid}>
          {/* LEFT: Marketing Copy + Search */}
          <div className={styles.left}>
            <span ref={badgeRef} className={styles.badge}>
              <span className={styles.badgePulse} />
              Artificial Limb Clinic Since 1998
            </span>

            <h1 ref={h1Ref} className={styles.headline}>
              Foot Care <br />
              <span className={styles.headlineGreen}>Jaipur</span>
            </h1>

            <p ref={subRef} className={styles.subheadline}>
              World&apos;s Leading Clinic for{" "}
              <strong className={styles.boldBlue}>Hi-Tech Prosthesis &amp; Orthosis</strong>
            </p>

            {/* Conic-gradient condition search input wrapper */}
            <div ref={searchContainerRef} className={styles.searchWrapper}>
              <SearchConic />
            </div>

            <div ref={ctasRef} className={styles.ctas}>
              <a href="#contact" className="glow-btn">Book Appointment</a>
              <a href="#services" className={styles.outlineBtn}>Explore Services</a>
            </div>
          </div>

          {/* RIGHT: Clinician/Stats HUD with 3D Tilt */}
          <div className={styles.right}>
            <div className={styles.hud} ref={hudRef}>
              <div className={styles.hudTop}>
                <span className={styles.hudDot} />
                <span className={styles.hudLabel}>CLINIC PANEL — EST. 1998</span>
              </div>
              <div className={styles.hudGrid}>
                {[
                  { k: "Experience", v: "25+ Yrs" },
                  { k: "Patients", v: "50,000+" },
                  { k: "Countries", v: "12+" },
                  { k: "Satisfaction", v: "98%" },
                ].map((m) => (
                  <div key={m.k} className={styles.hudMetric}>
                    <span className={styles.hudMetricLabel}>{m.k}</span>
                    <span className={styles.hudMetricValue}>{m.v}</span>
                  </div>
                ))}
              </div>
              <div className={styles.hudServices}>
                {["Prosthetics", "Orthotics", "Podiascan", "Gait Analysis", "Rehab", "Compression"].map((s) => (
                  <span key={s} className={styles.hudTag}>
                    {s}
                  </span>
                ))}
              </div>
              <div className={styles.hudFootLine}>
                <span>Friends Colony, Malviya Nagar, Jaipur</span>
                <span className={styles.hudPhone}>+91-70144-79497</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditions Marquee */}
      <div className={styles.marqueeBar}>
        <div className={styles.marqueeInner}>
          {[...CONDITIONS, ...CONDITIONS].map((c, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDot} />
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
