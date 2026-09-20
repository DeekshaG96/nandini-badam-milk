"use client";

import { useEffect, useState, useCallback } from "react";

export interface GyroscopeTilt {
  tiltX: number;
  tiltY: number;
  isPermissionGranted: boolean;
  requestPermission: () => Promise<boolean>;
}

export function useGyroscope(): GyroscopeTilt {
  const [tilt, setTilt] = useState<{ tiltX: number; tiltY: number }>({
    tiltX: 0,
    tiltY: 0,
  });
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (
      typeof window !== "undefined" &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> })
        .requestPermission === "function"
    ) {
      try {
        const res = await (
          DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }
        ).requestPermission();
        if (res === "granted") {
          setIsPermissionGranted(true);
          return true;
        }
      } catch (err) {
        console.warn("DeviceOrientation permission error", err);
      }
      return false;
    }
    // Android / Non-iOS
    setIsPermissionGranted(true);
    return true;
  }, []);

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma || 0; // Left-to-right [-90, 90]
      const beta = e.beta || 0; // Front-to-back [-180, 180]

      const targetX = Math.max(-1, Math.min(1, gamma / 35));
      const targetY = Math.max(-1, Math.min(1, (beta - 30) / 45));

      // Damped lerp
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      setTilt({ tiltX: currentX, tiltY: currentY });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  return {
    tiltX: tilt.tiltX,
    tiltY: tilt.tiltY,
    isPermissionGranted,
    requestPermission,
  };
}
