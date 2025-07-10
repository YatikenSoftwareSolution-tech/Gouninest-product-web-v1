"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  Star,
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
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  const touchStartX = useRef<number | null>(null);
const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<globalThis.google.maps.Map | null>(null);
  const markerInstance = useRef<globalThis.google.maps.Marker | null>(null);


  // Improved image preloading
  useEffect(() => {
    if (typeof window === "undefined" || !selectedProperty.images?.length)
      return;

    const preloadImages = () => {
      const indicesToPreload = [
        (currentImage + 1) % selectedProperty.images.length,
        (currentImage - 1 + selectedProperty.images.length) %
          selectedProperty.images.length,
      ];

      indicesToPreload.forEach((index) => {
        const img = new window.Image();
        img.src = selectedProperty.images[index];
      });
    };

    preloadImages();
  }, [currentImage, selectedProperty.images]);

  const handlePrevImage = () => {
    if (isTransitioning || !selectedProperty.images) return;

    setIsTransitioning(true);
    setCurrentImage(
      (prev) =>
        (prev - 1 + selectedProperty.images.length) %
        selectedProperty.images.length
    );

    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current);
    }

    transitionTimeout.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleNextImage = () => {
    if (isTransitioning || !selectedProperty.images) return;

    setIsTransitioning(true);
    setCurrentImage((prev) => (prev + 1) % selectedProperty.images.length);

    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current);
    }

    transitionTimeout.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !selectedProperty.images) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) handleNextImage();
    if (diff < -50) handlePrevImage();

    touchStartX.current = null;
  };

  const goToImage = (index: number) => {
    if (isTransitioning || index === currentImage || !selectedProperty.images)
      return;

    setIsTransitioning(true);
    setCurrentImage(index);

    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current);
    }

    transitionTimeout.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
      }
    };
  }, []);

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

  const handleShare = async () => {
    try {
      const shareData = {
        title: document.title,
        text: "Check out this property on UniNest",
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log("Share failed:", err);
    }
  };

  useEffect(() => {
    if (mapLoaded && mapRef.current && window.google) {
      const position = selectedProperty.address?.includes("London")
        ? { lat: 51.505, lng: -0.09 }
        : { lat: 28.6139, lng: 77.209 };

      if (markerInstance.current) {
        markerInstance.current.setMap(null);
      }
      if (mapInstance.current) {
        mapInstance.current = null;
      }

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
  }, [mapLoaded, selectedProperty.address]);

  if (!isModalOpen) return null;

  const tabs = [
    { id: "basic-info", label: "Basic Info", icon: Home },
    { id: "location", label: "Location", icon: MapPin },
    { id: "community-amenities", label: "Amenities", icon: Users },
    { id: "house-rules", label: "Rules", icon: Shield },
    { id: "reviews", label: "Reviews", icon: MessageCircle },
  ];

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="afterInteractive"
        onLoad={() => setMapLoaded(true)}
        onError={() => console.error("Failed to load Google Maps API")}
      />

      <div className="fixed inset-0 z-40 overflow-y-auto bg-white mt-16 px-2 sm:px-4 md:px-8 lg:px-36">
        <div className="px-2 py-2 sm:px-4 sm:py-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 line-clamp-2">
                {selectedProperty.title}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {selectedProperty.ratings}
                  </span>
                  <span className="text-gray-500 text-sm sm:text-base">
                    ({selectedProperty.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={handleShare}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full"
                aria-label="Share property"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full"
                aria-label="Save property"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Property badges and info */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm">
                📚 {selectedProperty.propertyType}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs sm:text-sm">
                ✅ {selectedProperty.verified ? "Verified" : "Not Verified"}
              </span>
            </div>
          </div>

          {/* Address and Property ID */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="line-clamp-1">
                {selectedProperty.location.address || "Address not available"}
              </span>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
              Property ID: {selectedProperty._id || "32912"}
              <button
                onClick={handleCopy}
                className="hover:text-red-500 transition"
                aria-label={copied ? "Copied!" : "Copy Property ID"}
              >
                {copied ? (
                  <Check className="ml-1 w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                ) : (
                  <Copy className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </button>
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Images and Content */}
            <div className="flex-1 min-w-0">
              {/* Enhanced Image Carousel */}
              <div
                className="relative aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden mb-4"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {selectedProperty.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      index === currentImage
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Property image ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === currentImage}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                    />
                  </div>
                ))}

                {/* Navigation Arrows */}
                {selectedProperty.images?.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-all z-10"
                      aria-label="Previous image"
                      disabled={isTransitioning}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-all z-10"
                      aria-label="Next image"
                      disabled={isTransitioning}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Image navigation indicators */}
              {selectedProperty.images?.length > 1 && (
                <div className="flex justify-center mt-4">
                  {selectedProperty.images.length <= 100 ? (
                    <div className="flex gap-2 overflow-x-auto py-2">
                      {selectedProperty.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImage
                              ? "bg-blue-500 w-4"
                              : "bg-gray-300"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                          disabled={isTransitioning}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      {currentImage + 1} of {selectedProperty.images.length}
                    </div>
                  )}
                </div>
              )}

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-4 mt-6">
                <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? "border-red-500 text-red-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                      aria-current={activeTab === tab.id ? "page" : undefined}
                    >
                      <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-96">
                {activeTab === "location" ? (
                  <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold">
                      Location
                    </h3>

                    {/* Address Block */}
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        <span className="font-medium text-sm sm:text-base">
                          Address
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {selectedProperty?.location?.address ||
                          "Address not available"}
                      </p>
                    </div>

                    {/* Embedded Google Map (no API key) */}
                    <div className="h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden relative border border-gray-200 shadow-sm">
                      <iframe
                        title="Property Location Map"
                        className="w-full h-full"
                        frameBorder="0"
                        style={{ border: 0 }}
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                          selectedProperty?.location?.address ||
                            "New Delhi, India"
                        )}&output=embed`}
                        allowFullScreen
                      ></iframe>
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
            <div className="w-full lg:w-80 bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 lg:sticky lg:top-4 h-fit">
              <div className="mb-4 sm:mb-6">
                <div className="text-xl sm:text-2xl font-bold">
                  £{selectedProperty.price || "313"} /week
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Advance rent £{selectedProperty.advanceRent || "185"}
                </div>
              </div>

              <form className="space-y-3 sm:space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-xs sm:text-sm font-medium mb-1"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-xs sm:text-sm font-medium mb-1"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium mb-1"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs sm:text-sm font-medium mb-1"
                  >
                    Phone Number*
                  </label>
                  <div className="flex">
                    <select className="p-2 text-sm border border-gray-300 rounded-l">
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
                      className="flex-1 p-2 text-sm border-t border-b border-r border-gray-300 rounded-r"
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
                      information...
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
                      I agree to the Privacy Policy and User Agreement.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base cursor-pointer"
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
