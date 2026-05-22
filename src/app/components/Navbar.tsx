/*
  CHANGELOG - Navbar.tsx
  - AUDIT FIX: Replaced state dependencies (lastY) in scroll listener useEffect with ref (lastYRef) to avoid constant re-binding of window scroll listener
  - AUDIT FIX: Used ref (mobileOpenRef) in scroll listener to avoid re-triggering scroll listener on mobile menu toggles
  - REDESIGN: Standardized on dark-first design, applying glassmorphism backdrop-blurs and custom border properties
  - Added clean framer-motion based drawer transition feel or smooth transition properties in CSS
  - Verified touch target and aria expand states for keyboard accessibility
*/

"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Technology", href: "#technology" },
  { label: "Stories", href: "#stories" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastYRef = useRef(0);
  const mobileOpenRef = useRef(mobileOpen);

  // Sync mobileOpen ref
  useEffect(() => {
    mobileOpenRef.current = mobileOpen;
  }, [mobileOpen]);

  // Performance audit fix: scroll listener only binds once on mount
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      if (!mobileOpenRef.current && y > 120) {
        setHidden(y > lastYRef.current);
      } else {
        setHidden(false);
      }
      lastYRef.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power4.out", delay: 0.1 }
    );
  }, { scope: headerRef });

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        hidden ? styles.hidden : ""
      } ${mobileOpen ? styles.mobileOpen : ""}`}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#hero" className={styles.logo} aria-label="Foot Care Jaipur Home">
          <span className={styles.logoMark}>FC</span>
          <div className={styles.logoText}>
            <span className={styles.logoMain}>FOOTCARE</span>
            <span className={styles.logoSub}>JAIPUR · EST. 1998</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className={styles.navLink}>
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/917014479497"
            target="_blank"
            rel="noopener noreferrer"
            className={`glow-btn ${styles.ctaBtn}`}
          >
            WhatsApp Us
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`${styles.toggle} ${mobileOpen ? styles.toggleOpen : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ""}`} aria-hidden={!mobileOpen}>
        <nav className={styles.drawerNav}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={styles.drawerLink}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/917014479497"
            target="_blank"
            rel="noopener noreferrer"
            className={`glow-btn ${styles.drawerCta}`}
            onClick={() => setMobileOpen(false)}
          >
            WhatsApp Us
          </a>
        </nav>
      </div>
    </header>
  );
}
