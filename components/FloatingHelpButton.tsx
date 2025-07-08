"use client";

import React, { useState } from "react";
import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FloatingHelpButton = () => {
  const [hoveredButton, setHoveredButton] = useState<
    "email" | "contact" | "whatsapp" | null
  >(null);

  return (
    <div className="fixed left-3 bottom-20 z-50 flex flex-col items-end gap-3">
      {/* Email Help Button */}
      <div
        className="relative transition-all duration-300 ease-in-out"
        onMouseEnter={() => setHoveredButton("email")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <button
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-300"
          aria-label="Get help via email"
        >
          <Mail size={25} />
        </button>
        {hoveredButton === "email" && (
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
            <span className="text-sm font-medium">Get Help</span>
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        )}
      </div>

      {/* Contact Button */}
      <div
        className="relative"
        onMouseEnter={() => setHoveredButton("contact")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <Link
          href="/contacts"
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Contact Us"
        >
          <Phone size={25} />
        </Link>
        {hoveredButton === "contact" && (
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
            <span className="text-sm font-medium">Contact Us</span>
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        )}
      </div>

      {/* WhatsApp Button */}
      <div
        className="relative"
        onMouseEnter={() => setHoveredButton("whatsapp")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <Link
          href="https://wa.me/919870468034"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <Image
            src="/whatsapp-logo.png"
            alt="WhatsApp Icon"
            width={45}
            height={45}
            priority
          />
        </Link>
        {hoveredButton === "whatsapp" && (
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
            <span className="text-sm font-medium">Chat on WhatsApp</span>
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingHelpButton;
