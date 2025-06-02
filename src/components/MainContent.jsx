import React from "react";
import Sidebar from "./Sidebar";
import BirthdayGallery from "./BirthdayGallery";
import RightPanel from "./RightPanel";

export default function MainContent() {
  return (
    <section className="w-full min-h-screen bg-gray-50 flex flex-col md:flex-row gap-6 px-4 py-6 md:px-6 md:py-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 bg-white rounded shadow-lg max-h-[60vh] md:max-h-[calc(100vh-64px)] overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Birthday Gallery */}
      <main className="flex-1 w-full bg-white rounded shadow-lg max-h-[60vh] md:max-h-[calc(100vh-64px)] overflow-hidden">
        <BirthdayGallery />
      </main>

      {/* Right Panel container */}
      <aside className="w-full md:w-72 flex-shrink-0 bg-white rounded shadow-lg max-h-[60vh] md:max-h-[calc(100vh-64px)] sticky top-16 self-start overflow-hidden">
        <RightPanel />
      </aside>
    </section>
  );
}
