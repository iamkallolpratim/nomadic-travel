/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: { 50: "#eef6f1", 100: "#d5e9dc", 200: "#a9d2b9", 300: "#76b590", 400: "#4a9669", 500: "#2f7a50", 600: "#21613e", 700: "#1b4e33", 800: "#163f2a", 900: "#0f2c1d", 950: "#081a11" },
        tea: { 50: "#f4f9ec", 100: "#e6f2d3", 200: "#cde5a9", 300: "#acd476", 400: "#8cbf4b", 500: "#6ea32f", 600: "#548223", 700: "#42641f", 800: "#37511e", 900: "#2f451d" },
        mist: { 50: "#f2f7fa", 100: "#e2edf3", 200: "#c7dbe7", 300: "#9fc1d5", 400: "#6f9fbd", 500: "#4f83a5", 600: "#3e6a8a", 700: "#345670", 800: "#2f495e", 900: "#2b3f50" },
        amber: { 50: "#fff8eb", 100: "#feeac7", 200: "#fdd38a", 300: "#fcb84d", 400: "#fb9f24", 500: "#f57c0b", 600: "#d95b06", 700: "#b43d09", 800: "#922f0e", 900: "#78280f" },
        // State accents
        assam: "#2f7a50",
        arunachal: "#c2410c",
        meghalaya: "#3e6a8a",
        nagaland: "#9f1239",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: { "fade-up": "fade-up 0.6s ease-out both" },
    },
  },
  plugins: [],
};

export default config;
