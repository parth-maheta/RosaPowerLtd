import React from "react";
import StatsCards from "../components/StatsCards";
import MainContent from "../components/MainContent";
import StationHighlights from "../components/StationHighlights";
import TrainingProgram from "../components/TrainingProgram";
import img1 from "../assets/images/img1.jpg";

export default function Home() {
  return (
    <div className="space-y-3 w-full">
      <StatsCards />
      <MainContent />
      <div className="relative rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
          style={{ backgroundImage: `url(${img1})` }}
        />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-3 ">
          <StationHighlights />
          <TrainingProgram />
        </div>
      </div>
    </div>
  );
}
