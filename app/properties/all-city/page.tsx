import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import DetailedPropertyCard from "@/components/DetailedPropertyCard";
import Link from "next/link";
import {
  fetchImages,
  fetchPropertiesCountInLocations,
  fetchTopProperties,
} from "@/constants/api";
import { CountryCityPropertyCount, CountryPropertyCount } from "@/types/types";

interface CityImageType {
  country: string;
  cities: { _id: string; imageUrl: string }[];
}

const countryNameMap: Record<string, string> = {
  GB: "UK",
  AU: "Australia",
  US: "USA",
  IE: "Ireland",
  NZ: "New Zealand",
  CA: "Canada",
  DE: "Germany",
  FR: "France",
  NL: "Netherlands",
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ country: string }>;
}) => {
  const { country } = await searchParams;

  const [locations, countryProperty, cityImages] = await Promise.all([
    fetchPropertiesCountInLocations() as Promise<CountryCityPropertyCount[]>,
    fetchTopProperties() as Promise<CountryPropertyCount[]>,
    fetchImages() as Promise<CityImageType[]>,
  ]);

  const countryData = locations.find((loc) => loc.country === country);
  const selectedCountryProperties =
    countryProperty.find((entry) => entry.country === country)?.properties ||
    [];

  if (!countryData) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-gray-600">Country not found</p>
      </div>
    );
  }

  const getCityImage = (country: string, city: string) => {
    const countryObj = cityImages.find((c) => c.country === country);
    if (!countryObj) return "/placeholder.jpg";
    const cityObj = countryObj.cities.find((c) => c._id === city);
    return cityObj?.imageUrl || "/placeholder.jpg";
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4 sm:gap-6">
          <div className="sm:ml-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              All Cities in{" "}
              <span className="text-gradient">
                {countryNameMap[country || ""] ?? country}
              </span>
            </h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {countryData.cities.length} cities available
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 shadow transition duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>

        {/* Cities grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {countryData.cities.map((city, idx) => (
            <Link
              className="relative rounded-lg overflow-hidden shadow group"
              key={idx}
              href={`/properties?city=${city.name}&country=${countryData.country}`}
            >
              <Image
                src={getCityImage(countryData.country, city.name)}
                alt={`${city.name} Location`}
                width={300}
                height={200}
                className="object-cover w-full h-40 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute left-2 bottom-2 bg-black/60 rounded px-2 py-1">
                <span className="text-white text-base font-medium">
                  {city.name} ({city.count})
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Properties */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Properties
          </h3>

          {selectedCountryProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {selectedCountryProperties.map((property, idx) => (
                <DetailedPropertyCard key={idx} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No properties found for this country.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
