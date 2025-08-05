'use client'
import { Pause, Play, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react'

const VrsViewer = ({ videos }) => {
    console.log(videos)
    // Create refs for each video
    const videoRefs = useRef([]);
    // State to track play/pause for each video
    const [playingStates, setPlayingStates] = useState(
        videos.map(() => false)
    );
    // State to track which video is currently shown
    const [selectedIndex, setSelectedIndex] = useState(0);


    const handlePrev = () => {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev < videos.length - 1 ? prev + 1 : prev));
    };

    return (
        <div className="space-y-3 h-[465px] flex flex-col items-center justify-center">
            {videos.length > 0 ? (
                <div className="relative w-full flex items-center justify-center">
                    {/* Left Button */}
                    <button
                        onClick={handlePrev}
                        disabled={selectedIndex === 0}
                        className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md ${selectedIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label="Previous video"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>

                    {/* Video */}
                    <div className="w-full  mx-auto">
                        <div className="group relative rounded-lg overflow-hidden border border-gray-200">
                            <div className="relative aspect-video">
                                <Image
                                    src={videos[selectedIndex].url}
                                    className="object-cover w-full h-full"
                                    alt="vrs"
                                    fill
                                />
                                <Link
                                    className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer"
                                    href={videos[selectedIndex].url}
                                    target='_blank'
                                >
                                    <Play className="w-5 h-5 text-white" />
                                </Link>
                            </div>
                        </div>
                        
                    </div>

                    {/* Right Button */}
                    <button
                        onClick={handleNext}
                        disabled={selectedIndex === videos.length - 1}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md ${selectedIndex === videos.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label="Next video"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            ) : (
                <div className="flex flex-col justify-center text-center py-6 bg-gray-50 rounded-lg h-[465px]">
                    <Video className="w-8 h-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500 text-sm">No VRS available</p>
                </div>
            )}
        </div>
    );
}

export default VrsViewer
