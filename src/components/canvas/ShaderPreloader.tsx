"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { glassVertexShader, glassFragmentShader } from "./shaders/glassShader";
import { liquidVertexShader, liquidFragmentShader } from "./shaders/liquidShader";

/**
 * ShaderPreloader compiles GLSL shaders offscreen on initial mount,
 * completely preventing first-scroll WebGL pipeline linking stutter.
 */
export function ShaderPreloader() {
  const glassMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: glassVertexShader,
      fragmentShader: glassFragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_chillFactor: { value: 0.5 },
        u_color: { value: new THREE.Color("#FFFFFF") },
        u_fresnelColor: { value: new THREE.Color("#FDE68A") },
      },
    });
  }, []);

  const liquidMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: liquidVertexShader,
      fragmentShader: liquidFragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_tilt: { value: new THREE.Vector2(0, 0) },
        u_chillFactor: { value: 0.5 },
        u_fillLevel: { value: 1.0 },
      },
    });
  }, []);

  return (
    <group position={[0, -9999, 0]} visible={false}>
      <mesh material={glassMat}>
        <planeGeometry args={[0.01, 0.01]} />
      </mesh>
      <mesh material={liquidMat}>
        <planeGeometry args={[0.01, 0.01]} />
      </mesh>
    </group>
  );
}
