"use client";
import React from "react";

export default function GoogleMap() {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.8971556947253!2d75.81180477618995!3d26.843194063124503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6307134375b%3A0xf64f331fca698fc1!2sFoot%20Care%20Jaipur!5e0!3m2!1sen!2sin!4v1716380000000!5m2!1sen!2sin";

  const directMapUrl = "https://maps.app.goo.gl/o1u8L3Wn6wQpC2aD9"; // Direct short link to Foot Care Jaipur

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "350px",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid var(--light-border)",
        boxShadow: "var(--shadow-card)",
        position: "relative",
      }}
    >
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "350px", display: "block" }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Foot Care Jaipur Clinic Location Map"
      />
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "12px",
          zIndex: 10,
        }}
      >
        <a
          href={directMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-btn"
          style={{
            padding: "8px 16px",
            fontSize: "0.8rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          Open in Google Maps
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
