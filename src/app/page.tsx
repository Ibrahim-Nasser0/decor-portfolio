"use client";

import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import ArchitecturalCaseStudy from "@/components/ArchitecturalCaseStudy";
import PortfolioGallery from "@/components/PortfolioGallery";
import CostEstimator from "@/components/CostEstimator";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-white text-[#111111] overflow-x-hidden selection:bg-black selection:text-white">
        <Navbar />
        <Hero />
        <AboutSection />
        <ResumeSection />
        <ArchitecturalCaseStudy />
        <PortfolioGallery />
        <CostEstimator />
        <ContactSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
