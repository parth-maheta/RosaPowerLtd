import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="p-3 rounded-full bg-[#0072CE] text-white shadow-lg hover:bg-[#005fa3] focus:outline-none focus:ring-2 focus:ring-[#0072CE] focus:ring-offset-2"
        aria-label="Scroll to top"
      >
        <FaArrowUp size={18} />
      </button>
    </div>
  );
};

export default ScrollToTop;
