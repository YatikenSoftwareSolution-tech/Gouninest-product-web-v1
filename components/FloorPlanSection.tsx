import React, { useState } from "react";
import {
  Heart,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  ImagesIcon,
  ChevronRight,
  CheckCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import GetInTouchModal from "./modals/GetInTouchModal";

interface RoomType {
  roomTypeSlug: string;
  roomName: string;
  roomClass: string;
  bathroomType: string;
  amenities: string[];
  images: string[];
  videos: string[];
  vrs: string[];
  area: number;
  bedrooms: number;
  bathrooms: number;
  tenancies: {
    [key: string]: {
      duration: string;
      weeks: number;
      moveIn: string;
      moveOut: string;
      originalPrice: number;
      discountedPrice: number;
      price: number;
      isExclusive: boolean;
    };
  };
}

interface PropertyProps {
  selectedProperty: {
    externalId: string;
    roomTypes: RoomType[];
    images: string[];
    countryCode: "US" | "GB" | "AU" | "CA" | "IE" | "NZ" | "DE" | "FR" | "NL";
  };
}

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

const FloorPlanSection: React.FC<PropertyProps> = ({
  selectedProperty,
}: PropertyProps) => {
  const [favoritedRooms, setFavoritedRooms] = useState<Record<string, boolean>>(
    {}
  );
  const [currentRoomAmenities, setCurrentRoomAmenities] = useState<string[]>(
    []
  );
  const [isAmenityModalOpen, setIsAmenityModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Extract roomTypes from selectedProperty
  const roomTypes = selectedProperty?.roomTypes || [];
  const currencySymbol = CURRENCY_SYMBOLS[selectedProperty.countryCode] || "£";

  console.log(selectedProperty.countryCode);

  const toggleFavorite = (roomSlug: string) => {
    setFavoritedRooms((prev) => ({
      ...prev,
      [roomSlug]: !prev[roomSlug],
    }));
  };

  const openAmenitiesModal = (amenities: string[]) => {
    setCurrentRoomAmenities(amenities);
    setIsAmenityModalOpen(true);
  };

  // Convert square meters to square feet (1 m² = 10.764 ft²)
  const sqmToSqft = (sqm: number) => (sqm * 10.764).toFixed(1);

  const handleEnquire = () => {
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-[20px] font-bold text-gray-900 mb-2">
          Floor Plans
        </h3>
        <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
      </div>

      {roomTypes.map((roomType) => {
        // Convert tenancies object to array
        const tenanciesArray = Object.values(roomType.tenancies || {});

        return (
          <div
            key={roomType.roomTypeSlug}
            className="max-w-6xl mx-auto bg-white border border-gray-300 shadow-sm rounded-lg mb-6"
          >
            {/* Header */}
            <div className="p-4 max-sm:p-3">
              <div className="flex items-start justify-between gap-6 max-sm:gap-3 border-b border-gray-300 pb-6 max-sm:pb-4 max-sm:flex-col">
                <div className="flex items-center gap-4 max-sm:gap-3 max-sm:w-full">
                  <div className="relative">
                    {roomType.images ? (
                      <>
                        <Image
                          src={selectedProperty.images[0]}
                          alt={roomType.roomName}
                          width={300}
                          height={200}
                          className="w-[300px] h-[150px] max-sm:w-[120px] max-sm:h-[80px] rounded-lg object-cover border border-gray-300"
                        />
                        <div className="absolute top-2 left-2 max-sm:top-1 max-sm:left-1 bg-gray-800 text-white px-1 py-0.5 rounded flex items-center gap-1">
                          <ImagesIcon className="w-3 h-3 max-sm:w-2 max-sm:h-2" />
                          <span className="text-[10px] max-sm:text-[8px]">
                            {selectedProperty.images.length}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-[270px] h-[150px] max-sm:w-[120px] max-sm:h-[80px] rounded-lg bg-gray-200 border border-gray-300 flex items-center justify-center">
                        <div className="text-gray-500 text-center">
                          <ImagesIcon className="w-8 h-8 max-sm:w-4 max-sm:h-4 mx-auto mb-2 max-sm:mb-1" />
                          <span className="text-sm max-sm:text-xs">
                            No images available
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 max-sm:flex-none">
                    <div>
                      <h1 className="text-xl max-sm:text-lg font-bold text-gray-900">
                        {roomType.roomName}
                        {roomType.roomClass && (
                          <span className="ml-2 text-sm max-sm:text-xs font-normal text-gray-600 max-sm:block max-sm:ml-0 max-sm:mt-1">
                            ({roomType.roomClass})
                          </span>
                        )}
                      </h1>
                      <div className="flex items-center gap-4 max-sm:gap-2 mt-2 max-sm:mt-1">
                        {roomType.videos && roomType.videos.length > 0 && (
                          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs max-sm:text-[10px]">
                            <Calendar className="w-3 h-3 max-sm:w-2 max-sm:h-2" />
                            Video Tour
                          </button>
                        )}
                        {roomType.vrs && roomType.vrs.length > 0 && (
                          <span className="text-xs max-sm:text-[10px] text-gray-600 bg-gray-200 px-1 py-0.5 rounded-lg">
                            VR Viewing
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="flex flex-wrap items-center gap-5 max-sm:gap-2 mb-6 max-sm:mb-3 mt-3 max-sm:mt-2">
                      <div className="flex items-center gap-2 max-sm:gap-1">
                        <Bed className="w-4 h-4 max-sm:w-3 max-sm:h-3 text-gray-600" />
                        <span className="text-gray-900 font-medium text-[13px] max-sm:text-[11px]">
                          {roomType.bedrooms}{" "}
                          {roomType.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 max-sm:gap-1">
                        <Bath className="w-4 h-4 max-sm:w-3 max-sm:h-3 text-gray-600" />
                        <span className="text-gray-900 font-medium text-[13px] max-sm:text-[11px]">
                          {roomType.bathrooms}{" "}
                          {roomType.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                          {roomType.bathroomType &&
                            ` (${roomType.bathroomType})`}
                        </span>
                      </div>
                      {roomType.area > 0 && (
                        <div className="flex items-center gap-2 max-sm:gap-1">
                          <Maximize2 className="w-4 h-4 max-sm:w-3 max-sm:h-3 text-gray-600" />
                          <span className="text-gray-900 font-medium text-[13px] max-sm:text-[11px]">
                            {sqmToSqft(roomType.area)} ft² ({roomType.area} m²)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleFavorite(roomType.roomTypeSlug)}
                  className="p-2 max-sm:p-1 rounded-full hover:bg-gray-100 max-sm:self-start"
                  aria-label={`Favorite ${roomType.roomName}`}
                >
                  <Heart
                    className={`w-6 h-6 max-sm:w-5 max-sm:h-5 ${
                      favoritedRooms[roomType.roomTypeSlug]
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Features */}
            {roomType.amenities && roomType.amenities.length > 0 && (
              <div className="mb-2 px-4 max-sm:px-3 pb-2">
                <h2 className="text-sm max-sm:text-xs font-semibold text-gray-900 mb-2">
                  Features
                </h2>

                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 max-sm:grid-cols-3 gap-4 max-sm:gap-2">
                  {(roomType.amenities.length > 8
                    ? roomType.amenities.slice(0, 8)
                    : roomType.amenities
                  ).map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 max-sm:gap-1"
                    >
                      <CheckCircle className="w-[16px] h-[16px] max-sm:w-3 max-sm:h-3 text-green-600" />
                      <span className="text-gray-800 text-[13px] max-sm:text-[11px]">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* View More Button */}
                {roomType.amenities.length > 8 && (
                  <button
                    onClick={() => openAmenitiesModal(roomType.amenities)}
                    className="text-gray-900 font-semibold text-[13px] max-sm:text-[11px] mt-3 max-sm:mt-2 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                  >
                    View More
                    <ChevronRight className="w-5 h-5 max-sm:w-4 max-sm:h-4 inline font-semibold" />
                  </button>
                )}
              </div>
            )}

            {/* Pricing Table */}
            {tenanciesArray.length > 0 && (
              <div className="overflow-hidden">
                {/* Desktop Table */}
                <table className="w-full max-sm:hidden">
                  <thead className="border-t border-b border-gray-300">
                    <tr className="bg-gray-100 text-sm font-semibold tracking-wider text-gray-700">
                      <th className="px-4 py-2 text-left">Duration</th>
                      <th className="px-4 py-2 text-left">Tenancy</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenanciesArray.map((tenancy, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 last:border-b-0"
                      >
                        <td className="p-3 font-semibold text-gray-900 text-[13px]">
                          {tenancy.duration}
                        </td>
                        <td className="p-3 text-gray-800">
                          <div className="text-xs">
                            Move-in: {tenancy.moveIn}
                          </div>
                          <div className="text-xs">
                            Move-out: {tenancy.moveOut}
                          </div>
                        </td>
                        <td className="p-3">
                          {tenancy.isExclusive && (
                            <div className="inline-flex items-center bg-red-100 text-red-600 text-[10px] px-1 py-0.5 rounded-lg mb-1">
                              🔥 Exclusive Offer
                            </div>
                          )}
                          <div className="text-[13px] font-medium text-gray-900">
                            From{" "}
                            <span className="font-semibold">
                              {currencySymbol}
                              {tenancy.discountedPrice}
                            </span>{" "}
                            /week
                          </div>
                          <div className="text-[13px] text-gray-400 line-through">
                            From {currencySymbol}
                            {tenancy.originalPrice} /week
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-900">
                              From{" "}
                              <span className="font-semibold">
                                {currencySymbol}
                                {tenancy.price?.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex gap-2 flex-col">
                              <button className="bg-gradient-to-r from-[var(--color-electric-500)] to-[var(--color-lime-600)] hover:bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                                Apply Now
                              </button>
                              <button
                                onClick={handleEnquire}
                                className="border border-red-500 text-red-600 hover:bg-red-50 px-2 py-1 rounded-md text-xs font-semibold"
                              >
                                Enquire Now
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile Cards */}
                <div className="hidden max-sm:block border-t border-gray-300">
                  {tenanciesArray.map((tenancy, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-300 last:border-b-0 p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-gray-900 text-sm">
                          {tenancy.duration}
                        </div>
                        {tenancy.isExclusive && (
                          <div className="inline-flex items-center bg-red-100 text-red-600 text-[9px] px-1 py-0.5 rounded-lg">
                            🔥 Exclusive Offer
                          </div>
                        )}
                      </div>

                      <div className="text-gray-800 text-xs mb-2">
                        <div>Move-in: {tenancy.moveIn}</div>
                        <div>Move-out: {tenancy.moveOut}</div>
                      </div>

                      <div className="mb-3">
                        <div className="text-xs font-medium text-gray-900 mb-1">
                          From{" "}
                          <span className="font-semibold">
                            {currencySymbol}
                            {tenancy.discountedPrice}
                          </span>{" "}
                          /week
                        </div>
                        <div className="text-xs text-gray-400 line-through">
                          From {currencySymbol}
                          {tenancy.originalPrice} /week
                        </div>
                        <div className="text-sm font-medium text-gray-900 mt-1">
                          Total: From{" "}
                          <span className="font-semibold">
                            {currencySymbol}
                            {tenancy.price?.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-gradient-to-r from-[var(--color-electric-500)] to-[var(--color-lime-600)] hover:bg-red-600 text-white px-3 py-2 rounded-md text-xs font-semibold">
                          Apply Now
                        </button>
                        <button
                          onClick={handleEnquire}
                          className="flex-1 border border-red-500 text-red-600 hover:bg-red-50 px-3 py-2 rounded-md text-xs font-semibold"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Amenities Modal */}
      {isAmenityModalOpen && (
        <div
          style={{ zIndex: 50 }}
          className="fixed inset-0 flex items-center justify-center backdrop-brightness-50 backdrop-blur-xs max-sm:inset-0 max-sm:p-4"
        >
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-sm:p-4 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setIsAmenityModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              aria-label="Close amenities modal"
            >
              <X className="w-5 h-5 max-sm:w-4 max-sm:h-4 transition-transform duration-300 hover:rotate-90" />
            </button>
            <h3 className="text-lg max-sm:text-base font-semibold text-gray-900 mb-4">
              All Features
            </h3>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 max-sm:gap-2">
              {currentRoomAmenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 max-sm:gap-1"
                >
                  <CheckCircle className="w-[16px] h-[16px] max-sm:w-3 max-sm:h-3 text-green-600" />
                  <span className="text-gray-800 text-sm max-sm:text-xs">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <GetInTouchModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        propertyId={selectedProperty.externalId}
      />
    </div>
  );
};

export default FloorPlanSection;
