/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ef: {
          // Light theme — matches Resource Hub
          bg: "#FAFAFC",
          surface: "#FFFFFF",
          surface2: "#F4F2F9",
          border: "#E5E2EE",
          borderSoft: "#EFEDF5",
          text: "#1A1325",
          mute: "#6B6379",
          purple: "#6F2DBD",
          purpleSoft: "#8B4DD6",
          purpleBg: "#F2EBFB",
          purpleLine: "#D8C4F2",
          // status accents
          success: "#10996B",
          warn: "#D97706",
          danger: "#DC2626",
          info: "#2563EB",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(26,19,37,0.04), 0 4px 12px rgba(111,45,189,0.06)",
        lift: "0 8px 28px rgba(111,45,189,0.12)",
      },
    },
  },
  plugins: [],
}
