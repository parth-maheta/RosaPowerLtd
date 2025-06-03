import React, { useState } from "react";

const Dropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-3 font-medium flex justify-between items-center hover:bg-blue-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900"
        aria-expanded={open}
        aria-controls={`${title.replace(/\s+/g, "-").toLowerCase()}-list`}
      >
        {title}
        <span
          className={`transform transition-transform duration-300 text-blue-600 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>
      {open && (
        <ul
          id={`${title.replace(/\s+/g, "-").toLowerCase()}-list`}
          className="pl-5 pb-3 text-sm text-blue-800 space-y-1"
          role="menu"
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              className="cursor-pointer hover:text-blue-700 transition-colors duration-300"
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  alert(`You selected ${item}`);
                }
              }}
              onClick={() => alert(`You selected ${item}`)}
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

  const dropdowns = [
    { title: "Forms and Formats", items: ["Option A", "Option B", "Option C"] },
    { title: "Awards", items: ["Option A", "Option B", "Option C"] },
    { title: "Events", items: ["Option A", "Option B", "Option C"] },
    {
      title: "Telephone Directory",
      items: ["Option A", "Option B", "Option C"],
    },
    { title: "Gallery", items: ["Option A", "Option B", "Option C"] },
    { title: "Notice Board", items: ["Option A", "Option B", "Option C"] },
    { title: "Departmental Docs", items: ["Option A", "Option B", "Option C"] },
    { title: "Policies", items: ["Option A", "Option B", "Option C"] },
  ];

  return (
    <>
      {/* Hamburger button - mobile only */}
      <button
        className="md:hidden p-3 mb-4 bg-blue-100 text-blue-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        ☰ Menu
      </button>

      {/* Sidebar nav */}
      <nav
        className={`
          bg-blue-50 shadow-lg rounded p-6 w-72 max-w-full
          fixed top-16 left-0 bottom-0 z-30
          md:static md:top-auto md:left-auto md:bottom-auto md:w-64
          transition-transform duration-300 ease-in-out
          overflow-y-auto max-h-[calc(100vh-64px)]
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        aria-label="Main Navigation"
      >
        {/* Close button - mobile only */}
        {isOpen && (
          <button
            className="absolute top-4 right-4 text-blue-700 hover:text-red-600 md:hidden text-2xl"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        )}

        <h2 className="text-xl font-semibold mb-6 text-blue-800 border-b border-blue-300 pb-3">
          Menu
        </h2>

        <div className="space-y-1">
          {dropdowns.map(({ title, items }, idx) => (
            <Dropdown key={idx} title={title} items={items} />
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-blue-300">
          <a
            href="/important-links"
            className="block text-blue-700 font-semibold text-lg hover:text-blue-800 hover:underline transition-colors duration-300"
          >
            Important Links →
          </a>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-20 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
