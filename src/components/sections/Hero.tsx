"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ParallaxItem } from "../effects/ThreeDElements";
import { ChevronRight, Play } from "lucide-react";
import ThreeDViewer from "../effects/ThreeDViewer";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Simple reveal for headline
      tl.from(".headline-word", {
        y: 100,
        opacity: 0,
        rotationZ: 5,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2,
      })
      .from(subheadRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5")
      .from(buttonsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      .from(imageRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      }, "-=1.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headline = "TRANSFORM YOUR PHYSIQUE. COMMAND YOUR PRIVILEGE.";
  const words = headline.split(" ");

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Particles/Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-obsidian-800 via-obsidian to-obsidian -z-20"></div>
      
      {/* 3D Floating Assets Background */}
      <ParallaxItem speed={1.5} floatOffset={30} className="top-1/4 right-1/4 opacity-20 -z-10">
        <div className="w-32 h-32 bg-crimson rounded-lg shadow-[0_0_50px_rgba(225,29,72,0.5)] transform rotate-45 blur-md"></div>
      </ParallaxItem>
      <ParallaxItem speed={0.8} floatOffset={15} className="bottom-1/4 left-1/4 opacity-10 -z-10">
        <div className="w-48 h-48 bg-metallic rounded-full blur-xl"></div>
      </ParallaxItem>

      {/* Full Background Interactive WebGL Model */}
      <div className="absolute inset-0 z-0 opacity-70">
        <ThreeDViewer 
          modelPath="/models/gym_outfit_sport_hoodie_pants.glb" 
          fallbackImage="/images/hero_mobile_fallback.png"
          className="w-full h-full" 
          scale={0.4} 
          position={[3, 0, 0]} 
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none h-full flex items-center pt-24 lg:pt-0">
        
        {/* Left Column - Copy */}
        <div className="flex flex-col space-y-6 lg:space-y-8 max-w-2xl pointer-events-auto lg:mt-0 mt-8 bg-obsidian-900/60 lg:bg-obsidian-900/40 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
          <h1 ref={headlineRef} className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tighter text-foreground uppercase overflow-hidden flex flex-wrap gap-x-2 sm:gap-x-4 gap-y-2">
            {words.map((word, i) => (
              <span key={i} className="headline-word inline-block origin-bottom-left">
                {word}
              </span>
            ))}
          </h1>
          
          <p ref={subheadRef} className="text-base sm:text-lg md:text-xl text-metallic max-w-lg font-sans">
            Elite Personal Coaching in Qatar. Engineered for high-performers who demand peak physical execution.
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="group relative px-6 sm:px-8 py-4 bg-crimson text-white font-bold rounded-full overflow-hidden transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_40px_rgba(225,29,72,0.6)] flex items-center justify-center gap-2 min-h-[44px]">
              <span className="relative z-10 text-sm sm:text-base">Secure Your Elite Blueprint</span>
              <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 h-full w-0 bg-crimson-dark transition-all duration-300 ease-out group-hover:w-full z-0"></div>
            </button>
            <button className="px-6 sm:px-8 py-4 bg-transparent border border-metallic/30 text-foreground font-semibold rounded-full hover:bg-white/5 transition-colors flex items-center justify-center gap-2 min-h-[44px]">
              <Play className="w-5 h-5" /> <span className="text-sm sm:text-base">Watch Reel</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
