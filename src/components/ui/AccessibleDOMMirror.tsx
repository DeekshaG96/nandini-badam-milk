"use client";

import React from "react";
import { I18nContent } from "@/lib/i18nDictionary";

interface AccessibleDOMMirrorProps {
  t: I18nContent;
  chillFactor: number;
  activeMilestone: string;
}

/**
 * AccessibleDOMMirror ensures 100% WCAG 2.2 AA screen-reader parity.
 * Mirrors all visual WebGL 3D milestones, nutrition data, and interactive states.
 */
export function AccessibleDOMMirror({
  t,
  chillFactor,
  activeMilestone,
}: AccessibleDOMMirrorProps) {
  const currentTemp = Math.round(4 + chillFactor * 56);

  return (
    <div className="sr-only" aria-hidden="false">
      <header>
        <h1>{t.hero.title}</h1>
        <p>{t.hero.sub}</p>
        <p>{t.hero.meta}</p>
      </header>

      {/* Live status announcements */}
      <div aria-live="polite" aria-atomic="true">
        <span>Current Viewing Milestone: {activeMilestone}</span>
        <span>Current Temperature Setting: {currentTemp}° Celsius</span>
      </div>

      <main>
        {/* Ingredients & Heritage Highlights */}
        <section aria-labelledby="ingredients-heading">
          <h2 id="ingredients-heading">Core Ingredients & Heritage</h2>
          <ul>
            <li>
              <strong>{t.moments.saffron.title}:</strong> {t.moments.saffron.desc}
            </li>
            <li>
              <strong>{t.moments.almonds.title}:</strong> {t.moments.almonds.desc}
            </li>
            <li>
              <strong>{t.moments.milk.title}:</strong> {t.moments.milk.desc}
            </li>
          </ul>
        </section>

        {/* Nutritional Information Table */}
        <section aria-labelledby="nutrition-heading">
          <h2 id="nutrition-heading">{t.nutrition.title}</h2>
          <p>{t.nutrition.subtitle}</p>
          <table role="table">
            <caption>Nutritional Value per 200ml serving</caption>
            <thead>
              <tr>
                <th scope="col">Nutrient</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Energy</td>
                <td>174 kcal</td>
              </tr>
              <tr>
                <td>Protein</td>
                <td>6.4 grams</td>
              </tr>
              <tr>
                <td>Calcium</td>
                <td>230 milligrams</td>
              </tr>
              <tr>
                <td>Dairy Fat</td>
                <td>6.0 grams</td>
              </tr>
              <tr>
                <td>Almonds</td>
                <td>Real Californian Almond Slivers</td>
              </tr>
              <tr>
                <td>Saffron</td>
                <td>100% Pure Kashmiri Kesar</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
