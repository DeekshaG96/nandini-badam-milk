"use client";

import { useEffect, useState } from "react";

export type GPUTier = "high" | "medium" | "low";

export interface GPUPerformanceProfile {
  tier: GPUTier;
  dpr: number;
  enableCustomShaders: boolean;
  enableFluidPhysics: boolean;
  particleCount: number;
  isMobile: boolean;
  isPowerSaver: boolean;
}

export function useGPUPerformance(): GPUPerformanceProfile {
  const [profile, setProfile] = useState<GPUPerformanceProfile>({
    tier: "high",
    dpr: 1.5,
    enableCustomShaders: true,
    enableFluidPhysics: true,
    particleCount: 80,
    isMobile: false,
    isPowerSaver: false,
  });

  useEffect(() => {
    // Check manual override via URL (useful for testing & benchmarking: ?gpu=low)
    const params = new URLSearchParams(window.location.search);
    const override = params.get("gpu") as GPUTier | null;

    const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    let tier: GPUTier = "high";

    if (override && ["high", "medium", "low"].includes(override)) {
      tier = override;
    } else {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl2") || canvas.getContext("webgl");

        if (!gl) {
          tier = "low";
        } else {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          const renderer = debugInfo
            ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || ""
            : "";

          const isIntegrated =
            /Intel|Mali|Adreno 3|PowerVR|Apple A[7-9]/i.test(renderer);
          const isAppleSiliconOrDedicated =
            /NVIDIA|GeForce|RTX|Radeon|Apple M|Apple A1[4-9]/i.test(renderer);

          const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
          const cores = navigator.hardwareConcurrency || 4;

          if (isMobileDevice) {
            tier = memory >= 6 && cores >= 6 && !isIntegrated ? "high" : "medium";
          } else {
            if (isAppleSiliconOrDedicated || (memory >= 8 && cores >= 8)) {
              tier = "high";
            } else if (isIntegrated || memory < 4) {
              tier = "medium";
            } else {
              tier = "high";
            }
          }
        }
      } catch {
        tier = isMobileDevice ? "medium" : "high";
      }
    }

    const deviceDpr = Math.min(window.devicePixelRatio || 1, 2);

    if (tier === "high") {
      setProfile({
        tier: "high",
        dpr: deviceDpr,
        enableCustomShaders: true,
        enableFluidPhysics: true,
        particleCount: isMobileDevice ? 50 : 90,
        isMobile: isMobileDevice,
        isPowerSaver: false,
      });
    } else if (tier === "medium") {
      setProfile({
        tier: "medium",
        dpr: Math.min(deviceDpr, 1.5),
        enableCustomShaders: false, // Falls back to Three.js MeshPhysicalMaterial transmission
        enableFluidPhysics: true,
        particleCount: 35,
        isMobile: isMobileDevice,
        isPowerSaver: false,
      });
    } else {
      // Low Tier / Power Saver
      setProfile({
        tier: "low",
        dpr: 1,
        enableCustomShaders: false,
        enableFluidPhysics: false,
        particleCount: 15,
        isMobile: isMobileDevice,
        isPowerSaver: true,
      });
    }
  }, []);

  return profile;
}
