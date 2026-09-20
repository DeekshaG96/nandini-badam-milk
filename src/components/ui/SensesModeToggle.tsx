"use client";

import React, { useState } from "react";
import { audioEngine } from "@/lib/audioEngine";
import { Volume2, VolumeX, Sun, Moon, Sparkles } from "lucide-react";

interface SensesModeToggleProps {
  sensesMode: "morning" | "golden-hour";
  onSensesToggle: (mode: "morning" | "golden-hour") => void;
  isDark?: boolean;
  onToggleDark?: (dark: boolean) => void;
}

export function SensesModeToggle({
  sensesMode,
  onSensesToggle,
  isDark: controlledDark,
  onToggleDark,
}: SensesModeToggleProps) {
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [localDark, setLocalDark] = useState(false);

  const isDark = controlledDark !== undefined ? controlledDark : localDark;

  const toggleAudio = () => {
    const next = !isAudioOn;
    setIsAudioOn(next);
    audioEngine.setEnabled(next);
  };

  const toggleTheme = () => {
    const next = !isDark;
    if (onToggleDark) {
      onToggleDark(next);
    } else {
      setLocalDark(next);
    }

    if (typeof document !== "undefined") {
      if (next) {
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.setAttribute("data-theme", "light");
      }
    }
    audioEngine.playGlassClink(0.1);
  };

  const toggleSenses = () => {
    const next = sensesMode === "morning" ? "golden-hour" : "morning";
    onSensesToggle(next);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-senses", next);
    }
    audioEngine.playMilkPour(0.12);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Senses Mode Button */}
      <button
        type="button"
        onClick={toggleSenses}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/70 dark:bg-zinc-900/80 border border-saffron/30 hover:border-saffron shadow-sm transition-all text-bronze dark:text-cream-pure"
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
        className="p-1.5 rounded-full bg-white/70 dark:bg-zinc-900/80 border border-saffron/30 hover:border-saffron shadow-sm transition-all cursor-pointer"
        aria-label="Toggle Dark Theme"
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
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
        className={`p-1.5 rounded-full border shadow-sm transition-all cursor-pointer ${
          isAudioOn
            ? "bg-nandini-blue text-white border-gold shadow-royal"
            : "bg-white/70 dark:bg-zinc-900/80 text-bronze-soft dark:text-cream-soft border-saffron/30"
        }`}
        aria-label="Toggle Spatial Audio"
        title={isAudioOn ? "Mute Sound" : "Enable Sound"}
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
