"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeftRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const transformations = [
  {
    id: 1,
    name: "Executive Focus",
    metrics: { fatLoss: "12%", muscleGain: "+4kg", duration: "16 Weeks" },
  },
  {
    id: 2,
    name: "Athletic Conditioning",
    metrics: { fatLoss: "8%", muscleGain: "+6kg", duration: "24 Weeks" },
  },
  {
    id: 3,
    name: "Total Recomposition",
    metrics: { fatLoss: "15%", muscleGain: "+3kg", duration: "20 Weeks" },
  }
];

export default function Transformations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll effect on desktop
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const sections = gsap.utils.toArray(".transform-slide");
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sliderRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + (sliderRef.current?.offsetWidth || 0),
          }
        });
      });

      // Simple fade up on mobile
      mm.add("(max-width: 1023px)", () => {
        gsap.from(".transform-slide", {
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          stagger: 0.2,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="transformations" ref={sectionRef} className="bg-obsidian-900 border-y border-white/5 overflow-hidden">
      <div className="py-24 container mx-auto px-6 md:px-12 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-crimson font-bold tracking-widest uppercase text-sm mb-4">
            The Vault
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Proof of Execution.
          </h3>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-metallic">
          <ArrowLeftRight className="w-6 h-6 animate-pulse" />
          <span className="text-sm tracking-widest uppercase">Scroll to view</span>
        </div>
      </div>

      <div ref={sliderRef} className="lg:h-screen lg:flex lg:flex-nowrap pb-24 lg:pb-0 px-6 md:px-12 lg:px-0">
        
        {/* Helper layout spacing for slider pin */}
        <div className="hidden lg:block lg:min-w-[10vw]"></div>

        {transformations.map((item) => (
          <div 
            key={item.id} 
            className="transform-slide w-full lg:w-[80vw] lg:min-w-[80vw] lg:h-[70vh] mb-12 lg:mb-0 lg:mr-12 relative group"
          >
            <div className="w-full h-[400px] lg:h-full bg-obsidian-800 rounded-2xl border border-white/10 overflow-hidden relative">
              
              {/* Before/After Image Split */}
              <div className="absolute inset-0 flex items-center justify-center bg-obsidian-800 -z-20">
                <img 
                  src="/images/before_after.png" 
                  alt="Transformation" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-90"></div>

              {/* Metrics Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                  <h4 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                    {item.name}
                  </h4>
                  <div className="flex gap-4">
                    <span className="bg-crimson/20 text-crimson px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {item.metrics.duration}
                    </span>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="text-right">
                    <div className="text-3xl font-display font-bold text-white">
                      {item.metrics.fatLoss}
                    </div>
                    <div className="text-xs text-metallic uppercase tracking-wider">Fat Loss</div>
                  </div>
                  <div className="w-[1px] h-12 bg-white/10"></div>
                  <div className="text-right">
                    <div className="text-3xl font-display font-bold text-white">
                      {item.metrics.muscleGain}
                    </div>
                    <div className="text-xs text-metallic uppercase tracking-wider">Muscle Gain</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
