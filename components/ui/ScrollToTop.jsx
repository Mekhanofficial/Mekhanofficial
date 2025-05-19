// components/ScrollToTopButton.tsx
"use client";

import { FaArrowUp } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function ScrollToTopButton() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 rounded-full p-4 transition-all duration-300 ${
        isDark
          ? "bg-white/20 hover:bg-white/30"
          : "bg-black/10 hover:bg-black/20"
      }`}
      aria-label="Scroll to top"
    >
      <FaArrowUp className={isDark ? "text-white" : "text-gray-800"} />
    </button>
  );
}
