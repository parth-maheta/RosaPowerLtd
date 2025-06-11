import React, { useEffect, useState } from "react";
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
import { Doughnut, Bar } from "react-chartjs-2";

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
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/units")
      .then((res) => res.json())
      .then((data) => {
        const mappedUnits = data.map((unit) => ({
          id: `UNIT-${unit.unit_number}`,
          generationMW: unit.generation_mw,
        }));
        setUnits(mappedUnits);
      })
      .catch((err) => {
        console.error("Error fetching units:", err);
      });
  }, []);

  const totalGeneration = units.reduce(
    (sum, unit) => sum + unit.generationMW,
    0
  );
  const maxCapacity = 1200;

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
        font: { size: 14, weight: "bold" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#f3f4f6" },
        ticks: { font: { size: 12 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
        barPercentage: 0.4,
        categoryPercentage: 0.5,
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

  return (
    <section className="bg-gray-50  w-full">
      {" "}
      <div className="w-full mx-auto">
        <div className="bg-white p-2 rounded-lg shadow-md w-full">
          {" "}
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center mb-3">
            {" "}
            Power Generation Dashboard
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            {" "}
            {/* Table Section */}
            <div className="w-full sm:w-1/3 bg-blue-200 border-2 border-blue-400 rounded-lg flex flex-col max-h-[420px] sm:max-h-[300px] overflow-auto">
              <div className="bg-blue-300 px-2 py-1.5 text-center">
                {" "}
                <h2 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 leading-tight">
                  Plant Generation Status As on {currentDate.replace(",", "")}{" "}
                  PM
                </h2>
              </div>

              <div className="bg-blue-200 px-2 py-1 text-center border-b border-blue-400">
                {" "}
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 leading-tight">
                  Unit-Wise Generation (MW)
                </h3>
              </div>

              <div className="bg-blue-100 p-2 flex-1 flex flex-col overflow-auto">
                {" "}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {units.map((unit) => (
                    <div
                      key={unit.id}
                      className="bg-white border border-gray-400 px-2 py-1 text-center rounded-md hover:bg-blue-200"
                    >
                      <div className="grid grid-cols-2 gap-1 items-center">
                        <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 leading-snug">
                          {unit.id}:
                        </span>
                        <span className="text-sm sm:text-base md:text-lg font-mono text-gray-800 leading-snug">
                          {unit.generationMW.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-200 border border-gray-400 px-2 py-1.5 text-center rounded-md font-semibold text-gray-800 text-sm sm:text-base md:text-lg leading-snug mt-auto">
                  {" "}
                  <div className="grid grid-cols-2 gap-2">
                    <span>Total Generation</span>
                    <span>{totalGeneration.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Gauge Section */}
            <div className="w-full sm:w-1/3 bg-white rounded-xl shadow border border-gray-200 flex flex-col max-h-[420px] sm:max-h-[300px]">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-1.5 rounded-t-xl">
                {" "}
                <h3 className="text-sm sm:text-md md:text-lg font-semibold text-white text-center">
                  Capacity Utilization
                </h3>
              </div>
              <div className="p-3 flex flex-col items-center flex-1 justify-center">
                {" "}
                <div className="w-full h-28 max-w-[180px]">
                  <Doughnut data={gaugeData} options={gaugeOptions} />
                </div>
                <div className="text-center mt-2 text-gray-700 text-base font-semibold leading-snug">
                  {totalGeneration.toFixed(2)} MW / {maxCapacity} MW
                </div>
                <div className="text-center text-sm text-gray-500 mt-1 leading-tight">
                  {((totalGeneration / maxCapacity) * 100).toFixed(1)}% of total
                  capacity
                </div>
              </div>
            </div>
            {/* Bar Chart Section */}
            <div className="w-full sm:w-1/3 bg-white rounded-xl shadow border border-gray-200 flex flex-col max-h-[420px] sm:max-h-[300px]">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-1.5 rounded-t-xl">
                {" "}
                <h3 className="text-sm sm:text-md md:text-lg font-semibold text-white text-center">
                  Generation by Unit
                </h3>
              </div>
              <div className="p-2 h-40 sm:h-36 md:h-40 flex-1">
                {" "}
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
