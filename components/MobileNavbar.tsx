"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, ChevronDown } from "lucide-react";

interface MobileNavbarProps {
  isScrolled: boolean;
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  showAccountDropdown: boolean;
  setShowAccountDropdown: (
    value: boolean | ((prev: boolean) => boolean)
  ) => void;
  setShowModal: (value: boolean) => void;
  handleLinkClick: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  isScrolled,
  isOpen,
  setIsOpen,
  searchValue,
  setSearchValue,
  handleSearch,
  showAccountDropdown,
  setShowAccountDropdown,
  setShowModal,
  handleLinkClick,
}) => {
  const mobileAccountDropdownRef = useRef<HTMLDivElement>(null);
  const mobileAccountDropdownTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const handleMobileAccountMouseEnter = () => {
    clearDropdownTimeout(mobileAccountDropdownTimeout);
    setShowAccountDropdown(true);
  };

  const handleMobileAccountMouseLeave = () => {
    setDropdownTimeout(mobileAccountDropdownTimeout, () =>
      setShowAccountDropdown(false)
    );
  };

  const toggleMobileAccountDropdown = () => {
    setShowAccountDropdown((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // 📞 Phone dropdown state and behavior
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);

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

  const handleClickOutside = (e: MouseEvent) => {
    if (
      !(e.target as HTMLElement).closest("#phone-dropdown") &&
      !(e.target as HTMLElement).closest("#phone-btn")
    ) {
      setShowPhoneDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center h-16 px-5 z-50 relative bg-transparent">
        {!isScrolled && (
          <div className="flex-shrink-0 md:hidden">
            <Link href="/" className="flex-shrink-0 rounded-md">
              <div className="flex-shrink-0">
                <Image
                  src={"/Logo.png"}
                  alt="Go Uninest"
                  height={50}
                  width={50}
                />
              </div>
            </Link>
          </div>
        )}

        {isScrolled && (
          <div className="md:hidden flex-1 mx-2">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="w-full pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-full"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-1 rounded-full"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </form>
          </div>
        )}

        <div className="flex items-center space-x-2 md:hidden ml-auto">
          <div
            className={`flex items-center gap-1 rounded-full bg-white/20 ${
              isScrolled ? "border border-gray-300 shadow-none" : "shadow-sm"
            }`}
          >
            {/* WhatsApp */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-l-full py-2 pr-1 pl-3 ${
                !isScrolled
                  ? "hover:bg-green-600 transition-colors duration-200"
                  : "hover:bg-green-200"
              }`}
            >
              <Image
                src={isScrolled ? "/whatsapp-color.png" : "/whatsapp-white.png"}
                alt="whatsapp"
                width={23}
                height={25}
              />
            </a>

            {/* Phone Dropdown */}
            <button
              id="phone-btn"
              onClick={() => setShowPhoneDropdown(!showPhoneDropdown)}
              className={`relative rounded-r-full py-2 pl-1 pr-3 ${
                !isScrolled
                  ? "hover:bg-red-400 transition-colors duration-200"
                  : "hover:bg-red-200"
              }`}
              aria-label="Select phone number"
            >
              <Image
                src={isScrolled ? "/telephone-red.png" : "/telephone-white.png"}
                alt="telephone"
                width={23}
                height={25}
              />

              {showPhoneDropdown && (
                <div
                  id="phone-dropdown"
                  className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                >
                  {phoneNumbers.map((item) => (
                    <a
                      key={item.code}
                      href={`tel:${item.dial.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                      <Image
                        src={`https://flagcdn.com/w40/${item.code.toLowerCase()}.jpg`}
                        alt={item.code}
                        width={24}
                        height={16}
                        className="rounded-sm"
                      />
                      <span className="text-sm text-gray-800">{item.dial}</span>
                    </a>
                  ))}
                </div>
              )}
            </button>
          </div>

          <button
            onClick={toggleMenu}
            className={`p-2 ${isScrolled ? "text-gray-800" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Dropdown */}
        {isOpen && (
          <div
            className={`absolute top-16 left-0 right-0 px-4 z-[999] ${
              !isScrolled
                ? "bg-black/50 backdrop-blur-xl pb-2"
                : "bg-white pb-2"
            }`}
          >
            <div className="bg-black/90 backdrop-blur-md rounded-2xl py-6 px-4 space-y-6 mt-2 mx-6">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Refer to Earn</span>
                <span className="bg-[#0279d4] text-white text-xs px-2 py-1 rounded-full">
                  £50
                </span>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="block w-full text-center bg-gradient py-3 rounded-full text-white font-semibold shadow hover:opacity-90 transition-all duration-200"
              >
                Get in Touch
              </button>

              {/* Account Dropdown */}
              <div
                ref={mobileAccountDropdownRef}
                onMouseEnter={handleMobileAccountMouseEnter}
                onMouseLeave={handleMobileAccountMouseLeave}
              >
                <button
                  onClick={toggleMobileAccountDropdown}
                  className="flex items-center justify-between w-full text-white transition-colors hover:text-red-400"
                  aria-label="Account options"
                >
                  <span>Account</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      showAccountDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showAccountDropdown && (
                  <div className="pl-2 mt-2 space-y-1">
                    <Link
                      href="/login"
                      onClick={handleLinkClick}
                      className="block text-white text-sm py-2 hover:text-red-400"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={handleLinkClick}
                      className="block text-white text-sm py-2 hover:text-red-400"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileNavbar;
