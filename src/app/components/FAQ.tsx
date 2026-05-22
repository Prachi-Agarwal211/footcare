"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQ.module.css";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the cost of an artificial limb in Jaipur?",
    answer: "The cost of an artificial limb depends on the type, level of amputation, and technology used. At Foot Care Jaipur, we provide solutions ranging from affordable Jaipur Foot (world's cheapest prosthetic limb) to advanced microprocessor-controlled knees and bionic hands. We recommend a free consultation with Dr. Rajiv Agrawal for an accurate assessment and cost estimate.",
  },
  {
    question: "How long does prosthetic fitting and training take?",
    answer: "The timeline depends on your condition, healing stage, and prosthetic type. Typically, initial assessment and prescription take 1 visit, fabrication takes 3-7 days, fitting and alignment takes 1-2 visits, and gait training takes 1-4 weeks. Complex cases like microprocessor knees or upper limb prosthetics may take longer.",
  },
  {
    question: "Does CGHS or insurance cover prosthetics in India?",
    answer: "Yes, many insurance providers and CGHS cover prosthetic limbs and orthotic devices. Foot Care Jaipur is empaneled as a Fabricating Agency for ALIMCO (Government of India) and assists patients with documentation for insurance claims. Please bring your insurance card and policy documents for guidance during your consultation.",
  },
  {
    question: "Can flat foot be treated without surgery?",
    answer: "Yes. The vast majority of flat foot (pes planus) cases can be effectively managed without surgery. Dr. Rajiv Agrawal specializes in conservative treatment including custom orthotic insoles, gait training, physiotherapy protocols, and footwear modification. Early intervention yields the best results.",
  },
  {
    question: "Does Foot Care Jaipur treat patients from outside Rajasthan?",
    answer: "Absolutely. We have treated over 50,000 patients from across India and 12+ countries. Patients travel to us from South India, the USA, UK, Middle East, and beyond. We help with scheduling extended stays for fitting and training. WhatsApp us at +91-70144-79497 for remote pre-consultation.",
  },
  {
    question: "What is Podiascan and why do I need it?",
    answer: "Podiascan is a computerized foot pressure mapping and gait analysis system. It creates a precise pressure map of how your foot distributes weight during standing and walking. This helps diagnose the root cause of foot pain, design perfectly fitted orthotics, and monitor treatment progress. It is especially valuable for diabetic foot, flat foot, and sports injuries.",
  },
  {
    question: "How do I book an appointment at Foot Care Jaipur?",
    answer: "You can book an appointment by: (1) Calling or WhatsApp-ing us at +91-70144-79497, (2) Emailing footcarejaipur@gmail.com, (3) Filling the appointment request form on our website. Walk-ins are also welcome at 2, Friends Colony, Jhalana Pyau, Calgary Road, Malviya Nagar, Jaipur — 302017.",
  },
  {
    question: "What types of prosthetic limbs are available at Foot Care Jaipur?",
    answer: "We provide the full range: Jaipur Foot (affordable), Carbon Fiber Energy-Storing Feet, Microprocessor-Controlled Knees (C-Leg type), Pneumatic & Hydraulic Knees, Myoelectric / Bionic Hands, Above-Knee, Below-Knee, Hip Disarticulation, Partial Foot, and Silicon Cosmetic Prostheses. Each is prescribed, fabricated, and fitted specifically for the individual patient.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div className="section-wrap">
        <div className={styles.titleContainer}>
          <span className="section-tag section-tag-light">Patient Helpdesk</span>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Have questions about our treatments, technology, or booking procedures?
            Find detailed answers from our expert clinical team below.
          </p>
        </div>

        <div className={styles.faqGrid}>
          {faqData.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                className={`${styles.faqCard} ${isActive ? styles.faqCardActive : ""}`}
              >
                <button
                  className={styles.faqTrigger}
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isActive}
                  aria-controls={`faq-content-${idx}`}
                  id={`faq-btn-${idx}`}
                >
                  <span className={styles.faqQuestion}>{item.question}</span>
                  <div className={styles.faqIconWrapper}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={`faq-content-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      className={styles.faqContentWrapper}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className={styles.faqContent}>
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
