import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 mt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-xl font-bold text-[#0072CE]">Reliance Station</h2>
          <p className="text-sm mt-2">Powering Progress with Innovation.</p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h3 className="text-md font-semibold mb-2 text-[#0072CE]">
            Quick Links
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/newsroom" className="hover:underline">
                Newsroom
              </a>
            </li>
            <li>
              <a href="/policies" className="hover:underline">
                Policies
              </a>
            </li>
            <li>
              <a href="/telephone-directory" className="hover:underline">
                Directory
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Links */}
        <div>
          <h3 className="text-md font-semibold mb-2 text-[#0072CE]">
            Connect with Us
          </h3>
          <div className="flex justify-center sm:justify-start space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#0072CE]"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#0072CE]"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#0072CE]"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs py-4 bg-white border-t border-gray-200 text-gray-500">
        &copy; {new Date().getFullYear()} Reliance Station. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
