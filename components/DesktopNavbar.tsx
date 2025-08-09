"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HeaderSearch from "./HeaderSearch";
import {
  CountryCityPropertyCount,
  CountryLocationCount,
  CountryPropertyCount,
  Universities,
} from "@/types/types";

interface Contact {
  code: string;
  dial: string;
  flag: string;
}

interface Whatsapp {
  code: string;
  dial: string;
  flag: string;
}

interface DesktopNavbarProps {
  isScrolled: boolean;
  showSearch: boolean;
  setShowModal: (value: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  countryProperty: CountryPropertyCount[];
  locations: CountryCityPropertyCount[];
  countries: CountryLocationCount[];
  universities: Universities[];
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  isScrolled: initialIsScrolled,
  showSearch,
  setShowModal,
  countries,
  locations,
  universities,
  countryProperty,
}) => {
  const pathname = usePathname();
  const phoneDropdownRef = useRef<HTMLDivElement>(null);
  const whatsappDropdownRef = useRef<HTMLDivElement>(null);
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [showWhatsappDropdown, setShowWhatsappDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(!isHomePage);

  useEffect(() => {
    if (isHomePage) {
      setIsScrolled(initialIsScrolled);
    } else {
      setIsScrolled(true);
    }
  }, [initialIsScrolled, isHomePage]);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        phoneDropdownRef.current &&
        !phoneDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPhoneDropdown(false);
      }
      if (
        whatsappDropdownRef.current &&
        !whatsappDropdownRef.current.contains(event.target as Node)
      ) {
        setShowWhatsappDropdown(false);
      }
    };

    if (showPhoneDropdown || showWhatsappDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPhoneDropdown, showWhatsappDropdown]);

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

  const whatsappNumbers: Whatsapp[] = [
    {
      code: "US",
      dial: "+14452711271",
      flag: "us",
    },
    {
      code: "GB",
      dial: "+442079933000",
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
        {(showSearch || !isHomePage) && (
          <div className="flex flex-1 max-w-2xl mx-8 relative">
            <HeaderSearch
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              countries={countries}
              locations={locations}
              universities={universities}
              countryProperty={countryProperty}
            />
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
            {/* WhatsApp Dropdown */}
            <div className="relative" ref={whatsappDropdownRef}>
              <button
                onClick={() => setShowWhatsappDropdown(!showWhatsappDropdown)}
                className={`rounded-l-full py-2 pr-1 pl-3 ${
                  isScrolled ? "hover:bg-green-200" : "hover:bg-green-600"
                } transition-colors duration-200`}
                aria-label="Select WhatsApp number"
              >
                <Image
                  src={
                    isScrolled ? "/whatsapp-color.png" : "/whatsapp-white.png"
                  }
                  alt="whatsapp"
                  width={23}
                  height={25}
                  style={{ width: 30, height: "auto" }}
                />
              </button>

              {showWhatsappDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="max-h-60 overflow-y-auto">
                    {whatsappNumbers.map((contact, index) => (
                      <Link
                        key={`whatsapp-${index}`}
                        href={`https://wa.me/${contact.dial}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowWhatsappDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-lime-100 transition-colors hover:rounded-lg"
                      >
                        <Image
                          src={`https://flagcdn.com/w40/${contact.flag}.jpg`}
                          alt={contact.code}
                          width={20}
                          height={15}
                          className="h-4 w-6 object-cover rounded-sm"
                        />
                        <span className="text-sm text-gray-800 font-medium">
                          {contact.dial?.replace(
                            /(\d{2})(\d{4})(\d{4})/,
                            "$1 $2 $3"
                          )}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
                  width={25}
                  height={25}
                />
              </button>

              {showPhoneDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="max-h-60 overflow-y-auto">
                    {contacts.map((contact, index) => (
                      <Link
                        key={index}
                        href={`tel:${contact.dial.replace(/\s/g, "")}`}
                        onClick={() => setShowPhoneDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-lime-100 transition-colors hover:rounded-lg"
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
                      </Link>
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

          {/* Exclusive Offers - redirect to whatsapp*/}
          <div className="hidden md:flex">
            <Link
              href="https://wa.me/+442079933000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 bg-gradient-to-r from-[var(--color-electric-500)] to-lime-600 py-2 px-4 rounded-full shadow-sm"
            >
              <span className="font-medium text-white">Exclusive Offers</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
