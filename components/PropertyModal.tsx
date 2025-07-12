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

const PropertyModal: React.FC<PropertyModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedProperty,
}) => {
  const [gridMode, setGridMode] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("basic-info");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
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
    setSelectedImageIndex((prev) =>
      prev === selectedProperty.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    if (!selectedProperty.images) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? selectedProperty.images.length - 1 : prev - 1
    );
  };

  const tabs = [
    { id: "basic-info", label: "Basic Info", icon: Home },
    { id: "location", label: "Location", icon: MapPin },
    { id: "community-amenities", label: "Amenities", icon: Users },
    { id: "house-rules", label: "Rules", icon: Shield },
    { id: "reviews", label: "Reviews", icon: MessageCircle },
  ];

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-white mt-16 px-2 sm:px-4 md:px-8 lg:px-36">
      <div className="px-2 py-2 sm:px-4 sm:py-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 line-clamp-2">
              {selectedProperty.title}
            </h1>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{selectedProperty.ratings}</span>
              <span className="text-gray-500 text-sm sm:text-base">
                ({selectedProperty.reviews} reviews)
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Property Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm">
            📚 {selectedProperty.propertyType}
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs sm:text-sm">
            ✅ {selectedProperty.verified ? "Verified" : "Not Verified"}
          </span>
        </div>

        {/* Address and ID */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">
              {selectedProperty.location?.address || "Address not available"}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
            Property ID: S0{selectedProperty.externalId || "32912"}
            <button onClick={handleCopy}>
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </span>
        </div>

        {/* Image Gallery */}
        <div className="mb-6 relative">
          {!gridMode ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="sm:col-span-2 relative">
                <Image
                  src={selectedProperty.images?.[selectedImageIndex]}
                  alt="Main"
                  width={800}
                  height={500}
                  className="rounded-lg object-cover w-full h-[220px] sm:h-[500px]"
                  onClick={() => openImageModal(selectedImageIndex)}
                />
                {selectedProperty.images?.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex sm:flex-col flex-row gap-2">
                {selectedProperty.images
                  ?.filter((_, i) => i !== selectedImageIndex)
                  .slice(0, 2)
                  .map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt={`Thumbnail ${i}`}
                      width={400}
                      height={200}
                      className="rounded-lg object-cover w-full h-[80px] sm:h-[247px] cursor-pointer"
                      onClick={() => {
                        const index = selectedProperty.images.indexOf(img);
                        setSelectedImageIndex(index);
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
                  className={`rounded-lg object-cover w-full h-24 sm:h-40 cursor-pointer ${
                    index === selectedImageIndex ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setGridMode(false);
                  }}
                />
              ))}
            </div>
          )}
          <button
            onClick={() => setGridMode(!gridMode)}
            className="text-blue-600 underline text-sm mt-2"
          >
            {gridMode ? "Back to main view" : "Show all images"}
          </button>
        </div>

        {/* Tabs & Content */}
        <div className="flex flex-col lg:flex-row w-full gap-6">
          <div className="w-full max-w-full">
            <div className="border-b border-gray-200 mb-4">
              <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 ${
                      activeTab === tab.id
                        ? "border-red-500 text-red-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="w-full">
              {activeTab === "location" ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Location</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Address</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {selectedProperty.location?.address || "Not available"}
                    </p>
                  </div>
                  <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      title="Property Location"
                      className="w-full h-full"
                      frameBorder="0"
                      style={{ border: 0 }}
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(
                        selectedProperty?.location?.address || "New Delhi"
                      )}&output=embed`}
                      allowFullScreen
                    />
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

          <div className="w-full lg:max-w-md">
            <RightFormSection
              selectedProperty={selectedProperty}
              formData={formData}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
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
