import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Foot Care Jaipur | Artificial Limb Clinic Since 1998 — Prosthetics, Orthotics & Rehabilitation",
  description:
    "Rajasthan's first private Artificial Limb Clinic. World-class prosthetics, custom orthotics, compression therapy, Podiascan gait analysis, and rehabilitation. Led by Dr. Rajiv Agrawal. Call +91-70144-79497.",
  keywords: [
    "footcare jaipur", "artificial limb clinic jaipur", "prosthetics jaipur",
    "Jaipur foot", "bionic hand jaipur", "orthotics jaipur", "below knee prosthesis",
    "above knee prosthesis", "flat foot treatment jaipur", "diabetic foot care jaipur",
    "Dr Rajiv Agrawal", "rehabilitation jaipur", "custom insoles jaipur",
    "compression stockings jaipur", "podiascan jaipur", "ALIMCO fabricating agency",
    "artificial limb clinic since 1998", "prosthetic limb jaipur", "foot pain doctor jaipur",
  ],
  authors: [{ name: "Dr. Rajiv Agrawal — Foot Care Jaipur" }],
  robots: "index, follow",
  openGraph: {
    title: "Foot Care Jaipur — Artificial Limb Clinic Since 1998",
    description: "World-class prosthetics, orthotics & rehabilitation. Rajasthan's first private artificial limb center.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
