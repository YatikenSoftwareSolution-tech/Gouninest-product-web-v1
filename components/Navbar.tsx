"use client";
import React, { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import GetInTouchModal from "./modals/GetInTouchModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(!isHomePage);
  

    // Always start with true for non-home pages, then respect scroll for home page
  
    useEffect(() => {
      if (isHomePage) {
        setIsScrolled(isScrolled);
      } else {
        setIsScrolled(true);
      }
    }, [isScrolled, isHomePage]);

  const handleScroll = useCallback(() => {
    if (typeof document !== "undefined") {
      const heroHeight = (document.documentElement.clientHeight || 0) * 0.8;
      const scrolled = (document.documentElement.scrollTop || document.body.scrollTop) > heroHeight;
      setIsScrolled(scrolled);
      setShowSearch(scrolled);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("scroll", handleScroll);
      return () => document.removeEventListener("scroll", handleScroll);
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

  return (
    <>
      <nav style={{ zIndex: 90 }}
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
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
              setShowModal={setShowModal}
            />
          </div>
        </div>
      </nav>
      <GetInTouchModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
