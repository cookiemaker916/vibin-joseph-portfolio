"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dumbbell, Activity, Trophy, ArrowRight } from "lucide-react";
import ThreeDViewer from "../effects/ThreeDViewer";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Premium 1-on-1 VIP Coaching",
    description: "In-person elite training in Qatar. Complete custom nutrition and biomechanically optimized workouts tailored for your unique physiology.",
    icon: Dumbbell,
  },
  {
    id: "02",
    title: "Hybrid High-Performance Blueprint",
    description: "Designed for busy executives. Combines localized personal sessions with advanced digital tracking and remote accountability.",
    icon: Activity,
  },
  {
    id: "03",
    title: "Elite Contest Prep & Hypertrophy",
    description: "For advanced physique restructuring and athletic performance. Reach peak conditioning with competition-level protocols.",
    icon: Trophy,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-16 lg:py-32 relative bg-obsidian border-t border-white/5 overflow-hidden">
      
      {/* Background Particles/Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-obsidian-800 via-obsidian to-obsidian -z-20"></div>

      {/* Background 3D Model (Dumbbell) */}
      <div className="absolute inset-0 w-full h-full opacity-40 z-0">
        <ThreeDViewer 
          modelPath="/models/little_gym_stuff_-_dumbbell.glb" 
          fallbackImage="/images/services_mobile_fallback.png"
          scale={3} 
          position={[0, 0, 0]} 
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-crimson font-bold tracking-widest uppercase text-sm mb-4">
            Elite Training Programs
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Precision engineering for your physical potential.
          </h3>
        </div>

        <div ref={cardsRef} className="grid lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id}
                className="service-card group relative bg-obsidian-800/50 backdrop-blur-sm border border-white/5 p-8 rounded-3xl overflow-hidden hover:border-crimson/30 transition-all duration-500 hover:-translate-y-2 pointer-events-auto shadow-[0_0_0_rgba(225,29,72,0)] hover:shadow-[0_20px_40px_-10px_rgba(225,29,72,0.15)]"
              >
                {/* Number background */}
                <div className="absolute -top-10 -right-4 text-[120px] font-display font-bold text-white/[0.02] group-hover:text-crimson/[0.05] transition-colors duration-500 pointer-events-none">
                  {service.id}
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-crimson group-hover:text-white transition-colors duration-500 text-crimson">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  
                  <h4 className="text-2xl font-display font-bold text-foreground mb-4">
                    {service.title}
                  </h4>
                  
                  <p className="text-metallic leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <button className="flex items-center gap-2 text-sm font-bold text-foreground group-hover:text-crimson transition-colors uppercase tracking-wider">
                    Explore Program <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
