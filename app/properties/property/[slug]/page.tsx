"use client";
import DetailedPropertyCard from "@/components/DetailedPropertyCard";
import { useGlobal } from "@/context/GlobalContext";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { properties } = useGlobal();
  const params = useSearchParams();
  const propertyId = params.get("id");

  const selectedProperty = properties.find(
    (property) => property._id === propertyId
  );
  return (
    <div className="flex justify-center items-center min-h-screen">
      {selectedProperty ? (
        <DetailedPropertyCard property={selectedProperty} />
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Property not found</h1>
          <p>Please select a property to view details</p>
        </div>
      )}
    </div>
  );
};

export default Page; 