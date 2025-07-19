import React from "react";
import Image from "next/image";
import { Video, Box, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProperty {
  images?: string[];
  videos?: {
    id: number;
    title: string;
    duration: string;
    thumbnail: string;
    url: string;
  }[];
  threeDTours?: {
    id: number;
    title: string;
    thumbnail: string;
    url: string;
  }[];
}

interface VideoItem {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  url: string;
}

interface ThreeDTourItem {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
}

interface GalleryProperty {
  images?: string[];
  videos?: VideoItem[];
  threeDTours?: ThreeDTourItem[];
}



const renderVideoContent = (
  videos: VideoItem[]
) => (
  <div className="space-y-3 h-[465px]">
    {videos.length > 0 ? (
      <div className="grid grid-cols-1 gap-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group relative rounded-lg overflow-hidden border border-gray-200"
          >
            <div className="relative aspect-video">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-600/80 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            <div className="p-2">
              <h4 className="font-medium text-sm">{video.title}</h4>
              <p className="text-xs text-gray-500">{video.duration}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col justify-center text-center py-6 bg-gray-50 rounded-lg h-[465px]">
        <Video className="w-8 h-8 mx-auto text-gray-400" />
        <p className="mt-2 text-gray-500 text-sm">No videos available</p>
      </div>
    )}
  </div>
);

const render3DContent = (tours: ThreeDTourItem[]) => (
  <div className="space-y-3 h-[465px]">
    {tours.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="group relative rounded-lg overflow-hidden border border-gray-200"
          >
            <div className="relative aspect-square">
              <Image
                src={tour.thumbnail}
                alt={tour.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-md">
                  View in 3D
                </div>
              </div>
            </div>
            <div className="p-2">
              <h4 className="font-medium text-sm">{tour.title}</h4>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col justify-center text-center py-6 bg-gray-50 rounded-lg h-[465px]">
        <Box className="w-8 h-8 mx-auto text-gray-400" />
        <p className="mt-2 text-gray-500 text-sm">No 3D tours available</p>
      </div>
    )}
  </div>
);

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
            {renderVideoContent(
              selectedProperty.videos || []
            )}
          </div>
        </div>
      );
    case "3d-views":
      return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="">
            {render3DContent(
              selectedProperty.threeDTours || []
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export { renderGalleryTabContent };
