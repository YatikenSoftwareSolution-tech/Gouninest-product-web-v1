"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  X,
  Heart,
  Share2,
  Home,
  MessageCircle,
  Copy,
  Check,
  Shield,
} from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { Property } from "@/types/types";
import { RenderTabContent } from "./RendorTabContent";

interface PropertyModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedProperty: Property;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

const PropertyModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedProperty,
}: PropertyModalProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState("basic-info");
  const [copied, setCopied] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    agreeTerms: false,
    agreePrivacy: false,
  });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerInstance = useRef<google.maps.Marker | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCopy = () => {
    const textToCopy = selectedProperty._id || "32912";
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % selectedProperty.images.length);
  };

  const tabs = [
    { id: "basic-info", label: "Basic Info", icon: Home },
    { id: "location", label: "Location", icon: MapPin },
    { id: "community-amenities", label: "Community Amenities", icon: Users },
    { id: "house-rules", label: "House Rules", icon: Shield },
    { id: "reviews", label: "Reviews", icon: MessageCircle },
  ];

  useEffect(() => {
    if (mapLoaded && mapRef.current && window.google) {
      const position = selectedProperty.address?.includes("London")
        ? { lat: 51.505, lng: -0.09 }
        : { lat: 28.6139, lng: 77.209 };

      // Clear previous map instances
      if (markerInstance.current) {
        markerInstance.current.setMap(null);
      }
      if (mapInstance.current) {
        mapInstance.current = null;
      }

      // Create new map instance
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: position,
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true,
      });

      markerInstance.current = new window.google.maps.Marker({
        position,
        map: mapInstance.current,
        icon: {
          url: "/images/marker-icon.png",
          scaledSize: new window.google.maps.Size(32, 32),
        },
      });
    }
  }, [mapLoaded, selectedProperty.address, selectedProperty.images]);

  const handleShare = async () => {
    try {
      // Prepare share data
      const shareData = {
        title: document.title,
        text: "Check out this property on UniNest",
        url: window.location.href,
      };

      // Check if Web Share API is supported
      if (navigator.share) {
        // Use browser's native share dialog
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareData.url);

        // Show feedback (you can replace this with a toast notification)
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      // Handle errors (including if user cancels share)
      console.log("Share failed:", err);
    }
  };

  if (!isModalOpen) return null;

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="afterInteractive"
        onLoad={() => setMapLoaded(true)}
        onError={() => console.error("Failed to load Google Maps API")}
      />

      <div className="fixed inset-0 z-20 overflow-y-auto bg-white mt-16 px-4 md:px-36">
        <div className="px-4 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedProperty.title}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {selectedProperty.ratings}
                  </span>
                  <span className="text-gray-500">
                    ({selectedProperty.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Share property"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Save property"
              >
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Property badges and info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                📚 {selectedProperty.propertyType}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                ✅ {selectedProperty.verified ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>

          {/* Address and Property ID */}
          <div className="flex flex-wrap items-center justify-between mb-6 gap-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{selectedProperty.location.address || "Address not available"}</span>
            </div>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              Property ID: {selectedProperty._id || "32912"}
              <button
                onClick={handleCopy}
                className="hover:text-red-500 transition"
                aria-label={copied ? "Copied!" : "Copy Property ID"}
              >
                {copied ? (
                  <Check className="ml-2 w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="ml-2 w-4 h-4" />
                )}
              </button>
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Images and Content */}
            <div className="flex-1 w-60">
              <div className="relative aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden mb-4">
                {selectedProperty.images?.[currentImage] ? (
                  <Image
                    src={selectedProperty.images[currentImage]}
                    alt={`Property image ${currentImage + 1}`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1224px) 90vw, 800px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm text-gray-500">
                      No image available
                    </span>
                  </div>
                )}

                {/* Navigation Arrows */}
                {selectedProperty.images &&
                  selectedProperty.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition"
                        aria-label="Previous image"
                      >
                        <ChevronDown className="w-5 h-5 rotate-90" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition"
                        aria-label="Next image"
                      >
                        <ChevronUp className="w-5 h-5 rotate-90" />
                      </button>
                    </>
                  )}
              </div>

              {/* Image navigation dots */}
              {selectedProperty.images &&
                selectedProperty.images.length > 1 && (
                  <div className="flex justify-center gap-2 mb-6">
                    {selectedProperty.images
                      .slice(0, 5) // Only take first 5 images
                      .map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImage(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImage
                              ? "bg-blue-500"
                              : "bg-gray-300"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                  </div>
                )}

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-4">
                <nav className="flex overflow-x-auto scrollbar-hide">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? "border-red-500 text-red-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                      aria-current={activeTab === tab.id ? "page" : undefined}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-96">
                {activeTab === "location" ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Location</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Address</span>
                      </div>
                      <p className="text-gray-600">
                        {selectedProperty.location.address || "Address not available"}
                      </p>
                    </div>
                    <div
                      className="h-96 rounded-lg overflow-hidden z-0"
                      ref={mapRef}
                    >
                      {!mapLoaded && (
                        <div className="h-full flex items-center justify-center bg-gray-100">
                          Loading map...
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <RenderTabContent
                    activeTab={activeTab}
                    selectedProperty={selectedProperty}
                  />
                )}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-80 bg-white p-6 rounded-lg shadow-md border border-gray-200 lg:sticky lg:top-4 h-fit">
              <div className="mb-6">
                <div className="text-2xl font-bold">
                  £{selectedProperty.price || "313"} /week
                </div>
                <div className="text-sm text-gray-600">
                  Advance rent £{selectedProperty.advanceRent || "185"}
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium mb-1"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium mb-1"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    Phone Number*
                  </label>
                  <div className="flex">
                    <select className="p-2 border border-gray-300 rounded-l">
                      <option>+91</option>
                      <option>+44</option>
                      <option>+1</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="flex-1 p-2 border-t border-b border-r border-gray-300 rounded-r"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label
                      htmlFor="agreeTerms"
                      className="text-xs text-gray-600"
                    >
                      (Optional) agree to the platform transferring my
                      information across borders as stated in the &quot;Personal
                      Information Outbound Authorization Statement&quot;.
                    </label>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreePrivacy"
                      name="agreePrivacy"
                      checked={formData.agreePrivacy}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                      required
                    />
                    <label
                      htmlFor="agreePrivacy"
                      className="text-xs text-gray-600"
                    >
                      I have read and agree to the &quot;Privacy Policy&quot;
                      and &quot;User Agreement&quot;.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient text-white py-3 rounded-lg font-semibold cursor-pointer"
                >
                  Find My Home
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyModal;
