"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Users,
  Star,
  Bed,
  Bath,
  Wifi,
  Car,
  Dumbbell,
  ChevronDownSquare,
  Clock,
  ShieldCheck,
  Camera,
  Book,
  Bike,
  ForkKnife,
  Gamepad,
  Shield,
  Droplet,
  Zap,
  Thermometer,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { Property } from "@/types/types";
import { useState } from "react";

interface DetailedPropertyCardProps {
  property: Property;
}

// Currency symbols mapping
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

const DetailedPropertyCard = ({ property }: DetailedPropertyCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const symbol =
    CURRENCY_SYMBOLS[property.countryCode as keyof typeof CURRENCY_SYMBOLS] ||
    "£";

  const getAmenityIcon = (amenity: string) => {
    const icons = {
      WiFi: <Wifi className="w-4 h-4 text-electric-500" />,
      Internet: <Wifi className="w-4 h-4 text-electric-500" />,
      Parking: <Car className="w-4 h-4 text-electric-500" />,
      Gym: <Dumbbell className="w-4 h-4 text-electric-500" />,
      Laundry: <Clock className="w-4 h-4 text-electric-500" />,
      "Laundry room": <Clock className="w-4 h-4 text-electric-500" />,
      Elevator: <ChevronDownSquare className="w-4 h-4 text-electric-500" />,
      Reception: <Users className="w-4 h-4 text-electric-500" />,
      "24 hours security": (
        <ShieldCheck className="w-4 h-4 text-electric-500" />
      ),
      CCTV: <Camera className="w-4 h-4 text-electric-500" />,
      "Study Room": <Book className="w-4 h-4 text-electric-500" />,
      "Bike Storage": <Bike className="w-4 h-4 text-electric-500" />,
      "Communal Kitchen": <ForkKnife className="w-4 h-4 text-electric-500" />,
      "Game Room": <Gamepad className="w-4 h-4 text-electric-500" />,
      "Contents Insurance": <Shield className="w-4 h-4 text-electric-500" />,
      Water: <Droplet className="w-4 h-4 text-electric-500" />,
      Electricity: <Zap className="w-4 h-4 text-electric-500" />,
      Heat: <Thermometer className="w-4 h-4 text-electric-500" />,
    };
    return (
      icons[amenity as keyof typeof icons] || (
        <div className="w-4 h-4 bg-gray-300 rounded-full" />
      )
    );
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  // Remove H3 and H4 tags
  const removeH3H4Tags = (html: string) => {
    return html
      .replace(/<h3[^>]*>.*?<\/h3>/gi, "")
      .replace(/<h4[^>]*>.*?<\/h4>/gi, "");
  };

  const htmlToPlainText = (html: string) => {
    return html
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const plainDescription = htmlToPlainText(
    removeH3H4Tags(property.description)
  );

  return (
    <Link
      href={`/properties/${property._id}?country=${property.countryCode}&city=${property.location.city}`}
      className="block" // Added block class to make the link fill the container
    >
      <Card
        className={`group border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl bg-white rounded-2xl`}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-52">
          {/* Navigation arrows */}
          <div
            onClick={handlePrevImage}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow hover:bg-electric-100 transition-colors duration-200 cursor-pointer"
          >
            <ChevronDown className="w-5 h-5 rotate-90 text-electric-600" />
          </div>
          <Image
            src={property.images[currentImage] || "/placeholder.jpg"}
            alt={property.title}
            fill
            className="object-cover h-full transition-transform duration-500 group-hover:scale-110"
            priority
          />
          <div
            onClick={handleNextImage}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow hover:bg-electric-100 transition-colors duration-200 cursor-pointer"
          >
            <ChevronUp className="w-5 h-5 rotate-90 text-electric-600" />
          </div>

          {property.price < property.originalPrice && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white animate-pulse shadow-lg shadow-electric-500/30">
              Discount{" "}
              {Math.round(
                ((property.originalPrice - property.price) /
                  property.originalPrice) *
                  100
              )}
              %
            </Badge>
          )}

          <div className="absolute bottom-3 left-3 flex gap-2">
            {property.propertyType && (
              <Badge className=" bg-blue-500 text-white shadow-lg shadow-electric-500/30">
                {property.propertyType}
              </Badge>
            )}
            {property.roomType && (
              <Badge className="bg-green-500 text-white shadow-lg shadow-electric-500/30">
                {property.roomType} Rooms
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1 shadow">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {property.ratings}
            <span className="opacity-70">({property.views})</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-electric-600 transition-colors duration-300 line-clamp-2">
            {property.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            {plainDescription.split(" ").slice(0, 20).join(" ")}
            {plainDescription.split(" ").length > 25 && "..."}
          </p>

          <div className="flex text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1 text-electric-500" />
            <span className="text-sm">{property.location.address}</span>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-6 mb-3 text-sm text-gray-600">
            <div className="flex flex-col items-center gap-0.5">
              <Users className="w-5 h-5 text-electric-500" />
              <span className="font-semibold">{property.capacity}</span>
              <span className="text-xs text-gray-400">Guests</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Bed className="w-5 h-5 text-electric-500" />
              <span className="font-semibold">{property.bedrooms}</span>
              <span className="text-xs text-gray-400">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Bath className="w-5 h-5 text-electric-500" />
              <span className="font-semibold">{property.bathrooms}</span>
              <span className="text-xs text-gray-400">Bathrooms</span>
            </div>
          </div>

          {/* Price Section (Updated with symbol) */}
          <div className="flex gap-2 mb-2">
            <div>
              <span className="text-2xl font-bold text-electric-600">
                {symbol}
                {property.price}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                /{property.leaseDuration}
              </span>
              {property.price < property.originalPrice && (
                <>
                  <span className="ml-3 text-sm line-through text-gray-400">
                    {symbol}
                    {property.originalPrice}
                  </span>
                  <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                    -
                    {Math.round(
                      ((property.originalPrice - property.price) /
                        property.originalPrice) *
                        100
                    )}
                    %
                  </span>
                </>
              )}
            </div>
            {new Date(property.moveInDate) > new Date() && (
              <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-gray-700 font-medium">
                  Move-in:{" "}
                  {new Date(property.moveInDate).toLocaleDateString("en-GB")}
                </span>
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 4).map((amenity, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-100 text-gray-700 hover:bg-electric-100 hover:text-electric-700 transition-colors duration-300 px-2 py-1 flex items-center gap-1 rounded-full"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </Badge>
            ))}
            {property.amenities.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs rounded-full px-2 py-1"
              >
                +{property.amenities.length - 4} more
              </Badge>
            )}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            <span className="font-semibold">Pets:</span> {property.petPolicy}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DetailedPropertyCard;
