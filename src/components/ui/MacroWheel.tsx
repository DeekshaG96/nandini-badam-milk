"use client";

import React, { useState } from "react";
import { I18nContent } from "@/lib/i18nDictionary";
import { audioEngine } from "@/lib/audioEngine";

interface MacroWheelProps {
  t: I18nContent;
}

export function MacroWheel({ t }: MacroWheelProps) {
  const [activeSegment, setActiveSegment] = useState<number>(0);

  const macros = [
    {
      label: "Energy",
      val: "174 kcal",
      pct: "9%",
      desc: "Wholesome caloric fuel from toned cow milk & almonds",
      color: "#F59E0B",
    },
    {
      label: "Protein",
      val: "6.4 g",
      pct: "13%",
      desc: "Complete amino acid profile for muscle recovery",
      color: "#0B4EA2",
    },
    {
      label: "Calcium",
      val: "230 mg",
      pct: "28%",
      desc: "Essential for robust bone mineral density",
      color: "#10B981",
    },
    {
      label: "Healthy Fats",
      val: "6.0 g",
      pct: "9%",
      desc: "Natural milk lipids with almond omega monounsaturates",
      color: "#D97706",
    },
  ];

  return (
    <div className="bg-cream-pure/90 dark:bg-black/70 backdrop-blur-xl border border-saffron/30 rounded-3xl p-6 shadow-gold max-w-md w-full mx-auto my-6">
      <div className="text-center mb-5">
        <span className="text-xs uppercase tracking-widest font-bold text-saffron-deep">
          {t.nutrition.title}
        </span>
        <p className="text-xs text-bronze-soft dark:text-cream-soft mt-1">
          {t.nutrition.subtitle}
        </p>
      </div>

      {/* Interactive Radial Macro Selector */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {macros.map((m, idx) => (
          <button
            key={m.label}
            type="button"
            onClick={() => {
              setActiveSegment(idx);
              audioEngine.playGlassClink(0.1);
            }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              activeSegment === idx
                ? "border-saffron bg-saffron/15 shadow-sm scale-102"
                : "border-saffron/20 bg-white/50 dark:bg-zinc-900/50 hover:border-saffron/50"
            }`}
          >
            <div className="text-[11px] font-bold text-bronze-soft dark:text-cream-soft uppercase">
              {m.label}
            </div>
            <div className="text-lg font-serif font-black text-bronze dark:text-cream-pure">
              {m.val}
            </div>
            <div className="text-[10px] text-saffron-dark dark:text-saffron-light font-semibold">
              {m.pct} Daily Value
            </div>
          </button>
        ))}
      </div>

      {/* Active Segment Detail Card */}
      <div className="bg-saffron/10 border border-saffron/25 rounded-xl p-3.5 text-center">
        <p className="text-xs font-semibold text-bronze dark:text-cream-pure">
          {macros[activeSegment].desc}
        </p>
      </div>
    </div>
  );
}
