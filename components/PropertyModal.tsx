import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MapPin,
  Users,
  Star,
  Bed,
  Bath,
  Wifi,
  Car,
  Dumbbell,
  ChevronDownSquare, // This is the correct import for the elevator icon
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
import { Button } from "./ui/button";
import { Property } from "@/types/types";
import { useGlobal } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

interface PropertyModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedProperty: Property | null;
}

const PropertyModal: React.FC<PropertyModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedProperty,
}) => {
  const { setBookProperty, user } = useGlobal();

  const [currentImage, setCurrentImage] = useState(0);

  const router = useRouter();
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

  const handleBookProperty = () => {
    setBookProperty(selectedProperty);
    if (user) {
      router.push(`/booking`);
    } else {
      router.push("/login?booking=true");
    }
  };
  // console.log(selectedProperty);
  const handlePrevImage = () => {
    setCurrentImage((prev) => Math.max(prev - 1, 0));
  };
  const handleNextImage = () => {
    if (selectedProperty?.images && selectedProperty.images.length > 0) {
      setCurrentImage((prev) => (prev + 1) % selectedProperty.images.length);
    }
  };


  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="flex flex-col md:flex-row md:justify-between bg-white max-h-[80vh] min-w-[60vw] overflow-y-auto">
        <div className="md:w-1/2 flex flex-col gap-4">
          <DialogHeader>
            <div className="relative w-full h-[240px]">
              <div
              onClick={handlePrevImage}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow hover:bg-electric-100 transition-colors duration-200 cursor-pointer"
            >
              <ChevronDown className="w-5 h-5 rotate-90 text-electric-600" />
            </div>
              <Image
                src={selectedProperty?.images?.[currentImage] || "/placeholder.jpg"}
                alt={selectedProperty?.title || "Property image"}
                fill
                className="object-cover rounded-lg"
                style={{ objectFit: "cover" }}
              />
              <div
              onClick={handleNextImage}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow hover:bg-electric-100 transition-colors duration-200 cursor-pointer"
            >
              <ChevronUp className="w-5 h-5 rotate-90 text-electric-600" />
            </div>
              <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1 shadow">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {selectedProperty?.ratings}{" "}
                <span className="opacity-70">({selectedProperty?.views})</span>
              </div>
            </div>
          </DialogHeader>
          <div className="flex gap-2">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {selectedProperty?.title}
            </DialogTitle>
            {selectedProperty?.propertyType && (
              <Badge className=" bg-blue-500 text-white shadow-lg shadow-electric-500/30">
                {selectedProperty?.propertyType}
              </Badge>
            )}
            {selectedProperty?.roomType && (
              <Badge className="bg-green-500 text-white shadow-lg shadow-electric-500/30">
                {selectedProperty?.roomType} Rooms
              </Badge>
            )}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 text-blue-500 shadow-electric-500/30" />
            <span>{selectedProperty?.location?.address}</span>
          </div>
          <p className="text-gray-600 text-sm">
            {selectedProperty?.description}
          </p>
        </div>
        <div className="flex flex-col gap-6 mt-6 md:w-1/2">
          <hr className="my-2 border-gray-200" />
          <div className="flex items-center gap-6 mb-3 text-sm text-gray-600">
            <div className="flex flex-col items-center gap-0.5">
              <Users className="w-5 h-5 text-electric-500" />
              <span className="font-semibold">{selectedProperty?.capacity}</span>
              <span className="text-xs text-gray-400">Guests</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Bed className="w-5 h-5 text-electric-500" />
              <span className="font-semibold">{selectedProperty?.bedrooms}</span>
              <span className="text-xs text-gray-400">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Bath className="w-5 h-5 text-electric-500" />
              <span className="font-semibold">{selectedProperty?.bathrooms}</span>
              <span className="text-xs text-gray-400">Bathrooms</span>
            </div>
          </div>
          <hr className="my-2 border-gray-200" />

            {/* Price */}
            <div className="flex gap-2 mb-2">
              <div>
                <span className="text-2xl font-bold text-electric-600">
                  ${selectedProperty?.price}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  /{selectedProperty?.leaseDuration}
                </span>
                {selectedProperty?.price !== undefined &&
                  selectedProperty?.originalPrice !== undefined &&
                  selectedProperty.price < selectedProperty.originalPrice && (
                    <span className="ml-3 text-sm line-through text-gray-400">
                      ${selectedProperty.originalPrice}
                    </span>
                  )}
                {selectedProperty?.price !== undefined &&
                  selectedProperty?.originalPrice !== undefined &&
                  selectedProperty.price < selectedProperty.originalPrice && (
                    <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                      -
                      {Math.round(
                        ((selectedProperty.originalPrice - selectedProperty.price) /
                          selectedProperty.originalPrice) *
                          100
                      )}
                      %
                    </span>
                  )}
              </div>
              <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-gray-700 font-medium">
                  Move-in: {new Date(selectedProperty?.moveInDate ?? "").toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2">
              {selectedProperty?.amenities.map((amenity, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-700 hover:bg-electric-100 hover:text-electric-700 transition-colors duration-300 px-2 py-1 flex items-center gap-1 rounded-full"
                >
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </Badge>
              ))}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              <span className="font-semibold">Pets:</span> {selectedProperty?.petPolicy}
            </div>

            <Button
              onClick={handleBookProperty}
              className="w-full bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 hover:from-[var(--color-electric-600)] hover:to-amber-600 text-white font-semibold py-3"
            >
              Book Now
            </Button>
          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyModal;
