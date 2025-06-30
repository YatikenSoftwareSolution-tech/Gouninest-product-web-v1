"use client";

import { MoveRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import BlogCard from "./_components/BlogCards";
import { useRouter } from "next/navigation";
import { BlogPosts } from "@/constants/blogs";

const BlogsPage = () => {
  const router = useRouter();
  const featuredBlogs = [4];
  const featuredPosts = BlogPosts.filter((post) =>
    featuredBlogs.includes(post.id)
  );
  return (
    <div className="flex flex-col w-full bg-gradient-to-br from-[var(--color-electric-100)] to-lime-100 px-4 sm:px-10 md:px-20 lg:px-40 pb-10 md:pb-10 mt-2">
      {/* Featured Post Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 glass-effect rounded-xl py-6 mt-14 md:mt-32">
        
        <div className="flex flex-col gap-5 px-6 md:px-16  text-center lg:text-left w-full lg:w-1/2">
          <p className=" font-semibold">Featured Post</p>
          {featuredPosts.map((post, idx) => (
          <div key={idx}>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent">
                {post.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base pt-4 md:pt-8 max-w-full lg:max-w-[450px] mx-auto lg:mx-0 text-gray-600">
              {post.introduction}
            </p>

            <div className="mt-2 mb-4 flex justify-center lg:justify-start">
              <button
                onClick={() => router.push(`/blogs/4`)}
                className="w-auto mt-4 md:mt-8 flex gap-2 text-base md:text-xl font-medium items-center bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 text-white py-2 md:py-4 px-4 md:px-6 rounded-full hover:shadow-lg transition-all duration-300"
              >
                Read More <MoveRightIcon className="animate-bounce-right" />
              </button>
            </div>
          </div>
        ))}
        </div>

        <div className="px-4 md:px-6 w-full lg:w-1/2 flex justify-center">
          <Image
            src="/blogs/blog4.png" // Update with your image
            width={520}
            height={520}
            alt="Student Housing Blog Banner"
            className=""
          />
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="mb-20 md:mb-40">
        <div className="flex flex-col md:flex-row items-center justify-between pt-20 md:pt-40 px-4 md:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Recent{" "}
            <span className="text-[var(--color-electric-500)]">Posts</span>
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BlogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
