import React from "react";

export default function RightPanel() {
  const bravoWinners = [
    "Sneha Rathi",
    "Rajeev Kumar",
    "Meena Patel",
    "Ankit Singh",
    "Vikram Chauhan",
    "Sneha Rathi",
    "Rajeev Kumar",
    "Meena Patel",
  ];

  return (
    <aside className="w-full bg-white shadow-md p-5 rounded-lg flex flex-col h-full max-h-[calc(100vh-64px)]">
      <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
        🏆 Bravo Awards
      </h2>

      <div className="relative h-full overflow-hidden">
        <div
          className="animate-vertical-scroll"
          style={{ paddingLeft: "1.25rem" }}
        >
          <ul className="list-disc list-inside text-gray-800 font-medium space-y-2">
            {[...bravoWinners, ...bravoWinners].map((winner, idx) => (
              <li key={idx}>{winner}</li>
            ))}
          </ul>
        </div>

        {/* Fade overlays */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
      </div>

      <style>{`
        @keyframes vertical-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-vertical-scroll {
          animation: vertical-scroll 18s linear infinite;
        }
      `}</style>
    </aside>
  );
}
