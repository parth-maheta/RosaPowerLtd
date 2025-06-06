import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [telDirOpen, setTelDirOpen] = useState(false); // for desktop hover

  const brandColor = "#003366"; // Navy blue

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/policies", label: "Policies" },
    { to: "/newsroom", label: "Newsroom" },
  ];

  // Telephone Directory submenu links
  const telDirSubmenu = [
    { to: "/telephone-directory/rpl", label: "RPL (Power)" },
    { to: "/telephone-directory/ho", label: "HO (Rpower)" },
  ];

  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-3 relative">
      {/* Left: Logo */}
      <div
        className="font-bold text-lg whitespace-nowrap"
        style={{ color: brandColor }}
      >
        ROSA POWER PLANT
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
      <nav className="hidden md:flex flex-wrap items-center gap-6 mx-6 max-w-full flex-1 relative">
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

        {/* Telephone Directory with hover dropdown */}
        <div
          className="relative whitespace-nowrap"
          onMouseEnter={() => setTelDirOpen(true)}
          onMouseLeave={() => setTelDirOpen(false)}
        >
          <span
            className="cursor-pointer hover:underline font-medium"
            style={{ color: brandColor }}
          >
            Telephone Directory
          </span>

          {telDirOpen && (
            <div className="absolute top-full mt-1 left-0 bg-white border border-gray-300 rounded shadow-md z-50 min-w-[160px]">
              {telDirSubmenu.map((sub) => (
                <NavLink
                  key={sub.to}
                  to={sub.to}
                  className={({ isActive }) =>
                    (isActive ? "bg-blue-100 " : "") +
                    "block px-4 py-2 text-gray-800 hover:bg-blue-200"
                  }
                  onClick={() => setMenuOpen(false)}
                  style={{ color: brandColor }}
                >
                  {sub.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

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

          {/* Telephone Directory submenu for mobile */}
          <details className="group">
            <summary
              className="cursor-pointer font-medium"
              style={{ color: brandColor }}
            >
              Telephone Directory
            </summary>
            <div className="pl-4 mt-2 flex flex-col space-y-1">
              {telDirSubmenu.map((sub) => (
                <NavLink
                  key={sub.to}
                  to={sub.to}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold underline whitespace-nowrap"
                      : "hover:underline whitespace-nowrap"
                  }
                  onClick={() => setMenuOpen(false)}
                  style={{ color: brandColor }}
                >
                  {sub.label}
                </NavLink>
              ))}
            </div>
          </details>

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
