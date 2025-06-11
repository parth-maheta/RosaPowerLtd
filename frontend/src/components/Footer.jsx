import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-800 border-t border-gray-200">
      <div className="w-full max-w-screen-2xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
        <div className="space-y-2 leading-relaxed">
          <h2 className="text-xl font-bold text-[#0072CE]">Reliance Station</h2>
          <p className="text-sm">Powering Progress with Innovation.</p>
          <p className="text-sm">An initiative by Rosa Power Supply Co. Ltd.</p>
        </div>

        <div className="space-y-2 leading-relaxed">
          <h3 className="text-md font-semibold text-[#0072CE]">Quick Links</h3>
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

        <div className="space-y-2 leading-relaxed">
          <h3 className="text-md font-semibold text-[#0072CE]">Contact Us</h3>
          <p className="text-sm">Rosa Power Plant, Shahjahanpur</p>
          <p className="text-sm">Email: contact@rosapower.in</p>
          <p className="text-sm">Phone: +91 12345 67890</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-md font-semibold text-[#0072CE]">Follow Us</h3>
          <div className="flex justify-center sm:justify-start space-x-4 text-lg">
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

      <div className="text-center text-xs py-4 bg-white border-t border-gray-200 text-gray-500">
        &copy; {new Date().getFullYear()} Reliance Station. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
