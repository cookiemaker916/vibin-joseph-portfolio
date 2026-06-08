"use client";

import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

function RollingDumbbell() {
  const { scene } = useGLTF("/models/little_gym_stuff_-_dumbbell.glb");
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Roll the dumbbell rapidly
      groupRef.current.rotation.x += delta * 6;
      groupRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={4} />
      </Center>
    </group>
  );
}

export default function Preloader() {
  const { progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enforce a minimum 2.5 second display of the loading screen
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only trigger when BOTH the models are loaded AND the minimum time has elapsed
    if (progress === 100 && minTimeElapsed) {
      // Slight delay to ensure smooth transition
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    }
  }, [progress, minTimeElapsed]);

  useEffect(() => {
    if (isLoaded && containerRef.current) {
      // Slide up and fade out the preloader
      gsap.to(containerRef.current, {
        opacity: 0,
        y: "-100%",
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = "none";
        }
      });
    }
  }, [isLoaded]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-obsidian-900 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="w-[300px] h-[300px] relative">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={1} />
          <spotLight position={[5, 5, 5]} intensity={2} color="#E11D48" />
          <pointLight position={[-5, 5, -5]} intensity={2} color="#ffffff" />
          <RollingDumbbell />
        </Canvas>
      </div>
      
      <div className="mt-8 text-crimson font-display font-bold tracking-[0.3em] uppercase text-sm">
        Loading Elite Experience {Math.round(progress)}%
      </div>
      
      <div className="w-64 h-[2px] bg-white/10 mt-6 rounded-full overflow-hidden">
        <div 
          className="h-full bg-crimson transition-all duration-300 ease-out shadow-[0_0_10px_rgba(225,29,72,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
