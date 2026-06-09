"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeDViewer from "../effects/ThreeDViewer";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text elements
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Animate stat cards
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.5)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "500+", label: "Transformations" },
    { value: "1st", label: "Qatar's Premier Coach" },
    { value: "100%", label: "Customized Regimes" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-16 lg:py-32 relative bg-obsidian-900 border-t border-white/5 overflow-hidden">
      
      {/* Background 3D Model */}
      <div className="absolute inset-0 w-full h-full opacity-40 z-0">
        <ThreeDViewer 
          modelPath="/models/gym_bench_chair.glb" 
          fallbackImage="/images/about_mobile_fallback.png"
          scale={1.5} 
          position={[0, 0, 0]} 
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Stats Bento Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card bg-obsidian-800 border border-white/5 p-8 rounded-2xl flex flex-col justify-center items-center text-center hover:border-crimson/50 transition-colors group">
                <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2 group-hover:text-crimson transition-colors">
                  {stat.value}
                </h3>
                <p className="text-sm text-metallic uppercase tracking-wider font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Bio Text */}
          <div ref={textRef} className="flex flex-col space-y-6">
            <h2 className="about-text text-crimson font-bold tracking-widest uppercase text-sm">
              The Authority Brief
            </h2>
            <h3 className="about-text text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
              Architecting the ultimate human machine.
            </h3>
            <p className="about-text text-lg text-metallic leading-relaxed">
              As a certified international trainer based in Qatar, my expertise lies at the intersection of advanced biomechanics, strategic fat loss, and pure hypertrophy. I don&apos;t do generic routines.
            </p>
            <p className="about-text text-lg text-metallic leading-relaxed">
              I engineer bespoke physical regimes tailored exclusively for executives, elite athletes, and high-performers who refuse to settle for mediocrity. Your transformation is a science, and I am the architect.
            </p>
            
            <div className="about-text pt-4">
              <div className="inline-block border-b-2 border-crimson pb-1 font-display font-bold text-xl text-foreground">
                Vibin Joseph
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
