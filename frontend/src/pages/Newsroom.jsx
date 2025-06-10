import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaNewspaper } from "react-icons/fa";

const dummyNews = [
  {
    id: 1,
    title: "Rosa Power Achieves 99.8% PLF in May 2025",
    date: "2025-06-05",
    content:
      "Rosa Power Ltd has recorded a remarkable Plant Load Factor (PLF) of 99.8% for the month of May 2025, setting a benchmark in operational excellence. This consistent performance highlights our team's commitment to excellence, efficiency, and innovation.",
  },
  {
    id: 2,
    title: "CSR: Rosa Power Distributes 500 Solar Lamps",
    date: "2025-06-03",
    content:
      "As part of its CSR initiative, Rosa Power distributed solar lamps to remote villages, ensuring sustainable energy access and enhancing safety for local communities during nighttime.",
  },
  {
    id: 3,
    title: "Bravo Awards: Celebrating Excellence",
    date: "2025-05-15",
    content:
      "Employees were recognized for their exceptional performance under the Bravo Award scheme during the monthly townhall. Congratulations to all the achievers for their hard work and dedication.",
  },
  {
    id: 4,
    title: "Energy Conservation Drive Begins",
    date: "2025-06-01",
    content:
      "Rosa Power Ltd has launched a month-long Energy Conservation Drive, aimed at raising awareness among staff and optimizing energy usage across all units.",
  },
  {
    id: 5,
    title: "Medical Camp for Nearby Villages",
    date: "2025-05-28",
    content:
      "A free health check-up camp was organized by Rosa Power in collaboration with local health authorities to provide essential services to underprivileged families.",
  },
];

export default function Newsroom() {
  const [news, setNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    setNews(dummyNews);
  }, []);

  const toggleReadMore = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isNew = (dateString) => {
    const postDate = new Date(dateString);
    const daysAgo = (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysAgo <= 7;
  };

  return (
    <div className="p-6 lg:p-10 bg-gradient-to-br from-white to-blue-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-blue-800 flex items-center gap-2">
          <FaNewspaper className="text-blue-600" />
          Rosa Power Newsroom
        </h1>
        <p className="text-gray-600 mt-2 text-sm lg:text-base">
          Stay updated with the latest announcements, achievements, and CSR
          initiatives from Rosa Power Ltd.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.slice(0, visibleCount).map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: item.id * 0.1 }}
            className="bg-white border border-blue-100 rounded-2xl p-5 shadow-md hover:shadow-blue-300 transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-blue-700 mb-1">
                {item.title}
              </h2>
              {isNew(item.date) && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  NEW
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-3">{item.date}</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              {expandedIds.includes(item.id)
                ? item.content
                : item.content.slice(0, 100) + "..."}
              {item.content.length > 100 && (
                <button
                  onClick={() => toggleReadMore(item.id)}
                  className="text-blue-600 ml-2 underline text-xs"
                >
                  {expandedIds.includes(item.id) ? "Show less" : "Read more"}
                </button>
              )}
            </p>
          </motion.div>
        ))}
      </div>

      {visibleCount < news.length && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 2)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
