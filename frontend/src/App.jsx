import React from "react";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import MainContent from "./components/MainContent";
import StationHighlights from "./components/StationHighlights";
import TrainingProgram from "./components/TrainingProgram";
import Footer from "./components/Footer";
import img1 from "./assets/images/img1.jpg";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Reduced vertical padding here */}
      <div className="px-6  w-full max-w-screen-2xl mx-auto">
        <div className="space-y-3">
          <StatsCards />
          <MainContent />
          <div className="relative rounded-xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
              style={{ backgroundImage: `url(${img1})` }}
            />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-3 p-2">
              <StationHighlights />
              <TrainingProgram />
            </div>
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default App;
