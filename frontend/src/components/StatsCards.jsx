import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  Filler
);

export default function StatsCards() {
  const units = [
    { id: "UNIT-1", generationMW: 382.15 },
    { id: "UNIT-2", generationMW: 381.68 },
    { id: "UNIT-3", generationMW: 381.71 },
    { id: "UNIT-4", generationMW: 389.07 },
  ];

  const totalGeneration = units.reduce(
    (sum, unit) => sum + unit.generationMW,
    0
  );
  const maxCapacity = 1500;

  const currentDate = new Date().toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const barData = {
    labels: units.map((u) => u.id),
    datasets: [
      {
        label: "Generation (MW)",
        data: units.map((u) => u.generationMW),
        backgroundColor: "#6366f1",
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Unit-wise Generation",
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#f3f4f6",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const gaugeData = {
    labels: ["Generated", "Remaining"],
    datasets: [
      {
        data: [totalGeneration, Math.max(0, maxCapacity - totalGeneration)],
        backgroundColor: ["#10b981", "#e5e7eb"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: "70%",
      },
    ],
  };

  const gaugeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw.toFixed(2)} MW`,
        },
      },
    },
  };

  // Mock Reliance Power stock price data for sparkline (last 10 days)
  const sparklineData = {
    labels: Array.from({ length: 10 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Reliance Power Stock Price",
        data: [65, 67, 64, 66, 70, 72, 69, 71, 74, 73],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(99, 102, 241, 0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (ctx) => `₹${ctx.parsed.y.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <section className="bg-gray-50 p-4 w-full max-w-full">
      <div className="max-w-full mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Power Generation Dashboard
          </h1>

          <div className="flex flex-col xl:flex-row gap-6 items-start w-full">
            {/* Left side: Table + sparkline */}
            <div className="w-full xl:w-1/2 flex flex-col gap-6">
              <div className="bg-blue-200 border-2 border-blue-400 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-blue-300 px-4 py-3 text-center">
                  <h2 className="text-sm font-semibold text-gray-800">
                    Plant Generation Status As on {currentDate.replace(",", "")}{" "}
                    PM
                  </h2>
                </div>

                {/* Sub-header */}
                <div className="bg-blue-200 px-4 py-2 text-center border-b border-blue-400">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Unit-Wise Generation (MW)
                  </h3>
                </div>

                {/* Units Grid */}
                <div className="bg-blue-100 p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {units.map((unit) => (
                      <div
                        key={unit.id}
                        className="bg-white border border-gray-400 px-4 py-3 text-center rounded-md"
                      >
                        <div className="grid grid-cols-2 gap-2 items-center">
                          <span className="text-sm font-semibold text-gray-800">
                            {unit.id}:
                          </span>
                          <span className="text-sm font-mono text-gray-800">
                            {unit.generationMW.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total Generation */}
                  <div className="bg-blue-200 border border-gray-400 px-4 py-3 text-center rounded-md font-semibold text-gray-800">
                    <div className="grid grid-cols-2 gap-2">
                      <span>Total Generation</span>
                      <span>{totalGeneration.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sparkline stock price */}
              <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <h4 className="text-gray-700 font-semibold mb-2">
                  Reliance Power Stock Price (Last 10 Days)
                </h4>
                <div className="h-24 sm:h-28 md:h-32">
                  <Line data={sparklineData} options={sparklineOptions} />
                </div>
              </div>
            </div>

            {/* Right side: Charts */}
            <div className="w-full xl:w-1/2 flex flex-col gap-6">
              {/* Capacity Utilization Gauge */}
              <div className="bg-white rounded-xl shadow border border-gray-200">
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 rounded-t-xl">
                  <h3 className="text-lg font-semibold text-white">
                    Capacity Utilization
                  </h3>
                </div>
                <div className="p-6">
                  <div className="h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40">
                    <Doughnut data={gaugeData} options={gaugeOptions} />
                  </div>
                  <div className="text-center mt-3 text-gray-700 text-md">
                    <span className="font-semibold text-green-600">
                      {totalGeneration.toFixed(2)} MW
                    </span>{" "}
                    / {maxCapacity} MW
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-1">
                    {((totalGeneration / maxCapacity) * 100).toFixed(1)}% of
                    total capacity
                  </div>
                </div>
              </div>

              {/* Unit-wise Generation Bar Chart */}
              <div className="bg-white rounded-xl shadow border border-gray-200">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 rounded-t-xl">
                  <h3 className="text-lg font-semibold text-white">
                    Generation by Unit
                  </h3>
                </div>
                <div className="p-6 h-44 sm:h-54 md:h-56 lg:h-70 xl:h-78">
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
