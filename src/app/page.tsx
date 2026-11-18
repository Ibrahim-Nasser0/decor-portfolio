import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import PortfolioGallery from "@/components/PortfolioGallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getProjects, getDesignerProfile } from "@/lib/dataRepository";

// Enable Incremental Static Regeneration (sub-50ms static cache with background revalidation)
export const revalidate = 60;

export default async function Home() {
  const [projects, profile] = await Promise.all([
    getProjects(),
    getDesignerProfile(),
  ]);

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-white text-[#111111] overflow-x-clip selection:bg-black selection:text-white">
        <Navbar profile={profile} />
        <Hero profile={profile} projectsCount={projects.length} />
        <AboutSection profile={profile} />
        <SkillsSection profile={profile} />
        <ExperienceSection profile={profile} />
        <PortfolioGallery initialProjects={projects} />
        <ContactSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
