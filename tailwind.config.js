/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        marquee: "marquee 50s linear infinite",
        marquee2: "marquee2 50s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      fontFamily: {
        display: "W95",
      },
      colors: {
        darkMode: "class",
        light: {
          desktop: "#018080",
          gray: "#C0C1C1",
          titlebar: "#818180",
          primary: "#FDFAF4",
          secondary: "#181614",
          secondary2: "#141415",
          "secondary2-translucent": "#141415E0",
          tertiary: "#FE520B",
          text: "#FDFAF4",
          accent: "#4444a0",
          blue: "#00007E",
        },
        dark: {
          primary: "#181614",
          secondary: "#FDFAF4",
          tertiary: "#FE520B",
          text: "#FDFAF4",
        },
      },
    },
  },
  plugins: [],
};
