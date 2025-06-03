// BirthdayGallery.jsx
import React, { useEffect, useState } from "react";
import cakeIcon from "../assets/images/cake.png";

export default function BirthdayGallery() {
  const [birthdayEmployees, setBirthdayEmployees] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/birthdays")
      .then((res) => res.json())
      .then((data) => setBirthdayEmployees(data))
      .catch((err) => console.error("Failed to fetch birthdays", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        const urls = data.map(
          (event) => `http://localhost:5000${event.photo_url}`
        );
        setGalleryImages(urls);
      })
      .catch((err) => console.error("Failed to fetch event images", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        galleryImages.length ? (prev + 1) % galleryImages.length : 0
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages]);

  const marqueeContent = [...birthdayEmployees, ...birthdayEmployees];

  return (
    <main
      className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between max-h-[calc(100vh-64px)] overflow-y-auto flex-1"
      aria-label="Birthday Gallery Section"
    >
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6 select-none">
        🎉 Dear Employees RPL family wishes you a very Happy Birthday!
      </h2>

      {/* Marquee */}
      <div
        className="relative h-12 overflow-hidden border rounded bg-gray-50 border-gray-200 mb-8"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className="absolute top-0 left-0 flex items-center animate-marquee whitespace-nowrap text-gray-900 text-base font-semibold"
          style={{ minWidth: "200%" }}
        >
          {marqueeContent.map((emp, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mr-12"
              style={{ whiteSpace: "nowrap" }}
            >
              <strong>{emp.name}</strong> <em>({emp.department})</em>
              <img src={cakeIcon} alt="Birthday cake" className="w-5 h-5" />
            </span>
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="flex-1 rounded-lg overflow-hidden">
        {galleryImages.length > 0 ? (
          <img
            src={galleryImages[currentIndex]}
            alt={`Event ${currentIndex + 1}`}
            className="w-full h-full object-cover rounded transition-all duration-700 ease-in-out"
            loading="lazy"
          />
        ) : (
          <div className="flex justify-center items-center h-full text-gray-400">
            No event images found.
          </div>
        )}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 7s linear infinite;
        }
      `}</style>
    </main>
  );
}
