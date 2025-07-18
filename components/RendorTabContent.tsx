"use client";
import React, { useState } from "react";
import { Property } from "@/types/types";
import { AmenitiesSection } from "./AmenitiesSection";
import { BasicInfoSection } from "./BasicInfoSection";
import { LocationSection } from "./LocationSection";
import { ReviewsSection } from "./ReviewSection";
import { HouseRulesSection } from "./HousingRuleSection";
import FloorPlanSection from "./FloorPlanSection";

interface RenderTabContentProps {
  activeTab: string;
  selectedProperty: Property;
}

export const RenderTabContent: React.FC<RenderTabContentProps> = ({
  activeTab,
  selectedProperty,
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const handleMapError = (error: string) => {
    setMapError(error);
  };

  console.log(handleMapError, handleMapLoad);

  if (mapError) return <div>Error: {mapError}</div>;

  if (mapLoaded) return <div></div>;

  switch (activeTab) {
    case "community-amenities":
      return <AmenitiesSection selectedProperty={selectedProperty} />;
    case "basic-info":
      return <BasicInfoSection selectedProperty={selectedProperty} />;
    case "floor-plan":
      return <FloorPlanSection selectedProperty={selectedProperty} />;
    case "location":
      return <LocationSection selectedProperty={selectedProperty} />;
    case "reviews":
      return <ReviewsSection selectedProperty={selectedProperty} />;
    case "house-rules":
      return <HouseRulesSection />;
    default:
      return <BasicInfoSection selectedProperty={selectedProperty} />;
  }
};
