'use client';
import React, { useCallback, useMemo, useState } from "react";
import {
  MapPin,
  Users,
  Star,
  Bed,
  Bath,
  Wifi,
  Dumbbell,
  Home,
  Printer,
  Coffee,
  Gamepad2,
  Film,
  Table2,
  Package,
  Truck,
  Shirt,
  CalendarDays,
  Sun,
} from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Property } from "@/types/types";

const amenities = [
  {
    category: "Shared Community",
    count: 14,
    items: [
      { name: "Elevator", icon: <Home className="w-4 h-4" /> },
      { name: "Laundry Room", icon: <Shirt className="w-4 h-4" /> },
      { name: "Wi-Fi", icon: <Wifi className="w-4 h-4" /> },
      { name: "Free Printing", icon: <Printer className="w-4 h-4" /> },
      { name: "Lounge", icon: <Users className="w-4 h-4" /> },
      { name: "Conference Room", icon: <CalendarDays className="w-4 h-4" /> },
    ],
  },
  {
    category: "Fitness & Recreation",
    count: 7,
    items: [
      { name: "Gym", icon: <Dumbbell className="w-4 h-4" /> },
      { name: "Coffee Bar", icon: <Coffee className="w-4 h-4" /> },
      { name: "Game Room", icon: <Gamepad2 className="w-4 h-4" /> },
      { name: "Cinema Room", icon: <Film className="w-4 h-4" /> },
      { name: "Table Tennis", icon: <Table2 className="w-4 h-4" /> },
      { name: "Pool Table", icon: <Gamepad2 className="w-4 h-4" /> },
    ],
  },
  {
    category: "Property Services",
    count: 7,
    items: [
      { name: "Reception", icon: <Home className="w-4 h-4" /> },
      { name: "Package Room", icon: <Package className="w-4 h-4" /> },
      { name: "Delivery Alert System", icon: <Truck className="w-4 h-4" /> },
      { name: "Dry Cleaning Service", icon: <Shirt className="w-4 h-4" /> },
      { name: "Housekeeping", icon: <Home className="w-4 h-4" /> },
      { name: "Social Events", icon: <CalendarDays className="w-4 h-4" /> },
    ],
  },
  {
    category: "Outdoor Features",
    count: 3,
    items: [
      { name: "Terrace", icon: <Sun className="w-4 h-4" /> },
      { name: "Balcony", icon: <Sun className="w-4 h-4" /> },
      { name: "Courtyard", icon: <Sun className="w-4 h-4" /> },
    ],
  },
];

const houseRules = [
  {
    category: "Cancellation Policy",
    content:
      "No: Was No Pay\nYour application for a visa has been disclosed. Please note that this does not include situations where your visa has been granted and subsequently withdrawn.\nFor a review only of the above cancellation criteria and can provide us with evidence demonstrating that you meet the above view more.",
  },
  {
    category: "No Place No Pay",
    content:
      "You have failed to determine possible but did not officially agree to such direct travel-related status.\nIf you are aware of this dispute or whether it is possible, then you would like to address automatically that you meet the above criteria, you may want for cancellation will be granted if you have already accepted your 'honorary agreement' and paid your view more.",
  },
  {
    category: "Details",
    content:
      "Cancellation Policy\nTo execute your Room prior to 3rd July, you must do the following within 3 days of receipt of this 'honorary agreement' (please 3 View more).",
  },
  {
    category: "Application Policy",
    items: [
      { title: "Age Limitation", content: "1–2 Styvora old" },
      {
        title: "Education Requirement",
        items: ["PhD Permitted", "Postgraduate", "Undergraduate"],
      },
      { title: "Notionality or Region", content: "Unlimited notionality" },
    ],
  },
  {
    category: "Pets Policy",
    content: "No Pet",
  },
  {
    category: "Renewal Policy",
    content:
      "Students can re-book through the student portal or contact the concierge to make an application.",
  },
  {
    category: "Early Move-in Policy",
    content:
      "Student can make an inquiry through Chapter email to apply for early check in.",
  },
  {
    category: "Refund Policy",
    content:
      "To secure your Room prior to 3rd July, you must do the following within 3 days of receipt of this 'honorary Agreement' (Please 3 days being known as the 'Doctors Notting Period').\nView more",
  },
  {
    category: "Room Assignment Policy",
    content:
      "Certain Room numbers can be selected during the booking process if noticable.",
  },
  {
    category: "Room Change Policy",
    content:
      "We want your university experience to be on positive on possible – if you are having any issues with your flat marks, please let us know. We will do our best to help resolve any problems you might be having.",
  },
  {
    category: "Subletting Policy",
    content:
      "After the 'Honorary Staff Date' as set out in the 'Honorary Agreement', requests for room moves or for us to accept a replacement tenant to take over you tenancy will be managed based on doubtfully and at our sole discretion. An Administrator has of £00 will be going to be working in the 'greeting facility' which you will be view more.",
  },
  {
    category: "Termination Policy",
    content:
      "Not Applicable, if students tend to terminate their current contract, after the 'Honorary Staff Date' as set out in the 'Honorary Agreement', requests for room moves or for us to accept a replacement tenant to take over you tenancy will be managed based on doubtfully and at our sole discretion. An Administrator has of £00 will be view more.",
  },
  {
    category: "Double Occupancy Policy",
    items: [
      {
        title: "Share Studio – Parthouse",
        content: "Increase of £000 per Week",
      },
      {
        title: "Share Studio – Lower Level",
        content: "Increase of £000 per Week",
      },
      {
        title: "Share Studio – Mid Level",
        content: "Increase of £000 per Week",
      },
      {
        title: "Share Studio – Upper Level",
        content: "Increase of £000 per Week",
      },
      {
        title: "Gold Studio – Lower Level",
        content: "Increase of £000 per Week",
      },
      {
        title: "Gold Studio – Mid Level",
        content: "Increase of £000 per Week",
      },
      {
        title: "Gold Studio – Upper Level",
        content: "Increase of £000 per Week",
      },
    ],
  },
];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.5rem",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

