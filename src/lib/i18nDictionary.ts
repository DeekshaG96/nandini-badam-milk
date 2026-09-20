export type Language = "en" | "kn";

export interface I18nContent {
  brand: {
    name: string;
    sub: string;
    heritageBadge: string;
  };
  nav: {
    sound: string;
    theme: string;
    nutrition: string;
    orderNow: string;
  };
  hero: {
    tag: string;
    title: string;
    sub: string;
    meta: string;
    scrollHint: string;
  };
  moments: {
    saffron: {
      badge: string;
      title: string;
      desc: string;
    };
    almonds: {
      badge: string;
      title: string;
      desc: string;
    };
    milk: {
      badge: string;
      title: string;
      desc: string;
    };
  };
  chillFactor: {
    label: string;
    chilled: string;
    warm: string;
    chilledDesc: string;
    warmDesc: string;
  };
  senses: {
    title: string;
    goldenHour: string;
    morning: string;
  };
  uncap: {
    prompt: string;
    done: string;
  };
  nutrition: {
    title: string;
    subtitle: string;
    energy: string;
    protein: string;
    calcium: string;
    fat: string;
    badam: string;
    saffron: string;
  };
  fuelCalc: {
    title: string;
    desc: string;
    activityLevels: {
      light: string;
      moderate: string;
      intense: string;
    };
    recommended: string;
    bottles: string;
  };
  cart: {
    title: string;
    single: string;
    pack6: string;
    pack12: string;
    crate24: string;
    pincodePlaceholder: string;
    checkPincode: string;
    sameDayDelivery: string;
    standardDelivery: string;
    checkout: string;
    total: string;
  };
}

