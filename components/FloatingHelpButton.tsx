"use client";
import React, { useEffect, useRef, useState } from "react";
import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FloatingHelpButton = () => {
  const [hoveredButton, setHoveredButton] = useState<
    "email" | "contact" | "whatsapp" | null
  >(null);

  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const phoneDropdownRef = useRef<HTMLDivElement>(null);

  const phoneNumbers = [
    {
      code: "IN",
      dial: "+91 9876543210",
      flag: "in",
    },
    {
      code: "US",
      dial: "+1 4081234567",
      flag: "us",
    },
    {
      code: "GB",
      dial: "+44 2071234567",
      flag: "gb",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        phoneDropdownRef.current &&
        !phoneDropdownRef.current.contains(e.target as Node)
      ) {
        setShowPhoneDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmailClick = () => {
    window.location.href = "mailto:support@gouninest.com";
  };

  return (
    <div className="fixed left-3 bottom-20 z-40 flex flex-col items-end gap-3">
      {/* Email Help Button */}
      <div
        className="relative transition-all duration-300 ease-in-out"
        onMouseEnter={() => setHoveredButton("email")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        <button
          onClick={handleEmailClick}
          className="rounded-full p-1.5 shadow-sm transition-all duration-300
                   border border-red-400 text-red-500 bg-white hover:text-red-100 hover:bg-red-500"
          aria-label="Get help via email"
        >
          <Mail size={23} />
        </button>
        {hoveredButton === "email" && (
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
            <span className="text-sm font-medium">Get Help</span>
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        )}
      </div>

      {/* Contact Button (Phone with dropdown) */}
      <div className="relative" ref={phoneDropdownRef}>
        <button
          onClick={() => setShowPhoneDropdown((prev) => !prev)}
          onMouseEnter={() => setHoveredButton("contact")}
          onMouseLeave={() => setHoveredButton(null)}
          className="flex items-center justify-center bg-white text-blue-500 rounded-full p-2 shadow-sm
                   transition-all duration-300 border border-blue-500 hover:border-blue-400 hover:text-blue-100 hover:bg-blue-500"
          aria-label="Contact Us"
        >
          <Phone size={22} />
        </button>

        {hoveredButton === "contact" && !showPhoneDropdown && (
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
            <span className="text-sm font-medium">Contact Us</span>
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        )}

        {showPhoneDropdown && (
          <div className="w-[185px] absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
            {phoneNumbers.map((item) => (
              <a
                key={item.code}
                href={`tel:${item.dial.replace(/\s/g, "")}`}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <Image
                  src={`https://flagcdn.com/w40/${item.code.toLowerCase()}.jpg`}
                  alt={item.code}
                  width={25}
                  height={25}
                  className="rounded-sm w-8 h-5"
                />
                <span className="text-sm text-gray-800">{item.dial}</span>
              </a>
            ))}
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
          className="flex items-center justify-center rounded-full transition-all duration-300 hover:border-green-400"
          aria-label="Chat on WhatsApp"
        >
          <div className="rounded-full p-1.5 bg-white border border-green-600">
            <Image
              src="/whatsapp-color.png"
              alt="WhatsApp Icon"
              width={25}
              height={25}
              priority
            />
          </div>
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
