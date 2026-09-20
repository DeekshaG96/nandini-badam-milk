"use client";

export interface ScrollMilestones {
  hero: number;      // 0.0 - 0.25: Hero presentation
  split: number;     // 0.25 - 0.55: Bottle moves right, front shell deconstructs
  saffron: number;   // 0.55 - 0.70: Kashmiri Kesar threads surge forward
  almonds: number;   // 0.70 - 0.85: Almond slices tumble and collide
  pureMilk: number;  // 0.85 - 0.95: Concentric milk fluid waves expand
  finale: number;    // 0.95 - 1.00: Sealed bottle converges with condensation beads
}

export const MILESTONES: ScrollMilestones = {
  hero: 0.15,
  split: 0.45,
  saffron: 0.65,
  almonds: 0.8,
  pureMilk: 0.9,
  finale: 1.0,
};
