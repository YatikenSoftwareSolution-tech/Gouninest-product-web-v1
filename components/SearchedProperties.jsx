// SearchedProperties.js
import React, { useState, useEffect } from "react";
import DetailedPropertyCard from "./DetailedPropertyCard";
import FilterSidebar from "./FilterSidebar";

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

  // Filter properties whenever filters change
  useEffect(() => {
    const filtered = initialProperties.filter((property) => {
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

    setFilteredProperties(filtered);
  }, [filters, initialProperties]);

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

  // Clear all filters
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
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {filterData?.country && filterData?.city ? (
              <>
                Browse Properties in{" "}
                <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent">
                  {filterData.city} - {filterData.country}
                </span>
              </>
            ) : filterData?.country ? (
              <>
                Browse Properties in{" "}
                <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent">
                  {filterData.country}
                </span>
              </>
            ) : (
              <>
                Browse Properties by
                <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent">
                  {" "}
                  Location
                </span>
              </>
            )}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our verified student accommodations across top university
            cities in the UK, Australia, and the USA. Each listing is curated to
            ensure affordability, accessibility, and comfort, no matter where
            you&apos;re headed.
          </p>
        </div>

        {/* <div className=""> */}
          {/* Filter Sidebar - Left Side */}
          <div className="absolute top-1/3 left-40 ">
            <FilterSidebar
              filters={filters}
              onPriceRangeChange={handlePriceRangeChange}
              onCheckboxChange={handleCheckboxChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Property Cards - Right Side */}
          <div className="w-full ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <DetailedPropertyCard
                    key={property._id}
                    property={property}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-10">
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
        {/* </div> */}
      </div>
    </section>
  );
};

export default SearchedProperties;
