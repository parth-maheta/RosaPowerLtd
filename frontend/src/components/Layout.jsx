import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar - hidden on home page */}
        {!isHome && (
          <aside className="md:w-64 w-full md:block">
            <Sidebar />
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
