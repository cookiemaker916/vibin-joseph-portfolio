import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, OrbitControls, Center } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import Image from "next/image";

// Preload the models so they load faster
useGLTF.preload("/models/gym_bench_chair.glb");
useGLTF.preload("/models/gym_outfit_sport_hoodie_pants.glb");
useGLTF.preload("/models/little_gym_stuff_-_dumbbell.glb");

function Model({ url, scale, position, animateOnScroll }: { url: string, scale: number, position: [number, number, number], animateOnScroll: boolean }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  // 2-second Entrance Animation
  useEffect(() => {
    if (groupRef.current) {
      // Fly in from camera and scale up
      gsap.from(groupRef.current.position, {
        z: 10,
        y: 5,
        duration: 2,
        ease: "power3.out",
        delay: 0.5, // wait for preloader a bit
      });
      gsap.from(groupRef.current.scale, {
        x: 0.01,
        y: 0.01,
        z: 0.01,
        duration: 2,
        ease: "back.out(1.2)",
        delay: 0.5,
      });
      gsap.from(groupRef.current.rotation, {
        x: Math.PI * 2,
        duration: 2,
        ease: "power3.out",
        delay: 0.5,
      });
    }
  }, []);

  // Subtle continuous rotation on Y axis, plus aggressive scroll rotation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Base slow rotation
      groupRef.current.rotation.y += delta * 0.1;

      // Scroll-based rotation and floating
      if (animateOnScroll) {
        // Read window scroll directly for performant parallax in R3F
        const scrollY = window.scrollY;
        // Map scrollY to an additional rotation or Y offset
        groupRef.current.rotation.x = scrollY * 0.001;
        // We can also let the <Float> component handle the Y bobbing,
        // but adding a subtle scroll rotation makes it dynamic!
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
    </group>
  );
}

// Minimal Fallback Loader
function LoaderFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-4 h-4 bg-crimson rounded-full animate-ping"></div>
    </div>
  );
}

interface ThreeDViewerProps {
  modelPath: string;
  fallbackImage?: string;
  className?: string;
  scale?: number;
  position?: [number, number, number];
  animateOnScroll?: boolean;
}

export default function ThreeDViewer({ 
  modelPath,
  fallbackImage,
  className = "w-full h-full min-h-[500px]",
  scale = 2,
  position = [0, -1, 0],
  animateOnScroll = true
}: ThreeDViewerProps) {
  const isDesktop = useIsDesktop();

  // Handle Hydration Phase
  if (isDesktop === null) {
    return <div className={`relative ${className} bg-obsidian-900 animate-pulse`} />;
  }

  // Handle Mobile Fallback Phase
  if (!isDesktop && fallbackImage) {
    return (
      <div className={`relative ${className}`}>
        <Image 
          src={fallbackImage}
          alt="Gym Asset"
          fill
          className="object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10" />
      </div>
    );
  }

  // Handle Full Desktop 3D Experience
  return (
    <div className={`relative ${className}`}>
      {/* HTML Fallback boundaries */}
      <Suspense fallback={<LoaderFallback />}>
        
        {/* WebGL Canvas */}
        <Canvas 
          shadows 
          camera={{ position: [0, 0, 8], fov: 45 }}
          className="w-full h-full"
        >
          {/* Moody Environment Lighting - Increased for visibility */}
          <ambientLight intensity={0.8} />
          
          {/* Crimson rim light for premium aesthetic */}
          <spotLight 
            position={[5, 5, 5]} 
            angle={0.15} 
            penumbra={1} 
            intensity={2} 
            color="#E11D48" 
            castShadow
          />
          
          {/* Back fill light */}
          <pointLight position={[-5, 5, -5]} intensity={2} color="#ffffff" />
          
          {/* Environment Reflections */}
          <Environment preset="city" />

          {/* User Controls */}
          <OrbitControls 
            enableZoom={true} 
            enablePan={false}
            minDistance={2}
            maxDistance={15}
          />

          {/* Smooth Floating Effect */}
          <Float
            speed={2} // Animation speed
            rotationIntensity={1} // XYZ rotation intensity
            floatIntensity={1.5} // Up/down float intensity
            floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within
          >
            <Model url={modelPath} scale={scale} position={position} animateOnScroll={animateOnScroll} />
          </Float>
          
        </Canvas>
      </Suspense>
    </div>
  );
}
