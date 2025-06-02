import React from "react";

const StationHighlights = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 text-sm w-full text-gray-800">
      <h2 className="font-bold text-lg mb-2 text-blue-800">
        Station Highlights: FY 24-25
      </h2>
      <ul className="list-disc list-inside space-y-1">
        <li>
          <span className="font-bold">Ranked 2nd</span> in the country in gross
          generation
        </li>
        <li>
          Station PLF for FY 24-25 is{" "}
          <span className="font-semibold">90.59%</span> vs. All India Coal Based
          PLF 62.9%
        </li>
        <li>
          Gross generation of <span className="font-semibold">31,425 MUs</span>{" "}
          and NESO 29,511 MUs in FY25
        </li>
        <li>
          Station Monthly Highest:{" "}
          <span className="font-semibold">2819.04 MUs</span> in April '24
        </li>
        <li>
          Highest day coal receipt:{" "}
          <span className="font-semibold">86,118 MT</span> on 17 Mar 2025
        </li>
        <li>
          Highest monthly coal receipt:{" "}
          <span className="font-semibold">17,08,409 MT</span> in Jun '24
        </li>
      </ul>
    </div>
  );
};

export default StationHighlights;
