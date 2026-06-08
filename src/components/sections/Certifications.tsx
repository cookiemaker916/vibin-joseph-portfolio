"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ShieldCheck, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cert-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="py-32 relative bg-obsidian-900 overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-crimson font-bold tracking-widest uppercase text-sm mb-4">
            The Authority
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Elite Certifications.
          </h3>
          <p className="text-metallic mt-4 max-w-xl mx-auto">
            World-class credentials ensuring your transformation is guided by science, safety, and elite biomechanics.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Hero Certificate (Spans 2 columns on lg screens) */}
          <div className="cert-card lg:col-span-2 group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-crimson/50 transition-colors duration-500 p-8 md:p-12 min-h-[400px] flex flex-col justify-end">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-crimson/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-crimson/20 transition-colors duration-700"></div>
            
            {/* Certificate Image */}
            <div className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-500 group-hover:opacity-60 -z-10">
              <img 
                src="/images/cert_image.png" 
                alt="ISSA Master Trainer Certificate" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-800/80 to-transparent"></div>
            </div>

            <div className="relative z-10">
              <Award className="text-crimson w-12 h-12 mb-6" />
              <h4 className="text-3xl font-display font-bold text-foreground mb-2">
                Master Trainer Certification
              </h4>
              <p className="text-metallic font-semibold tracking-wider uppercase text-sm">
                ISSA (International Sports Sciences Association)
              </p>
            </div>
          </div>

          {/* Card 2: Advanced Biomechanics */}
          <div className="cert-card group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-crimson/50 transition-colors duration-500 p-8 min-h-[400px] flex flex-col justify-end">
             {/* Background Glow */}
             <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <Zap className="text-white w-10 h-10 mb-6 group-hover:text-crimson transition-colors" />
              <h4 className="text-2xl font-display font-bold text-foreground mb-2">
                Advanced Biomechanics & Hypertrophy
              </h4>
              <p className="text-metallic text-sm leading-relaxed mt-4">
                Specialized training in muscle structural alignment, joint health, and maximal force production mechanisms.
              </p>
            </div>
          </div>

          {/* Card 3: Elite Sports Nutritionist */}
          <div className="cert-card lg:col-span-3 group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-crimson/50 transition-colors duration-500 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
               <ShieldCheck className="text-crimson w-24 h-24 drop-shadow-[0_0_15px_rgba(225,29,72,0.5)] group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <h4 className="text-3xl font-display font-bold text-foreground mb-3">
                Elite Sports Nutritionist
              </h4>
              <p className="text-metallic leading-relaxed max-w-2xl">
                Precision macronutrient planning and supplementation strategies engineered for extreme fat loss, high performance athletic conditioning, and systemic recovery.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
