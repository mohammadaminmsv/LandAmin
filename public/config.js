
const isDev = import.meta.env.MODE === "development";

const config = {
  apiBaseURL: isDev
    ? "/api/V1" 
    : "https://landamin.com/api/V1", 
  chatConfig: {
    defaultMessage: "سلام! چطور می‌تونم کمک کنم؟",
    loadingMessage: "در حال پردازش پیام شما...",
    errorMessage: "خطا در ارتباط با سرور"
  }
};


export default config;
