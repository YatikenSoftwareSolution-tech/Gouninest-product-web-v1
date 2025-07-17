import React, { useState } from "react";
import {
  Heart,
  Users,
  Bed,
  Bath,
  ChefHat,
  Maximize2,
  Calendar,
  MapPin,
  Wifi,
  Thermometer,
  Eye,
  Square,
  CookingPot,
  CircleSlash,
  LeafIcon,
  ImagesIcon,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

interface FloorPlanData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  kitchen: string;
  area: {
    sqft: number;
    sqm: number;
  };
  occupancy: string;
  ageRange: string;
  features: string[];
  pricing: {
    duration: string;
    weeks: number;
    moveIn: string;
    moveOut: string;
    originalPrice: number;
    discountedPrice: number;
    total: number;
    isExclusive: boolean;
  }[];
}

const FloorPlanSection: React.FC = () => {
  const [isFavorited, setIsFavorited] = useState(false);

  const floorPlanData: FloorPlanData = {
    id: "bronze-studio",
    title: "Bronze Studio",
    subtitle: "Mid Level",
    image: "/api/placeholder/300/200",
    bedrooms: 1,
    bathrooms: 1,
    kitchen: "Private",
    area: {
      sqft: 191.6,
      sqm: 17.8,
    },
    occupancy: "Single",
    ageRange: "6-10",
    features: [
      "Wi-Fi",
      "Yard",
      "Heating",
      "Shower",
      "Electric Stove",
      "Mirror",
      "Toilet",
      "Window",
      "No smoking",
      "Shower room",
    ],
    pricing: [
      {
        duration: "51 weeks",
        weeks: 51,
        moveIn: "13 Sep 2025",
        moveOut: "04 Sep 2026",
        originalPrice: 359,
        discountedPrice: 344,
        total: 18309,
        isExclusive: true,
      },
      {
        duration: "44 weeks",
        weeks: 44,
        moveIn: "13 Sep 2025",
        moveOut: "17 Jul 2026",
        originalPrice: 389,
        discountedPrice: 372,
        total: 17116,
        isExclusive: true,
      },
    ],
  };

  const getFeatureIcon = (feature: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "Wi-Fi": <Wifi className="w-4 h-4 text-green-600" />,
      Yard: <MapPin className="w-4 h-4 text-green-600" />,
      Heating: <Thermometer className="w-4 h-4 text-green-600" />,
      Shower: <Bath className="w-4 h-4 text-green-600" />,
      "Electric Stove": <CookingPot className="w-4 h-4 text-green-600" />,
      Mirror: <LeafIcon className="w-4 h-4 text-green-600" />,
      Toilet: <Square className="w-4 h-4 text-green-600" />,
      Window: <Eye className="w-4 h-4 text-green-600" />,
      "No smoking": <CircleSlash className="w-4 h-4 text-green-600" />,
      "Shower room": <Bath className="w-4 h-4 text-green-600" />,
    };
    return (
      iconMap[feature] || <div className="w-4 h-4 bg-green-600 rounded-full" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-[20px] font-bold text-gray-900 mb-2">
          Floor Plans
        </h3>
        <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
      </div>
      <div className="max-w-6xl mx-auto bg-white border border-gray-300 shadow-sm rounded-lg">
        {/* Header */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-6 border-b border-gray-300 pb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={"/GB/loc9.jpg"}
                  alt={floorPlanData.title}
                  width={400}
                  height={200}
                  className="w-[400px] h-[150px] rounded-lg object-cover border border-gray-300"
                />
                <div className="absolute top-2 left-2 bg-gray-800 text-white px-1 py-0.5 rounded flex items-center gap-1">
                  <ImagesIcon className="w-3 h-3" />
                  <span className="text-[10px]">20</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {floorPlanData.title} - {floorPlanData.subtitle}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs">
                    <Calendar className="w-3 h-3" />
                    Floor Plans
                  </button>
                  <span className="text-xs text-gray-600 bg-gray-200 px-1 py-0.5 rounded-lg">
                    VR Viewing
                  </span>
                </div>
              </div>
              {/* Property Details */}
              <div className="flex flex-wrap items-center gap-5 mb-6 mt-3">
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900 font-medium text-[13px]">
                    {floorPlanData.bedrooms} Bedroom
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900 font-medium text-[13px]">
                    Private bathroom
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900 font-medium text-[13px]">
                    Private kitchen
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900 font-medium text-[13px]">
                    {floorPlanData.area.sqft} ft² ({floorPlanData.area.sqm} m²)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900 font-medium text-[13px]">
                    {floorPlanData.occupancy} Occupancy
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900 font-medium text-[13px]">
                    {floorPlanData.ageRange}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorited ? "fill-red-500 text-red-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mb-2 px-4 pb-2">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {floorPlanData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                {getFeatureIcon(feature)}
                <span className="text-gray-700 text-[13px]">{feature}</span>
              </div>
            ))}
          </div>
          <button className="flex items-center mt-4 hover:text-blue-800 text-[13px] font-semibold">
            View more <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pricing Table */}
        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="border-t border-b border-gray-300">
              <tr className="bg-gray-100 text-sm font-semibold tracking-wider text-gray-700">
                <th className="px-4 py-2 text-left">Duration</th>
                <th className="px-4 py-2 text-left">Tenancy</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {floorPlanData.pricing.map((pricing, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 last:border-b-0"
                >
                  <td className="p-3 font-semibold text-gray-900 text-[13px]">
                    {pricing.duration}
                  </td>
                  <td className="p-3 text-gray-800">
                    <div className="text-xs">Move-in: {pricing.moveIn}</div>
                    <div className="text-xs">Move-out: {pricing.moveOut}</div>
                  </td>
                  <td className="p-3">
                    {pricing.isExclusive && (
                      <div className="inline-flex items-center bg-red-100 text-red-600 text-[10px] px-1 py-0.5 rounded-lg mb-1">
                        🔥 Exclusive Offer
                      </div>
                    )}
                    <div className="text-[13px] font-medium text-gray-900">
                      From{" "}
                      <span className="font-semibold">
                        £{pricing.discountedPrice}
                      </span>{" "}
                      /week
                    </div>
                    <div className="text-[13px] text-gray-400 line-through">
                      From £{pricing.originalPrice} /week
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">
                        From{" "}
                        <span className="font-semibold">
                          £{pricing.total.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-col">
                        <button className="bg-gradient-to-r from-[var(--color-electric-500)] to-[var(--color-lime-600)] hover:bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                          Apply Now
                        </button>
                        <button className="border border-red-500 text-red-600 hover:bg-red-50 px-2 py-1 rounded-md text-xs font-semibold">
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanSection;
