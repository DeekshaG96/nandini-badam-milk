# 🥛 Nandini Badam Milk — 3D Cinematic Scrollytelling Web App
### *The Royal Taste of Karnataka · Karnataka Milk Federation (KMF)*

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://react.dev/)
[![Three.js / R3F](https://img.shields.io/badge/R3F-Three.js-orange?logo=three.js)](https://docs.pmnd.rs/react-three-fiber)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![WCAG 2.2 AA](https://img.shields.io/badge/A11y-WCAG_2.2_AA-green)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

An award-winning, Awwwards/FWA-grade interactive 3D WebGL showcase for **Nandini Badam Flavoured Milk** by the **Karnataka Milk Federation (KMF)**. Built with Next.js 15 App Router, React 19, React Three Fiber (R3F), custom GLSL fluid and glass refraction shaders, spatial Web Audio, and an interactive "Chill Factor" thermal slider.

---

## 🌟 Key Innovations & Features

1. **Adaptive GPU Performance Tiering (`useGPUPerformance`)**
   - **High Tier**: Real-time GLSL glass refraction, dynamic condensation beads, fluid vertex dynamics, and 90+ particle instances.
   - **Medium Tier**: Native Three.js `MeshPhysicalMaterial` transmission with procedural static condensation and 35 particle instances.
   - **Low Tier / Power-Saver**: Power-saving mode with 15 particle instances and disabled physics calculations for locked 60 FPS on budget chipsets.
   - *Benchmarking Override*: Add `?gpu=high`, `?gpu=med`, or `?gpu=low` to any URL.

2. **Real-Time GLSL Shaders**
   - **Glass Refraction & Frosting (`glassShader.ts`)**: Implements physical Fresnel reflection, Snell's law refraction, chromatic dispersion, and procedural cellular bump mapping for frosty condensation droplets at 4°C.
   - **Fluid Badam Milk Dynamics (`liquidShader.ts`)**: Simulates surface wave displacement reacting to mouse drag, scroll momentum, and mobile gyroscope tilt vectors (`u_tilt`), with suspended crushed badam flecks.
   - **Rising Saffron Steam (`steamShader.ts`)**: Dynamically activates when the temperature slider warms past 50°C.

3. **Interactive "Chill Factor" Temperature Slider**
   - Seamlessly scrub between **4°C (Chilled)** and **60°C (Steaming Warm)**.
   - 4°C: Condensation beads form on the glass, background adopts a crisp golden-frost hue.
   - 60°C: Saffron steam particles rise from the neck, warm amber glow diffuses across the viewport.

4. **Kannada Regional Authenticity & Hoysala Heritage**
   - Instant bilingual switching between English and authentic Kannada (`ಬಾದಾಮ್ ಹಾಲು`, `ಕರ್ನಾಟಕ ಹಾಲು ಮಹಾಮಂಡಳಿ`) with `Noto_Sans_Kannada` typography.
   - Background watermark inspired by traditional **Hoysala star-polygons** and **Hampi Lotus Mahal filigree**.

5. **Accessibility (WCAG 2.2 AA Mirror)**
   - Visually hidden offscreen DOM (`sr-only`) contains all nutrition data, heritage stories, and ingredient breakdowns.
   - Features `aria-live="polite"` region announcing active scrollytelling milestones and temperature changes.
   - Respects `prefers-reduced-motion` by disabling explosive 3D animations and substituting smooth section cross-fades.

6. **E-Commerce Flash-Order & Micro-Fulfillment**
   - Slide-over sheet offering package selections: Single 200ml (₹35), 6-Pack (₹210), 12-Pack (₹400), and 24-Crate (₹780).
   - Karnataka Pincode lookup providing real-time delivery estimates (Bengaluru Same-Day Express vs. Karnataka 24h cold-chain delivery).

7. **Spatial Web Audio API Engine**
   - Pure procedural sound synthesizers for roasted badam crunch, liquid milk pour, glass clink, and bottle uncap pop.

---

## 🛠️ Tech Stack Architecture

- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **3D & Shaders**: React Three Fiber (R3F), Drei, Three.js, Custom GLSL Shaders
- **Styling**: Tailwind CSS, Lucide Icons, Glassmorphism
- **Typography**: Google Fonts (Cinzel, Outfit, Noto Sans Kannada)
- **Audio**: Web Audio API Procedural Synthesizer
- **Deployment**: Vercel Edge Network (`vercel.json`)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/DeekshaG96/nandini-badam-milk.git
cd nandini-badam-milk
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## ☁️ Deployment

Deploy easily to **Vercel**:
```bash
npx vercel
```
Or connect your GitHub repository directly to Vercel for continuous deployment on every git push.

---

## 📜 License & Attribution
- Dedicated to the heritage of **Karnataka Milk Federation (KMF) Nandini**.
- Created with passion by **Deeksha G**.
