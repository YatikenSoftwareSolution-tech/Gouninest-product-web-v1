"use client";
import React, { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import GetInTouchModal from "./modals/GetInTouchModal";
import {
  fetchLocationCountInCountries,
  fetchPropertiesCountInLocations,
  fetchTopProperties,
  fetchUniversities,
} from "@/constants/api";
import {
  CountryCityPropertyCount,
  CountryLocationCount,
  CountryPropertyCount,
  Universities,
} from "@/types/types";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
 const normalizedPath = pathname.replace(/\/$/, ""); // remove trailing slash if exists
 const isHomePage = normalizedPath === "";
 const isReferPage = normalizedPath === "/refer-earn";
 const [isScrolled, setIsScrolled] = useState(false);

  // These hold your fetched data
  const [countryProperty, setCountryProperty] = useState<
    CountryPropertyCount[]
  >([]);
  const [locations, setLocations] = useState<CountryCityPropertyCount[]>([]);
  const [countries, setCountries] = useState<CountryLocationCount[]>([]);
  const [universities, setUniversities] = useState<Universities[]>([]);

  useEffect(() => {
    Promise.all([
      fetchLocationCountInCountries(),
      fetchPropertiesCountInLocations(),
      fetchTopProperties(),
      fetchUniversities(),
    ]).then(
      ([countriesData, locationsData, propertyData, universitiesData]) => {
        setCountries(countriesData as CountryLocationCount[]);
        setLocations(locationsData as CountryCityPropertyCount[]);
        setCountryProperty(propertyData as CountryPropertyCount[]);
        setUniversities(universitiesData as Universities[]);
      }
    );
  }, []);

  useEffect(() => {
    if (isHomePage || isReferPage) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };

      handleScroll(); // check immediately on mount
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [isHomePage, isReferPage]);


  const handleScroll = useCallback(() => {
    const heroHeight = (document.documentElement.clientHeight || 0) * 0.8;
    const scrolled =
      (document.documentElement.scrollTop || document.body.scrollTop) >
      heroHeight;
    setIsScrolled(scrolled);
    setShowSearch(scrolled);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
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
      <nav
        style={{ zIndex: 90 }}
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-black/40 backdrop-blur-md border-b border-white/20"
        }`}
      >
        <div>
          <div className="hidden md:flex">
            <DesktopNavbar
              showSearch={showSearch}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setShowModal={setShowModal}
              countryProperty={countryProperty}
              locations={locations}
              countries={countries}
              universities={universities}
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
              countryProperty={countryProperty}
              locations={locations}
              countries={countries}
              universities={universities}
            />
          </div>
        </div>
      </nav>
      <GetInTouchModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
