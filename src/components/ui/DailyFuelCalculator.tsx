"use client";

import React, { useState } from "react";
import { I18nContent } from "@/lib/i18nDictionary";
import { audioEngine } from "@/lib/audioEngine";

interface DailyFuelCalculatorProps {
  t: I18nContent;
}

export function DailyFuelCalculator({ t }: DailyFuelCalculatorProps) {
  const [level, setLevel] = useState<"light" | "moderate" | "intense">("moderate");

  const recommendations = {
    light: { bottles: 1, proteinCoverage: "13%", calciumCoverage: "28%" },
    moderate: { bottles: 2, proteinCoverage: "26%", calciumCoverage: "56%" },
    intense: { bottles: 3, proteinCoverage: "39%", calciumCoverage: "84%" },
  };

  const handleSelect = (lvl: "light" | "moderate" | "intense") => {
    setLevel(lvl);
    audioEngine.playGlassClink(0.1);
  };

  return (
    <div className="bg-cream-pure/90 dark:bg-black/70 backdrop-blur-xl border border-saffron/30 rounded-3xl p-6 shadow-gold max-w-md w-full mx-auto my-6">
      <div className="text-center mb-4">
        <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-saffron-deep">
          {t.fuelCalc.title}
        </h3>
        <p className="text-xs text-bronze-soft dark:text-cream-soft mt-1">
          {t.fuelCalc.desc}
        </p>
      </div>

      {/* Activity Level Selector */}
      <div className="flex gap-2 p-1 bg-saffron/10 rounded-2xl mb-4">
        {(["light", "moderate", "intense"] as const).map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => handleSelect(lvl)}
            className={`flex-1 py-2 text-[11px] font-bold rounded-xl transition-all ${
              level === lvl
                ? "bg-gradient-to-r from-nandini-blue to-nandini-deepBlue text-white shadow-sm"
                : "text-bronze-soft hover:text-bronze dark:text-cream-soft"
            }`}
          >
            {t.fuelCalc.activityLevels[lvl]}
          </button>
        ))}
      </div>

      {/* Results Display */}
      <div className="bg-white/60 dark:bg-zinc-900/60 border border-saffron/20 rounded-2xl p-4 text-center">
        <span className="text-xs font-semibold text-bronze-soft dark:text-cream-soft">
          {t.fuelCalc.recommended}
        </span>
        <div className="text-3xl font-serif font-black text-nandini-blue dark:text-blue-400 my-1">
          {recommendations[level].bottles} {t.fuelCalc.bottles}
        </div>
        <div className="flex justify-around text-xs font-bold text-saffron-deep mt-2 pt-2 border-t border-saffron/15">
          <span>🥛 Protein: {recommendations[level].proteinCoverage}</span>
          <span>🦴 Calcium: {recommendations[level].calciumCoverage}</span>
        </div>
      </div>
    </div>
  );
}
