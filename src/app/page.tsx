"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(
  () => import("@/components/canvas/Scene").then((mod) => mod.Scene),
  { ssr: false }
);
import { CanvasErrorBoundary } from "@/components/canvas/CanvasErrorBoundary";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { SensesModeToggle } from "@/components/ui/SensesModeToggle";
import { ChillFactorSlider } from "@/components/ui/ChillFactorSlider";
import { UncapTrigger } from "@/components/ui/UncapTrigger";
import { MacroWheel } from "@/components/ui/MacroWheel";
import { DailyFuelCalculator } from "@/components/ui/DailyFuelCalculator";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { AccessibleDOMMirror } from "@/components/ui/AccessibleDOMMirror";
import { dictionary, Language } from "@/lib/i18nDictionary";
import { useGPUPerformance } from "@/lib/useGPUPerformance";
import { useGyroscope } from "@/lib/useGyroscope";
import { audioEngine } from "@/lib/audioEngine";
import { ShoppingBag, ChevronDown, Award, Sparkles, ShieldCheck, HeartPulse } from "lucide-react";

export default function NandiniBadamExperience() {
  const [lang, setLang] = useState<Language>("en");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [chillFactor, setChillFactor] = useState(0.0); // 0.0 = 4°C, 1.0 = 60°C
  const [sensesMode, setSensesMode] = useState<"morning" | "golden-hour">("morning");
  const [isUncapped, setIsUncapped] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const gpuProfile = useGPUPerformance();
  const gyro = useGyroscope();
  const t = dictionary[lang];

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }
  }, []);

  // Scroll listener to drive 3D timeline
  useEffect(() => {
    const handleScroll = () => {
      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / total));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active milestone calculation
  let activeMilestone = t.hero.title;
  if (scrollProgress > 0.35 && scrollProgress <= 0.62) {
    activeMilestone = t.moments.saffron.title;
  } else if (scrollProgress > 0.62 && scrollProgress <= 0.82) {
    activeMilestone = t.moments.almonds.title;
  } else if (scrollProgress > 0.82) {
    activeMilestone = t.moments.milk.title;
  }

  return (
    <div className="relative min-h-[420vh] hoysala-watermark transition-colors duration-500">
      {/* 1. Accessible Screen-Reader DOM Mirror */}
      <AccessibleDOMMirror
        t={t}
        chillFactor={chillFactor}
        activeMilestone={activeMilestone}
      />

      {/* 2. Top Floating Navigation Bar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-40 flex items-center justify-between px-5 py-3 rounded-full bg-cream-pure/85 dark:bg-zinc-900/85 backdrop-blur-2xl border border-saffron/30 shadow-royal">
        <a href="#" className="flex items-center gap-3 text-bronze dark:text-cream-pure">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-nandini-blue to-nandini-deepBlue flex items-center justify-center text-white font-serif font-black text-xs border-2 border-gold shadow-md">
            KMF
          </div>
          <div>
            <span className="font-serif font-extrabold text-sm tracking-wide block leading-none">
              {t.brand.name}
            </span>
            <span className="text-[10px] uppercase font-bold text-nandini-blue dark:text-blue-400 tracking-wider">
              {t.brand.sub}
            </span>
          </div>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle language={lang} onToggle={setLang} />
          <SensesModeToggle
            sensesMode={sensesMode}
            onSensesToggle={setSensesMode}
            isDark={isDark}
            onToggleDark={setIsDark}
          />
          <button
            type="button"
            onClick={() => {
              audioEngine.playGlassClink(0.15);
              setIsCartOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-nandini-blue to-nandini-deepBlue text-white border border-gold hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">{t.nav.orderNow}</span>
          </button>
        </div>
      </header>

      {/* 3. 3D WebGL Scene Stage */}
      <CanvasErrorBoundary>
        <Scene
          scrollProgress={scrollProgress}
          chillFactor={chillFactor}
          tilt={gyro}
          sensesMode={sensesMode}
          isDark={isDark}
          isUncapped={isUncapped}
          onUncap={() => setIsUncapped((prev) => !prev)}
          gpuProfile={gpuProfile}
          isReducedMotion={isReducedMotion}
        />
      </CanvasErrorBoundary>

      {/* 4. Hero Section Presentation (Breathable Layout) */}
      <section className="relative z-20 min-h-screen flex flex-col justify-between items-center text-center px-4 pt-28 pb-32 pointer-events-none">
        {/* Top Header Copy */}
        <div
          className="max-w-4xl mx-auto transition-all duration-300"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 3.5),
            transform: `translateY(${-scrollProgress * 100}px)`,
          }}
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-nandini-blue dark:text-blue-300 bg-white/85 dark:bg-zinc-900/85 border border-saffron/40 backdrop-blur-md mb-3 shadow-sm">
            <Award className="w-3.5 h-3.5 text-saffron" />
            <span className="tracking-wide uppercase text-[11px]">{t.hero.tag}</span>
          </div>

          <h1 className="font-serif font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none drop-shadow-sm bg-gradient-to-b from-[#78350f] via-[#b45309] to-[#d97706] dark:from-[#fffdf5] dark:via-[#fef08a] dark:to-[#f59e0b] bg-clip-text text-transparent py-1">
            {t.hero.title}
          </h1>

          <p className="font-serif italic text-base sm:text-xl md:text-2xl text-bronze-soft dark:text-cream-soft mt-2 max-w-2xl mx-auto">
            {t.hero.sub}
          </p>

          <p className="text-[11px] sm:text-xs font-semibold text-bronze-soft/80 dark:text-cream-soft/70 uppercase tracking-widest mt-2">
            {t.hero.meta}
          </p>
        </div>

        {/* Framing Hero Badges (Left & Right Desktop Accents) */}
        <div
          className="w-full max-w-6xl mx-auto hidden lg:flex justify-between items-center px-8 transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 4) }}
        >
          {/* Left Feature Pill */}
          <div className="bg-cream-pure/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-saffron/30 rounded-2xl p-4 shadow-gold text-left max-w-xs pointer-events-auto">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-saffron-deep dark:text-saffron-light tracking-wider">
              <Sparkles className="w-3 h-3 text-saffron" />
              <span>Ayurvedic Heritage</span>
            </div>
            <div className="text-xs font-bold text-bronze dark:text-cream-pure mt-1">
              100% Pure Kashmiri Kesar
            </div>
            <p className="text-[11px] text-bronze-soft dark:text-cream-soft mt-1 leading-snug">
              Sun-dried royal saffron threads lending iconic golden luminescence and vitality.
            </p>
          </div>

          {/* Right Feature Pill */}
          <div className="bg-cream-pure/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-saffron/30 rounded-2xl p-4 shadow-gold text-right max-w-xs pointer-events-auto">
            <div className="flex items-center justify-end gap-1.5 text-[10px] uppercase font-bold text-saffron-deep dark:text-saffron-light tracking-wider">
              <span>Plant & Dairy Protein</span>
              <HeartPulse className="w-3 h-3 text-nandini-blue dark:text-blue-400" />
            </div>
            <div className="text-xs font-bold text-bronze dark:text-cream-pure mt-1">
              Real California Badam Slivers
            </div>
            <p className="text-[11px] text-bronze-soft dark:text-cream-soft mt-1 leading-snug">
              Roasted crunchy almond flakes suspended in homogenized fresh cow milk.
            </p>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div
          className="flex flex-col items-center gap-1.5 text-[11px] font-bold tracking-widest text-bronze-soft dark:text-cream-soft uppercase transition-opacity"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
        >
          <span>{t.hero.scrollHint}</span>
          <ChevronDown className="w-4 h-4 text-saffron animate-bounce" />
        </div>
      </section>

      {/* 5. Scrollytelling Milestones Callout Cards */}
      <div className="relative z-20 pointer-events-none">
        {/* Milestone 1: Kashmiri Kesar (Around 50% scroll) */}
        <div
          className="h-screen flex items-center justify-start max-w-5xl mx-auto px-6"
          style={{
            opacity: Math.sin(Math.PI * Math.min(1, Math.max(0, (scrollProgress - 0.35) / 0.3))),
          }}
        >
          <div className="bg-cream-pure/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-saffron/40 p-7 rounded-3xl shadow-gold max-w-sm pointer-events-auto transition-all">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
              <span className="text-[10px] uppercase font-bold text-saffron-deep dark:text-saffron-light tracking-widest">
                {t.moments.saffron.badge}
              </span>
            </div>
            <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-bronze dark:text-cream-pure mt-2">
              {t.moments.saffron.title}
            </h3>
            <p className="text-xs sm:text-sm text-bronze-soft dark:text-cream-soft mt-3 leading-relaxed">
              {t.moments.saffron.desc}
            </p>
          </div>
        </div>

        {/* Milestone 2: Real Almonds (Around 70% scroll) */}
        <div
          className="h-screen flex items-center justify-end max-w-5xl mx-auto px-6"
          style={{
            opacity: Math.sin(Math.PI * Math.min(1, Math.max(0, (scrollProgress - 0.58) / 0.28))),
          }}
        >
          <div className="bg-cream-pure/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-saffron/40 p-7 rounded-3xl shadow-gold max-w-sm pointer-events-auto text-right transition-all">
            <div className="flex items-center justify-end gap-2">
              <span className="text-[10px] uppercase font-bold text-saffron-deep dark:text-saffron-light tracking-widest">
                {t.moments.almonds.badge}
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            </div>
            <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-bronze dark:text-cream-pure mt-2">
              {t.moments.almonds.title}
            </h3>
            <p className="text-xs sm:text-sm text-bronze-soft dark:text-cream-soft mt-3 leading-relaxed">
              {t.moments.almonds.desc}
            </p>
          </div>
        </div>

        {/* Milestone 3: 100% Pure Cow Milk (Around 88% scroll) */}
        <div
          className="h-screen flex items-center justify-start max-w-5xl mx-auto px-6"
          style={{
            opacity: Math.sin(Math.PI * Math.min(1, Math.max(0, (scrollProgress - 0.78) / 0.18))),
          }}
        >
          <div className="bg-cream-pure/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-saffron/40 p-7 rounded-3xl shadow-gold max-w-sm pointer-events-auto transition-all">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-nandini-blue animate-pulse" />
              <span className="text-[10px] uppercase font-bold text-saffron-deep dark:text-saffron-light tracking-widest">
                {t.moments.milk.badge}
              </span>
            </div>
            <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-bronze dark:text-cream-pure mt-2">
              {t.moments.milk.title}
            </h3>
            <p className="text-xs sm:text-sm text-bronze-soft dark:text-cream-soft mt-3 leading-relaxed">
              {t.moments.milk.desc}
            </p>
          </div>
        </div>
      </div>

      {/* 6. Floating Interactive Control Bar (Smoothly hides during bottom nutrition section) */}
      <div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md pointer-events-auto transition-all duration-500"
        style={{
          opacity: scrollProgress > 0.91 ? 0 : 1,
          transform: `translate(-50%, ${scrollProgress > 0.91 ? "40px" : "0px"})`,
          pointerEvents: scrollProgress > 0.91 ? "none" : "auto",
        }}
      >
        <ChillFactorSlider value={chillFactor} onChange={setChillFactor} t={t} />
        <UncapTrigger isUncapped={isUncapped} onUncap={() => setIsUncapped((prev) => !prev)} t={t} />
      </div>

      {/* 7. Nutrition Deep Dive & Fuel Calculator */}
      <section className="relative z-30 bg-gradient-to-b from-transparent via-cream-pure dark:via-zinc-950 to-cream-pure dark:to-zinc-950 pt-24 pb-36 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-saffron-deep dark:text-saffron-light bg-saffron/15 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-saffron" />
              <span>Nutrition & Lifestyle Intelligence</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-bronze dark:text-cream-pure">
              Purity in Every Sip
            </h2>
            <p className="text-xs sm:text-sm text-bronze-soft dark:text-cream-soft mt-2 max-w-xl mx-auto">
              Each 200ml glass bottle delivers essential bovine calcium, whole almond lipids, and real saffron antioxidants.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <MacroWheel t={t} />
            <DailyFuelCalculator t={t} />
          </div>

          {/* Heritage Assurance Strip */}
          <div className="mt-10 p-5 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-saffron/25 text-center flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-bronze dark:text-cream-pure">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              100% Karnataka Farmer Cooperative Milk
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-saffron" />
              Pure Kashmiri Mongra Saffron
            </span>
            <span className="flex items-center gap-1.5">
              ❄️ Cold-Chain Insulated Glass Packaging
            </span>
          </div>
        </div>
      </section>

      {/* 8. Flash-Order Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} t={t} />
    </div>
  );
}
