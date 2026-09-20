"use client";

import React from "react";
import { Language } from "@/lib/i18nDictionary";
import { audioEngine } from "@/lib/audioEngine";

interface LanguageToggleProps {
  language: Language;
  onToggle: (lang: Language) => void;
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  const isKannada = language === "kn";

  const handleSwitch = (lang: Language) => {
    audioEngine.playGlassClink(0.12);
    onToggle(lang);
  };

  return (
    <div
      className="inline-flex items-center bg-white/70 dark:bg-black/40 backdrop-blur-md p-1 rounded-full border border-saffron/30 shadow-sm"
      role="group"
      aria-label="Language Selector"
    >
      <button
        type="button"
        onClick={() => handleSwitch("en")}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          !isKannada
            ? "bg-gradient-to-r from-nandini-blue to-nandini-deepBlue text-white shadow-sm"
            : "text-bronze-soft hover:text-bronze dark:text-cream-soft"
        }`}
        aria-pressed={!isKannada}
      >
        English
      </button>

      <button
        type="button"
        onClick={() => handleSwitch("kn")}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 font-kannada ${
          isKannada
            ? "bg-gradient-to-r from-nandini-blue to-nandini-deepBlue text-white shadow-sm"
            : "text-bronze-soft hover:text-bronze dark:text-cream-soft"
        }`}
        aria-pressed={isKannada}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}
