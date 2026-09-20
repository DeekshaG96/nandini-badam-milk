"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { ShoppingBag, ChevronDown, Award, Sparkles } from "lucide-react";

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
  if (scrollProgress > 0.45 && scrollProgress <= 0.65) {
    activeMilestone = t.moments.saffron.title;
  } else if (scrollProgress > 0.65 && scrollProgress <= 0.85) {
    activeMilestone = t.moments.almonds.title;
  } else if (scrollProgress > 0.85) {
    activeMilestone = t.moments.milk.title;
  }

  return (
    <div className="relative min-h-[420vh] hoysala-watermark">
      {/* 1. Accessible Screen-Reader DOM Mirror */}
      <AccessibleDOMMirror
        t={t}
        chillFactor={chillFactor}
        activeMilestone={activeMilestone}
      />

      {/* 2. Top Navigation Bar */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-40 flex items-center justify-between px-5 py-3 rounded-full bg-cream-pure/80 dark:bg-black/60 backdrop-blur-xl border border-saffron/30 shadow-royal">
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

        <div className="flex items-center gap-2.5 sm:gap-3.5">
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
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-nandini-blue to-nandini-deepBlue text-white border border-gold hover:scale-105 active:scale-95 transition-all shadow-md"
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

      {/* 4. Hero Section Copy (Sticky during 0% - 25% scroll) */}
      <section className="relative z-20 h-screen flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <div
          className="max-w-3xl transition-all duration-300"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 3.5),
            transform: `translateY(${-scrollProgress * 120}px)`,
          }}
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold text-nandini-blue dark:text-blue-300 bg-white/70 dark:bg-zinc-900/70 border border-nandini-blue/30 backdrop-blur-md mb-4 shadow-sm">
            <Award className="w-3.5 h-3.5 text-saffron" />
            <span>{t.hero.tag}</span>
          </div>

          <h1 className="font-serif font-black text-4xl sm:text-6xl md:text-7xl text-bronze dark:text-cream-pure leading-none tracking-tight drop-shadow-sm">
            {t.hero.title}
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-bronze-soft dark:text-cream-soft mt-3">
            {t.hero.sub}
          </p>

          <p className="text-xs sm:text-sm font-semibold text-bronze-soft/80 dark:text-cream-soft/70 uppercase tracking-widest mt-2">
            {t.hero.meta}
          </p>
        </div>

        {/* Scroll down indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-bold tracking-widest text-bronze-soft dark:text-cream-soft uppercase transition-opacity"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
        >
          <span>{t.hero.scrollHint}</span>
          <ChevronDown className="w-4 h-4 text-saffron animate-bounce" />
        </div>
      </section>

      {/* 5. Scrollytelling Milestones Callout Cards */}
      <div className="relative z-20 pointer-events-none">
        {/* Milestone 1: Kashmiri Kesar (Around 55% scroll) */}
        <div
          className="h-screen flex items-center justify-start max-w-5xl mx-auto px-6"
          style={{
            opacity: Math.sin(Math.PI * Math.min(1, Math.max(0, (scrollProgress - 0.4) / 0.25))),
          }}
        >
          <div className="bg-cream-pure/90 dark:bg-black/75 backdrop-blur-xl border border-saffron/35 p-6 rounded-3xl shadow-gold max-w-sm pointer-events-auto">
            <span className="text-[10px] uppercase font-bold text-saffron-deep tracking-wider">
              {t.moments.saffron.badge}
            </span>
            <h3 className="font-serif font-extrabold text-2xl text-bronze dark:text-cream-pure mt-1">
              {t.moments.saffron.title}
            </h3>
            <p className="text-xs text-bronze-soft dark:text-cream-soft mt-2 leading-relaxed">
              {t.moments.saffron.desc}
            </p>
          </div>
        </div>

        {/* Milestone 2: Real Almonds (Around 72% scroll) */}
        <div
          className="h-screen flex items-center justify-end max-w-5xl mx-auto px-6"
          style={{
            opacity: Math.sin(Math.PI * Math.min(1, Math.max(0, (scrollProgress - 0.6) / 0.25))),
          }}
        >
          <div className="bg-cream-pure/90 dark:bg-black/75 backdrop-blur-xl border border-saffron/35 p-6 rounded-3xl shadow-gold max-w-sm pointer-events-auto text-right">
            <span className="text-[10px] uppercase font-bold text-saffron-deep tracking-wider">
              {t.moments.almonds.badge}
            </span>
            <h3 className="font-serif font-extrabold text-2xl text-bronze dark:text-cream-pure mt-1">
              {t.moments.almonds.title}
            </h3>
            <p className="text-xs text-bronze-soft dark:text-cream-soft mt-2 leading-relaxed">
              {t.moments.almonds.desc}
            </p>
          </div>
        </div>

        {/* Milestone 3: 100% Pure Cow Milk (Around 88% scroll) */}
        <div
          className="h-screen flex items-center justify-start max-w-5xl mx-auto px-6"
          style={{
            opacity: Math.sin(Math.PI * Math.min(1, Math.max(0, (scrollProgress - 0.78) / 0.2))),
          }}
        >
          <div className="bg-cream-pure/90 dark:bg-black/75 backdrop-blur-xl border border-saffron/35 p-6 rounded-3xl shadow-gold max-w-sm pointer-events-auto">
            <span className="text-[10px] uppercase font-bold text-saffron-deep tracking-wider">
              {t.moments.milk.badge}
            </span>
            <h3 className="font-serif font-extrabold text-2xl text-bronze dark:text-cream-pure mt-1">
              {t.moments.milk.title}
            </h3>
            <p className="text-xs text-bronze-soft dark:text-cream-soft mt-2 leading-relaxed">
              {t.moments.milk.desc}
            </p>
          </div>
        </div>
      </div>

      {/* 6. Floating Interactive Control Bar (Chill Factor & Uncap) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md pointer-events-auto">
        <ChillFactorSlider value={chillFactor} onChange={setChillFactor} t={t} />
        <UncapTrigger isUncapped={isUncapped} onUncap={() => setIsUncapped((prev) => !prev)} t={t} />
      </div>

      {/* 7. Nutrition Deep Dive & Fuel Calculator */}
      <section className="relative z-30 bg-gradient-to-b from-transparent via-cream-pure dark:via-zinc-950 to-cream-pure dark:to-zinc-950 pt-20 pb-36 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-saffron-deep bg-saffron/15 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nutrition & Lifestyle Intelligence</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-bronze dark:text-cream-pure">
              Purity in Every Sip
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <MacroWheel t={t} />
            <DailyFuelCalculator t={t} />
          </div>
        </div>
      </section>

      {/* 8. Flash-Order Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} t={t} />
    </div>
  );
}
