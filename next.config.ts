import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Critical for Cloud Run (creates optimized server)
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "storage.googleapis.com" }, // For GCS buckets
    ],
    unoptimized: true, // Disable default Image Optimization (or configure a loader)
  },
  // Optional: Enable React Strict Mode (recommended)
  reactStrictMode: true,
  // Optional: Set environment variable prefixes for Cloud Run
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
