"use client";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Share2, Heart } from "lucide-react";
import Image from "next/image";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

interface Props {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  propertyTitle?: string;
  selectedProperty: {
    ratings?: number;
    reviewCount?: number;
    reviews?: Review[];
  };
}

const ImageGalleryModal = ({
  images,
  initialIndex,
  onClose,
  selectedProperty = {
    ratings: 0,
    reviewCount: 0,
    reviews: [],
  },
  propertyTitle,
}: Props) => {
  const [current, setCurrent] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToImage = (index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) next();
    if (diff < -50) prev();
    setTouchStartX(null);
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: propertyTitle,
        text: "Check out this property",
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

  return (
    <div className="fixed inset-0 z-[9999] bg-white mt-14 flex flex-col md:flex-row overflow-hidden">
      {/* Left Side - Images */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header - Only shown on mobile */}
          {isMobile && (
            <div className="flex items-center justify-between p-4 text-black bg-white border-b border-gray-200 shadow-sm">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="text-lg font-medium truncate max-w-[180px]">
                  {propertyTitle}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
                >
                  <Share2 className="w-6 h-6" />
                </button>
                <button className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all">
                  <Heart className="w-6 h-6" />
                </button>
                <button
                  onClick={onClose}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          {/* Main Image Container */}
          <div
            className={`relative flex items-center justify-center ${
              isMobile ? "h-[300px]" : "h-[500px]"
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={prev}
              disabled={isTransitioning}
              className="absolute left-4 z-10 bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 text-black p-3 rounded-full transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <Image
              src={images[current]}
              alt={`Property view ${current + 1}`}
              width={1200}
              height={800}
              className="max-h-full max-w-full object-contain rounded-xl"
              priority
            />

            <button
              onClick={next}
              disabled={isTransitioning}
              className="absolute right-4 z-10 bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 text-black p-3 rounded-full transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm font-medium">
              {current + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div
            className={`p-1 ${
              isMobile ? "overflow-x-auto" : "overflow-hidden"
            }`}
          >
            <div
              className={`flex gap-2 ${
                isMobile
                  ? "px-4 pb-2 w-max mx-auto"
                  : "max-w-5xl mx-auto px-40 justify-center"
              }`}
            >
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-24 h-18 mt-1 rounded overflow-hidden transition-all ${
                    current === index
                      ? "ring-2 ring-blue-500 opacity-100 rounded-xl"
                      : "opacity-60 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={56}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Reviews Section (Desktop) */}
        {!isMobile && (
          <div className="w-96 bg-white border-l border-gray-300 overflow-y-auto">
            <div className="p-6">
              {/* Reviews Header */}
              <div className="text-black rounded-lg p-4 text-center mb-4 flex gap-4">
                <div className="w-14 text-3xl font-bold bg-[#0c7094] text-white rounded-lg flex items-center justify-center">
                  {selectedProperty.ratings}
                </div>
                <div className="text-2xl opacity-90 flex items-center">
                  {selectedProperty.reviewCount} reviews
                </div>
              </div>

              {/* Review Categories */}
              <div className="space-y-2 text-sm mb-4 flex flex-wrap items-center gap-2">
                <div className="flex gap-3 items-center bg-gray-200 rounded-lg px-2 py-1 w-[43%]">
                  <span className="text-gray-700">Great customer service</span>
                  <span className="text-gray-500 font-medium">19</span>
                </div>
                <div className="flex gap-3 items-center bg-gray-200 rounded-lg px-2 py-1 w-[35%]">
                  <span className="text-gray-700">Amazing facilities</span>
                  <span className="text-gray-500 font-medium">22</span>
                </div>
                <div className="flex gap-3 items-center bg-gray-200 rounded-lg px-2 py-1 w-[30%]">
                  <span className="text-gray-700">Amazing area</span>
                  <span className="text-gray-500 font-medium">19</span>
                </div>
                <div className="flex gap-3 items-center bg-gray-200 rounded-lg px-2 py-1 w-[36%]">
                  <span className="text-gray-700">Super-fast internet</span>
                  <span className="text-gray-500 font-medium">13</span>
                </div>
              </div>

              {/* Reviews List */}
              <h3 className="font-semibold text-gray-900 mb-4">
                What guests loved the most:
              </h3>

              <div className="space-y-6">
                {(selectedProperty.reviews || []).map((review, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 flex-shrink-0">
                      {review.avatar ? (
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        review.name?.substring(0, 2).toUpperCase()
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900 truncate">
                          {review.name || "Anonymous"}
                        </span>
                        <span className="bg-teal-500 text-white px-2 py-1 rounded text-xs font-bold flex-shrink-0">
                          {review.rating.toFixed(1) || "5.0"}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        {review.date || "Unknown Date"}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {review.comment || "No comment provided."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Reviews Section */}
      {isMobile && (
        <div className="w-full bg-white border-t border-gray-300 overflow-y-auto">
          <div className="p-4">
            {/* Reviews Header */}
            <div className="text-black rounded-lg p-4 text-center mb-4 flex gap-4 justify-center">
              <div className="w-14 text-3xl font-bold bg-[#0c7094] text-white rounded-lg flex items-center justify-center">
                {selectedProperty.ratings}
              </div>
              <div className="text-2xl opacity-90 flex items-center">
                {selectedProperty.reviewCount} reviews
              </div>
            </div>

            {/* Review Categories - Simplified for mobile */}
            <div className="space-y-2 text-sm mb-4">
              {["Great service", "Facilities", "Location", "Internet"].map(
                (category) => (
                  <div
                    key={category}
                    className="flex justify-between items-center bg-gray-200 rounded-lg px-3 py-2"
                  >
                    <span className="text-gray-700">{category}</span>
                    <span className="text-gray-500 font-medium">19</span>
                  </div>
                )
              )}
            </div>

            {/* Reviews List */}
            <h3 className="font-semibold text-gray-900 mb-4">
              What guests loved:
            </h3>

            <div className="space-y-4">
              {(selectedProperty.reviews || [])
                .slice(0, 3)
                .map((review, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 flex-shrink-0">
                      {review.avatar ? (
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        review.name?.substring(0, 2).toUpperCase()
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900 truncate">
                          {review.name || "Anonymous"}
                        </span>
                        <span className="bg-teal-500 text-white px-2 py-1 rounded text-xs font-bold flex-shrink-0">
                          {review.rating.toFixed(1) || "5.0"}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        {review.date || "Unknown Date"}
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {review.comment || "No comment provided."}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGalleryModal;
