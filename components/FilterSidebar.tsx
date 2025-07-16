"use client";

import { useGlobal } from "@/context/GlobalContext";
import { X, Filter, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

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
}

const FilterSidebar = ({
  filters,
  onPriceRangeChange,
  onCheckboxChange,
  onClearFilters,
}: FilterSidebarProps) => {
  const { countryProperty } = useGlobal();
  const [isOpen, setIsOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState({
    min: 0,
    max: 20000,
  });
  const [maxPrice, setMaxPrice] = useState(20000);
  const [countryAmenities, setCountryAmenities] = useState<string[]>([]);

  // Get the active country (first in array)
  const activeCountry = countryProperty?.[0];

  // Get currency symbol
  // const countryCode = activeCountry?.country || "GB";
  const currencySymbol = "£";

  // Update max price and amenities when country properties change
  useEffect(() => {
    if (!activeCountry?.properties || activeCountry.properties.length === 0) {
      return;
    }

    const prices = activeCountry.properties.map((p) => p.price || 0);
    const max = Math.max(...prices);
    setMaxPrice(max || 20000); // fallback

    const allAmenities = activeCountry.properties.flatMap(
      (p) => p.amenities || []
    );
    const uniqueAmenities = [...new Set(allAmenities)].sort();
    setCountryAmenities(uniqueAmenities);
  }, [activeCountry]);

  // Sync local state with props
  useEffect(() => {
    setLocalPriceRange({
      min: filters.priceRange.min,
      max: filters.priceRange.max,
    });
  }, [filters.priceRange]);

  // Update local max price when maxPrice changes
  useEffect(() => {
    setLocalPriceRange((prev) => ({
      min: Math.min(prev.min, maxPrice),
      max: Math.min(prev.max, maxPrice),
    }));
  }, [maxPrice]);

  const onClose = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const handlePriceInputChange = (type: "min" | "max", value: string) => {
    const numValue = value === "" ? 0 : parseInt(value.replace(/\D/g, "")) || 0;
    const clampedValue = Math.min(Math.max(numValue, 0), maxPrice);

    const updatedPriceRange = {
      ...localPriceRange,
      [type]: clampedValue,
    };

    // Ensure min doesn't exceed max and vice versa
    if (type === "min" && clampedValue > updatedPriceRange.max) {
      updatedPriceRange.max = clampedValue;
    } else if (type === "max" && clampedValue < updatedPriceRange.min) {
      updatedPriceRange.min = clampedValue;
    }

    setLocalPriceRange(updatedPriceRange);
    onPriceRangeChange(updatedPriceRange);
  };

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = parseInt(e.target.value);
    const updatedPriceRange = {
      ...localPriceRange,
      [type]: value,
    };

    // Ensure min doesn't exceed max and vice versa
    if (type === "min" && value > updatedPriceRange.max) {
      updatedPriceRange.max = value;
    } else if (type === "max" && value < updatedPriceRange.min) {
      updatedPriceRange.min = value;
    }

    setLocalPriceRange(updatedPriceRange);
    onPriceRangeChange(updatedPriceRange);
  };

  const handleCheckboxToggle =
    (category: string, value: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckboxChange(category, value, e.target.checked);
    };

  // Calculate the progress for the range slider background
  const minPercent = (localPriceRange.min / maxPrice) * 100;
  const maxPercent = (localPriceRange.max / maxPrice) * 100;

  return (
    <>
      {/* Toggle button - visible on all screens */}
      <button
        onClick={toggleSidebar}
        className="bg-gradient text-white px-6 py-1.5 rounded-xl mb-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 
  sm:sticky absolute sm:mb-4 top-28 -left-36 z-50"
      >
        <Filter className="w-5 h-5 mr-2" />
        <span className="font-medium">Filters</span>
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
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Price Range */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h4 className="font-semibold mb-1 text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Price Range ({currencySymbol})
            </h4>

            <div className="space-y-1">
              <div className="relative h-10 flex items-center w-[280px]">
                <div className="relative w-[300px]">
                  {/* Hidden input sliders for functionality */}
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={localPriceRange.min}
                    onChange={(e) => handleSliderChange(e, "min")}
                    className="absolute w-[300px] pointer-events-none appearance-none h-2 z-20 opacity-0"
                  />
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={localPriceRange.max}
                    onChange={(e) => handleSliderChange(e, "max")}
                    className="absolute w-[300px] pointer-events-none appearance-none h-2 z-20 opacity-0"
                  />

                  {/* Visual track */}
                  <div className="absolute w-full h-2 bg-gray-200 rounded-full z-10 top-1/2 transform -translate-y-1/2"></div>

                  {/* Active range */}
                  <div
                    className="w-[300px] absolute h-2 bg-blue-500 rounded-full z-10 top-1/2 transform -translate-y-1/2"
                    style={{
                      left: `${minPercent}%`,
                      width: `${maxPercent - minPercent}%`,
                    }}
                  ></div>

                  {/* Thumb handles */}
                  <div
                    className="absolute w-4 h-4 bg-blue-600 rounded-full z-20 top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-sm border-2 border-white"
                    style={{ left: `${minPercent}%` }}
                  ></div>
                  <div
                    className="absolute w-4 h-4 bg-blue-600 rounded-full z-20 top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-sm border-2 border-white"
                    style={{ left: `${maxPercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4">
                <div className="flex items-center space-x-2 relative">
                  <label className="absolute top-1 left-2 block text-xs font-medium text-gray-600">
                    Minimum
                  </label>
                  <div className="relative flex items-center justify-center">
                    <span className="absolute left-2 top-1/2 pt-2.5 transform -translate-y-1/2 text-gray-800">
                      {currencySymbol}
                    </span>
                    <input
                      type="text"
                      value={localPriceRange.min.toLocaleString()}
                      onChange={(e) =>
                        handlePriceInputChange("min", e.target.value)
                      }
                      className="w-24 pl-6 h-[45px] pt-2.5 border border-gray-300 rounded-md outline-none text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 relative">
                  <label className="absolute top-1 left-2  block text-xs font-medium text-gray-600">
                    Maximum
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 pt-2.5 transform -translate-y-1/2 text-gray-800">
                      {currencySymbol}
                    </span>
                    <input
                      type="text"
                      value={localPriceRange.max.toLocaleString()}
                      onChange={(e) =>
                        handlePriceInputChange("max", e.target.value)
                      }
                      className="w-24 h-[45px] pl-6 pt-2.5 text-sm border border-gray-300 rounded-md text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of your existing components... */}
          {/* Room Types */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
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
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
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
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
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
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
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
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
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
