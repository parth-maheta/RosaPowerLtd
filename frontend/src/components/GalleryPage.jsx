import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

const GalleryPage = () => {
  const { eventName } = useParams();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const IMAGES_PER_PAGE = 9;

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/gallery/images/${encodeURIComponent(
        eventName
      )}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch images");
        return res.json();
      })
      .then((data) =>
        setImages(data.map((url) => `http://localhost:5000${url}`))
      )
      .catch((err) => console.error("Failed to load images:", err))
      .finally(() => setLoading(false));
  }, [eventName]);

  useEffect(() => {
    if (isHovered || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images, isHovered]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsFullScreen(false);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    };
    if (isFullScreen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isFullScreen, images.length]);

  const paginatedImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % images.length),
    onSwipedRight: () =>
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
  });

  return (
    <div className="p-4 w-full max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-blue-700">
          Rosa Power Limited : Event Gallery
        </h2>
        <p className="text-md text-gray-600 italic">{eventName}</p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-500">No images found.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Thumbnails */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {paginatedImages.map((img, i) => {
              const absoluteIndex = (currentPage - 1) * IMAGES_PER_PAGE + i;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(absoluteIndex)}
                  className={`overflow-hidden rounded-lg shadow-lg border-2 ${
                    currentIndex === absoluteIndex
                      ? "border-blue-500"
                      : "border-transparent"
                  } hover:scale-105 transition-transform duration-200`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i}`}
                    className="w-full h-32 object-cover"
                  />
                </button>
              );
            })}

            <div className="col-span-full flex justify-center items-center gap-4 mt-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              <span className="text-sm text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* Slideshow */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full flex items-center justify-center relative bg-white rounded-2xl border border-blue-200 p-3 shadow-[0_8px_30px_rgba(0,123,255,0.2)] transition-shadow duration-300"
            >
              <motion.img
                key={images[currentIndex]}
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                initial={{ opacity: 0.6, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                onClick={() => setIsFullScreen(true)}
                className="w-full h-auto object-contain rounded-xl cursor-pointer"
              />
              <div className="absolute bottom-2 right-2 bg-blue-600/70 text-white text-xs px-2 py-1 rounded shadow-md">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen with Swipe Support */}
      {isFullScreen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={() => setIsFullScreen(false)}
        >
          {/* Navigation Buttons */}
          <button
            className="absolute left-5 text-white text-3xl p-2 bg-black/40 rounded-full hover:bg-black/70 z-50"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
              );
            }}
          >
            <FaChevronLeft />
          </button>

          {/* Swipeable Image */}
          <div {...swipeHandlers} className="max-w-full max-h-full px-3">
            <img
              src={images[currentIndex]}
              alt={`Fullscreen Slide ${currentIndex}`}
              className="max-w-full max-h-screen object-contain rounded-xl"
            />
          </div>

          <button
            className="absolute right-5 text-white text-3xl p-2 bg-black/40 rounded-full hover:bg-black/70 z-50"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev + 1) % images.length);
            }}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
