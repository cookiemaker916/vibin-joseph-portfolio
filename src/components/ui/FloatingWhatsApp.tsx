"use client";

import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import gsap from "gsap";

export default function FloatingWhatsApp() {
  const iconRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pulse animation
    const pulseAnim = gsap.to(pulseRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: "power2.out",
    });

    // Aggressive jumping animation
    const floatAnim = gsap.to(iconRef.current, {
      y: -20,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      pulseAnim.kill();
      floatAnim.kill();
    };
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "97460048566"; // Placeholder Qatar number
    const message = "Hi Vibin, I saw your portfolio and I want to discuss a premium transformation program in Qatar. Let's connect!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center cursor-pointer group" onClick={handleWhatsAppClick}>
      <div ref={pulseRef} className="absolute inset-0 bg-[#25D366] rounded-full opacity-50 blur-sm"></div>
      <div ref={iconRef} className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-transform group-hover:scale-110">
        <MessageCircle size={32} />
      </div>
    </div>
  );
}
