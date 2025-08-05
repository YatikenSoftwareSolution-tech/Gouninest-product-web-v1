// app/properties/[id]/page.tsx
import PropertyClientComponent from "@/components/PropertyClientComponent";
import {  Property } from "@/types/types";
import Link from "next/link";
import { fetchPropertyById } from "@/constants/api";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: propertyId } = await params;

  const selectedProperty = await fetchPropertyById( propertyId) as Property;

  if (!selectedProperty) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg text-gray-600 mb-4">Property not found</p>
        <Link
          href="/"
          className="px-4 py-2 bg-electric-500 border text-black rounded-lg hover:bg-electric-600 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <PropertyClientComponent property={selectedProperty} />
    </div>
  );
}
