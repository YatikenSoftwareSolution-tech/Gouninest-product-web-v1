import React from "react";
import Image from "next/image";
import {  ChevronLeft, ChevronRight,  } from "lucide-react";
import VideoWrapper from '../components/VideoWrapper';
import VrsViewer from '../components/VrsViewer';

interface GalleryProperty {
  images?: string[];
  videos?: {
    type: string
    url: string;
  }[];
  threeDTours?: {
    type: string
    url: string;
  }[];
}

interface VideoItem {
  type: string
  url: string;
}

interface ThreeDTourItem {
  type: string
  url: string;
}

interface GalleryProperty {
  images?: string[];
  videos?: VideoItem[];
  vrs?: ThreeDTourItem[];
}


const renderPhotosContent = (
  selectedProperty: GalleryProperty,
  gridMode: boolean,
  selectedImageIndex: number,
  setSelectedImageIndex: (index: number) => void,
  setGridMode: (mode: boolean) => void,
  openImageModal: (index: number) => void,
  handlePrevImage: () => void,
  handleNextImage: () => void
) => (
  <div className="mb-6 relative">
    {!gridMode ? (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="sm:col-span-2 relative">
          <Image
            src={
              selectedProperty.images?.[selectedImageIndex] ||
              "/placeholder.jpg"
            }
            alt="Main"
            width={800}
            height={500}
            className="rounded-lg object-cover w-full h-[220px] sm:h-[500px]"
            onClick={() => openImageModal(selectedImageIndex)}
          />
          {selectedProperty.images && selectedProperty.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
                aria-label="Next image"
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
                  const index = selectedProperty.images?.indexOf(img) ?? -1;
                  if (index !== -1) {
                    setSelectedImageIndex(index);
                  }
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
            className={`rounded-lg object-cover w-full h-24 sm:h-40 cursor-pointer ${index === selectedImageIndex ? "ring-2 ring-blue-500" : ""
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
);

const renderGalleryTabContent = (
  tabId: string,
  selectedProperty: GalleryProperty,
  gridMode: boolean,
  selectedImageIndex: number,
  setSelectedImageIndex: (index: number) => void,
  setGridMode: (mode: boolean) => void,
  openImageModal: (index: number) => void,
  handlePrevImage: () => void,
  handleNextImage: () => void
) => {
  switch (tabId) {
    case "photos":
      return renderPhotosContent(
        selectedProperty,
        gridMode,
        selectedImageIndex,
        setSelectedImageIndex,
        setGridMode,
        openImageModal,
        handlePrevImage,
        handleNextImage
      );
    case "video":
      return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="">
           <VideoWrapper videos={selectedProperty.videos}/>
          </div>
        </div>
      );
    case "3d-views":
      return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <VrsViewer videos={selectedProperty.vrs}/>
        </div>
      );
    default:
      return null;
  }
};

export { renderGalleryTabContent };
