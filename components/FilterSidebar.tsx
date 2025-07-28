"use client";

import { useGlobal } from "@/context/GlobalContext";
import { X, Filter, RotateCcw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import "rc-slider/assets/index.css";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { Property } from "@/types/types";

// Add the same currency symbols constant at the top
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

interface FilterSidebarProps {
  filters: {
    priceRange: { min: number; max: number };
    roomTypes: string[];
    moveInMonths: string[];
    propertyTypes: string[];
    services: string[];
    amenities: string[];
  };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  onCheckboxChange: (category: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
  initialProperties: Property[];
}

const FilterSidebar = ({
  filters,
  initialProperties,
  onPriceRangeChange,
  onCheckboxChange,
  onClearFilters,
}: FilterSidebarProps) => {
  const { countryProperty } = useGlobal();
  const [isOpen, setIsOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [countryAmenities, setCountryAmenities] = useState<string[]>([]);

  // const activeCountry = countryProperty?.[0];

  // Get the currency symbol based on country code
  const countryCode = initialProperties?.[0]
    ?.countryCode as keyof typeof CURRENCY_SYMBOLS;

  const currencySymbol = countryCode
    ? CURRENCY_SYMBOLS[countryCode] || "£"
    : "£";

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Calculate max price and amenities from countryProperty[0]
  useEffect(() => {
    const countryData = countryProperty?.[0];

    if (!countryData?.properties || countryData.properties.length === 0) return;

    const prices = countryData.properties.map((p) => p.price || 0);
    const max = Math.max(...prices);
    setMaxPrice(max || 20000);

    const allAmenities = countryData.properties.flatMap(
      (p) => p.amenities || []
    );
    const uniqueAmenities = [...new Set(allAmenities)].sort();
    setCountryAmenities(uniqueAmenities);
  }, [countryProperty]);

  const handlePriceRangeChange = useCallback(
    (range: { min: number; max: number }) => {
      onPriceRangeChange(range);
    },
    [onPriceRangeChange]
  );

  const handleCheckboxToggle =
    (category: string, value: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckboxChange(category, value, e.target.checked);
    };

  return (
    <>
      {/* Toggle button - visible on all screens */}
      <button
        onClick={toggleSidebar}
        className="bg-gradient text-white px-3 sm:px-6 py-2 sm:py-1.5 rounded-xl mb-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 
  sm:sticky absolute sm:mb-4  left-[3%] z-30 cursor-pointer"
      >
        <Filter className="w-5 h-5 mr-0 sm:mr-2" />
        <span className="font-medium hidden sm:inline">Filters</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-brightness-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-50 w-full sm:w-96 bg-white border-r border-gray-200 shadow-2xl h-full overflow-y-auto transition-transform duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient rounded-xl flex items-center justify-center">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Filters</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onClearFilters}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Close filters"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Price Range */}
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100">
            <h4 className="font-semibold mb-4 text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Price Range ({currencySymbol})
            </h4>

            <PriceRangeSlider
              maxPrice={maxPrice}
              selectedRange={filters.priceRange}
              onPriceRangeChange={handlePriceRangeChange}
              currencySymbol={currencySymbol} 
            />
          </div>

          {/* Rest of your filters... */}
          {/* Room Types */}
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100">
            <h4 className="font-semibold mb-4 text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Room Types
            </h4>
            <div className="grid grid-cols-2">
              {[
                { name: "Studio" },
                { name: "En-suite" },
                { name: "Non En-suite" },
                { name: "Shared Room" },
              ].map((room) => (
                <label
                  key={room.name}
                  className="flex items-center justify-between cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 "
                      checked={filters.roomTypes.includes(room.name)}
                      onChange={handleCheckboxToggle("roomTypes", room.name)}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                      {room.name}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Move In Month */}
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100">
            <h4 className="font-semibold mb-4 text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              Move In Month
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <label
                  key={month}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 "
                    checked={filters.moveInMonths.includes(month)}
                    onChange={handleCheckboxToggle("moveInMonths", month)}
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {month}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Property Types */}
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100">
            <h4 className="font-semibold mb-4 text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
              Property Types
            </h4>
            <div className="space-y-3">
              {[
                "Purpose Built Student Accommodation",
                "Shared House",
                "Apartment",
                "Homestay",
                "Hotel/Hostel",
              ].map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 "
                    checked={filters.propertyTypes.includes(type)}
                    onChange={handleCheckboxToggle("propertyTypes", type)}
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100">
            <h4 className="font-semibold mb-4 text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
              Services
            </h4>
            <div className="space-y-3 grid grid-cols-2">
              {[
                "No Service Fee",
                "Free WiFi",
                "Cleaning Service",
                "Maintenance",
                "Reception Service",
                "Laundry Service",
              ].map((service) => (
                <label
                  key={service}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 "
                    checked={filters.services.includes(service)}
                    onChange={handleCheckboxToggle("services", service)}
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                    {service}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities */}
          {countryAmenities.length > 0 && (
            <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100">
              <h4 className="font-semibold mb-4 text-gray-800 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Amenities
              </h4>
              <div className="space-y-3 grid grid-cols-2">
                {countryAmenities.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600"
                      checked={filters.amenities.includes(amenity)}
                      onChange={handleCheckboxToggle("amenities", amenity)}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Clear Button */}
          <button
            onClick={onClearFilters}
            className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium py-3 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear All Filters</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
