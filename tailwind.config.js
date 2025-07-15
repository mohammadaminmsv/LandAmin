
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        goldLight: "#E8C766",
        goldDark: "#B58E23",
        lightBlue:"#47CFEA",
        darkBlue:"#434C6B",
        beach:"#D4BBA6",
        teal : "#4E97A7",
        orange: "#FA880D",
        orangeDark: "#cc6e00",
        grayLight: "#F5F5F5",
        gray: "#B0B0B0",
        grayDark: "#4B4B4B",
        black: "#000000",
        offBlack: "#1A1A1A",
        white: "#FFFFFF",
        offWhite: "#FFFFFF",
        red: "#E63946",
        redDark: "#B00020",
        green: "#2ECC71",
        greenDark: "#27AE60",
        blue: "#3498DB",
        blueDark: "#2C80B4",
        cyan: "#00BCD4",

      },
      fontFamily: {
        vazir: ["Vazir", "sans-serif"],
        roboto: ["Vazirmatn", "sans-serif"],
      },
    },
  },
  plugins: [],
};
