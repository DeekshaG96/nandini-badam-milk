"use client";

import React, { useCallback } from "react";
import { I18nContent } from "@/lib/i18nDictionary";
import { audioEngine } from "@/lib/audioEngine";

interface ChillFactorSliderProps {
  value: number; // 0.0 to 1.0
  onChange: (val: number) => void;
  t: I18nContent;
}

export function ChillFactorSlider({ value, onChange, t }: ChillFactorSliderProps) {
  const currentTemp = Math.round(4 + value * 56);
  const isWarm = value > 0.5;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange(val);

    // Haptic pulse on milestone
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      if (Math.abs(val - 0.5) < 0.03 || val === 0 || val === 1) {
        navigator.vibrate(12);
      }
    }
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let next = value;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        next = Math.min(1, value + 0.05);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        next = Math.max(0, value - 0.05);
      } else if (e.key === "Home") {
        next = 0;
      } else if (e.key === "End") {
        next = 1;
      }
      if (next !== value) {
        onChange(next);
        audioEngine.playGlassClink(0.08);
      }
    },
    [value, onChange]
  );

  return (
    <div className="bg-cream-pure/85 dark:bg-black/60 backdrop-blur-xl border border-saffron/30 rounded-2xl p-4 shadow-gold max-w-sm w-full mx-auto transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-widest font-bold text-saffron-deep">
          {t.chillFactor.label}
        </span>
        <span className="text-sm font-serif font-black text-bronze dark:text-cream-pure bg-saffron/15 px-2.5 py-0.5 rounded-full">
          {currentTemp}°C
        </span>
      </div>

      {/* Interactive Range Input */}
      <div className="relative py-2">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={value}
          onChange={handleSliderChange}
          onKeyDown={handleKeyDown}
          aria-label={t.chillFactor.label}
          aria-valuenow={currentTemp}
          aria-valuemin={4}
          aria-valuemax={60}
          className="w-full h-2.5 bg-gradient-to-r from-blue-400 via-saffron to-amber-600 rounded-lg appearance-none cursor-pointer accent-saffron focus:outline-none focus:ring-2 focus:ring-saffron/50"
        />
      </div>

      <div className="flex justify-between items-center text-xs font-semibold text-bronze-soft dark:text-cream-soft mt-1">
        <span className={!isWarm ? "text-blue-600 dark:text-blue-400 font-bold" : ""}>
          ❄️ {t.chillFactor.chilled}
        </span>
        <span className={isWarm ? "text-amber-600 dark:text-amber-400 font-bold" : ""}>
          ♨️ {t.chillFactor.warm}
        </span>
      </div>

      <p className="text-[11px] text-center text-bronze-soft/80 dark:text-cream-soft/70 mt-2 italic">
        {!isWarm ? t.chillFactor.chilledDesc : t.chillFactor.warmDesc}
      </p>
    </div>
  );
}
