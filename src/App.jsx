import React from "react";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import MainContent from "./components/MainContent";
import StationHighlights from "./components/StationHighlights";
import TrainingProgram from "./components/TrainingProgram";
import Footer from "./components/Footer";
import img1 from "./assets/images/img1.jpg";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="px-4 py-2">
        <StatsCards />
        <MainContent />

        {/* Section with background image and floating cards */}
        <div className="relative mt-6 rounded-xl overflow-hidden">
          {/* ✅ Corrected background image interpolation */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
            style={{ backgroundImage: `url(${img1})` }}
          />

          {/* Foreground content */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
            <StationHighlights />
            <TrainingProgram />
          </div>
        </div>

        {/* ✅ Footer added */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
