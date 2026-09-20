export const steamVertexShader = /* glsl */ `
  uniform float u_time;
  uniform float u_intensity; // Active when slider > 0.4
  attribute float a_scale;
  attribute float a_random;

  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Rising spiral motion
    float progress = fract(u_time * 0.35 + a_random);
    pos.y += progress * 2.8;
    pos.x += sin(u_time * 2.0 + progress * 6.28) * (0.15 + progress * 0.35);
    pos.z += cos(u_time * 1.8 + progress * 6.28) * (0.15 + progress * 0.35);

    // Particle scale & fade over life
    float pSize = a_scale * (1.0 + progress * 2.2);
    vAlpha = sin(progress * 3.14159) * u_intensity * 0.45;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = pSize * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const steamFragmentShader = /* glsl */ `
  varying float vAlpha;

  void main() {
    // Soft radial particle gradient
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.05, dist) * vAlpha;
    // Warm aromatic amber-saffron steam tint
    vec3 steamColor = vec3(1.0, 0.94, 0.82);

    gl_FragColor = vec4(steamColor, alpha);
  }
`;
