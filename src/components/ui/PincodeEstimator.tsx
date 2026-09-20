"use client";

import React, { useState } from "react";
import { I18nContent } from "@/lib/i18nDictionary";
import { audioEngine } from "@/lib/audioEngine";
import { Truck, CheckCircle2, AlertCircle } from "lucide-react";

interface PincodeEstimatorProps {
  t: I18nContent;
}

export function PincodeEstimator({ t }: PincodeEstimatorProps) {
  const [pincode, setPincode] = useState("");
  const [estimate, setEstimate] = useState<string | null>(null);
  const [isBangalore, setIsBangalore] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setEstimate("Please enter a valid 6-digit PIN code.");
      return;
    }

    audioEngine.playGlassClink(0.12);

    if (pincode.startsWith("560")) {
      setIsBangalore(true);
      setEstimate(t.cart.sameDayDelivery);
    } else if (pincode.startsWith("57") || pincode.startsWith("58") || pincode.startsWith("59")) {
      setIsBangalore(false);
      setEstimate(t.cart.standardDelivery);
    } else {
      setIsBangalore(false);
      setEstimate("📦 48-Hour Insulated Air Express Delivery across India");
    }
  };

  return (
    <div className="bg-saffron/10 border border-saffron/25 rounded-2xl p-4 my-3">
      <div className="flex items-center gap-2 text-xs font-bold text-saffron-deep uppercase tracking-wider mb-2">
        <Truck className="w-4 h-4" />
        <span>Karnataka Cold-Chain Delivery Estimator</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder={t.cart.pincodePlaceholder}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
          className="flex-1 px-3 py-2 text-xs rounded-xl border border-saffron/30 bg-white/80 dark:bg-zinc-900 text-bronze dark:text-cream-pure focus:outline-none focus:ring-2 focus:ring-saffron"
        />
        <button
          type="submit"
          className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-nandini-blue to-nandini-deepBlue text-white hover:scale-102 transition-all shadow-sm"
        >
          {t.cart.checkPincode}
        </button>
      </form>

      {estimate && (
        <div
          className={`flex items-start gap-2 mt-2.5 text-xs font-semibold p-2.5 rounded-xl ${
            isBangalore
              ? "bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300 border border-green-300"
              : "bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200"
          }`}
        >
          {isBangalore ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
          )}
          <span>{estimate}</span>
        </div>
      )}
    </div>
  );
}
