"use client";
import React, { useState, useMemo } from "react";
import {
  Heart,
  MapPin,
  Star,
  Filter,
  Grid,
  List,
  ChevronDown,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import FilterSidebar from "@/components/FilterSidebar";
import { useGlobal } from "@/context/GlobalContext";

const Page = () => {
  const { countryProperty } = useGlobal();
  const searchParams = useSearchParams();
  const country = searchParams.get("country");
  const city = searchParams.get("city");
  const propertyId = searchParams.get("propertyId");

  const [viewMode, setViewMode] = useState("list");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 129, max: 15000 });
  const [sortBy, setSortBy] = useState("Recommended");
    const [favorites, setFavorites] = useState(new Set());
    
     const dummyProperties = [
       {
         id: "dummy1",
         name: "Dummy Residence Hall",
         images: ["/placeholder.jpg"],
         address: "123 Demo Street, Sample City",
         countryCode: "GB",
         countryName: "UK",
         rating: 4.5,
         reviews: 120,
         price: { current: 150, original: 200 },
         verified: true,
         studentAccommodation: true,
         cashback: "£100 cashback",
         features: ["WiFi", "Gym", "Laundry", "Study Area"],
         exclusiveOffer: true,
       },
       {
         id: "dummy2",
         name: "Sample Student Housing",
         images: ["/placeholder.jpg"],
         address: "456 Example Road, Testville",
         countryCode: "US",
         countryName: "USA",
         rating: 4.2,
         reviews: 98,
         price: { current: 130 },
         verified: false,
         studentAccommodation: true,
         cashback: "£75 cashback",
         features: ["CCTV", "Kitchen", "24x7 Support", "Parking"],
         exclusiveOffer: false,
       },
     ];

  const allProperties = useMemo(() => {
    if (!countryProperty || countryProperty.length === 0) {
      return dummyProperties;
    }

    return countryProperty.flatMap((country) =>
      country.properties.map((property) => ({
        ...property,
        countryCode: country.country,
        countryName:
          country.country === "GB"
            ? "UK"
            : country.country === "AU"
            ? "Australia"
            : country.country === "US"
            ? "USA"
            : country.country === "IE"
            ? "Ireland"
            : country.country === "NZ"
            ? "New Zealand"
            : country.country === "CA"
            ? "Canada"
            : country.country === "DE"
            ? "Germany"
            : country.country === "FR"
            ? "France"
            : country.country === "NL"
            ? "Netherlands"
            : country.country,
      }))
    );
  }, [countryProperty]);

    

  const filteredProperties = allProperties.filter((prop) => {
    const matchesCountry = country
      ? prop.countryName.toLowerCase().includes(country.toLowerCase()) ||
        prop.address.toLowerCase().includes(country.toLowerCase())
      : true;
    const matchesCity = city
      ? prop.city?.toLowerCase().includes(city.toLowerCase()) ||
        prop.address.toLowerCase().includes(city.toLowerCase())
      : true;
    const matchesId = propertyId
      ? String(prop.id) === propertyId ||
        prop.name.toLowerCase().includes(propertyId.toLowerCase())
      : true;
    return matchesCountry && matchesCity && matchesId;
  });

  const toggleFavorite = (propertyId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId);
    } else {
      newFavorites.add(propertyId);
    }
    setFavorites(newFavorites);
    };
    
   


  const PropertyCard = ({ property, isMobile = false }) => (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        isMobile ? "mb-4" : ""
      }`}
    >
      <div className="relative">
        <Image
          src={property.images[0] || "/placeholder.jpg"}
          width={400}
          height={300}
          alt={property.name}
          className="w-full h-48 object-cover"
        />
        {property.exclusiveOffer && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-sm font-medium">
            🔥 Exclusive Offer
          </div>
        )}
        <button
          onClick={() => toggleFavorite(property.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        >
          <Heart
            className={`w-5 h-5 ${
              favorites.has(property.id)
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }`}
          />
        </button>
        {property.rating && (
          <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium flex items-center">
            <Star className="w-4 h-4 mr-1 fill-current" />
            {property.rating} ({property.reviews})
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-sm font-medium flex items-center">
          <Image
            src={`/${property.countryCode}/flag.png`}
            alt={property.countryCode}
            height={16}
            width={20}
            className="h-4 w-5 mr-1"
          />
          {property.countryName}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{property.name}</h3>
        <p className="text-gray-600 text-sm mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {property.address}
        </p>

        {property.distance && (
          <p className="text-sm text-gray-700 mb-3">{property.distance}</p>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {property.verified && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              ✓ Verified
            </span>
          )}
          {property.studentAccommodation && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              🏠 Student Accommodation
            </span>
          )}
        </div>

        {property.features && (
          <div className="flex flex-wrap gap-1 mb-4 text-xs text-gray-600">
            {property.features.slice(0, 4).map((feature, index) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              {property.price?.original && (
                <span className="text-gray-500 line-through">
                  From £{property.price.original}
                </span>
              )}
              <span className="text-2xl font-bold">
                £{property.price?.current || property.price}
              </span>
              <span className="text-gray-600">/week</span>
            </div>
            {property.cashback && (
              <p className="text-sm text-orange-600 font-medium">
                🎁 {property.cashback}
              </p>
            )}
          </div>
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
            Enquire
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">
                Student Accommodation Worldwide
              </h1>
              <span className="text-red-500 font-medium">
                {filteredProperties.length} properties found
              </span>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1"
                >
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Distance</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-3 py-1 border border-gray-300 text-gray-600 rounded-lg"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1 border border-gray-300 text-gray-600 rounded-lg">
              <span>Sort</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="px-4 pb-4">
          <p className="text-sm text-gray-600">
            Looking for <strong>student accommodation worldwide</strong>?...{" "}
            <span className="text-blue-600">Read More!</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            isOpen={true}
            onClose={() => {}}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>

        {/* Mobile Filter Overlay */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white h-full overflow-y-auto">
              <FilterSidebar
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
          </div>
        )}

        {/* Property Listings */}
        <div className="flex-1 p-4 lg:p-6">
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-6"
            }`}
          >
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isMobile={viewMode === "list"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page;