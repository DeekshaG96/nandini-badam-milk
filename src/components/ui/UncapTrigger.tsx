"use client";

import React from "react";
import { audioEngine } from "@/lib/audioEngine";
import { I18nContent } from "@/lib/i18nDictionary";

interface UncapTriggerProps {
  isUncapped: boolean;
  onUncap: () => void;
  t: I18nContent;
}

export function UncapTrigger({ isUncapped, onUncap, t }: UncapTriggerProps) {
  const handleClick = () => {
    if (!isUncapped) {
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([40, 60, 100]);
      }
      audioEngine.playUncapPop();
      onUncap();
    }
  };

  return (
    <div className="text-center my-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={isUncapped}
        className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 shadow-md ${
          isUncapped
            ? "bg-green-600/90 text-white cursor-default"
            : "bg-gradient-to-r from-nandini-blue to-nandini-deepBlue text-white hover:scale-105 border border-gold active:scale-95 animate-bounce"
        }`}
      >
        {isUncapped ? `✨ ${t.uncap.done}` : `🍾 ${t.uncap.prompt}`}
      </button>
    </div>
  );
}
