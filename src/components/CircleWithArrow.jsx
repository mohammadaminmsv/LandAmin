import React from "react";
import { FiArrowUp } from "react-icons/fi";

const CircleWithArrow = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // اسکرول به بالای صفحه
  };

  return (
    <div
      className="fixed bottom-8 z-50 left-8 w-12 h-12 bg-fuchsia-400 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-purple-600 transition-all"
      onClick={scrollToTop} // تابع برای اسکرول به بالا
    >
      <FiArrowUp className="text-white w-6 h-6" />
    </div>
  );
};

export default CircleWithArrow;
