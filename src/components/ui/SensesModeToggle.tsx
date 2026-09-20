"use client";

import React, { useState } from "react";
import { audioEngine } from "@/lib/audioEngine";
import { Volume2, VolumeX, Sun, Moon, Sparkles } from "lucide-react";

interface SensesModeToggleProps {
  sensesMode: "morning" | "golden-hour";
  onSensesToggle: (mode: "morning" | "golden-hour") => void;
}

export function SensesModeToggle({ sensesMode, onSensesToggle }: SensesModeToggleProps) {
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleAudio = () => {
    const next = !isAudioOn;
    setIsAudioOn(next);
    audioEngine.setEnabled(next);
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    audioEngine.playGlassClink(0.1);
  };

  const toggleSenses = () => {
    const next = sensesMode === "morning" ? "golden-hour" : "morning";
    onSensesToggle(next);
    document.documentElement.setAttribute("data-senses", next);
    audioEngine.playMilkPour(0.12);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Senses Mode Button */}
      <button
        type="button"
        onClick={toggleSenses}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/70 dark:bg-black/40 border border-saffron/30 hover:border-saffron shadow-sm transition-all"
        title="Toggle Ambient Senses Mode (Morning / Golden Hour)"
      >
        <Sparkles className="w-3.5 h-3.5 text-saffron" />
        <span className="hidden sm:inline">
          {sensesMode === "morning" ? "Morning Glow" : "Golden Hour"}
        </span>
      </button>

      {/* Theme Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        className="p-1.5 rounded-full bg-white/70 dark:bg-black/40 border border-saffron/30 hover:border-saffron shadow-sm transition-all"
        aria-label="Toggle Dark Theme"
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-amber-300" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </button>

      {/* Spatial Audio Toggle */}
      <button
        type="button"
        onClick={toggleAudio}
        className={`p-1.5 rounded-full border shadow-sm transition-all ${
          isAudioOn
            ? "bg-nandini-blue text-white border-gold shadow-royal"
            : "bg-white/70 dark:bg-black/40 text-bronze-soft border-saffron/30"
        }`}
        aria-label="Toggle Spatial Audio"
      >
        {isAudioOn ? (
          <Volume2 className="w-4 h-4 text-yellow-300 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
