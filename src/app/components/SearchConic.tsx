/*
  CHANGELOG - SearchConic.tsx
  - Created SearchConic search/inquiry component with an animated rotating conic-gradient border on focus
  - Implemented real-time filtering of 50+ treatable conditions
  - Clicking a result fires a smooth scroll to the #contact section and pre-fills the inquiry textarea
  - Added full keyboard accessibility (arrows to navigate options, Escape to close, Enter to select)
*/

"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./SearchConic.module.css";

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
  "Scoliosis", "Podiascan", "Posture Issues", "Rehabilitation", "Fracture Mal-Union / Non-Union"
];

export default function SearchConic() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Derive matches during render to avoid synchronous state update in useEffect
  const matches = React.useMemo(() => {
    if (!query.trim()) return [];
    const cleanQuery = query.toLowerCase();
    return CONDITIONS.filter(c => c.toLowerCase().includes(cleanQuery)).slice(0, 5);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (matches.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % matches.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + matches.length) % matches.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < matches.length) {
        selectCondition(matches[activeIndex]);
      } else if (matches.length > 0) {
        selectCondition(matches[0]);
      }
    } else if (e.key === "Escape") {
      setFocused(false);
      setActiveIndex(-1);
    }
  };

  const selectCondition = (condition: string) => {
    setQuery("");
    setActiveIndex(-1);
    setFocused(false);

    // Fill the contact form notes and focus the name field
    const notesField = document.getElementById("c-notes") as HTMLTextAreaElement | null;
    const serviceField = document.getElementById("c-service") as HTMLSelectElement | null;
    const nameField = document.getElementById("c-name") as HTMLInputElement | null;

    if (notesField) {
      notesField.value = `I am inquiring about treatment and solutions for: ${condition}.`;
    }

    if (serviceField) {
      // Find the most appropriate service value
      if (condition.toLowerCase().includes("prosthes") || condition.toLowerCase().includes("limb") || condition.toLowerCase().includes("bionic") || condition.toLowerCase().includes("foot")) {
        serviceField.value = "Prosthetics — Above Knee / Below Knee / Upper Limb";
      } else if (condition.toLowerCase().includes("orthotic") || condition.toLowerCase().includes("brace") || condition.toLowerCase().includes("scar")) {
        serviceField.value = "Custom Orthotics & Bracing";
      } else if (condition.toLowerCase().includes("compression") || condition.toLowerCase().includes("lymphedema") || condition.toLowerCase().includes("vein") || condition.toLowerCase().includes("dvt")) {
        serviceField.value = "Compression Therapy / Lymphedema";
      } else if (condition.toLowerCase().includes("pain") || condition.toLowerCase().includes("flat") || condition.toLowerCase().includes("heel")) {
        serviceField.value = "Foot Pain — Flat Foot, Diabetic Foot, Heel Pain";
      } else if (condition.toLowerCase().includes("scan") || condition.toLowerCase().includes("gait")) {
        serviceField.value = "Podiascan / Gait Analysis";
      } else if (condition.toLowerCase().includes("rehab") || condition.toLowerCase().includes("polio") || condition.toLowerCase().includes("paralysis")) {
        serviceField.value = "Rehabilitation & Post-surgery Recovery";
      }
    }

    // Scroll to contact form smoothly
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        if (nameField) nameField.focus();
      }, 800);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.searchWrapper} ${focused ? styles.focused : ""}`}
      onKeyDown={handleKeyDown}
    >
      {/* Conic border layout */}
      <div className={styles.borderAnimation} aria-hidden="true" />
      <div className={styles.inputContainer}>
        <div className={styles.searchIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search conditions (e.g. Flat Foot, Prosthesis)..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          onFocus={() => setFocused(true)}
          className={styles.input}
          aria-label="Search conditions treated"
          aria-autocomplete="list"
          aria-controls="search-matches"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setActiveIndex(-1);
            }}
            className={styles.clearBtn}
            aria-label="Clear search input"
          >
            ✕
          </button>
        )}
      </div>

      {/* Suggestion list */}
      {focused && matches.length > 0 && (
        <ul id="search-matches" ref={listRef} className={styles.suggestions} role="listbox">
          {matches.map((match, idx) => (
            <li
              key={match}
              onClick={() => selectCondition(match)}
              className={`${styles.suggestionItem} ${idx === activeIndex ? styles.activeItem : ""}`}
              role="option"
              aria-selected={idx === activeIndex}
            >
              <span className={styles.bullet}>•</span>
              <span className={styles.matchText}>{match}</span>
              <span className={styles.arrow}>→</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
