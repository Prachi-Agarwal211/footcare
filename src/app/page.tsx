import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import Technology from "./components/Technology";
import PatientStories from "./components/PatientStories";
import FAQ from "./components/FAQ";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import WhatsAppFloat from "./components/WhatsAppFloat";
import SmokeBackground from "./components/SmokeBackground";

type WaveColor = string;

function WaveDivider({ fill, flip = false, bg = 'transparent' }: { fill: WaveColor; flip?: boolean; bg?: WaveColor }) {
  return (
    <div
      className="wave-divider"
      style={{ background: bg, marginTop: '-1px', marginBottom: '-1px' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: flip ? 'scaleY(-1)' : 'none', display: 'block', width: '100%', height: 'clamp(32px,5vw,60px)' }}
      >
        <path
          d="M0,28 C180,56 360,0 540,28 C720,56 900,0 1080,28 C1260,56 1380,14 1440,28 L1440,56 L0,56 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export default function Home() {
  const blueLight = '#eef7ff';
  const greenLight = '#f0fdf4';
  return (
    <>
      <SmokeBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Hero — dark (smoke visible) */}
        <Hero />
        {/* Dark → Blue Light */}
        <WaveDivider fill={blueLight} bg="transparent" />
        {/* About — light blue */}
        <AboutUs />
        {/* Blue Light → Dark */}
        <WaveDivider fill={blueLight} bg={blueLight} flip />
        {/* Services — dark */}
        <Services />
        {/* Dark → Green Light */}
        <WaveDivider fill={greenLight} bg="transparent" />
        {/* Technology — light green */}
        <Technology />
        {/* Green Light → Dark */}
        <WaveDivider fill={greenLight} bg={greenLight} flip />
        {/* PatientStories — dark */}
        <PatientStories />
        {/* Dark → Blue Light */}
        <WaveDivider fill={blueLight} bg="transparent" />
        {/* FAQ — light blue */}
        <FAQ />
        {/* Blue Light → Dark */}
        <WaveDivider fill={blueLight} bg={blueLight} flip />
        {/* Blogs — dark */}
        <Blogs />
        {/* Dark → Green Light */}
        <WaveDivider fill={greenLight} bg="transparent" />
        {/* Contact — light green */}
        <Contact />
        {/* Green Light → Dark */}
        <WaveDivider fill={greenLight} bg={greenLight} flip />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
