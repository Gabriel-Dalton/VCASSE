import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(210 16% 88%)",
        input: "hsl(210 16% 88%)",
        ring: "hsl(155 58% 31%)",
        background: "hsl(0 0% 99%)",
        foreground: "hsl(222 22% 12%)",
        primary: {
          DEFAULT: "hsl(157 64% 29%)",
          foreground: "hsl(0 0% 100%)"
        },
        secondary: {
          DEFAULT: "hsl(210 25% 96%)",
          foreground: "hsl(221 39% 18%)"
        },
        muted: {
          DEFAULT: "hsl(210 25% 96%)",
          foreground: "hsl(215 16% 40%)"
        },
        accent: {
          DEFAULT: "hsl(201 79% 45%)",
          foreground: "hsl(0 0% 100%)"
        }
      },
      borderRadius: {
        lg: "0.8rem",
        md: "calc(0.8rem - 2px)",
        sm: "calc(0.8rem - 4px)"
      }
    }
  },
  plugins: []
};

export default config;
