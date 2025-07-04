const getBaseURL = () => {
    return "http://localhost:5000/api/V1"; 
};

const config = {
  apiBaseURL: getBaseURL(),
  chatConfig: {
    defaultMessage: "سلام! چطور می‌تونم کمک کنم؟",
    loadingMessage: "در حال پردازش پیام شما...",
    errorMessage: "خطا در ارتباط با سرور"
  }
};

export default config;