const getCoordinates = (address: string): google.maps.LatLngLiteral => {
  return address.includes("London")
    ? { lat: 51.505, lng: -0.09 }
    : defaultCenter;
};

interface RenderTabContentProps {
  activeTab: string;
  selectedProperty: Property;
}

export const RenderTabContent: React.FC<RenderTabContentProps> = ({
  activeTab,
  selectedProperty,
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const position = useMemo(
    () => getCoordinates(selectedProperty.address || "Delhi, India"),
    [selectedProperty.address]
  );

  const renderBasicInfo = useCallback(
    () => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <span className="font-semibold">
              {selectedProperty.capacity || "N/A"}
            </span>
            <p className="text-xs text-gray-500">Guests</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <Bed className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <span className="font-semibold">
              {selectedProperty.bedrooms || "N/A"}
            </span>
            <p className="text-xs text-gray-500">Bedrooms</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <Bath className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <span className="font-semibold">
              {selectedProperty.bathrooms || "N/A"}
            </span>
            <p className="text-xs text-gray-500">Bathrooms</p>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="text-gray-600">
            {selectedProperty.description || "No description available"}
          </p>
        </div>
      </div>
    ),
    [selectedProperty]
  );

  const renderLocation = useCallback(
    () => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Location</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Address</span>
          </div>
          <p className="text-gray-600">
            {selectedProperty.address || "Address not available"}
          </p>
        </div>
        <div className="h-96 rounded-lg overflow-hidden z-0">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
            onLoad={() => setMapLoaded(true)}
            onError={() => setMapError("Failed to load Google Maps")}
          >
            {mapError ? (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                {mapError}
              </div>
            ) : mapLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={position}
                zoom={15}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
              >
                <Marker
                  position={position}
                  icon={{
                    url: "/images/marker-icon.png",
                    scaledSize: new google.maps.Size(32, 32),
                  }}
                />
              </GoogleMap>
            ) : (
              <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-full">
                <div className="animate-pulse">Loading map...</div>
              </div>
            )}
          </LoadScript>
        </div>
      </div>
    ),
    [selectedProperty.address, mapError, mapLoaded, position]
  );

  const renderCommunityAmenities = useCallback(
    () => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Community Amenities</h3>
        {amenities.map((section) => (
          <section key={section.category} className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">
                {section.category} ({section.count})
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-blue-500">{item.icon}</div>
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
        <button className="text-blue-500 font-medium mt-4 flex items-center gap-1">
          View more amenities <span className="text-lg">›</span>
        </button>
      </div>
    ),
    []
  );

  const renderHouseRules = useCallback(
    () => (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">House Rules</h3>
        {houseRules.map((rule) => (
          <div key={rule.category} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{rule.category}</h4>
            {rule.content && (
              <p className="text-gray-600 whitespace-pre-line">
                {rule.content}
              </p>
            )}
            {rule.items && (
              <div className="space-y-3 mt-2">
                {rule.items.map((item) => (
                  <div key={item.title}>
                    <h5 className="font-medium text-sm">{item.title}</h5>
                    {item.content && (
                      <p className="text-gray-600 text-sm">{item.content}</p>
                    )}
                    {item.items && (
                      <ul className="list-disc pl-5 text-sm text-gray-600 mt-1">
                        {item.items.map((subItem) => (
                          <li key={subItem}>{subItem}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    ),
    []
  );

  const renderReviews = useCallback(
    () => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Reviews</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold">{selectedProperty.ratings || "0"}</span>
            <span className="text-gray-500">
              ({selectedProperty.reviews || 0} reviews)
            </span>
          </div>
          <p className="text-gray-600">
            {selectedProperty.reviews
              ? "Reviews and ratings from previous tenants..."
              : "No reviews yet"}
          </p>
        </div>
      </div>
    ),
    [selectedProperty.ratings, selectedProperty.reviews]
  );

  switch (activeTab) {
    case "community-amenities":
      return renderCommunityAmenities();
    case "basic-info":
      return renderBasicInfo();
    case "location":
      return renderLocation();
    case "reviews":
      return renderReviews();
    case "house-rules":
      return renderHouseRules();
    default:
      return renderBasicInfo();
  }
};