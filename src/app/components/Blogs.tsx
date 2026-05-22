"use client";
import React, { useRef } from "react";
import styles from "./Blogs.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { use3DTilt } from "../hooks/use3DTilt";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  date: string;
  category: string;
  lang: string;
  title: string;
  author: string;
  excerpt: string;
  url: string;
  featured: boolean;
}

const BLOGS: BlogPost[] = [
  {
    date: "May 12, 2026",
    category: "Prosthetics",
    lang: "English",
    title: "How We Prescribe the Right Artificial Limb: A Personalized Journey, Not a Product",
    author: "Dr. Rajiv Agrawal",
    excerpt: "When a patient walks into our clinic after an amputation, they are not just looking for an artificial limb — they are looking for confidence, independence, and a return to life. Prescribing the right prosthesis is a highly scientific, personalized, and multidisciplinary process.",
    url: "https://footcarejaipur.blogspot.com",
    featured: true,
  },
  {
    date: "Apr 9, 2026",
    category: "Rehabilitation",
    lang: "English",
    title: "Life After Amputation: Why Exercises, Stump Care & Expert Prosthetic Guidance Matter",
    author: "Dr. Rajiv Agrawal",
    excerpt: "Losing a limb is not the end of mobility — it is the beginning of a new journey. With the right rehabilitation, exercises, and prosthetic care, an amputee can regain independence, confidence, and an active lifestyle.",
    url: "https://footcarejaipur.blogspot.com",
    featured: false,
  },
  {
    date: "Apr 8, 2026",
    category: "Flat Foot",
    lang: "English",
    title: "Long-Term Effects and Complications of Flat Foot If Left Untreated",
    author: "Dr. Rajiv Agrawal",
    excerpt: "Flat foot, medically known as pes planus, is often ignored as a minor variation. However, untreated flat feet can lead to a cascade of musculoskeletal complications affecting not only the feet but also the knees, hips, and spine.",
    url: "https://footcarejaipur.blogspot.com",
    featured: false,
  },
  {
    date: "Apr 7, 2026",
    category: "Orthotics",
    lang: "Hindi",
    title: "फ्लैट फुट में कस्टमाइज़्ड ऑर्थोटिक्स की भूमिका – सही इलाज, सही सपोर्ट",
    author: "Dr. Rajiv Agrawal",
    excerpt: "फ्लैट फुट (Flat Foot / Pes Planus) आज के समय में एक आम समस्या बनती जा रही है। कस्टमाइज्ड ऑर्थोटिक्स बाजार में उपलब्ध रेडीमेड इनसोल से कहीं बेहतर और टिकाऊ समाधान प्रदान करते हैं।",
    url: "https://footcarejaipur.blogspot.com",
    featured: false,
  },
  {
    date: "Mar 28, 2026",
    category: "Rehabilitation",
    lang: "English",
    title: "Life After Amputation: A Practical Guide for Patients, Families & Caregivers",
    author: "Dr. Rajiv Agrawal",
    excerpt: "Amputation is often perceived as the end of mobility, independence, or normal life. In reality, it is a new beginning — one that requires the right guidance, mindset, and rehabilitation approach.",
    url: "https://footcarejaipur.blogspot.com",
    featured: false,
  },
  {
    date: "Mar 19, 2026",
    category: "Prosthetics",
    lang: "Hindi",
    title: "Prosthetist का Pro Tip: सही Prosthesis चुनना ही नहीं, उसे सही तरीके से जीना सीखना भी ज़रूरी है",
    author: "Dr. Rajiv Agrawal",
    excerpt: "जब कोई व्यक्ति अम्प्यूटेशन के बाद पहली बार मेरे क्लिनिक में आता है, तो उसके मन में सबसे बड़ा सवाल यही होता है — मेरे लिए कौन सा prosthetic leg या artificial limb सबसे अच्छा रहेगा?",
    url: "https://footcarejaipur.blogspot.com",
    featured: false,
  },
  {
    date: "Mar 13, 2026",
    category: "Rehabilitation",
    lang: "Hindi",
    title: "पैर के घुटने से नीचे कटने के बाद बेहतर जीवन की ओर – सही निर्णय, सही मार्गदर्शन और सही कृत्रिम पैर",
    author: "Dr. Rajiv Agrawal",
    excerpt: "Below Knee Amputation किसी भी व्यक्ति और उसके परिवार के लिए जीवन का एक बहुत बड़ा बदलाव होता है। सही जानकारी, सही मार्गदर्शन और सही तकनीक के साथ एक amputee फिर से स्वतंत्र जीवन जी सकता है।",
    url: "https://footcarejaipur.blogspot.com",
    featured: false,
  },
];

interface BlogCardProps {
  b: BlogPost;
}

function BlogCard({ b }: BlogCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  use3DTilt(cardRef, { max: b.featured ? 5 : 8, perspective: 1200 });

  return (
    <a
      ref={cardRef}
      href={b.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${b.featured ? styles.featured : ""}`}
      lang={b.lang === "Hindi" ? "hi" : "en"}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardMeta}>
          <span className={styles.catBadge}>{b.category}</span>
          <span className={styles.langBadge}>{b.lang}</span>
          <span className={styles.date}>{b.date}</span>
        </div>
        <h3 className={styles.cardTitle}>{b.title}</h3>
        <p className={styles.cardExcerpt}>{b.excerpt}</p>
        
        {b.featured && (
          <div className={styles.cardAuthor}>
            <span className={styles.authorAvatar}>RA</span>
            <span className={styles.authorName}>
              By {b.author} · Clinical Director
            </span>
          </div>
        )}
        <span className={styles.readLink}>Read on Blogger →</span>
      </div>
    </a>
  );
}

export default function Blogs() {
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
    <section id="blogs" className={styles.section} ref={sectionRef}>
      <div className={styles.bgAccent} aria-hidden="true" />
      <div className={styles.wrap}>
        <div className={styles.head} ref={headRef}>
          <span className="section-tag">Knowledge Hub</span>
          <h2 className={styles.title}>
            Educational Articles &amp;<br />
            <span className={styles.titleGreen}>Clinical Insights</span>
          </h2>
          <p className={styles.desc}>
            By Dr. Rajiv Agrawal — Clarifying myths, explaining treatments, and guiding patients through their rehabilitation journey. (Powered by Blogger)
          </p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {BLOGS.map((b) => (
            <BlogCard key={b.title} b={b} />
          ))}
        </div>

        <div className={styles.cta}>
          <a
            href="https://footcarejaipur.blogspot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn"
          >
            View All Articles on Blogger
          </a>
        </div>
      </div>
    </section>
  );
}
