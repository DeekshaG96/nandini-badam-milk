export const liquidVertexShader = /* glsl */ `
  uniform float u_time;
  uniform vec2 u_tilt; // Mouse & Gyroscope tilt [-1, 1]
  uniform float u_fillLevel;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    vec3 pos = position;

    // Fluid sloshing dynamics along surface
    if (pos.y > 0.0) {
      float wave = sin(pos.x * 4.0 + u_time * 3.0) * cos(pos.z * 4.0 + u_time * 2.5) * 0.08;
      float tiltDisplacement = (pos.x * u_tilt.x + pos.z * u_tilt.y) * 0.28;
      pos.y += wave + tiltDisplacement;
    }

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const liquidFragmentShader = /* glsl */ `
  uniform float u_time;
  uniform float u_chillFactor; // 0.0 = Chilled 4°C, 1.0 = Warm 60°C
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  // Crushed almond speck noise
  float speckNoise(vec3 p) {
    p = fract(p * 18.23);
    p += dot(p, p.yzx + 31.42);
    return fract((p.x + p.y) * p.z);
  }

  void main() {
    vec3 norm = normalize(vNormal);
    vec3 lightDir = normalize(vec3(1.2, 2.0, 1.5));
    float diff = max(dot(norm, lightDir), 0.0);

    // Warm golden Nandini Saffron Badam Milk tones
    vec3 deepGold = vec3(0.92, 0.58, 0.08); // Saffron dairy depth
    vec3 creamGold = vec3(1.0, 0.88, 0.55); // Radiant creamy body
    vec3 warmAmber = vec3(0.98, 0.72, 0.18); // Amber undertone

    // Temperature color shift: Warmer amber glow at 60°C
    vec3 baseColor = mix(creamGold, warmAmber, u_chillFactor * 0.4);
    vec3 finalMilk = mix(deepGold, baseColor, diff * 0.8 + 0.2);

    // Subsurface scattering mimic
    float sss = pow(max(dot(-norm, lightDir), 0.0), 2.5) * 0.35;
    finalMilk += vec3(1.0, 0.78, 0.3) * sss;

    // Suspended crushed almond specks (Badam pieces inside milk)
    float specks = speckNoise(vPosition * 8.0);
    if (specks > 0.88) {
      finalMilk = mix(finalMilk, vec3(0.52, 0.26, 0.06), 0.75); // Roasted badam speck
    }

    // Specular dairy sheen
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfV = normalize(lightDir + viewDir);
    float spec = pow(max(dot(norm, halfV), 0.0), 32.0) * 0.4;
    finalMilk += vec3(1.0, 0.98, 0.9) * spec;

    gl_FragColor = vec4(finalMilk, 1.0);
  }
`;
