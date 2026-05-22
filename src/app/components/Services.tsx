"use client";
import React, { useRef, useState } from "react";
import styles from "./Services.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { use3DTilt } from "../hooks/use3DTilt";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  num: string;
  title: string;
  category: string;
  desc: string;
  items: string[];
}

const SERVICES: Service[] = [
  {
    id: "prosthetics",
    num: "01",
    title: "Prosthetics — Artificial Limbs",
    category: "Prosthetics",
    desc: "World-class artificial limb solutions for all levels of amputation. From traditional Jaipur Foot to MicroProcessor-Controlled knees.",
    items: [
      "Hip Disarticulation Prosthesis",
      "Above Knee / Knee Disarticulation Prosthesis",
      "Below Knee Prosthesis",
      "Partial Foot / Silicon Cosmetic Prosthesis",
      "Bionic Hands / Myo-Electric Upper Limb",
      "Carbon Fiber / Energy Storing Foot",
      "MicroProcessor Controlled Prosthetic Knee",
      "Pneumatic & Hydraulic Knee Systems",
      "Jaipur Foot (World's Cheapest Prosthetic Limb)",
    ],
  },
  {
    id: "orthotics",
    num: "02",
    title: "Orthotics & Bracing",
    category: "Orthotics",
    desc: "Custom-fabricated orthotic devices to correct deformities, support weak limbs, and restore natural gait.",
    items: [
      "Cervical Orthotics (Neck Braces)",
      "Spinal Orthotics — TLSO, LSO, CTLSO",
      "Upper Extremity Orthotics",
      "Lower Extremity Orthotics — AFO, KAFO, HKAFOs",
      "Scoliosis & Kyphosis Braces",
      "CTEV (Club Foot) Management Braces",
      "Silicon Liners & Silicon Fingers",
      "Post-Burn Hypertrophic Scar Garments",
    ],
  },
  {
    id: "foot-care",
    num: "03",
    title: "Foot Care & Conservative Treatment",
    category: "Conservative",
    desc: "Non-surgical treatment for all foot and musculoskeletal conditions — from flat foot to diabetic foot complications.",
    items: [
      "Flat Foot (Pes Planus) Management",
      "Diabetic Foot Care & Ulcer Prevention",
      "Foot Pain, Bunions, Corns & Calluses",
      "Calcaneal Spur / Heel Pain",
      "Pes Cavus (High Arch)",
      "Hallux Valgus (Bunion)",
      "Ankle Pain & Foot Drop",
      "Knee, Hip & Back Pain",
    ],
  },
  {
    id: "compression",
    num: "04",
    title: "Compression Therapy",
    category: "Compression",
    desc: "Custom-designed compression solutions for venous disorders, lymphedema, post-surgical recovery, and cosmetic restoration.",
    items: [
      "Custom Compression Stockings",
      "Custom Compression Garments",
      "Lymphoedema Management",
      "Varicose Veins Support",
      "Deep Vein Thrombosis (DVT) Therapy",
      "Post Mastectomy Lymphoedema",
      "Post Burn Keloid Garments",
      "Breast Prosthesis",
    ],
  },
  {
    id: "diagnostics",
    num: "05",
    title: "Diagnostics & Analysis",
    category: "Diagnostics",
    desc: "Cutting-edge computerized diagnostic systems to analyse gait, pressure distribution, and posture with clinical precision.",
    items: [
      "Podiascan — Foot Pressure Mapping",
      "T-Scan for Diabetic Foot",
      "Gait Analysis (Biomechanical)",
      "Posture Analysis & Correction",
      "3D Scanning for Socket Fabrication",
      "CAD-CAM Prosthetic Design",
      "Computerized Orthotic Customization",
    ],
  },
  {
    id: "rehabilitation",
    num: "06",
    title: "Rehabilitation & Special Cases",
    category: "Rehab",
    desc: "Comprehensive rehabilitation services for neurological, post-surgical, and complex clinical cases.",
    items: [
      "Polio — Drop Foot & Leg Length Discrepancy",
      "Hemiplegia & Paraplegia Management",
      "Post-Stroke Rehabilitation",
      "Fracture Mal-Union / Non-Union",
      "Post-burn & Post-surgery Recovery",
      "Osteoarthritis & Rheumatoid Arthritis",
      "Cosmetic Restorations (Ears, Fingers, Nose, Thumbs)",
    ],
  },
];

interface CardProps {
  s: Service;
  active: boolean;
  onToggle: () => void;
}

function ServiceCard({ s, active, onToggle }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  use3DTilt(cardRef, { max: 8, perspective: 1000 });

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={active}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardTop}>
          <span className={styles.cardNum}>{s.num}</span>
          <span className={styles.cardCat}>{s.category}</span>
        </div>
        <h3 className={styles.cardTitle}>{s.title}</h3>
        <p className={styles.cardDesc}>{s.desc}</p>

        <div className={`${styles.itemsList} ${active ? styles.itemsOpen : ""}`}>
          <ul>
            {s.items.map((item, i) => (
              <li key={i}>
                <span className={styles.itemDot} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button 
          className={styles.expandBtn} 
          aria-label={`${active ? "Collapse" : "Expand"} ${s.title}`}
          onClick={(e) => {
            e.stopPropagation(); // Avoid double toggling from card click
            onToggle();
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{
              transform: active ? "rotate(180deg)" : "none",
              transition: "transform 0.3s ease",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          {active ? "See less" : "See all"}
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

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
          duration: 0.7,
          stagger: 0.08,
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
    <section id="services" className={styles.section} ref={sectionRef}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.wrap}>
        <div className={styles.head} ref={headRef}>
          <span className="section-tag">Our Services</span>
          <h2 className={styles.title}>
            Comprehensive Prosthetic,<br />
            <span className={styles.titleBlue}>Orthotic &amp; Rehabilitation</span> Solutions
          </h2>
          <p className={styles.desc}>
            We offer world-class solutions for amputees, foot disorders, musculoskeletal conditions, and rehabilitation — all under one roof since 1998.
          </p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.id}
              s={s}
              active={active === s.id}
              onToggle={() => setActive(active === s.id ? null : s.id)}
            />
          ))}
        </div>

        <div className={styles.cta}>
          <a href="#contact" className="glow-btn">Book a Free Consultation</a>
          <a
            href="https://wa.me/917014479497"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waBtn}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
