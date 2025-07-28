"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ChevronDown } from "lucide-react";

interface Contact {
  code: string;
  dial: string;
  flag: string;
}

interface DesktopNavbarProps {
  isScrolled: boolean;
  showSearch: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  showAccountDropdown: boolean;
  setShowAccountDropdown: (value: boolean) => void;
  setShowModal: (value: boolean) => void;
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  isScrolled,
  showSearch,
  searchValue,
  setSearchValue,
  handleSearch,
  showAccountDropdown,
  setShowAccountDropdown,
  setShowModal,
}) => {
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const phoneDropdownRef = useRef<HTMLDivElement>(null);
  const accountDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);

  // Handle clicks outside phone dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        phoneDropdownRef.current &&
        !phoneDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPhoneDropdown(false);
      }
    };

    if (showPhoneDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPhoneDropdown]);

  const setDropdownTimeout = (
    ref: React.MutableRefObject<NodeJS.Timeout | null>,
    fn: () => void
  ) => {
    ref.current = setTimeout(fn, 100);
  };

  const clearDropdownTimeout = (
    ref: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    if (ref.current) clearTimeout(ref.current);
  };

  const handleAccountMouseEnter = () => {
    clearDropdownTimeout(accountDropdownTimeout);
    setShowAccountDropdown(true);
  };

  const handleAccountMouseLeave = () => {
    setDropdownTimeout(accountDropdownTimeout, () =>
      setShowAccountDropdown(false)
    );
  };

  const contacts: Contact[] = [
    {
      code: "IN",
      dial: "+91 9870468034",
      flag: "in",
    },
    {
      code: "US",
      dial: "+1 3153410000",
      flag: "us",
    },
    {
      code: "GB",
      dial: "+44 2079933000",
      flag: "gb",
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between py-1 relative">
        {/* Logo */}
        <div
          className={`flex-shrink-0 hidden md:flex ${
            isScrolled ? "hidden" : ""
          }`}
        >
          <Link href="/" className="flex-shrink-0">
            <Image src={"/Logo.png"} alt="Go Uninest" height={60} width={60} />
          </Link>
        </div>

        {/* Search bar */}
        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search City | University | Neighborhood | Property"
                className="w-full pl-4 pr-12 py-2 bg-white border border-gray-300 rounded-full"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-2 rounded-full"
              >
                <Search size={16} />
              </button>
            </form>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Refer to Earn */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              className={`flex items-center space-x-1 bg-gray-200/20 py-2 px-4 rounded-full ${
                isScrolled ? "border border-gray-300 shadow-none" : "shadow-sm"
              }`}
            >
              <span
                className={`font-medium ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                Refer to Earn
              </span>
              <span className="bg-[#0279d4] text-white text-xs px-2 py-1 rounded-full">
                £50
              </span>
            </button>
          </div>

          {/* Contact Icons */}
          <div
            className={`hidden md:flex gap-1 items-center rounded-full bg-white/20 ${
              isScrolled ? "border border-gray-300 shadow-none" : "shadow-sm"
            }`}
          >
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/+442079933000"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-l-full py-2 pr-1 pl-3 ${
                isScrolled ? "hover:bg-green-200" : "hover:bg-green-600"
              } transition-colors duration-200`}
            >
              <Image
                src={isScrolled ? "/whatsapp-color.png" : "/whatsapp-white.png"}
                alt="whatsapp"
                width={23}
                height={25}
              />
            </a>

            {/* Phone Dropdown */}
            <div className="relative" ref={phoneDropdownRef}>
              <button

                onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}

                className={`rounded-r-full py-2 pl-1 pr-3 ${
                  isScrolled ? "hover:bg-red-200" : "hover:bg-red-400"
                } transition-colors duration-200`}
                aria-label="Select phone number"
              >
                <Image
                  src={
                    isScrolled ? "/telephone-red.png" : "/telephone-white.png"
                  }
                  alt="telephone"
                  width={23}
                  height={25}
                />
              </button>

              {showPhoneDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="max-h-60 overflow-y-auto">
                    {contacts.map((contact, index) => (
                      <a
                        key={index}
                        href={`tel:${contact.dial.replace(/\s/g, "")}`}
                        onClick={() => setShowPhoneDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        <Image
                          src={`https://flagcdn.com/w40/${contact.flag}.jpg`}
                          alt={contact.code}
                          width={20}
                          height={15}
                          className="h-4 w-6 object-cover rounded-sm"
                        />
                        <span className="text-sm text-gray-800 font-medium">
                          {contact.dial}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Get in Touch */}
          <button
            onClick={() => setShowModal(true)}
            className="hidden md:flex px-6 py-2 rounded-full font-medium bg-gradient text-white"
          >
            Get in Touch
          </button>

          {/* Account Dropdown */}
          <div
            className="relative dropdown-container hidden md:flex"
            ref={accountDropdownRef}
            onMouseEnter={handleAccountMouseEnter}
            onMouseLeave={handleAccountMouseLeave}
          >
            <button
              className={`flex items-center space-x-1 p-2 rounded-full ${
                isScrolled
                  ? "text-gray-800 bg-gray-200 hover:bg-gray-100"
                  : "text-white hover:bg-white hover:text-gray-800"
              }`}
              aria-label="Account options"
            >
              <User size={32} />
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  showAccountDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showAccountDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-800 hover:bg-red-100"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 text-gray-800 hover:bg-red-100"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
