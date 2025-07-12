"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ChevronDown } from "lucide-react";

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
  const accountDropdownTimeout = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <div className="w-full fixed top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-5 h-20 flex items-center justify-between pb-4">
        <div
          className={`flex-shrink-0 hidden md:flex ${
            isScrolled ? "hidden" : "md:flex"
          }`}
        >
          <Link href="/" className="flex-shrink-0">
            <Image src={"/Logo.png"} alt="Go Uninest" height={60} width={60} />
          </Link>
        </div>

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

        <div className="flex items-center space-x-4">
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

          <div
            className={`hidden md:flex gap-1 items-center rounded-full bg-white/20 ${
              isScrolled ? "border border-gray-300 shadow-none" : "shadow-sm"
            }`}
          >
            <button
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
            </button>
            <button
              className={`rounded-r-full py-2 pl-1 pr-3 ${
                !isScrolled
                  ? "hover:bg-red-400 transition-colors duration-200"
                  : "hover:bg-red-200"
              }`}
            >
              <Image
                src={isScrolled ? "/telephone-red.png" : "/telephone-white.png"}
                alt="telephone"
                width={23}
                height={25}
              />
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className={`hidden md:flex px-6 py-2 rounded-full font-medium ${
              isScrolled ? "bg-gradient text-white" : "bg-gradient text-white"
            }`}
          >
            Get in Touch
          </button>

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
              <div className="absolute right-0 mt-14 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
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
