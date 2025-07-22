import React, { useState, useEffect } from "react";
import DetailedPropertyCard from "./DetailedPropertyCard";
import FilterSidebar from "./FilterSidebar";
import { ChevronDown } from "lucide-react";

const SearchedProperties = ({ properties: initialProperties, filterData }) => {
  // State for filtered properties
  const [filteredProperties, setFilteredProperties] =
    useState(initialProperties);
  // State for all filter criteria
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 15000 },
    durations: [],
    roomTypes: [],
    moveInMonths: [],
    propertyTypes: [],
    services: [],
    amenities: [],
    locationFeatures: [],
  });
  // State for sorting
  const [sortOption, setSortOption] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Sort options
  const sortOptions = [
    { value: "lowest", label: "Lowest price" },
    { value: "highest", label: "Highest price" },
    { value: "most-reviewed", label: "Most reviewed" },
  ];

  // Filter and sort properties whenever filters or sort option changes
  useEffect(() => {
    let filtered = [...initialProperties];

    // Apply filters
    filtered = filtered.filter((property) => {
      // Price range filter
      if (
        property.price < filters.priceRange.min ||
        property.price > filters.priceRange.max
      ) {
        return false;
      }

      // Duration filter
      if (
        filters.durations.length > 0 &&
        !filters.durations.includes(property.duration)
      ) {
        return false;
      }

      // Room type filter
      if (
        filters.roomTypes.length > 0 &&
        !filters.roomTypes.includes(property.roomType)
      ) {
        return false;
      }

      // Move-in month filter
      if (filters.moveInMonths.length > 0) {
        const propertyMoveInMonth = new Date(
          property.moveInDate
        ).toLocaleString("default", { month: "long" });
        if (!filters.moveInMonths.includes(propertyMoveInMonth)) {
          return false;
        }
      }

      // Property type filter
      if (
        filters.propertyTypes.length > 0 &&
        !filters.propertyTypes.includes(property.propertyType)
      ) {
        return false;
      }

      // Services filter
      if (
        filters.services.length > 0 &&
        !filters.services.some((service) => property.services.includes(service))
      ) {
        return false;
      }

      // Amenities filter
      if (
        filters.amenities.length > 0 &&
        !filters.amenities.every((amenity) =>
          property.amenities.includes(amenity)
        )
      ) {
        return false;
      }

      // Location features filter
      if (
        filters.locationFeatures.length > 0 &&
        !filters.locationFeatures.every((feature) =>
          property.locationFeatures.includes(feature)
        )
      ) {
        return false;
      }

      return true;
    });

    // Apply sorting
    filtered = sortProperties(filtered, sortOption);

    setFilteredProperties(filtered);
  }, [filters, initialProperties, sortOption]);

  // Sort properties based on selected option
  const sortProperties = (properties, option) => {
    const sorted = [...properties];

    switch (option) {
      case "lowest":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "highest":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "most-reviewed":
        sorted.sort(
          (a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0)
        );
        break;
      default:
        // Default sorting (no change)
        break;
    }

    return sorted;
  };

  // Handle price range change
  const handlePriceRangeChange = (newPriceRange) => {
    setFilters((prev) => ({ ...prev, priceRange: newPriceRange }));
  };

  // Handle checkbox changes for different filter categories
  const handleCheckboxChange = (category, value, isChecked) => {
    setFilters((prev) => {
      const newValues = isChecked
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value);

      return { ...prev, [category]: newValues };
    });
  };

  // Clear all filters and sorting
  const clearFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 15000 },
      durations: [],
      roomTypes: [],
      moveInMonths: [],
      propertyTypes: [],
      services: [],
      amenities: [],
      locationFeatures: [],
    });
    setSortOption("");
  };

  // Handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  const renderHeading = () => {
    if (filterData.country && filterData.city) {
      return (
        <>
          Browse Properties in{" "}
          <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent">
            {filterData.city} - {filterData.country}
          </span>
        </>
      )
    } else if (filterData.country) {
      return (<>
        Browse Properties in{" "}
        <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent">
          {filterData.country}
        </span>
      </>)
    } else if (filterData.university) {
      return (<>
        Browse Properties near{" "}
        <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent">
          {filterData.university}
        </span>
      </>)
    } else {
      return (
        <>
          Browse Properties by
          <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent">
            {" "}
            Location
          </span>
        </>
      )
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">

          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our verified student accommodations across top university
            cities in the UK, Australia, and the USA. Each listing is curated to
            ensure affordability, accessibility, and comfort, no matter where
            you&apos;re headed.
          </p>
        </div>

        <div className="flex flex-col ">
          <div className="flex justify-between md:mb-0 mb-6">
            {/* Left Sidebar */}
            <div className="">
              <FilterSidebar
                filters={filters}
                initialProperties={initialProperties}
                onPriceRangeChange={handlePriceRangeChange}
                onCheckboxChange={handleCheckboxChange}
                onClearFilters={clearFilters}
              />
            </div>
            {/* Sort Bar */}
            <div className="flex justify-end">
              <div className="relative w-[150px]">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100  cursor-pointer"
                >
                  {sortOption
                    ? sortOptions.find((opt) => opt.value === sortOption)?.label
                    : "Sort by"}
                  <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform ${isSortOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isSortOpen && (
                  <div className="absolute z-40 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`block w-full px-4 py-2 text-sm text-left cursor-pointer ${sortOption === option.value
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full space-y-3">
            {/* Property Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <DetailedPropertyCard
                    key={property._id}
                    property={property}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <h3 className="text-xl font-semibold text-gray-700">
                    No properties match your filters
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchedProperties;
