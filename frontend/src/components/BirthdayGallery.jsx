import React, { useEffect, useState } from "react";
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import cakeIcon from "../assets/images/cake.png";

export default function BirthdayGallery() {
  const birthdayEmployees = ["Amit Sharma", "Neha Verma", "Ravi Singh"];
  const galleryImages = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const marqueeContent = [...birthdayEmployees, ...birthdayEmployees];

  return (
    <main className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between max-h-[calc(100vh-64px)] overflow-hidden flex-1">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6 select-none">
        🎉 Happy Birthday!
      </h2>

      {/* Marquee */}
      <div className="relative h-12 overflow-hidden border rounded bg-gray-50 border-gray-200 mb-8">
        <div
          className="absolute top-0 left-0 flex items-center animate-marquee whitespace-nowrap text-gray-900 text-base font-semibold"
          style={{ minWidth: "200%" }}
        >
          {marqueeContent.map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mr-12"
              style={{ whiteSpace: "nowrap" }}
            >
              {name}
              <img src={cakeIcon} alt="Cake" className="w-5 h-5" />
            </span>
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="flex-1 rounded-lg overflow-hidden">
        <img
          src={galleryImages[currentIndex]}
          alt={`Event ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded transition-all duration-700 ease-in-out"
          loading="lazy"
        />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </main>
  );
}
