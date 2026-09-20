"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { audioEngine } from "@/lib/audioEngine";

interface ExplodedIngredientsProps {
  scrollProgress: number; // 0.0 to 1.0
  particleCount: number;
  isReducedMotion: boolean;
}

export function ExplodedIngredients({
  scrollProgress,
  particleCount,
  isReducedMotion,
}: ExplodedIngredientsProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Procedural Almond Slices (Badam Slivers)
  const almondItems = useMemo(() => {
    const count = Math.floor(particleCount * 0.65);
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 2.2;
      return {
        initialPos: new THREE.Vector3(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 4.5,
          Math.sin(angle) * radius
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 2.0,
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 2.0
        ),
        scale: 0.22 + Math.random() * 0.18,
      };
    });
  }, [particleCount]);

  // Procedural Kashmiri Kesar Threads (Saffron Strands)
  const saffronThreads = useMemo(() => {
    const count = Math.floor(particleCount * 0.35);
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + 0.5;
      const radius = 1.5 + Math.random() * 2.0;
      return {
        initialPos: new THREE.Vector3(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 3.8,
          Math.sin(angle) * radius
        ),
        swaySpeed: 1.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        scale: 0.3 + Math.random() * 0.25,
      };
    });
  }, [particleCount]);

  // Frame animation: ingredients expand outward during 45% - 85% scroll
  useFrame((state, delta) => {
    if (!groupRef.current || isReducedMotion) return;
    const t = state.clock.getElapsedTime();

    // Explosion envelope peak around 65% scroll
    const explodeFactor = Math.sin(Math.PI * Math.min(1, Math.max(0, (scrollProgress - 0.2) / 0.75)));
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;

    // Rotate the entire ingredient constellation
    groupRef.current.rotation.y = t * 0.15 + scrollProgress * Math.PI;

    // Scale outward during explosion
    const scale = 0.4 + explodeFactor * 0.9;
    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={groupRef}>
      {/* 1. Roasted Almond Slivers */}
      {almondItems.map((item, idx) => (
        <mesh
          key={`almond-${idx}`}
          position={item.initialPos}
          scale={[item.scale, item.scale * 0.45, item.scale]}
          onPointerOver={() => audioEngine.playAlmondCrunch(0.18)}
        >
          {/* Almond teardrop slice geometry */}
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial
            color="#FEF3C7" // Cream ivory almond body
            roughness={0.4}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* 2. Royal Kashmiri Saffron Threads */}
      {saffronThreads.map((thread, idx) => (
        <mesh
          key={`saffron-${idx}`}
          position={thread.initialPos}
          scale={[thread.scale * 0.15, thread.scale * 1.4, thread.scale * 0.15]}
          onPointerOver={() => audioEngine.playMilkPour(0.15)}
        >
          <cylinderGeometry args={[0.2, 0.4, 2, 8]} />
          <meshStandardMaterial
            color="#DC2626" // Royal crimson-orange saffron stigma
            emissive="#B91C1C"
            emissiveIntensity={0.25}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
