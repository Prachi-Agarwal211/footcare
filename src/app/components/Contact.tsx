"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Contact.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { use3DTilt } from "../hooks/use3DTilt";
import ClinicHours from "./ClinicHours";
import GoogleMap from "./GoogleMap";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SERVICES_OPTS = [
  "Prosthetics — Above Knee / Below Knee / Upper Limb",
  "Jaipur Foot / Bionic Hands / Myo-Electric Limb",
  "MicroProcessor Controlled Knee",
  "Custom Orthotics & Bracing",
  "Compression Therapy / Lymphedema",
  "Foot Pain — Flat Foot, Diabetic Foot, Heel Pain",
  "Podiascan / Gait Analysis",
  "Rehabilitation & Post-surgery Recovery",
  "Other / Not Sure",
];

interface InfoItemProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
  val: React.ReactNode;
}

function ContactInfoItem({ href, icon, label, val }: InfoItemProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  use3DTilt(href ? anchorRef : divRef, { max: 4, perspective: 1000 });

  if (href) {
    return (
      <a ref={anchorRef} href={href} className={styles.infoItem}>
        <div className={styles.infoIcon}>{icon}</div>
        <div>
          <span className={styles.infoLabel}>{label}</span>
          <span className={styles.infoVal}>{val}</span>
        </div>
      </a>
    );
  }

  return (
    <div ref={divRef} className={styles.infoItem}>
      <div className={styles.infoIcon}>{icon}</div>
      <div>
        <span className={styles.infoLabel}>{label}</span>
        <span className={styles.infoVal}>{val}</span>
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: SERVICES_OPTS[0],
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Hook 3D mouse tilt animation to the form card
  use3DTilt(formRef, { max: 5, perspective: 1000 });

  useEffect(() => {
    const handleAutofill = (e: Event) => {
      const customEvent = e as CustomEvent<{ notes: string; service: string }>;
      if (customEvent.detail) {
        setForm((prev) => ({
          ...prev,
          notes: customEvent.detail.notes,
          service: customEvent.detail.service,
        }));
      }
    };
    window.addEventListener("autofillContact", handleAutofill);
    return () => window.removeEventListener("autofillContact", handleAutofill);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        Array.from(leftRef.current?.children ?? []),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", service: SERVICES_OPTS[0], notes: "" });
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong. Please try again.");
        setStatus("idle");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit request. Please check your connection and try again.");
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.wrap}>
        {/* Left info */}
        <div className={styles.left} ref={leftRef}>
          <span className="section-tag">Contact Us</span>
          <h2 className={styles.title}>
            Book Your<br />
            <span className={styles.titleGreen}>Appointment</span>
          </h2>
          <p className={styles.intro}>
            Foot Care Jaipur — Artificial Limb Clinic Since 1998.<br />
            Let our expert team assess your condition and prescribe the perfect solution.
          </p>

          {/* Info items */}
          <div className={styles.infoList}>
            <ContactInfoItem
              href="tel:+917014479497"
              label="Call / WhatsApp"
              val="+91-70144-79497"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              }
            />

            <ContactInfoItem
              href="mailto:footcarejaipur@gmail.com"
              label="Email"
              val="footcarejaipur@gmail.com"
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
            />

            <ContactInfoItem
              label="Clinic Address"
              val={
                <>
                  2, Friends Colony, Jhalana Pyau,<br /> Calgary Road, Malviya
                  Nagar,<br /> Jaipur — 302017, Rajasthan
                </>
              }
              icon={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
            />
          </div>

          {/* Social Links */}
          <div className={styles.socials}>
            <a
              href="https://wa.me/917014479497"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialBtn} ${styles.waBtn}`}
              aria-label="WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialBtn} ${styles.igBtn}`}
              aria-label="Instagram"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialBtn} ${styles.liBtn}`}
              aria-label="LinkedIn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Timings and Map Widgets */}
          <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <ClinicHours />
            <GoogleMap />
          </div>
        </div>

        {/* Right: Form */}
        <div className={styles.right}>
          <div ref={formRef} className={styles.formCard}>
            <div className={styles.formCardInner}>
              {status === "success" ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>Appointment Request Received!</h3>
                  <p>
                    Our clinic team will call you within 24 hours to confirm your
                    slot. You can also reach us directly at +91-70144-79497.
                  </p>
                  <button
                    className="glow-btn"
                    style={{ marginTop: "20px" }}
                    onClick={() => setStatus("idle")}
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h3 className={styles.formTitle}>Book an Appointment</h3>
                  <p className={styles.formSub}>
                    Artificial Limb Clinic Since 1998
                  </p>

                  <div className={styles.field}>
                    <label htmlFor="c-name">Full Name *</label>
                    <input
                      id="c-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="c-phone">Phone / WhatsApp *</label>
                    <input
                      id="c-phone"
                      name="phone"
                      type="tel"
                      required
                      pattern="[0-9+\-\s]{8,15}"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="c-service">Service Required</label>
                    <select
                      id="c-service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                    >
                      {SERVICES_OPTS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="c-notes">Brief Description (Optional)</label>
                    <textarea
                      id="c-notes"
                      name="notes"
                      rows={3}
                      placeholder="Describe your condition or requirements briefly..."
                      value={form.notes}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                    />
                  </div>

                  <button
                    type="submit"
                    className="glow-btn"
                    style={{ width: "100%", marginTop: "8px" }}
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending..." : "Request Appointment"}
                  </button>

                  <p className={styles.orLine}>— or reach us directly —</p>
                  <a
                    href="https://wa.me/917014479497"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.waDirectBtn}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Chat on WhatsApp — +91-70144-79497
                  </a>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
