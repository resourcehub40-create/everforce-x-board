/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ef: {
          purple: "#6F4FF2",
          purpleSoft: "#8B73F5",
          dark: "#14142B",
          panel: "#1E1E38",
          panel2: "#262644",
          border: "#2F2F4A",
          text: "#EDEDF7",
          mute: "#9494B8",
        },
      },
    },
  },
  plugins: [],
}

