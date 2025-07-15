import React from "react";
import { Star } from "lucide-react";
import { Property } from "@/types/types";

export interface SectionProps {
  selectedProperty: Property;
}

export const ReviewsSection: React.FC<SectionProps> = ({
  selectedProperty,
}) => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-[20px] font-bold text-gray-900 mb-2">
          Reviews
        </h3>
        <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(selectedProperty.ratings || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-800">
                {selectedProperty.ratings || "0.0"}
              </span>
              <span className="text-gray-500 text-sm ml-1">/ 5</span>
            </div>
          </div>

          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {selectedProperty.reviewCount || 0}{" "}
            {selectedProperty.reviews === 1 ? "review" : "reviews"}
          </div>
        </div>

        <div className="space-y-4">
          {selectedProperty.reviews ? (
            <>
              <p className="text-gray-600 leading-relaxed">
                &ldquo;Recent tenants have shared their experiences living
                here...&rdquo;
              </p>

              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition-colors">
                Read all reviews
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          ) : (
            <div className="text-center py-6">
              <svg
                className="w-12 h-12 mx-auto text-gray-300 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <p className="text-gray-500">No reviews yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Be the first to share your experience
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
