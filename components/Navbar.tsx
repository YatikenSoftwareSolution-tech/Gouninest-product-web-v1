"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search, Menu, X, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [searchValue, setSearchValue] = useState("");
 const [showSearch, setShowSearch] = useState(false);
 const [showAccountDropdown, setShowAccountDropdown] = useState(false);
 const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
 const [isScrolled, setIsScrolled] = useState(false);
 const router = useRouter();
 const pathname = usePathname();

 const accountDropdownRef = useRef<HTMLDivElement>(null);
 const languageDropdownRef = useRef<HTMLDivElement>(null);
 const mobileAccountDropdownRef = useRef<HTMLDivElement>(null);
//  const mobileLanguageDropdownRef = useRef<HTMLDivElement>(null);

 const accountDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
//  const languageDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
 const mobileAccountDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
//  const mobileLanguageDropdownTimeout = useRef<NodeJS.Timeout | null>(null);

//  const languages = [
//    { code: "en", name: "English", flag: "🇬🇧" },
//    { code: "ge", name: "German", flag: "🇩🇪" },
//    { code: "fr", name: "French", flag: "🇫🇷" },
//    { code: "nl", name: "Dutch", flag: "🇳🇱" },
//    { code: "sv", name: "Swedish", flag: "🇸🇪" },
//    { code: "ir", name: "Irish", flag: "🇮🇪" },
//  ];

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

 const handleSearch = (e: React.FormEvent) => {
   e.preventDefault();
   if (searchValue.trim()) {
     router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
     setSearchValue("");
     setIsOpen(false);
   }
 };

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

//  const handleLanguageMouseEnter = () => {
//    clearDropdownTimeout(languageDropdownTimeout);
//    setShowLanguageDropdown(true);
//    setShowAccountDropdown(false);
//  };

//  const handleLanguageMouseLeave = () => {
//    setDropdownTimeout(languageDropdownTimeout, () =>
//      setShowLanguageDropdown(false)
//    );
//  };

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

//  const handleMobileLanguageMouseEnter = () => {
//    clearDropdownTimeout(mobileLanguageDropdownTimeout);
//    setShowLanguageDropdown(true);
//    setShowAccountDropdown(false);
//  };

//  const handleMobileLanguageMouseLeave = () => {
//    setDropdownTimeout(mobileLanguageDropdownTimeout, () =>
//      setShowLanguageDropdown(false)
//    );
//  };

 const toggleMobileAccountDropdown = () => {
   setShowAccountDropdown((prev) => !prev);
   setShowLanguageDropdown(false);
 };

