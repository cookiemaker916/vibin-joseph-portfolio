"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolled) {
      gsap.to(navRef.current, {
        paddingTop: "1rem",
        paddingBottom: "1rem",
        backgroundColor: "rgba(9, 10, 12, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(navRef.current, {
        paddingTop: "2rem",
        paddingBottom: "2rem",
        backgroundColor: "rgba(9, 10, 12, 0)",
        backdropFilter: "blur(0px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isScrolled]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-colors flex items-center justify-between"
    >
      <div className="font-display font-bold text-2xl tracking-tighter text-foreground">
        VIBIN<span className="text-crimson">.</span>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-metallic-light">
        <Link href="#about" className="hover:text-crimson transition-colors">
          About
        </Link>
        <Link href="#programs" className="hover:text-crimson transition-colors">
          Programs
        </Link>
        <Link href="#transformations" className="hover:text-crimson transition-colors">
          Transformations
        </Link>
      </div>

      <div>
        <Link
          href="#contact"
          className="bg-crimson hover:bg-crimson-dark text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)]"
        >
          Book Consultation
        </Link>
      </div>
    </nav>
  );
}
