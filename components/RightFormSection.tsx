"use client";
import React, { useState } from "react";
import { Property } from "@/types/types";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface RightFormSectionProps {
  selectedProperty: Property;
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

// Static currency symbols by country
const CURRENCY_SYMBOLS = {
  GB: "£",
  AU: "A$",
  US: "$",
  IE: "€",
  NZ: "NZ$",
  CA: "C$",
  DE: "€",
  FR: "€",
  NL: "€",
} as const;

const countries = [
  { code: "IN", dial_code: "+91", name: "India" },
  { code: "US", dial_code: "+1", name: "United States" },
  { code: "GB", dial_code: "+44", name: "United Kingdom" },
  { code: "AU", dial_code: "+61", name: "Australia" },
  { code: "CA", dial_code: "+1", name: "Canada" },
  { code: "IE", dial_code: "+353", name: "Ireland" },
  { code: "NZ", dial_code: "+64", name: "New Zealand" },
  { code: "DE", dial_code: "+49", name: "Germany" },
  { code: "FR", dial_code: "+33", name: "France" },
  { code: "NL", dial_code: "+31", name: "Netherlands" },
  { code: "SG", dial_code: "+65", name: "Singapore" },
  { code: "ZA", dial_code: "+27", name: "South Africa" },
  { code: "AE", dial_code: "+971", name: "United Arab Emirates" },
  { code: "SA", dial_code: "+966", name: "Saudi Arabia" },
  { code: "CN", dial_code: "+86", name: "China" },
  { code: "JP", dial_code: "+81", name: "Japan" },
  { code: "KR", dial_code: "+82", name: "South Korea" },
  { code: "BR", dial_code: "+55", name: "Brazil" },
  { code: "RU", dial_code: "+7", name: "Russia" },
  { code: "MX", dial_code: "+52", name: "Mexico" },
  { code: "ES", dial_code: "+34", name: "Spain" },
  { code: "IT", dial_code: "+39", name: "Italy" },
  { code: "SE", dial_code: "+46", name: "Sweden" },
  { code: "CH", dial_code: "+41", name: "Switzerland" },
  { code: "BE", dial_code: "+32", name: "Belgium" },
  { code: "NO", dial_code: "+47", name: "Norway" },
  { code: "FI", dial_code: "+358", name: "Finland" },
  { code: "DK", dial_code: "+45", name: "Denmark" },
  { code: "AT", dial_code: "+43", name: "Austria" },
  { code: "PL", dial_code: "+48", name: "Poland" },
  { code: "PT", dial_code: "+351", name: "Portugal" },
  { code: "AR", dial_code: "+54", name: "Argentina" },
  { code: "TH", dial_code: "+66", name: "Thailand" },
  { code: "MY", dial_code: "+60", name: "Malaysia" },
  { code: "ID", dial_code: "+62", name: "Indonesia" },
  { code: "TR", dial_code: "+90", name: "Turkey" },
  { code: "NG", dial_code: "+234", name: "Nigeria" },
  { code: "KE", dial_code: "+254", name: "Kenya" },
  { code: "EG", dial_code: "+20", name: "Egypt" },
  { code: "BD", dial_code: "+880", name: "Bangladesh" },
  { code: "PK", dial_code: "+92", name: "Pakistan" },
  { code: "LK", dial_code: "+94", name: "Sri Lanka" },
];


const getFlagUrl = (code: string) =>
  `https://flagcdn.com/w40/${code.toLowerCase()}.jpg`;

const RightFormSection: React.FC<RightFormSectionProps> = ({
  selectedProperty,
  formData,
  handleChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  // Read countryCode directly from selectedProperty
  const countryCode =
    selectedProperty.countryCode as keyof typeof CURRENCY_SYMBOLS;
  const symbol = CURRENCY_SYMBOLS[countryCode] || "£";

  const weeklyPrice = selectedProperty.price ?? 313;
  const advanceRent = selectedProperty.advanceRent ?? 185;
  const monthlyPrice = weeklyPrice * 4;

  const format = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dial_code.includes(searchTerm)
  );

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 lg:sticky lg:top-4 h-fit">
      <div className="mb-4 sm:mb-6">
        <div className="text-xl sm:text-2xl font-bold">
          {symbol}
          {format(weeklyPrice)} /week
        </div>
        <div className="text-lg font-semibold mt-1">
          {symbol}
          {format(monthlyPrice)} /month
        </div>
        <div className="text-xs sm:text-sm text-gray-600 mt-1">
          Advance rent {symbol}
          {format(advanceRent)}
        </div>
      </div>

      <form className="space-y-3 sm:space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-xs sm:text-sm font-medium mb-1"
          >
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-xs sm:text-sm font-medium mb-1"
          >
            Last Name*
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs sm:text-sm font-medium mb-1"
          >
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-xs sm:text-sm font-medium mb-1"
          >
            Phone Number*
          </label>
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 transition-all">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border-r border-gray-300 min-w-[120px]"
              >
                <Image
                  src={getFlagUrl(selectedCountry.code)}
                  alt={selectedCountry.name}
                  width={20}
                  height={15}
                  className="h-4 w-6 object-cover rounded-sm"
                />
                <span className="text-sm text-gray-700">
                  {selectedCountry.dial_code}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="flex-1 p-2 text-sm focus:outline-none"
                required
              />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full z-50">
                <div className="bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-auto">
                  <div className="p-2 border-b sticky top-0 bg-white z-10">
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                      autoFocus
                    />
                  </div>
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCountry(country);
                        setIsDropdownOpen(false);
                        setSearchTerm("");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50"
                    >
                      <Image
                        src={getFlagUrl(country.code)}
                        alt={country.name}
                        width={20}
                        height={15}
                        className="h-4 w-6 object-cover rounded-sm"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {country.name}
                      </span>
                      <span className="text-sm text-gray-500 ml-auto">
                        {country.dial_code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {isDropdownOpen && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mt-1 mr-2"
            />
            <label htmlFor="agreeTerms" className="text-xs text-gray-600">
              (Optional) agree to the platform transferring my information...
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreePrivacy"
              name="agreePrivacy"
              checked={formData.agreePrivacy}
              onChange={handleChange}
              className="mt-1 mr-2"
              required
            />
            <label htmlFor="agreePrivacy" className="text-xs text-gray-600">
              I agree to the Privacy Policy and User Agreement.
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base cursor-pointer"
        >
          Find My Home
        </button>
      </form>
    </div>
  );
};

export default RightFormSection;
