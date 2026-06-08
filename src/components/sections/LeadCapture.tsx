"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { Send } from "lucide-react";

export default function LeadCapture() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMagneticHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      if (formRef.current) formRef.current.reset();
      alert("Application received. Our team will contact you shortly.");
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 relative bg-obsidian">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-crimson/5 via-obsidian to-obsidian pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-crimson font-bold tracking-widest uppercase text-sm mb-4">
            Application
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Secure Your Elite Blueprint.
          </h3>
          <p className="text-metallic mt-4 max-w-xl mx-auto">
            Spots are strictly limited. Submit your details below to see if you qualify for Qatar&apos;s most exclusive physical coaching program.
          </p>
        </div>

        <div className="bg-obsidian-800 border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Form subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-crimson/10 blur-[80px] rounded-full pointer-events-none"></div>

          <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 flex flex-col space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-metallic uppercase tracking-wider">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-foreground placeholder:text-metallic/30 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-metallic uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="bg-obsidian border border-r-0 border-white/10 rounded-l-lg px-4 py-3 text-metallic/70 select-none">
                    +974
                  </span>
                  <input 
                    type="tel" 
                    id="phone" 
                    required
                    className="flex-1 bg-obsidian border border-white/10 rounded-r-lg px-4 py-3 text-foreground placeholder:text-metallic/30 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors"
                    placeholder="1234 5678"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="goal" className="text-sm font-semibold text-metallic uppercase tracking-wider">
                Primary Goal
              </label>
              <select 
                id="goal" 
                required
                className="bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors appearance-none"
              >
                <option value="">Select your objective...</option>
                <option value="fat-loss">Extreme Fat Loss & Shredding</option>
                <option value="hypertrophy">Muscle Gain & Hypertrophy</option>
                <option value="longevity">Elite Longevity & Biomechanics</option>
                <option value="contest">Contest Prep</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="investment" className="text-sm font-semibold text-metallic uppercase tracking-wider">
                Investment Readiness
              </label>
              <select 
                id="investment" 
                required
                className="bg-obsidian border border-white/10 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors appearance-none"
              >
                <option value="">I am ready to invest...</option>
                <option value="immediate">Immediately</option>
                <option value="1-month">Within 1 Month</option>
                <option value="exploring">Just Exploring Options</option>
              </select>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseMove={handleMagneticHover}
                onMouseLeave={handleMagneticLeave}
                className="relative px-12 py-5 bg-crimson text-white font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_40px_rgba(225,29,72,0.6)] transition-shadow flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                <span className="relative z-10 text-lg tracking-wide uppercase">
                  {isSubmitting ? "Processing..." : "Submit Application"}
                </span>
                {!isSubmitting && (
                  <Send className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                )}
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-crimson to-crimson-dark opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  );
}