export const dictionary: Record<Language, I18nContent> = {
  en: {
    brand: {
      name: "NANDINI",
      sub: "Badam Flavoured Milk",
      heritageBadge: "KMF Karnataka Dairy Heritage",
    },
    nav: {
      sound: "Spatial Audio",
      theme: "Theme",
      nutrition: "Nutrition",
      orderNow: "Order Now",
    },
    hero: {
      tag: "THE PRIDE OF KARNATAKA · KMF NANDINI",
      title: "Nandini Badam Milk",
      sub: "Royal Kashmiri Kesar · Crunchy Almonds · 100% Pure Milk",
      meta: "A Quality Cooperative Dairy Product from Karnataka Milk Federation",
      scrollHint: "Scroll to Deconstruct in 3D",
    },
    moments: {
      saffron: {
        badge: "Royal Infusion",
        title: "Kashmiri Kesar",
        desc: "Sun-dried royal saffron threads for authentic aroma and golden luminescence.",
      },
      almonds: {
        badge: "Wholesome Crunch",
        title: "Real Almond Flakes",
        desc: "Roasted Californian badam slivers offering crunch in every rich sip.",
      },
      milk: {
        badge: "Pure Source",
        title: "100% Pure Cow Milk",
        desc: "Pasteurized homogenized toned milk sourced fresh from Karnataka farmer cooperatives.",
      },
    },
    chillFactor: {
      label: "Chill Factor Temperature",
      chilled: "4°C Chilled",
      warm: "60°C Steaming",
      chilledDesc: "Frost beads & crisp golden refractions.",
      warmDesc: "Rising saffron steam & soothing ambient warmth.",
    },
    senses: {
      title: "Senses Mode",
      goldenHour: "Golden Hour Glow",
      morning: "Fresh Dawn Milk",
    },
    uncap: {
      prompt: "Drag or scroll to uncap the bottle",
      done: "Bottle Uncapped! Fresh badam aroma released.",
    },
    nutrition: {
      title: "Nutritional Power (Per 200ml)",
      subtitle: "High in bioavailable calcium, dietary milk protein, and natural antioxidant Vitamin E.",
      energy: "174 kcal",
      protein: "6.4 g Protein",
      calcium: "230 mg Calcium",
      fat: "6.0 g Dairy Fat",
      badam: "Real Badam Pieces",
      saffron: "Natural Kashmiri Kesar",
    },
    fuelCalc: {
      title: "Daily Fuel & Recovery Calculator",
      desc: "Calculate your daily bone-density and muscle protein replenishment with Nandini Badam Milk.",
      activityLevels: {
        light: "Light / Desk Work",
        moderate: "Gym / Running (45m)",
        intense: "Athlete / Heavy Training",
      },
      recommended: "Daily Optimal Intake:",
      bottles: "Bottles (200ml)",
    },
    cart: {
      title: "Nandini Express Cold-Chain Cart",
      single: "Single 200ml Bottle (₹35)",
      pack6: "Classic 6-Pack Box (₹210)",
      pack12: "Family 12-Pack Box (₹400)",
      crate24: "Royal 24-Bottle Crate (₹780)",
      pincodePlaceholder: "Enter 6-digit Pincode (e.g. 560001)",
      checkPincode: "Check Delivery",
      sameDayDelivery: "⚡ Same-Day Cold-Chain Delivery in Bengaluru via Nandini Express",
      standardDelivery: "🚚 24-Hour Insulated Delivery across Karnataka",
      checkout: "Proceed to Checkout",
      total: "Total Amount:",
    },
  },
  kn: {
    brand: {
      name: "ನಂದಿನಿ",
      sub: "ರುಚಿಯಾದ ಬಾದಾಮ್ ಹಾಲು",
      heritageBadge: "ಕರ್ನಾಟಕ ಹಾಲು ಮಹಾಮಂಡಳಿ (KMF)",
    },
    nav: {
      sound: "ಧ್ವನಿ",
      theme: "ಬಣ್ಣ",
      nutrition: "ಪೌಷ್ಟಿಕಾಂಶ",
      orderNow: "ಈಗಲೇ ಖರೀದಿಸಿ",
    },
    hero: {
      tag: "ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆ · KMF ನಂದಿನಿ",
      title: "ನಂದಿನಿ ಬಾದಾಮ್ ಹಾಲು",
      sub: "ಕಾಶ್ಮೀರಿ ಕೇಸರಿ · ಗರಿಗರಿ ಬಾದಾಮಿ ತುಣುಕು · ೧೦೦% ಶುದ್ಧ ಹಾಲು",
      meta: "ಕರ್ನಾಟಕ ಹಾಲು ಮಹಾಮಂಡಳಿಯ ಉತ್ಕೃಷ್ಟ ಗುಣಮಟ್ಟದ ಉತ್ಪನ್ನ",
      scrollHint: "3D ಯಲ್ಲಿ ವೀಕ್ಷಿಸಲು ಸ್ಕ್ರೋಲ್ ಮಾಡಿ",
    },
    moments: {
      saffron: {
        badge: "ಅಮೂಲ್ಯ ಕೇಸರಿ",
        title: "ಕಾಶ್ಮೀರಿ ಕೇಸರಿ",
        desc: "ನೈಸರ್ಗಿಕ ಸುವಾಸನೆ ಮತ್ತು ರಾಜ ಮರ್ಯಾದೆಯ ಹೊಂಬಣ್ಣ ನೀಡುವ ಶುದ್ಧ ಕೇಸರಿ ದಳಗಳು.",
      },
      almonds: {
        badge: "ಗರಿಗರಿ ರುಚಿ",
        title: "ನೈಜ ಬಾದಾಮಿ",
        desc: "ಪ್ರತಿ ಗುಟುಕಿನಲ್ಲೂ ನೈಜ ಬಾದಾಮಿಯ ಗರಿಗರಿ ಆನಂದ ಮತ್ತು ಶಕ್ತಿ.",
      },
      milk: {
        badge: "ರೈತರ ನಂಬಿಕೆ",
        title: "೧೦೦% ಶುದ್ಧ ಹಸುವಿನ ಹಾಲು",
        desc: "ಕರ್ನಾಟಕದ ಲಕ್ಷಾಂತರ ಹಾಲು ಉತ್ಪಾದಕ ರೈತರಿಂದ ನೇರವಾಗಿ ಸಂಗ್ರಹಿಸಿದ ತಾಜಾ ಹಾಲು.",
      },
    },
    chillFactor: {
      label: "ಉಷ್ಣಾಂಶ ನಿಯಂತ್ರಣ",
      chilled: "೪°C ತಂಪಾದ",
      warm: "೬೦°C ಬಿಸಿ ಬಿಸಿ",
      chilledDesc: "ಮಂಜಿನ ಹನಿಗಳೊಂದಿಗೆ ತಂಪಾದ ಪಾನೀಯ.",
      warmDesc: "ಘಮಘಮಿಸುವ ಕೇಸರಿ ಹಬೆಯೊಂದಿಗೆ ಬಿಸಿ ಹಾಲು.",
    },
    senses: {
      title: "ಸಂಜೆ / ಮುಂಜಾನೆ ನೋಟ",
      goldenHour: "ಹೊಂಬಣ್ಣದ ಸಂಜೆ",
      morning: "ಮುಂಜಾನೆಯ ಹೊಳಪು",
    },
    uncap: {
      prompt: "ಬಾಟಲಿಯ ಮುಚ್ಚಳವನ್ನು ತೆರೆಯಲು ಎಳೆಯಿರಿ",
      done: "ಮುಚ್ಚಳ ತೆರೆಯಲಾಗಿದೆ! ತಾಜಾ ಬಾದಾಮ್ ಸುವಾಸನೆ ಹೊರಹೊಮ್ಮಿದೆ.",
    },
    nutrition: {
      title: "ಪೌಷ್ಟಿಕಾಂಶದ ವಿವರ (ಪ್ರತಿ ೨೦೦ಮಿ.ಲೀ)",
      subtitle: "ಕ್ಯಾಲ್ಸಿಯಂ, ಶುದ್ಧ ಪ್ರೋಟೀನ್ ಮತ್ತು ವಿಟಮಿನ್ ಇ ಸಮೃದ್ಧ ಆರೋಗ್ಯಕರ ಪಾನೀಯ.",
      energy: "೧೭೪ ಕಿಲೋ ಕ್ಯಾಲೋರಿ",
      protein: "೬.೪ ಗ್ರಾಂ ಪ್ರೋಟೀನ್",
      calcium: "೨೩೦ ಮಿ.ಗ್ರಾಂ ಕ್ಯಾಲ್ಸಿಯಂ",
      fat: "೬.೦ ಗ್ರಾಂ ಕೊಬ್ಬಿನಾಂಶ",
      badam: "ನೈಜ ಬಾದಾಮಿ ತುಣುಕುಗಳು",
      saffron: "ನೈಸರ್ಗಿಕ ಕೇಸರಿ",
    },
    fuelCalc: {
      title: "ದೈನಂದಿನ ಶಕ್ತಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
      desc: "ನಿಮ್ಮ ದಿನನಿತ್ಯದ ಕಸರತ್ತಿಗೆ ತಕ್ಕಂತೆ ನಂದಿನಿ ಬಾದಾಮ್ ಹಾಲಿನ ಅಗತ್ಯತೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ.",
      activityLevels: {
        light: "ಸಾಮಾನ್ಯ ನಡಿಗೆ / ಕಚೇರಿ ಕೆಲಸ",
        moderate: "ವ್ಯಾಯಾಮ / ಜಾಗಿಂಗ್ (೪೫ ನಿಮಿಷ)",
        intense: "ಕಠಿಣ ಕ್ರೀಡಾ ತರಬೇತಿ",
      },
      recommended: "ದಿನಕ್ಕೆ ಸೂಕ್ತ ಪ್ರಮಾಣ:",
      bottles: "ಬಾಟಲಿಗಳು (೨೦೦ ಮಿ.ಲೀ)",
    },
    cart: {
      title: "ನಂದಿನಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ವಿತರಣೆ",
      single: "೧ ಬಾಟಲಿ ೨೦೦ಮಿ.ಲೀ (₹೩೫)",
      pack6: "೬ ಬಾಟಲಿಗಳ ಪ್ಯಾಕ್ (₹೨೧೦)",
      pack12: "೧೨ ಬಾಟಲಿಗಳ ಫ್ಯಾಮಿಲಿ ಪ್ಯಾಕ್ (₹೪೦೦)",
      crate24: "೨೪ ಬಾಟಲಿಗಳ ರಾಯಲ್ ಕ್ರೇಟ್ (₹೭೮೦)",
      pincodePlaceholder: "೬ ಅಂಕಿಯ ಪಿನ್‌ಕೋಡ್ ನಮೂದಿಸಿ (ಉದಾ: 560001)",
      checkPincode: "ಪರಿಶೀಲಿಸಿ",
      sameDayDelivery: "⚡ ಬೆಂಗಳೂರಿನಲ್ಲಿ ಅಂದೇ ತಲುಪಿಸಲಾಗುವುದು (ನಂದಿನಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್)",
      standardDelivery: "🚚 ಕರ್ನಾಟಕದಾದ್ಯಂತ ೨೪ ಗಂಟೆಗಳಲ್ಲಿ ಡೆಲಿವರಿ",
      checkout: "ಮುಂದೆ ಸಾಗಿ",
      total: "ಒಟ್ಟು ಮೊತ್ತ:",
    },
  },
};
