/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        saffron: {
          light: "#FDE68A",
          DEFAULT: "#F59E0B",
          deep: "#D97706",
          dark: "#B45309",
        },
        nandini: {
          blue: "#0B4EA2",
          deepBlue: "#072F63",
          lightBlue: "#3B82F6",
        },
        cream: {
          pure: "#FFFDF5",
          soft: "#FFF3D6",
          parchment: "#FEF9EB",
        },
        bronze: {
          DEFAULT: "#3C1E05",
          soft: "#7A4610",
          night: "#190F05",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        kannada: ["var(--font-noto-kannada)", "sans-serif"],
      },
      boxShadow: {
        gold: "0 8px 30px rgba(245, 158, 11, 0.25)",
        royal: "0 10px 35px rgba(11, 78, 162, 0.35)",
      },
    },
  },
  plugins: [],
};
