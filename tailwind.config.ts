// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        DEFAULT: "var(--background)",
      },
      textColor: {
        DEFAULT: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  darkMode: "media",
  plugins: [],
} satisfies Config;