//  const toggleMobileLanguageDropdown = () => {
//    setShowLanguageDropdown((prev) => !prev);
//    setShowAccountDropdown(false);
//  };

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
  
  if (!showLanguageDropdown) {
    <p>Loading...</p>
  }
    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-black/40 backdrop-blur-md border-b border-white/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            <div className="hidden md:flex items-center space-x-6">
              <Link
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
              </Link>

              <button className="flex items-center space-x-1 bg-gray-200/20 py-2 px-4 rounded-full">
                <span
                  className={`font-medium ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  Refer to Earn
                </span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  £5
                </span>
              </button>

              <Link
                href="/contacts"
                className={`px-6 py-2 rounded-full font-medium ${
                  isScrolled
                    ? "bg-gradient text-white border border-red-500"
                    : "bg-gradient text-white border border-red-500/30"
                }`}
              >
                Get in Touch
              </Link>

              {/* Account Dropdown */}
              <div
                className="relative dropdown-container"
                ref={accountDropdownRef}
                onMouseEnter={handleAccountMouseEnter}
                onMouseLeave={handleAccountMouseLeave}
              >
                <button
                  className={`flex items-center space-x-1 p-2 rounded-full ${
                    isScrolled
                      ? "text-gray-800 hover:bg-gray-100"
                      : "text-white hover:bg-white hover:text-gray-800"
                  }`}
                >
                  <User size={20} />
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      showAccountDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showAccountDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
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

              {/* Language Dropdown */}
              {/* <div
              className="relative dropdown-container"
              ref={languageDropdownRef}
              onMouseEnter={handleLanguageMouseEnter}
              onMouseLeave={handleLanguageMouseLeave}
            >
              <button
                className={`flex items-center space-x-1 p-2 rounded-full ${
                  isScrolled
                    ? "text-gray-800 hover:bg-gray-100"
                    : "text-white hover:bg-white hover:text-gray-800"
                }`}
              >
                <Globe size={20} />
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    showLanguageDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-gray-800 hover:bg-red-50"
                      onClick={() => setShowLanguageDropdown(false)}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div> */}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden">
              <div
                className="bg-black/80 backdrop-blur-md border-t border-white/20 py-4 space-y-4 rounded-xl mb-2"
                role="menu"
              >
                {/* Navigation Links */}
                <div className="space-y-2 px-4">
                  <Link
                    href="/about"
                    onClick={handleLinkClick}
                    className="block text-white hover:text-red-400 transition-colors font-medium py-2 focus:text-red-400 focus:outline-none"
                    role="menuitem"
                    aria-current={pathname === "/about" ? "page" : undefined}
                  >
                    About
                  </Link>
                  <Link
                    href="/blogs"
                    onClick={handleLinkClick}
                    className="block text-white hover:text-red-400 transition-colors font-medium py-2 focus:text-red-400 focus:outline-none"
                    role="menuitem"
                    aria-current={pathname === "/blogs" ? "page" : undefined}
                  >
                    Blogs
                  </Link>
                </div>

                {/* Refer to Earn */}
                <div className="flex items-center justify-between px-4">
                  <span className="text-white font-medium">Refer to Earn</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    £50
                  </span>
                </div>

                {/* Get in Touch Button */}
                <div className="px-4">
                  <Link
                    href="/contacts"
                    className="w-full bg-gradient backdrop-blur-sm text-white py-3 rounded-full transition-all font-medium border border-red-500/30 block text-center"
                    role="menuitem"
                  >
                    Get in Touch
                  </Link>
                </div>

                {/* Account Section */}
                <div className="px-4 pt-2 border-t border-white/20">
                  <div
                    className="relative dropdown-container"
                    ref={mobileAccountDropdownRef}
                    onMouseEnter={handleMobileAccountMouseEnter}
                    onMouseLeave={handleMobileAccountMouseLeave}
                  >
                    <button
                      onClick={toggleMobileAccountDropdown}
                      className="flex items-center justify-between w-full text-white hover:text-red-400 transition-colors py-2 focus:text-red-400 focus:outline-none"
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
                      <div className="pl-4 mt-2 space-y-2">
                        <Link
                          href="/login"
                          onClick={handleLinkClick}
                          className="block text-white hover:text-red-400 transition-colors py-2 focus:text-red-400 focus:outline-none"
                          role="menuitem"
                        >
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          onClick={handleLinkClick}
                          className="block text-white hover:text-red-400 transition-colors py-2 focus:text-red-400 focus:outline-none"
                          role="menuitem"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Language Selection */}
                {/* <div className="px-4 pt-2 border-t border-white/20">
                <div
                  className="relative dropdown-container"
                  ref={mobileLanguageDropdownRef}
                  onMouseEnter={handleMobileLanguageMouseEnter}
                  onMouseLeave={handleMobileLanguageMouseLeave}
                >
                  <button
                    onClick={toggleMobileLanguageDropdown}
                    className="flex items-center justify-between w-full text-white hover:text-red-400 transition-colors py-2 focus:text-red-400 focus:outline-none"
                    role="menuitem"
                    aria-expanded={showLanguageDropdown}
                  >
                    <span>Language</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        showLanguageDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showLanguageDropdown && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            handleLinkClick();
                          }}
                          className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors py-2 focus:text-red-400 focus:outline-none"
                          role="menuitem"
                        >
                          <span>{lang.flag}</span>
                          <span className="text-sm">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div> */}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
};

export default Navbar;
