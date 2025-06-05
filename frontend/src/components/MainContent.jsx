import React from "react";
import Sidebar from "./Sidebar";
import BirthdayGallery from "./BirthdayGallery";
import RightPanel from "./RightPanel";

export default function MainContent() {
  return (
    <section
      className="
        relative w-full min-h-auto bg-gray-50
        flex flex-col md:flex-row gap-2
        px-2 md:px-3 py-2 md:py-3
      "
    >
      {/* Sidebar */}
      <aside
        className="
          w-full md:w-64 flex-shrink-0
          md:bg-white md:rounded md:shadow-lg
          max-h-full md:max-h-[calc(100vh-60px)]
          overflow-visible
          z-50
        "
      >
        <Sidebar />
      </aside>

      {/* Birthday Gallery */}
      <main
        className="
          flex-1 w-full bg-white rounded shadow-lg
          max-h-full md:max-h-[calc(100vh-60px)]
          overflow-y-auto
          relative z-10
        "
      >
        <BirthdayGallery />
      </main>

      {/* Right Panel */}
      <aside
        className="
          w-full md:w-72 flex-shrink-0 bg-white rounded shadow-lg
          max-h-full md:max-h-[calc(100vh-60px)]
          sticky top-16 self-start overflow-hidden
          z-30
        "
      >
        <RightPanel />
      </aside>
    </section>
  );
}
