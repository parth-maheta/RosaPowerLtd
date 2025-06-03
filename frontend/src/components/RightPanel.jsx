import React, { useEffect, useState } from "react";

export default function RightPanel() {
  const [bravoWinners, setBravoWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/awards")
      .then((res) => res.json())
      .then((data) => {
        const winners = data.map((item) => ({
          name: item.name,
          department: item.department,
        }));
        setBravoWinners(winners);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bravo awards:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <aside className="w-full bg-white shadow-md p-5 rounded-lg flex flex-col h-full max-h-[calc(100vh-64px)]">
        <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
          🏆 Bravo Awards
        </h2>
        <p className="text-center text-gray-500">Loading...</p>
      </aside>
    );
  }

  if (!bravoWinners.length) {
    return (
      <aside className="w-full bg-white shadow-md p-5 rounded-lg flex flex-col h-full max-h-[calc(100vh-64px)]">
        <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
          🏆 Bravo Awards
        </h2>
        <p className="text-center text-gray-500">No awards found.</p>
      </aside>
    );
  }

  return (
    <aside className="w-full bg-white shadow-md p-5 rounded-lg flex flex-col h-full max-h-[calc(100vh-64px)]">
      <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
        🏆 Bravo Awards
      </h2>

      <div className="relative h-[300px] overflow-hidden">
        {" "}
        {/* Increased height */}
        <div className="animate-vertical-scroll pl-5">
          <ul className="list-disc list-inside text-gray-800 font-medium space-y-2">
            {[...bravoWinners, ...bravoWinners].map((winner, idx) => (
              <li key={idx}>
                {winner.name}{" "}
                <em className="text-gray-500">({winner.department})</em>
              </li>
            ))}
          </ul>
        </div>
        {/* Fade overlays */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
      </div>

      <style>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
        .animate-vertical-scroll {
          animation: vertical-scroll 3s linear infinite;
        }
      `}</style>
    </aside>
  );
}
