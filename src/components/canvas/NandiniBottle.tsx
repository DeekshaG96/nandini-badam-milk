"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { glassVertexShader, glassFragmentShader } from "./shaders/glassShader";
import { liquidVertexShader, liquidFragmentShader } from "./shaders/liquidShader";
import { steamVertexShader, steamFragmentShader } from "./shaders/steamShader";
import { audioEngine } from "@/lib/audioEngine";

interface NandiniBottleProps {
  scrollProgress: number; // 0.0 to 1.0
  chillFactor: number;    // 0.0 = 4°C, 1.0 = 60°C
  tilt: { tiltX: number; tiltY: number };
  isUncapped: boolean;
  onUncap?: () => void;
  enableCustomShaders: boolean;
  isReducedMotion: boolean;
}

export function NandiniBottle({
  scrollProgress,
  chillFactor,
  tilt,
  isUncapped,
  onUncap,
  enableCustomShaders,
  isReducedMotion,
}: NandiniBottleProps) {
  const bottleGroupRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Group>(null);
  const liquidMeshRef = useRef<THREE.Mesh>(null);
  const frontGlassRef = useRef<THREE.Mesh>(null);

  // Generate Authentic KMF Nandini Label Texture via Canvas
  const labelTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Label background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
    bgGrad.addColorStop(0, "#ffffff");
    bgGrad.addColorStop(0.5, "#fffdf5");
    bgGrad.addColorStop(1, "#fff4db");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Gold borders
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(0, 0, 1024, 18);
    ctx.fillRect(0, 494, 1024, 18);

    // Signature KMF Royal Blue Banner
    const blueGrad = ctx.createLinearGradient(0, 18, 0, 150);
    blueGrad.addColorStop(0, "#0b4ea2");
    blueGrad.addColorStop(1, "#072f63");
    ctx.fillStyle = blueGrad;
    ctx.fillRect(0, 18, 1024, 132);

    // KMF Cow Emblem
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(320, 84, 38, 24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(285, 72, 16, 0, Math.PI * 2);
    ctx.fill();

    // Bilingual Typography: Kannada & English
    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 52px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("ನಂದಿನಿ", 400, 78);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 58px 'Cinzel', Georgia, serif";
    ctx.fillText("NANDINI", 400, 132);

    // BADAM FLAVOURED MILK centerpiece
    ctx.fillStyle = "#b45309";
    ctx.font = "600 32px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("FLAVOURED MILK", 512, 204);

    const badamGrad = ctx.createLinearGradient(0, 215, 0, 310);
    badamGrad.addColorStop(0, "#d97706");
    badamGrad.addColorStop(1, "#92400e");
    ctx.fillStyle = badamGrad;
    ctx.font = "900 96px 'Cinzel', Georgia, serif";
    ctx.fillText("BADAM", 512, 305);

    // Saffron ribbon banner
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(262, 330, 500, 52, 26) : ctx.rect(262, 330, 500, 52);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px system-ui, sans-serif";
    ctx.fillText("WITH REAL ROASTED ALMONDS", 512, 366);

    // Almonds & Kashmiri Saffron motif
    ctx.save();
    ctx.translate(450, 435);
    ctx.rotate(-0.3);
    ctx.fillStyle = "#854d0e";
    ctx.beginPath();
    ctx.ellipse(0, 0, 48, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fed7aa";
    ctx.beginPath();
    ctx.ellipse(4, 0, 38, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(574, 440);
    ctx.rotate(0.35);
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.ellipse(0, 0, 46, 27, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffedd5";
    ctx.beginPath();
    ctx.ellipse(3, 0, 36, 19, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Red Saffron Thread accents
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(400, 430);
    ctx.quadraticCurveTo(512, 395, 620, 440);
    ctx.stroke();

    ctx.fillStyle = "#6b7280";
    ctx.font = "bold 22px system-ui, sans-serif";
    ctx.fillText("A QUALITY PRODUCT OF KMF · 200 ml", 512, 480);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    tex.anisotropy = 8;
    return tex;
  }, []);

  // Custom Shader Materials
  const glassShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: glassVertexShader,
      fragmentShader: glassFragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        u_time: { value: 0 },
        u_chillFactor: { value: chillFactor },
        u_color: { value: new THREE.Color("#FFFFFF") },
        u_fresnelColor: { value: new THREE.Color("#FDE68A") },
      },
    });
  }, []);

  const liquidShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: liquidVertexShader,
      fragmentShader: liquidFragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_tilt: { value: new THREE.Vector2(0, 0) },
        u_chillFactor: { value: chillFactor },
        u_fillLevel: { value: 1.0 },
      },
    });
  }, []);

  // Steam particle setup
  const steamCount = 45;
  const steamGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(steamCount * 3);
    const scales = new Float32Array(steamCount);
    const randoms = new Float32Array(steamCount);

    for (let i = 0; i < steamCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 1] = 2.4 + Math.random() * 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      scales[i] = 0.15 + Math.random() * 0.25;
      randoms[i] = Math.random();
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("a_scale", new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("a_random", new THREE.BufferAttribute(randoms, 1));
    return geo;
  }, []);

  const steamMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: steamVertexShader,
      fragmentShader: steamFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        u_time: { value: 0 },
        u_intensity: { value: Math.max(0, (chillFactor - 0.45) * 1.8) },
      },
    });
  }, []);

  // Frame Render Updates
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Update uniforms
    if (glassShaderMaterial.uniforms) {
      glassShaderMaterial.uniforms.u_time.value = t;
      glassShaderMaterial.uniforms.u_chillFactor.value = chillFactor;
    }

    if (liquidShaderMaterial.uniforms) {
      liquidShaderMaterial.uniforms.u_time.value = t;
      liquidShaderMaterial.uniforms.u_tilt.value.set(tilt.tiltX, tilt.tiltY);
      liquidShaderMaterial.uniforms.u_chillFactor.value = chillFactor;
    }

    if (steamMaterial.uniforms) {
      steamMaterial.uniforms.u_time.value = t;
      steamMaterial.uniforms.u_intensity.value = Math.max(0, (chillFactor - 0.45) * 1.8);
    }

    // Exploded View deconstruction based on scroll
    if (bottleGroupRef.current && !isReducedMotion) {
      // Rotation and gentle floating
      bottleGroupRef.current.rotation.y = t * 0.25 + scrollProgress * Math.PI * 1.2;
      bottleGroupRef.current.rotation.z = tilt.tiltX * 0.15;

      // Split front glass shell away during 35% - 75% scroll
      if (frontGlassRef.current) {
        const splitAmount = Math.sin(Math.PI * Math.min(1, Math.max(0, (scrollProgress - 0.3) / 0.45)));
        frontGlassRef.current.position.z = splitAmount * 1.4;
        frontGlassRef.current.position.x = splitAmount * 0.6;
      }
    }

    // Uncap Animation
    if (capRef.current) {
      if (isUncapped) {
        capRef.current.position.y += (4.8 - capRef.current.position.y) * 0.1;
        capRef.current.rotation.x += delta * 2;
        capRef.current.rotation.z += delta * 3;
      } else {
        capRef.current.position.y = 2.42;
        capRef.current.rotation.set(0, 0, 0);
      }
    }
  });

  return (
    <group ref={bottleGroupRef} position={[0, -0.4, 0]} scale={[1.25, 1.25, 1.25]}>
      {/* 1. Liquid Badam Milk Core */}
      <mesh ref={liquidMeshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 3.4, 32]} />
        {enableCustomShaders ? (
          <primitive object={liquidShaderMaterial} attach="material" />
        ) : (
          <meshStandardMaterial color="#F59E0B" roughness={0.3} metalness={0.1} />
        )}
      </mesh>

      {/* 2. Glass Bottle Outer Shell */}
      <mesh ref={frontGlassRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.84, 0.84, 3.6, 32]} />
        {enableCustomShaders ? (
          <primitive object={glassShaderMaterial} attach="material" />
        ) : (
          <meshPhysicalMaterial
            transmission={0.94}
            opacity={1}
            transparent
            roughness={0.05}
            ior={1.52}
            color="#FFFFFF"
          />
        )}
      </mesh>

      {/* Bottle Neck & Shoulder */}
      <mesh position={[0, 2.05, 0]}>
        <cylinderGeometry args={[0.38, 0.84, 0.7, 32]} />
        {enableCustomShaders ? (
          <primitive object={glassShaderMaterial} attach="material" />
        ) : (
          <meshPhysicalMaterial transmission={0.94} transparent roughness={0.05} ior={1.52} />
        )}
      </mesh>
      <mesh position={[0, 2.35, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.4, 32]} />
        {enableCustomShaders ? (
          <primitive object={glassShaderMaterial} attach="material" />
        ) : (
          <meshPhysicalMaterial transmission={0.94} transparent roughness={0.05} ior={1.52} />
        )}
      </mesh>

      {/* 3. The Authentic KMF Nandini Label */}
      {labelTexture && (
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.845, 0.845, 2.1, 32, 1, true]} />
          <meshBasicMaterial map={labelTexture} transparent side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* 4. Royal Blue Metallic Crown Cap */}
      <group
        ref={capRef}
        position={[0, 2.42, 0]}
        onClick={() => {
          audioEngine.playUncapPop();
          if (onUncap) onUncap();
        }}
      >
        <mesh>
          <cylinderGeometry args={[0.38, 0.38, 0.18, 32]} />
          <meshStandardMaterial color="#0B4EA2" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Gold Cap Trim */}
        <mesh position={[0, 0.09, 0]}>
          <cylinderGeometry args={[0.37, 0.37, 0.02, 32]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* 5. Rising Warm Saffron Steam Particles (60°C) */}
      <points geometry={steamGeometry} material={steamMaterial} />
    </group>
  );
}
