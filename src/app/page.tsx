"use client";

import { useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Transformations from "@/components/sections/Transformations";
import LeadCapture from "@/components/sections/LeadCapture";

// Register Lenis smooth scroll for Next.js if needed, or simple custom GSAP scroll
// We'll use a simple approach for smooth feel using native CSS + GSAP

export default function Home() {
  
  // Clean scroll setup
  useEffect(() => {
    // Optional: add smooth scroll library like Lenis here if installed
    // For now, native smooth scroll is handled via CSS in globals if needed
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-obsidian selection:bg-crimson selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Transformations />
      <LeadCapture />
      <FloatingWhatsApp />
      
      {/* Simple Footer */}
      <footer className="bg-obsidian-900 border-t border-white/5 py-8 text-center text-metallic text-sm font-sans">
        <p>&copy; {new Date().getFullYear()} Vibin Joseph Elite Coaching. All rights reserved.</p>
      </footer>
    </main>
  );
}
