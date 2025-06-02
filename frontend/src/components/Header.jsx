import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/policies", label: "Policies" },
    { to: "/newsroom", label: "Newsroom" },
    { to: "/telephone-directory", label: "Telephone Directory" },
  ];

  const brandColor = "#003366"; // Navy blue
  const hoverColor = "#00509e"; // Lighter blue on hover

  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-3 relative">
      {/* Left: Logo */}
      <div
        className="font-bold text-lg whitespace-nowrap"
        style={{ color: brandColor }}
      >
        ROZA POWER PLANT
      </div>

      {/* Mobile & tablet: Hamburger + Socials */}
      <div className="flex items-center gap-4 md:hidden ml-auto">
        <button
          className="text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ color: brandColor }}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="hover:text-blue-600"
          style={{ color: brandColor }}
        >
          <FaLinkedin className="text-xl" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
          className="hover:text-blue-600"
          style={{ color: brandColor }}
        >
          <FaTwitter className="text-xl" />
        </a>
      </div>

      {/* Desktop: Nav + Search + Socials */}
      <nav className="hidden md:flex flex-wrap items-center gap-6 mx-6 max-w-full flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "font-semibold underline whitespace-nowrap"
                : "hover:underline whitespace-nowrap"
            }
            onClick={() => setMenuOpen(false)}
            style={{ color: brandColor }}
          >
            {item.label}
          </NavLink>
        ))}

        {/* Spacer */}
        <div className="flex-1 min-w-[120px]" />

        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-2 rounded border border-gray-300 text-sm w-40 max-w-full"
            style={{ color: brandColor, backgroundColor: "white" }}
          />
        </div>

        {/* Social icons on right */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="hover:text-blue-600"
          style={{ color: brandColor }}
        >
          <FaLinkedin className="text-xl" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
          className="hover:text-blue-600"
          style={{ color: brandColor }}
        >
          <FaTwitter className="text-xl" />
        </a>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <nav className="absolute top-full left-0 right-0 bg-white shadow-md flex flex-col p-4 space-y-3 md:hidden z-40 border-t border-gray-200">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold underline whitespace-nowrap"
                  : "hover:underline whitespace-nowrap"
              }
              onClick={() => setMenuOpen(false)}
              style={{ color: brandColor }}
            >
              {item.label}
            </NavLink>
          ))}
          {/* Optional search bar on mobile menu */}
          <input
            type="text"
            placeholder="Search"
            className="mt-4 px-3 py-2 rounded border border-gray-300 text-sm"
            style={{ color: brandColor, backgroundColor: "white" }}
          />
        </nav>
      )}
    </header>
  );
}
