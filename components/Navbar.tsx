"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import GetInTouchModal from "./modals/GetInTouchModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

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
        <div>
          <div className="hidden md:flex">
            <DesktopNavbar
              isScrolled={isScrolled}
              showSearch={showSearch}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              handleSearch={handleSearch}
              showAccountDropdown={showAccountDropdown}
              setShowAccountDropdown={setShowAccountDropdown}
              setShowModal={setShowModal}
            />
          </div>
          <div className="md:hidden">
            <MobileNavbar
              isScrolled={isScrolled}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              handleSearch={handleSearch}
              showAccountDropdown={showAccountDropdown}
              setShowAccountDropdown={setShowAccountDropdown}
              setShowModal={setShowModal}
              handleLinkClick={handleLinkClick}
            />
          </div>
        </div>
      </nav>
      <GetInTouchModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
