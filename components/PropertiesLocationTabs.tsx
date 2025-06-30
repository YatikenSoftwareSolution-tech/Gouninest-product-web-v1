"use client";
import DetailedPropertyCard from "./DetailedPropertyCard";
import { useGlobal } from "@/context/GlobalContext";

const PropertiesLocationTabs = () => {
  const { properties, filterData } = useGlobal();
  
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
                {" "}Location
              </span>
              </>
            )}
            </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our verified student accommodations across the UK&apos;s top
            university cities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <DetailedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesLocationTabs;
