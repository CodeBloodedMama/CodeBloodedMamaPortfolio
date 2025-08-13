import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx,md}"],
  theme: {
    extend: {
      fontFamily: { sans: ['ui-sans-serif','system-ui'] },
      colors: { navy: { 900: "#0b1220", 800: "#0f1a2b", 700: "#13223a" } },
      backgroundImage: { 'hero-gradient': "linear-gradient(120deg, #0f1a2b 0%, #0b1220 60%, #000 100%)" }
    }
  },
  darkMode: 'class',
  plugins: []
} satisfies Config;
