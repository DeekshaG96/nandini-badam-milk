export const glassVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const glassFragmentShader = /* glsl */ `
  uniform float u_time;
  uniform float u_chillFactor; // 0.0 = 4°C Chilled (Frosty beads), 1.0 = 60°C Steaming
  uniform vec3 u_color;
  uniform vec3 u_fresnelColor;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  // Procedural cellular hash for condensation droplets
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 norm = normalize(vNormal);

    // Condensation beads bump perturbation (Active when chilled)
    float chillAmount = 1.0 - u_chillFactor;
    float dropScale = 38.0;
    vec2 dropGrid = floor(vUv * dropScale);
    float h = hash(dropGrid);

    vec3 bumpNormal = norm;
    if (chillAmount > 0.1 && h > 0.45) {
      vec2 dropPos = fract(vUv * dropScale) - 0.5;
      float dist = length(dropPos);
      if (dist < 0.32) {
        float bumpHeight = sqrt(0.1024 - dist * dist) * chillAmount * 0.65;
        bumpNormal = normalize(norm + vec3(dropPos.x, dropPos.y, 0.0) * bumpHeight * 8.0);
      }
    }

    // Physical Fresnel reflection
    float fresnel = pow(1.0 - max(dot(viewDir, bumpNormal), 0.0), 3.2);

    // Glass Refraction & Chromatic Dispersion
    vec3 refractColor = vec3(0.98, 0.96, 0.91); // Dairy glass tint
    
    // Frost haze tint at 4°C
    vec3 frostColor = vec3(0.85, 0.92, 1.0) * chillAmount * 0.35;

    // Specular highlight
    vec3 lightDir = normalize(vec3(1.5, 2.5, 2.0));
    vec3 halfVector = normalize(lightDir + viewDir);
    float spec = pow(max(dot(bumpNormal, halfVector), 0.0), 64.0);

    vec3 finalColor = mix(refractColor, u_fresnelColor, fresnel * 0.75);
    finalColor += spec * vec3(1.0, 0.98, 0.9) * 0.85;
    finalColor += frostColor;

    float alpha = clamp(0.28 + fresnel * 0.65 + (chillAmount * 0.15), 0.0, 0.95);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;
