import React from "react";
import { Users, Bed, Bath } from "lucide-react";
import { Property } from "@/types/types";

export interface SectionProps {
  selectedProperty: Property;
}

export const BasicInfoSection: React.FC<SectionProps> = ({
  selectedProperty,
}) => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-[20px] font-bold text-gray-900 mb-2">
          Basic Information
        </h3>
        <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <Users className="w-7 h-7 text-blue-600 mb-2" />
          <span className="text-2xl font-bold text-gray-800">
            {selectedProperty.capacity || "N/A"}
          </span>
          <p className="text-sm text-gray-500 mt-1">Guests</p>
        </div>
        <div className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <Bed className="w-7 h-7 text-blue-600 mb-2" />
          <span className="text-2xl font-bold text-gray-800">
            {selectedProperty.bedrooms || "N/A"}
          </span>
          <p className="text-sm text-gray-500 mt-1">Bedrooms</p>
        </div>
        <div className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <Bath className="w-7 h-7 text-blue-600 mb-2" />
          <span className="text-2xl font-bold text-gray-800">
            {selectedProperty.bathrooms || "N/A"}
          </span>
          <p className="text-sm text-gray-500 mt-1">Bathrooms</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-3">Description</h4>
        <p className="text-gray-600 leading-relaxed">
          {selectedProperty.description || (
            <span className="text-gray-400">No description available</span>
          )}
        </p>
      </div>
    </div>
  );
};
