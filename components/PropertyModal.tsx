"use client";
import React, { useState } from "react";
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
import { Property } from "@/types/types";
import { RenderTabContent } from "./RendorTabContent";
import RightFormSection from "./RightFormSection";
import ImageGalleryModal from "./modals/ImageGalleryModal";

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
  const [gridMode, setGridMode] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("basic-info");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    agreeTerms: false,
    agreePrivacy: false,
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setImageModalOpen(true);
  };

  const handleNextImage = () => {
    if (!selectedProperty.images) return;
    setSelectedImageIndex((prevIndex) =>
      prevIndex === selectedProperty.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    if (!selectedProperty.images) return;
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedProperty.images.length - 1 : prevIndex - 1
    );
  };

  if (!isModalOpen) return null;

  const tabs = [
    { id: "basic-info", label: "Basic Info", icon: Home },
    { id: "location", label: "Location", icon: MapPin },
    { id: "community-amenities", label: "Amenities", icon: Users },
    { id: "house-rules", label: "Rules", icon: Shield },
    { id: "reviews", label: "Reviews", icon: MessageCircle },
  ];

  return (
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

        {/* Property Badges */}
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
            Property ID: S0{selectedProperty.externalId || "32912"}
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

        {/* Image Section */}
        <div className="mb-6 relative">
          {!gridMode ? (
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 relative">
                <Image
                  src={selectedProperty.images?.[selectedImageIndex]}
                  alt="Main"
                  width={800}
                  height={500}
                  className="rounded-lg object-cover w-full h-[500px] cursor-pointer"
                  onClick={() => openImageModal(selectedImageIndex)}
                />
                {selectedProperty.images?.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 p-2 rounded-full shadow-md z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 p-2 rounded-full shadow-md z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {selectedProperty.images
                  ?.filter((_, index) => index !== selectedImageIndex)
                  .slice(0, 2)
                  .map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt={`Small ${i}`}
                      width={400}
                      height={200}
                      className="rounded-lg object-cover w-full h-[247px] cursor-pointer"
                      onClick={() => {
                        const clickedIndex =
                          selectedProperty.images?.indexOf(img) || 0;
                        setSelectedImageIndex(clickedIndex);
                      }}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {selectedProperty.images?.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`Grid ${index}`}
                  width={400}
                  height={300}
                  className={`rounded-lg object-cover w-full h-32 sm:h-40 lg:h-44 cursor-pointer ${
                    index === selectedImageIndex ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    if (gridMode) setGridMode(false);
                  }}
                />
              ))}
            </div>
          )}
          <button
            onClick={() => setGridMode((prev) => !prev)}
            className="text-blue-600 underline text-sm mt-2"
          >
            {gridMode ? "Back to main view" : "Show all images"}
          </button>
        </div>

        <div className="flex w-full gap-6">
          <div>
            <div className="border-b border-gray-200 mb-4">
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
                  >
                    <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="min-h-96 w-[760px]">
              {activeTab === "location" ? (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-semibold">Location</h3>
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

          <RightFormSection
            selectedProperty={selectedProperty}
            formData={formData}
            handleChange={handleChange}
          />
        </div>
      </div>

      {imageModalOpen && (
        <ImageGalleryModal
          images={selectedProperty.images || []}
          initialIndex={selectedImageIndex}
          onClose={() => setImageModalOpen(false)}
          propertyTitle={selectedProperty.title}
          selectedProperty={{
            ratings: selectedProperty.ratings ?? 0,
            reviewCount: selectedProperty.reviewCount ?? 0,
          }}
        />
      )}
    </div>
  );
};

export default PropertyModal;
