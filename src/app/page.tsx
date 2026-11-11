"use client";

import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeaturedProject from "@/components/FeaturedProject";
import PortfolioGallery from "@/components/PortfolioGallery";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CostEstimator from "@/components/CostEstimator";
import ServicesSection from "@/components/ServicesSection";
import WorkflowSection from "@/components/WorkflowSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-[#0e0e10] text-[#f4f2ee] selection:bg-[#c5a880]/30 selection:text-[#e8d5be] overflow-x-hidden">
        <Navbar />
        <Hero />
        <AboutSection />
        <FeaturedProject />
        <PortfolioGallery />
        <BeforeAfterSlider />
        <CostEstimator />
        <ServicesSection />
        <WorkflowSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
