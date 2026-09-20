"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { NandiniBottle } from "./NandiniBottle";
import { ExplodedIngredients } from "./ExplodedIngredients";
import { ShaderPreloader } from "./ShaderPreloader";
import { GPUPerformanceProfile } from "@/lib/useGPUPerformance";

interface SceneProps {
  scrollProgress: number;
  chillFactor: number;
  tilt: { tiltX: number; tiltY: number };
  sensesMode: "morning" | "golden-hour";
  isUncapped: boolean;
  onUncap: () => void;
  gpuProfile: GPUPerformanceProfile;
  isReducedMotion: boolean;
}

export function Scene({
  scrollProgress,
  chillFactor,
  tilt,
  sensesMode,
  isUncapped,
  onUncap,
  gpuProfile,
  isReducedMotion,
}: SceneProps) {
  // Lighting colors based on Senses Mode
  const isGoldenHour = sensesMode === "golden-hour";
  const ambientIntensity = isGoldenHour ? 0.7 : 0.95;
  const keyLightColor = isGoldenHour ? "#FDE68A" : "#FFFFFF";
  const rimLightColor = isGoldenHour ? "#F59E0B" : "#0B4EA2";

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto canvas-wrapper z-10">
      <Canvas
        camera={{ position: [0, 0.2, 5.8], fov: 44 }}
        dpr={gpuProfile.dpr}
        gl={{
          antialias: gpuProfile.tier !== "low",
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          <ShaderPreloader />

          {/* Dynamic Studio Lighting */}
          <ambientLight intensity={ambientIntensity} color="#FFFDF5" />
          <directionalLight position={[4, 5, 4]} intensity={1.8} color={keyLightColor} />
          <directionalLight position={[-4, 2, -2]} intensity={1.1} color={rimLightColor} />
          <pointLight position={[0, -2, 3]} intensity={0.6} color="#FBBF24" />

          {/* 3D Nandini Badam Milk Bottle */}
          <NandiniBottle
            scrollProgress={scrollProgress}
            chillFactor={chillFactor}
            tilt={tilt}
            isUncapped={isUncapped}
            onUncap={onUncap}
            enableCustomShaders={gpuProfile.enableCustomShaders}
            isReducedMotion={isReducedMotion}
          />

          {/* 3D Exploded Kashmiri Saffron & Almond Particles */}
          <ExplodedIngredients
            scrollProgress={scrollProgress}
            particleCount={gpuProfile.particleCount}
            isReducedMotion={isReducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
