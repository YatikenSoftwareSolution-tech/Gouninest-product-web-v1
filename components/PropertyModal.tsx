"use client";
import React, { useState } from "react";
import {
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
// import Image from "next/image";
import { Property } from "@/types/types";
import { RenderTabContent } from "./RendorTabContent";
import RightFormSection from "./RightFormSection";
import ImageGalleryModal from "./modals/ImageGalleryModal";
import { renderGalleryTabContent } from "./GalleryTabContent";

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
  const [activeGalleryTab, setActiveGalleryTab] = useState("photos");
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

  const handleGalleryTabClick = (tabId: string) => {
    setActiveGalleryTab(tabId);
  };

  const galleryTabs = [
    { id: "photos", label: "Photos" },
    { id: "video", label: "Video" },
    { id: "3d-views", label: "3D Views" },
  ]

  const tabs = [
    { id: "basic-info", label: "Basic Info", icon: Home },
    { id: "floor-plan", label: "Floor Plan", icon: Star },
    { id: "location", label: "Location", icon: MapPin },
    { id: "community-amenities", label: "Amenities", icon: Users },
    { id: "house-rules", label: "Rules", icon: Shield },
    { id: "reviews", label: "Reviews", icon: MessageCircle },
  ];

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] overflow-y-auto bg-white mt-16 px-2 sm:px-4 md:px-8 lg:px-36">
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
              <X className="w-5 h-5 max-sm:w-4 max-sm:h-4 transition-transform duration-300 hover:rotate-90" />
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
              {selectedProperty.title},{" "}
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

        <div className="relative">
          {/* gallery tabs & content */}
          <div className="absolute bottom-20 left-[50%] transform -translate-x-1/2 z-50">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-1 border border-gray-200">
              {galleryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleGalleryTabClick(tab.id)}
                  className={`w-28 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeGalleryTab === tab.id
                      ? "bg-gradient border border-blue-400 text-blue-50 text-[13px] font-semibold shadow-md"
                      : "text-gray-700 text-[13px] font-semibold  hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                  {/* <span className="pl-0 h-10 bg-black"></span> */}
                  {activeGalleryTab === tab.id && (
                    <span className="w-2 h-2 bg-white rounded-full opacity-80"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full">
            {renderGalleryTabContent(
              activeGalleryTab,
              selectedProperty,
              gridMode,
              selectedImageIndex,
              setSelectedImageIndex,
              setGridMode,
              openImageModal,
              handlePrevImage,
              handleNextImage
            )}
          </div>
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
                  <div className="mb-8">
                    <h3 className="text-[20px] font-bold text-gray-900 mb-2">
                      Location
                    </h3>
                    <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Address</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {selectedProperty.title},{" "}
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
                        `${selectedProperty.title}, ${
                          selectedProperty?.location?.address || "New Delhi"
                        }`
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
