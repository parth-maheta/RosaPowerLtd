import React, { useState } from "react";

const Dropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-3 font-medium flex justify-between items-center hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-expanded={open}
      >
        {title}
        <span
          className={`transform transition-transform duration-300 text-gray-600 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {open && (
        <ul className="pl-5 pb-3 text-sm text-gray-700 space-y-1">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="cursor-pointer hover:text-blue-600 transition-colors duration-300"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const dropdowns = [...Array(8)].map((_, index) => ({
    title: `Dropdown ${index + 1}`,
    items: ["Option A", "Option B", "Option C"],
  }));

  return (
    <>
      {/* Mobile hamburger toggle */}
      <button
        className="md:hidden p-3 mb-4 bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        ☰ Menu
      </button>

      {/* Sidebar nav */}
      <nav
        className={`
          bg-white shadow-lg rounded p-6 w-full md:w-64 flex-shrink-0
          max-h-[calc(100vh-64px)] overflow-y-auto
          fixed top-16 left-0 bottom-0 z-30
          md:static md:top-auto md:left-auto md:bottom-auto
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <h2 className="text-xl font-semibold mb-6 text-blue-700 border-b border-gray-300 pb-3">
          Menu
        </h2>

        <div className="space-y-1">
          {dropdowns.map(({ title, items }, idx) => (
            <Dropdown key={idx} title={title} items={items} />
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-300">
          <a
            href="/important-links"
            className="block text-blue-700 font-semibold text-lg hover:text-blue-800 hover:underline transition-colors duration-300"
          >
            Important Links →
          </a>
        </div>
      </nav>

      {/* Overlay for mobile when sidebar open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
