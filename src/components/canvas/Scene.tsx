"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { glassVertexShader, glassFragmentShader } from "./shaders/glassShader";
import { liquidVertexShader, liquidFragmentShader } from "./shaders/liquidShader";
import { steamVertexShader, steamFragmentShader } from "./shaders/steamShader";
import { GPUPerformanceProfile } from "@/lib/useGPUPerformance";
import { audioEngine } from "@/lib/audioEngine";

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  // References to keep props updated for the requestAnimationFrame loop
  const propsRef = useRef({
    scrollProgress,
    chillFactor,
    tilt,
    sensesMode,
    isUncapped,
    isReducedMotion,
    onUncap,
  });

  useEffect(() => {
    propsRef.current = {
      scrollProgress,
      chillFactor,
      tilt,
      sensesMode,
      isUncapped,
      isReducedMotion,
      onUncap,
    };
  }, [scrollProgress, chillFactor, tilt, sensesMode, isUncapped, isReducedMotion, onUncap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
      // 1. Renderer Setup
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: gpuProfile.tier !== "low",
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, gpuProfile.dpr));
      renderer.setSize(window.innerWidth, window.innerHeight);
    } catch (e) {
      console.warn("WebGL initialization failed, falling back to 2D illustration", e);
      setHasWebGL(false);
      return;
    }

    // 2. Camera & Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      44,
      window.innerWidth / window.innerHeight,
      0.1,
      50
    );
    camera.position.set(0, 0.2, 5.8);

    // 3. Dynamic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfffdf5, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0b4ea2, 1.1);
    rimLight.position.set(-4, 2, -2);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xfbbf24, 0.6);
    pointLight.position.set(0, -2, 3);
    scene.add(pointLight);

    // 4. KMF Nandini Authentic Label Texture (2D Canvas)
    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = 1024;
    labelCanvas.height = 512;
    const ctx = labelCanvas.getContext("2d");
    if (ctx) {
      // Cream background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
      bgGrad.addColorStop(0, "#ffffff");
      bgGrad.addColorStop(0.5, "#fffdf5");
      bgGrad.addColorStop(1, "#fff4db");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 512);

      // Gold top and bottom trim
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

      // Kannada & English Typography
      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 52px system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("ನಂದಿನಿ", 400, 78);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 58px Georgia, serif";
      ctx.fillText("NANDINI", 400, 132);

      // Badam Flavoured Milk
      ctx.fillStyle = "#b45309";
      ctx.font = "600 32px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("FLAVOURED MILK", 512, 204);

      const badamGrad = ctx.createLinearGradient(0, 215, 0, 310);
      badamGrad.addColorStop(0, "#d97706");
      badamGrad.addColorStop(1, "#92400e");
      ctx.fillStyle = badamGrad;
      ctx.font = "900 96px Georgia, serif";
      ctx.fillText("BADAM", 512, 305);

      // Saffron ribbon banner
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(262, 330, 500, 52, 26);
      } else {
        ctx.rect(262, 330, 500, 52);
      }
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 26px system-ui, sans-serif";
      ctx.fillText("WITH REAL ROASTED ALMONDS", 512, 366);

      // Almonds & Saffron motif
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

      // Saffron thread accent
      ctx.strokeStyle = "#dc2626";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(400, 430);
      ctx.quadraticCurveTo(512, 395, 620, 440);
      ctx.stroke();

      ctx.fillStyle = "#6b7280";
      ctx.font = "bold 22px system-ui, sans-serif";
      ctx.fillText("A QUALITY PRODUCT OF KMF · 200 ml", 512, 480);
    }
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    labelTexture.anisotropy = 8;

    // 5. Shader Materials
    const glassShaderMaterial = new THREE.ShaderMaterial({
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

    const liquidShaderMaterial = new THREE.ShaderMaterial({
      vertexShader: liquidVertexShader,
      fragmentShader: liquidFragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_tilt: { value: new THREE.Vector2(0, 0) },
        u_chillFactor: { value: chillFactor },
        u_fillLevel: { value: 1.0 },
      },
    });

    // Steam particles
    const steamCount = 45;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamScales = new Float32Array(steamCount);
    const steamRandoms = new Float32Array(steamCount);

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.4;
      steamPositions[i * 3 + 1] = 2.4 + Math.random() * 0.2;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      steamScales[i] = 0.15 + Math.random() * 0.25;
      steamRandoms[i] = Math.random();
    }
    steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));
    steamGeo.setAttribute("a_scale", new THREE.BufferAttribute(steamScales, 1));
    steamGeo.setAttribute("a_random", new THREE.BufferAttribute(steamRandoms, 1));

    const steamMaterial = new THREE.ShaderMaterial({
      vertexShader: steamVertexShader,
      fragmentShader: steamFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        u_time: { value: 0 },
        u_intensity: { value: 0 },
      },
    });
    const steamPoints = new THREE.Points(steamGeo, steamMaterial);

    // 6. Nandini Bottle Construction
    const bottleGroup = new THREE.Group();
    bottleGroup.position.set(0, -0.4, 0);
    bottleGroup.scale.set(1.25, 1.25, 1.25);
    scene.add(bottleGroup);

    // Inner Liquid Core
    const liquidGeo = new THREE.CylinderGeometry(0.78, 0.78, 3.4, 32);
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidShaderMaterial);
    bottleGroup.add(liquidMesh);

    // Outer Glass Body
    const glassBodyGeo = new THREE.CylinderGeometry(0.84, 0.84, 3.6, 32);
    const frontGlassMesh = new THREE.Mesh(glassBodyGeo, glassShaderMaterial);
    bottleGroup.add(frontGlassMesh);

    // Bottle Neck and Mouth
    const neckGeo1 = new THREE.CylinderGeometry(0.38, 0.84, 0.7, 32);
    const neckMesh1 = new THREE.Mesh(neckGeo1, glassShaderMaterial);
    neckMesh1.position.set(0, 2.05, 0);
    bottleGroup.add(neckMesh1);

    const neckGeo2 = new THREE.CylinderGeometry(0.36, 0.36, 0.4, 32);
    const neckMesh2 = new THREE.Mesh(neckGeo2, glassShaderMaterial);
    neckMesh2.position.set(0, 2.35, 0);
    bottleGroup.add(neckMesh2);

    // Label Mesh
    const labelGeo = new THREE.CylinderGeometry(0.845, 0.845, 2.1, 32, 1, true);
    const labelMat = new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true, side: THREE.DoubleSide });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.set(0, -0.05, 0);
    bottleGroup.add(labelMesh);

    // Royal Blue Crown Cap
    const capGroup = new THREE.Group();
    capGroup.position.set(0, 2.42, 0);
    const capMainGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.18, 32);
    const capMainMat = new THREE.MeshStandardMaterial({ color: 0x0b4ea2, metalness: 0.85, roughness: 0.2 });
    const capMesh = new THREE.Mesh(capMainGeo, capMainMat);
    capGroup.add(capMesh);

    const capTrimGeo = new THREE.CylinderGeometry(0.37, 0.37, 0.02, 32);
    const capTrimMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.15 });
    const capTrimMesh = new THREE.Mesh(capTrimGeo, capTrimMat);
    capTrimMesh.position.set(0, 0.09, 0);
    capGroup.add(capTrimMesh);
    bottleGroup.add(capGroup);

    bottleGroup.add(steamPoints);

    // 7. Exploded Ingredients Group (Almonds + Saffron)
    const ingredientsGroup = new THREE.Group();
    scene.add(ingredientsGroup);

    const almondCount = Math.floor(gpuProfile.particleCount * 0.65);
    const almondGeo = new THREE.SphereGeometry(1, 12, 12);
    const almondMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.4, metalness: 0.05 });
    const almondMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < almondCount; i++) {
      const angle = (i / almondCount) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 2.2;
      const mesh = new THREE.Mesh(almondGeo, almondMat);
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4.5,
        Math.sin(angle) * radius
      );
      const s = 0.22 + Math.random() * 0.18;
      mesh.scale.set(s, s * 0.45, s);
      ingredientsGroup.add(mesh);
      almondMeshes.push(mesh);
    }

    const saffronCount = Math.floor(gpuProfile.particleCount * 0.35);
    const saffronGeo = new THREE.CylinderGeometry(0.2, 0.4, 2, 8);
    const saffronMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      emissive: 0xb91c1c,
      emissiveIntensity: 0.25,
      roughness: 0.5,
    });
    const saffronMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < saffronCount; i++) {
      const angle = (i / saffronCount) * Math.PI * 2 + 0.5;
      const radius = 1.5 + Math.random() * 2.0;
      const mesh = new THREE.Mesh(saffronGeo, saffronMat);
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 3.8,
        Math.sin(angle) * radius
      );
      const s = 0.3 + Math.random() * 0.25;
      mesh.scale.set(s * 0.15, s * 1.4, s * 0.15);
      ingredientsGroup.add(mesh);
      saffronMeshes.push(mesh);
    }

    // 8. Raycasting for Micro-Interactions (Clicking Cap & Ingredients)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([capMesh, capTrimMesh, bottleGroup], true);

      if (intersects.length > 0) {
        audioEngine.playUncapPop();
        propsRef.current.onUncap();
      }
    };

    canvas.addEventListener("click", handleClick);

    // 9. Resize Handling
    const handleResize = () => {
      if (!renderer) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Precompile WebGL pipeline
    renderer.compile(scene, camera);

    // 10. Animation Render Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const t = clock.getElapsedTime();
      const {
        scrollProgress: scroll,
        chillFactor: chill,
        tilt: gyroTilt,
        sensesMode: mode,
        isUncapped: uncapped,
        isReducedMotion: reduced,
      } = propsRef.current;

      // Update Lighting based on Senses Mode
      const isGolden = mode === "golden-hour";
      ambientLight.intensity = isGolden ? 0.7 : 0.95;
      keyLight.color.set(isGolden ? "#FDE68A" : "#FFFFFF");
      rimLight.color.set(isGolden ? "#F59E0B" : "#0B4EA2");

      // Update Uniforms
      glassShaderMaterial.uniforms.u_time.value = t;
      glassShaderMaterial.uniforms.u_chillFactor.value = chill;

      liquidShaderMaterial.uniforms.u_time.value = t;
      liquidShaderMaterial.uniforms.u_tilt.value.set(gyroTilt.tiltX, gyroTilt.tiltY);
      liquidShaderMaterial.uniforms.u_chillFactor.value = chill;

      steamMaterial.uniforms.u_time.value = t;
      steamMaterial.uniforms.u_intensity.value = Math.max(0, (chill - 0.45) * 1.8);

      // Bottle Rotation & Float
      if (!reduced) {
        bottleGroup.rotation.y = t * 0.25 + scroll * Math.PI * 1.2;
        bottleGroup.rotation.z = gyroTilt.tiltX * 0.15;

        // Front glass split during scrollytelling explosion
        const splitAmount = Math.sin(Math.PI * Math.min(1, Math.max(0, (scroll - 0.3) / 0.45)));
        frontGlassMesh.position.z = splitAmount * 1.4;
        frontGlassMesh.position.x = splitAmount * 0.6;
      }

      // Uncap Pop Animation
      if (uncapped) {
        capGroup.position.y += (4.8 - capGroup.position.y) * 0.1;
        capGroup.rotation.x += delta * 2;
        capGroup.rotation.z += delta * 3;
      } else {
        capGroup.position.y = 2.42;
        capGroup.rotation.set(0, 0, 0);
      }

      // Exploded Ingredients Milestone Animation
      if (!reduced) {
        const explodeFactor = Math.sin(Math.PI * Math.min(1, Math.max(0, (scroll - 0.2) / 0.75)));
        ingredientsGroup.position.y = Math.sin(t * 0.8) * 0.15;
        ingredientsGroup.rotation.y = t * 0.15 + scroll * Math.PI;
        const scale = 0.4 + explodeFactor * 0.9;
        ingredientsGroup.scale.set(scale, scale, scale);
      }

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);

      // Dispose resources
      labelTexture.dispose();
      liquidGeo.dispose();
      glassBodyGeo.dispose();
      neckGeo1.dispose();
      neckGeo2.dispose();
      labelGeo.dispose();
      capMainGeo.dispose();
      capTrimGeo.dispose();
      steamGeo.dispose();
      almondGeo.dispose();
      saffronGeo.dispose();

      glassShaderMaterial.dispose();
      liquidShaderMaterial.dispose();
      steamMaterial.dispose();
      labelMat.dispose();
      capMainMat.dispose();
      capTrimMat.dispose();
      almondMat.dispose();
      saffronMat.dispose();

      if (renderer) {
        renderer.dispose();
      }
    };
  }, [gpuProfile.dpr, gpuProfile.tier, gpuProfile.particleCount]);

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="p-6 rounded-3xl bg-cream-pure/90 border border-saffron text-center shadow-gold max-w-sm">
          <div className="w-16 h-16 rounded-full bg-nandini-blue text-white flex items-center justify-center font-bold mx-auto mb-3 text-lg">
            KMF
          </div>
          <h3 className="font-serif font-black text-xl text-bronze">Nandini Badam Milk</h3>
          <p className="text-xs text-bronze-soft mt-1">
            Pure cow milk infused with Kashmiri Kesar & California Almonds.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto canvas-wrapper z-10">
      <canvas
        ref={canvasRef}
        id="three-stage"
        className="w-full h-full block touch-none cursor-pointer"
        aria-label="Interactive 3D Nandini Badam Milk Bottle"
      />
    </div>
  );
}
