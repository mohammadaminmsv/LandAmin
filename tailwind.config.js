
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // طلایی‌ها
        gold: "#D4AF37",
        goldLight: "#E8C766",
        goldDark: "#B58E23",

        orange: "#ee8800",

        // خاکستری‌ها
        grayLight: "#F5F5F5",
        gray: "#B0B0B0",
        grayDark: "#4B4B4B",

        // مشکی و سفید
        black: "#000000",
        offBlack: "#1A1A1A",
        white: "#FFFFFF",
        offWhite: "#FFFFFF",

        // قرمزها
        red: "#E63946",
        redDark: "#B00020",

        // سبزها
        green: "#2ECC71",
        greenDark: "#27AE60",

        // آبی‌ها
        blue: "#3498DB",
        blueDark: "#2C80B4",
        cyan: "#00BCD4",
      },
    },
    fontFamily: {
      vazir: ["Vazir", "sans-serif"],
    },
  },
  plugins: [],
  fontFamily: {
    roboto: ["Vazirmatn", "sans-serif"],
  },
};
