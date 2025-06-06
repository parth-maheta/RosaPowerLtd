// Sidebar.jsx
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const Dropdown = ({
  title,
  items,
  isOpen,
  onToggle,
  parentRef,
  onItemSelect,
}) => {
  const [submenuPos, setSubmenuPos] = useState({ top: 0, left: 0 });
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  useEffect(() => {
    if (isOpen && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setSubmenuPos({
        top: rect.top + window.scrollY,
        left: rect.right + window.scrollX + 6,
      });
    }
  }, [isOpen, parentRef]);

  return (
    <div className="relative border-b border-gray-300" ref={parentRef}>
      <button
        onClick={onToggle}
        className="w-full text-left p-3 font-medium flex justify-between items-center hover:bg-blue-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900"
        aria-expanded={isOpen}
        aria-controls={`${title.replace(/\s+/g, "-").toLowerCase()}-list`}
      >
        {title}
        <span
          className={`transform transition-transform duration-300 text-blue-600 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {isOpen &&
        createPortal(
          <div
            id={`${title.replace(/\s+/g, "-").toLowerCase()}-list`}
            className="bg-blue-50 shadow-lg rounded-md border border-blue-200 w-48 max-h-[80vh] overflow-auto text-blue-800 text-sm"
            role="menu"
            style={{
              position: "absolute",
              top: submenuPos.top,
              left: submenuPos.left,
              zIndex: 9999,
            }}
          >
            <ul className="p-3 space-y-2">
              {items.map((item, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer hover:text-blue-700 transition-colors duration-300"
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onItemSelect(item);
                    }
                  }}
                  onClick={() => onItemSelect(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>,
          container
        )}
    </div>
  );
};

export default function Sidebar() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRefs = useRef([]);

  const navigate = useNavigate();

  const dropdowns = [
    {
      title: "Forms and Formats",
      items: [
        "IT",
        "Admin",
        "HR",
        "Finance",
        "Procurement",
        "Stores",
        "EHS",
        "TS",
        "Land",
        "Legal",
        "MSDS",
      ],
    },
    {
      title: "Awards",
      items: [
        "GreenTech Awards 2014",
        "Heroes of Sasan",
        "National Award for Excellence 2015",
        "Arogya Award 2015",
        "GreenTech Awards 2015",
        "Rashtra Vibhusan Award 2015",
      ],
    },
    { title: "Events", items: ["Option A", "Option B", "Option C"] },
    {
      title: "Telephone Directory",
      items: ["RPL(Plant)", "HO(RPower)"],
    },
    { title: "Gallery", items: ["Option A", "Option B", "Option C"] },
    { title: "Notice Board", items: ["RPL Holidays 2025"] },
    {
      title: "Departmental Docs",
      items: [
        "MTP",
        "C&I",
        "IMS",
        "EMS",
        "Training",
        "IT",
        "Mine Electrial Forum",
        "CSR",
        "HR",
        "Safety",
        "Finance",
        "Operations",
        "O&E",
      ],
    },
    {
      title: "Policies",
      items: ["Rpower Policies", "ESS", "Mediclaim Policies"],
    },
  ];

  // Toggle dropdown and close others
  const toggleDropdown = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const closeSidebar = () => {
    setIsOpen(false);
    setOpenIndex(null);
  };

  // Make sure dropdownRefs has correct number of refs
  while (dropdownRefs.current.length < dropdowns.length) {
    dropdownRefs.current.push(React.createRef());
  }

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
        className={`bg-blue-50 shadow-lg rounded p-6 w-72 max-w-full fixed top-16 left-0 bottom-0 z-50
          md:static md:top-auto md:left-auto md:bottom-auto md:w-64
          transition-transform duration-300 ease-in-out
          overflow-y-auto overflow-x-visible max-h-[calc(100vh-64px)]
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        aria-label="Main Navigation"
      >
        {/* Close button - mobile only */}
        {isOpen && (
          <button
            className="absolute top-4 right-4 text-blue-700 hover:text-red-600 md:hidden text-2xl"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            ✕
          </button>
        )}

        <h2 className="text-xl font-semibold mb-6 text-blue-800 border-b border-blue-300 pb-3">
          Menu
        </h2>

        <div className="space-y-1">
          {dropdowns.map(({ title, items }, idx) => {
            // Handler when dropdown item is clicked
            const onItemSelect = (item) => {
              if (title === "Forms and Formats") {
                navigate(
                  `/download?category=${encodeURIComponent(
                    title
                  )}&department=${encodeURIComponent(item)}`
                );
                closeSidebar();
              } else if (title === "Telephone Directory") {
                const telMap = {
                  "RPL(Plant)": "/telephone-directory/rpl",
                  "HO(RPower)": "/telephone-directory/ho",
                };

                const path = telMap[item] || "/telephone-directory";
                navigate(path);
                closeSidebar();
              } else {
                alert(`You selected ${item}`);
              }
            };

            return (
              <Dropdown
                key={idx}
                title={title}
                items={items}
                isOpen={openIndex === idx}
                onToggle={() => toggleDropdown(idx)}
                parentRef={dropdownRefs.current[idx]}
                onItemSelect={onItemSelect}
              />
            );
          })}
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
          className="fixed inset-0 bg-black opacity-20 z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
