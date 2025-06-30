"use client";
import React, { useState } from "react";
import { featuredBlogs } from "@/constants/home";
import { MoveRightIcon, MoveLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/context/GlobalContext";

const FeaturedBlogs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = featuredBlogs.length;

  const {setSelectedBlog} = useGlobal();

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const router = useRouter();

  const handleSelectedBlog = (blogId: number) => {
  
    setSelectedBlog(blogId);
    router.push(`/blogs/${blogId}`);
  };

  const post = featuredBlogs[currentIndex];
  return (
    <section
      id="featuredBlogs"
      className="py-20 bg-gradient-to-br from-[var(--color-electric-50)] to-lime-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Read
            <span className="text-gradient"> Trending Articles </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Stay updated about the educational market and new properties through
            our weekly blogs.
          </p>
          <Link href={`/blogs`}>
            <button className="mt-4 md:mt-8 flex gap-2 text-base md:text-xl font-medium items-center bg-gradient-to-r from-[var(--color-electric-500)] to-lime-500 text-white py-2 md:py-4 px-4 md:px-6 rounded-full hover:shadow-lg transition-all duration-300 mx-auto">
              View All
              <MoveRightIcon className="animate-bounce-right" />
            </button>
          </Link>
        </div>
        <div className="relative max-w-6xl mx-auto px-2 sm:px-6 lg:px-12 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-0">
          <div className="w-full md:w-1/2 px-0 md:px-6 text-left animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent">
              {post.title}
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600 max-w-md">
              {post.introduction}
            </p>
            
              <button onClick={() => handleSelectedBlog(post.id)} className="mt-6 cursor-pointer flex items-center gap-2 font-medium text-base bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 text-white py-2 px-4 rounded-full hover:shadow-lg transition-all duration-300">
          Read More
          <MoveRightIcon className="animate-bounce-right" />
              </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <Image
              src={post.image || "/blogs/blog4.png"}
              width={340}
              height={340}
              alt={post.title}
              className="rounded-lg object-cover w-full max-w-xs md:max-w-md"
            />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 md:p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition flex items-center justify-center"
            aria-label="Previous"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}
          >
            <MoveLeftIcon className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 md:p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition flex items-center justify-center"
            aria-label="Next"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}
          >
            <MoveRightIcon className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
