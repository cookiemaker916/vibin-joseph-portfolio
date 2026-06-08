"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ParallaxItemProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 1 = normal, higher = faster parallax
  floatOffset?: number; // How much it floats up and down
}

export function ParallaxItem({ children, className = "", speed = 1, floatOffset = 20 }: ParallaxItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 50 * speed;
      const yPos = (clientY / window.innerHeight - 0.5) * 50 * speed;

      gsap.to(itemRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Continuous floating effect
    const floatAnim = gsap.to(itemRef.current, {
      y: `+=${floatOffset}`,
      rotation: "+=5",
      duration: 3 + Math.random() * 2, // Randomize duration slightly for natural feel
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      floatAnim.kill();
    };
  }, [speed, floatOffset]);

  return (
    <div ref={itemRef} className={`absolute pointer-events-none ${className}`}>
      {children}
    </div>
  );
}
