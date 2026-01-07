/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ REQUIRED
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: "hsl(var(--accent))",
        highlight: "hsl(var(--highlight))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
      },
      boxShadow: {
        card: '0 6px 18px rgba(16,24,40,0.06)',
        soft: '0 3px 10px rgba(16,24,40,0.04)'
      },
      borderRadius: {
        lg: '0.75rem',
      },
    },
  },
  plugins: [],
}
