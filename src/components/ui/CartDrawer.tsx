"use client";

import React, { useState } from "react";
import { I18nContent } from "@/lib/i18nDictionary";
import { PincodeEstimator } from "./PincodeEstimator";
import { audioEngine } from "@/lib/audioEngine";
import { ShoppingBag, X, Check, ShieldCheck } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  t: I18nContent;
}

interface ProductTier {
  id: string;
  label: string;
  price: number;
  qty: number;
  badge?: string;
}

export function CartDrawer({ isOpen, onClose, t }: CartDrawerProps) {
  const tiers: ProductTier[] = [
    { id: "single", label: t.cart.single, price: 35, qty: 1 },
    { id: "pack6", label: t.cart.pack6, price: 210, qty: 6, badge: "Popular" },
    { id: "pack12", label: t.cart.pack12, price: 400, qty: 12, badge: "Save ₹20" },
    { id: "crate24", label: t.cart.crate24, price: 780, qty: 24, badge: "Free Cold Delivery" },
  ];

  const [selectedTier, setSelectedTier] = useState<string>("pack6");
  const [isOrdered, setIsOrdered] = useState(false);

  const activeProduct = tiers.find((p) => p.id === selectedTier) || tiers[1];

  const handleSelect = (id: string) => {
    setSelectedTier(id);
    audioEngine.playGlassClink(0.1);
  };

  const handleCheckout = () => {
    audioEngine.playMilkPour(0.2);
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClose();
    }, 2800);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-heading"
    >
      <div className="w-full max-w-md bg-cream-pure dark:bg-zinc-950 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-saffron/30">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-saffron/20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-saffron-deep" />
              <h2 id="cart-heading" className="font-serif font-bold text-lg text-bronze dark:text-cream-pure">
                {t.cart.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-bronze-soft hover:bg-saffron/10 transition-all"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Package Selection */}
          <div className="mt-5 space-y-2.5">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => handleSelect(tier.id)}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  selectedTier === tier.id
                    ? "border-saffron bg-saffron/15 shadow-sm scale-101"
                    : "border-saffron/25 bg-white/60 dark:bg-zinc-900/60 hover:border-saffron/50"
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-bronze dark:text-cream-pure flex items-center gap-2">
                    <span>{tier.label}</span>
                    {tier.badge && (
                      <span className="text-[10px] bg-saffron text-bronze font-extrabold px-2 py-0.5 rounded-full">
                        {tier.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-bronze-soft dark:text-cream-soft mt-0.5">
                    {tier.qty} x 200ml Glass Bottles
                  </div>
                </div>
                <div className="text-sm font-serif font-black text-nandini-blue dark:text-blue-400">
                  ₹{tier.price}
                </div>
              </button>
            ))}
          </div>

          {/* Delivery Pincode Lookup */}
          <PincodeEstimator t={t} />

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 text-[11px] font-semibold text-bronze-soft dark:text-cream-soft mt-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> 100% KMF Dairy Purity
            </span>
            <span>❄️ Insulated Cold-Chain</span>
          </div>
        </div>

        {/* Footer Checkout */}
        <div className="pt-4 border-t border-saffron/20 mt-6">
          <div className="flex items-center justify-between text-sm font-bold text-bronze dark:text-cream-pure mb-3">
            <span>{t.cart.total}</span>
            <span className="text-xl font-serif font-black text-saffron-deep">
              ₹{activeProduct.price}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={isOrdered}
            className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-royal ${
              isOrdered
                ? "bg-green-600 text-white"
                : "bg-gradient-to-r from-nandini-blue via-blue-600 to-nandini-deepBlue text-white hover:scale-102 active:scale-98 border border-gold"
            }`}
          >
            {isOrdered ? (
              <>
                <Check className="w-4 h-4" /> Order Confirmed! Dispatched via Nandini Express
              </>
            ) : (
              t.cart.checkout
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
