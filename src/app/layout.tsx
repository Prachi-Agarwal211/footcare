import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";

/* ─── next/font: Zero-CLS, auto-subset, no render-blocking CSS import ─── */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-tech",
  display: "swap",
});

/* ─── Structured Data (JSON-LD) ─── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://footcarejaipur.com/#organization",
      "name": "Foot Care Jaipur — Artificial Limb Clinic",
      "alternateName": "Foot Care Jaipur",
      "description":
        "Rajasthan's first private Artificial Limb Clinic providing world-class prosthetics, orthotics, and rehabilitation services since 1998.",
      "url": "https://footcarejaipur.com",
      "logo": "https://footcarejaipur.com/og-image.jpg",
      "image": "https://footcarejaipur.com/og-image.jpg",
      "telephone": "+91-70144-79497",
      "email": "footcarejaipur@gmail.com",
      "foundingDate": "1998",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2, Friends Colony, Jhalana Pyau, Calgary Road, Malviya Nagar",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "postalCode": "302017",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "26.8505",
        "longitude": "75.8022",
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00",
        },
      ],
      "sameAs": [
        "https://wa.me/917014479497",
        "https://instagram.com/footcarejaipur",
        "https://footcarejaipur.blogspot.com",
      ],
      "priceRange": "₹₹",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, UPI, Bank Transfer",
      "areaServed": {
        "@type": "Country",
        "name": "India",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Prosthetics, Orthotics & Rehabilitation Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Artificial Limb Prosthetics" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Custom Orthotics & Bracing" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Compression Therapy" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Podiascan Gait Analysis" } },
          { "@type": "Offer", "itemOffered": { "@type": "MedicalTherapy", "name": "Rehabilitation Services" } },
        ],
      },
    },
    {
      "@type": "Physician",
      "@id": "https://footcarejaipur.com/#physician",
      "name": "Dr. Rajiv Agrawal",
      "jobTitle": "Prosthetist & Orthotist",
      "description":
        "Registered Prosthetist & Orthotist (Rehabilitation Council of India). 25+ years of clinical experience, having managed over 50,000 patients globally.",
      "worksFor": { "@id": "https://footcarejaipur.com/#organization" },
      "medicalSpecialty": "Prosthetics & Orthotics",
      "url": "https://footcarejaipur.com/#about",
      "award": "Rajasthan's First Private Artificial Limb Clinic — Est. 1998",
    },
    {
      "@type": "WebSite",
      "@id": "https://footcarejaipur.com/#website",
      "url": "https://footcarejaipur.com",
      "name": "Foot Care Jaipur",
      "publisher": { "@id": "https://footcarejaipur.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://footcarejaipur.com/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://footcarejaipur.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the cost of an artificial limb in Jaipur?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The cost of an artificial limb depends on the type, level of amputation, and technology used. At Foot Care Jaipur, we provide solutions ranging from affordable Jaipur Foot (world's cheapest prosthetic limb) to advanced microprocessor-controlled knees and bionic hands. We recommend a free consultation with Dr. Rajiv Agrawal for an accurate assessment and cost estimate.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does prosthetic fitting and training take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The timeline depends on your condition, healing stage, and prosthetic type. Typically, initial assessment and prescription take 1 visit, fabrication takes 3-7 days, fitting and alignment takes 1-2 visits, and gait training takes 1-4 weeks. Complex cases like microprocessor knees or upper limb prosthetics may take longer.",
          },
        },
        {
          "@type": "Question",
          "name": "Does CGHS or insurance cover prosthetics in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, many insurance providers and CGHS cover prosthetic limbs and orthotic devices. Foot Care Jaipur is empaneled as a Fabricating Agency for ALIMCO (Government of India) and assists patients with documentation for insurance claims. Please bring your insurance card and policy documents for guidance during your consultation.",
          },
        },
        {
          "@type": "Question",
          "name": "Can flat foot be treated without surgery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The vast majority of flat foot (pes planus) cases can be effectively managed without surgery. Dr. Rajiv Agrawal specializes in conservative treatment including custom orthotic insoles, gait training, physiotherapy protocols, and footwear modification. Early intervention yields the best results.",
          },
        },
        {
          "@type": "Question",
          "name": "Does Foot Care Jaipur treat patients from outside Rajasthan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We have treated over 50,000 patients from across India and 12+ countries. Patients travel to us from South India, the USA, UK, Middle East, and beyond. We help with scheduling extended stays for fitting and training. WhatsApp us at +91-70144-79497 for remote pre-consultation.",
          },
        },
        {
          "@type": "Question",
          "name": "What is Podiascan and why do I need it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Podiascan is a computerized foot pressure mapping and gait analysis system. It creates a precise pressure map of how your foot distributes weight during standing and walking. This helps diagnose the root cause of foot pain, design perfectly fitted orthotics, and monitor treatment progress. It is especially valuable for diabetic foot, flat foot, and sports injuries.",
          },
        },
        {
          "@type": "Question",
          "name": "How do I book an appointment at Foot Care Jaipur?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can book an appointment by: (1) Calling or WhatsApp-ing us at +91-70144-79497, (2) Emailing footcarejaipur@gmail.com, (3) Filling the appointment request form on our website. Walk-ins are also welcome at 2, Friends Colony, Jhalana Pyau, Calgary Road, Malviya Nagar, Jaipur — 302017.",
          },
        },
        {
          "@type": "Question",
          "name": "What types of prosthetic limbs are available at Foot Care Jaipur?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide the full range: Jaipur Foot (affordable), Carbon Fiber Energy-Storing Feet, Microprocessor-Controlled Knees (C-Leg type), Pneumatic & Hydraulic Knees, Myoelectric / Bionic Hands, Above-Knee, Below-Knee, Hip Disarticulation, Partial Foot, and Silicon Cosmetic Prostheses. Each is prescribed, fabricated, and fitted specifically for the individual patient.",
          },
        },
      ],
    },
  ],
};

/* ─── Viewport ─── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05080f",
};

/* ─── Metadata ─── */
export const metadata: Metadata = {
  metadataBase: new URL("https://footcarejaipur.com"),
  title: {
    default:
      "Foot Care Jaipur | Artificial Limb Clinic Since 1998 — Prosthetics, Orthotics & Rehabilitation",
    template: "%s | Foot Care Jaipur",
  },
  description:
    "Rajasthan's first private Artificial Limb Clinic. World-class prosthetics, custom orthotics, compression therapy, Podiascan gait analysis & rehabilitation since 1998. Led by Dr. Rajiv Agrawal. Call +91-70144-79497.",
  keywords: [
    "footcare jaipur",
    "artificial limb clinic jaipur",
    "prosthetics jaipur",
    "Jaipur foot",
    "bionic hand jaipur",
    "orthotics jaipur",
    "below knee prosthesis jaipur",
    "above knee prosthesis jaipur",
    "flat foot treatment jaipur",
    "diabetic foot care jaipur",
    "Dr Rajiv Agrawal prosthetist",
    "rehabilitation jaipur",
    "custom insoles jaipur",
    "compression stockings jaipur",
    "podiascan jaipur",
    "ALIMCO fabricating agency",
    "artificial limb clinic since 1998",
    "prosthetic limb jaipur",
    "foot pain doctor jaipur",
    "amputation rehabilitation jaipur",
    "microprocessor knee jaipur",
    "carbon foot prosthesis",
    "myoelectric hand jaipur",
  ],
  authors: [{ name: "Dr. Rajiv Agrawal — Foot Care Jaipur", url: "https://footcarejaipur.com" }],
  creator: "Foot Care Jaipur",
  publisher: "Foot Care Jaipur",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://footcarejaipur.com",
  },
  openGraph: {
    title: "Foot Care Jaipur — Artificial Limb Clinic Since 1998",
    description:
      "World-class prosthetics, orthotics & rehabilitation. Rajasthan's first private artificial limb center. 50,000+ patients served. Call +91-70144-79497.",
    type: "website",
    locale: "en_IN",
    url: "https://footcarejaipur.com",
    siteName: "Foot Care Jaipur",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Foot Care Jaipur — Artificial Limb Clinic Since 1998, Jaipur Rajasthan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foot Care Jaipur — Artificial Limb Clinic Since 1998",
    description: "World-class prosthetics & orthotics. 25+ years. 50,000+ patients. Jaipur, Rajasthan.",
    images: ["/og-image.jpg"],
    creator: "@footcarejaipur",
  },
  verification: {
    // google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} ${sora.variable}`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
