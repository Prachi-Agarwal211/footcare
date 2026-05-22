import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import Technology from "./components/Technology";
import PatientStories from "./components/PatientStories";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SmokeBackground from "./components/SmokeBackground";

export default function Home() {
  return (
    <>
      <SmokeBackground />
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Services />
        <Technology />
        <PatientStories />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
