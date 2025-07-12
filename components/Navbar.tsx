"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  Menu,
  X,
  User,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GetInTouchModal from "./modals/GetInTouchModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  // const pathname = usePathname();

  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const mobileAccountDropdownRef = useRef<HTMLDivElement>(null);

  const accountDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const mobileAccountDropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      const heroHeight = window.innerHeight * 0.8;
      const scrolled = window.scrollY > heroHeight;
      setIsScrolled(scrolled);
      setShowSearch(scrolled);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(e.target as Node) &&
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(e.target as Node)
      ) {
        setShowAccountDropdown(false);
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
      setIsOpen(false);
    }
  };

  if (showLanguageDropdown) return null;

    const handleLinkClick = () => {
      setIsOpen(false);
      setShowAccountDropdown(false);
      setShowLanguageDropdown(false);
    };

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
    setShowLanguageDropdown(false);
  };

  const handleAccountMouseLeave = () => {
    setDropdownTimeout(accountDropdownTimeout, () =>
      setShowAccountDropdown(false)
    );
  };

  const handleMobileAccountMouseEnter = () => {
    clearDropdownTimeout(mobileAccountDropdownTimeout);
    setShowAccountDropdown(true);
    setShowLanguageDropdown(false);
  };

  const handleMobileAccountMouseLeave = () => {
    setDropdownTimeout(mobileAccountDropdownTimeout, () =>
      setShowAccountDropdown(false)
    );
  };

  const toggleMobileAccountDropdown = () => {
    setShowAccountDropdown((prev) => !prev);
    setShowLanguageDropdown(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-black/40 backdrop-blur-md border-b border-white/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex justify-between items-center h-16">
            <div
              className={`flex-shrink-0 hidden md:flex ${
                isScrolled ? "hidden" : "md:flex"
              }`}
            >
              <Link
                href="/"
                onClick={handleLinkClick}
                className="flex-shrink-0"
              >
                <Image
                  src={"/Logo.png"}
                  alt="Go Uninest"
                  height={60}
                  width={60}
                />
              </Link>
            </div>

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
                  >
                    <Search size={16} />
                  </button>
                </form>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6">
                {/* <Link
                  href="/about"
                  className={`hover:text-red-400 font-medium ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/blogs"
                  className={`hover:text-red-400 font-medium ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  Blogs
                </Link> */}

                <button
                  className={`flex items-center space-x-1 bg-gray-200/20 py-2 px-4 rounded-full ${
                    isScrolled
                      ? "border border-gray-300 shadow-none"
                      : "shadow-sm"
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

              {/* Contact buttons */}
              <div
                className={` hidden md:flex gap-1 items-center rounded-full bg-white/20 ${
                  isScrolled
                    ? "border border-gray-300 shadow-none"
                    : "shadow-sm"
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
                    src={
                      isScrolled ? "/whatsapp-color.png" : "/whatsapp-white.png"
                    }
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
                    src={
                      isScrolled ? "/telephone-red.png" : "/telephone-white.png"
                    }
                    alt="telephone"
                    width={23}
                    height={25}
                  />
                </button>
              </div>
              {/* Mobile Menu and Contact Buttons - Right Aligned */}
              <div className="flex items-center space-x-2 md:hidden ml-auto">
                {/* Contact Buttons (always visible on mobile) */}
                <div
                  className={`flex items-center gap-1 rounded-full bg-white/20 ${
                    isScrolled
                      ? "border border-gray-300 shadow-none"
                      : "shadow-sm"
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
                      src={
                        isScrolled
                          ? "/whatsapp-color.png"
                          : "/whatsapp-white.png"
                      }
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
                      src={
                        isScrolled
                          ? "/telephone-red.png"
                          : "/telephone-white.png"
                      }
                      alt="telephone"
                      width={23}
                      height={25}
                    />
                  </button>
                </div>

                {/* Hamburger Menu Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-2 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className={`hidden md:flex px-6 py-2 rounded-full font-medium ${
                  isScrolled
                    ? "bg-gradient text-white"
                    : "bg-gradient text-white"
                }`}
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

          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden px-4">
              <div
                className="bg-black/80 backdrop-blur-md border-t border-white/20 py-5 space-y-5 rounded-2xl shadow-lg"
                role="menu"
              >
                {/* Refer to Earn */}
                <div className="flex items-center justify-between px-4">
                  <span className="text-white font-medium">Refer to Earn</span>
                  <span className="bg-[#0279d4] text-white text-xs px-2 py-1 rounded-full">
                    £50
                  </span>
                </div>
                {/* Get in Touch */}
                <div className="px-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="block w-full text-center bg-gradient py-3 rounded-full text-white font-semibold shadow hover:opacity-90 transition-all duration-200"
                  >
                    Get in Touch
                  </button>
                </div>

                {/* Account Section */}
                <div className="px-4 pt-2 border-t border-white/20">
                  <div
                    className="relative"
                    ref={mobileAccountDropdownRef}
                    onMouseEnter={handleMobileAccountMouseEnter}
                    onMouseLeave={handleMobileAccountMouseLeave}
                  >
                    <button
                      onClick={toggleMobileAccountDropdown}
                      className="flex items-center justify-between w-full text-white py-2 transition-colors hover:text-red-400"
                      role="menuitem"
                      aria-expanded={showAccountDropdown}
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
                          className="block text-white text-sm py-2 transition hover:text-red-400"
                          role="menuitem"
                        >
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          onClick={handleLinkClick}
                          className="block text-white text-sm py-2 transition hover:text-red-400"
                          role="menuitem"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <GetInTouchModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
