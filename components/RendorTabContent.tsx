"use client";
import React, { useState } from "react";
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

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const handleMapError = (error: string) => {
    setMapError(error);
  };

  console.log(handleMapError, handleMapLoad);

  if (mapError) return <div>Error: {mapError}</div>;
  console.log(mapLoaded);

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
        Property Details
      </h3>

      <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <Users className="w-7 h-7 text-blue-600 mb-2" />
          <span className="text-2xl font-bold text-gray-800">
            {selectedProperty.capacity || "N/A"}
          </span>
          <p className="text-sm text-gray-500 mt-1">Guests</p>
        </div>
        <div className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <Bed className="w-7 h-7 text-blue-600 mb-2" />
          <span className="text-2xl font-bold text-gray-800">
            {selectedProperty.bedrooms || "N/A"}
          </span>
          <p className="text-sm text-gray-500 mt-1">Bedrooms</p>
        </div>
        <div className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <Bath className="w-7 h-7 text-blue-600 mb-2" />
          <span className="text-2xl font-bold text-gray-800">
            {selectedProperty.bathrooms || "N/A"}
          </span>
          <p className="text-sm text-gray-500 mt-1">Bathrooms</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-3">Description</h4>
        <p className="text-gray-600 leading-relaxed">
          {selectedProperty.description || (
            <span className="text-gray-400">No description available</span>
          )}
        </p>
      </div>
    </div>
  );

  const renderLocation = () => {
    const encodedAddress = encodeURIComponent(
      selectedProperty?.location?.address || "New Delhi, India"
    );

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
          Location
        </h3>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
              <p className="text-gray-600">
                {selectedProperty?.location?.address || (
                  <span className="text-gray-400">Address not available</span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="h-96 rounded-xl overflow-hidden shadow-sm border border-gray-200 relative">
          <iframe
            width="100%"
            height="100%"
            className="rounded-xl"
            frameBorder="0"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  };

  const renderCommunityAmenities = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
        Community Features
      </h3>

      {amenities.map((section) => (
        <section key={section.category} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">
              {section.category}{" "}
              <span className="text-blue-600">({section.count})</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {section.items.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-all"
              >
                <div className="bg-blue-50 p-2 rounded-lg">
                  {React.cloneElement(item.icon, {
                    className: "w-5 h-5 text-blue-600",
                  })}
                </div>
                <span className="text-gray-700">{item.name}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors">
        View all amenities
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );

  const renderHouseRules = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
        House Rules
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {houseRules.map((rule) => (
          <div
            key={rule.category}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                {/* Replace with appropriate icon for each category */}
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800">{rule.category}</h4>
            </div>

            {rule.content && (
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {rule.content}
              </p>
            )}

            {rule.items && (
              <div className="space-y-3">
                {rule.items.map((item) => (
                  <div key={item.title} className="border-t pt-3">
                    <h5 className="font-medium text-sm text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                      {item.title}
                    </h5>
                    {item.content && (
                      <p className="text-gray-500 text-sm mt-1 pl-3.5">
                        {item.content}
                      </p>
                    )}
                    {item.items && (
                      <ul className="space-y-1.5 mt-2 pl-3.5">
                        {item.items.map((subItem) => (
                          <li
                            key={subItem}
                            className="text-gray-500 text-sm flex items-start gap-2"
                          >
                            <span className="text-gray-400 mt-1">•</span>
                            {subItem}
                          </li>
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
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
        Tenant Reviews
      </h3>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(selectedProperty.ratings || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-800">
                {selectedProperty.ratings || "0.0"}
              </span>
              <span className="text-gray-500 text-sm ml-1">/ 5</span>
            </div>
          </div>

          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {selectedProperty.reviewCount || 0}{" "}
            {selectedProperty.reviews === 1 ? "review" : "reviews"}
          </div>
        </div>

        <div className="space-y-4">
          {selectedProperty.reviews ? (
            <>
              <p className="text-gray-600 leading-relaxed">
                &ldquo;Recent tenants have shared their experiences living
                here...&rdquo;
              </p>

              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition-colors">
                Read all reviews
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          ) : (
            <div className="text-center py-6">
              <svg
                className="w-12 h-12 mx-auto text-gray-300 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <p className="text-gray-500">No reviews yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Be the first to share your experience
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
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
