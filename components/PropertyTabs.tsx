"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

import DetailedPropertyCard from "./DetailedPropertyCard";
import { useGlobal } from "@/context/GlobalContext";
import { useMemo } from "react";

const PropertyTabs = () => {
  const { countryProperty } = useGlobal();

  // Memoize the tab data to prevent unnecessary render changes
  const filteredTabs = useMemo(() => {
    return ["GB", "AU", "US", "IE", "NZ", "CA", "DE", "FR", "NL"]
      .map((code) => countryProperty.find((c) => c.country === code))
      .filter(Boolean); // Remove undefined
  }, [countryProperty]);



  return (
    <section
      id="properties"
      className="py-20 bg-gradient-to-br from-[var(--color-electric-50)] to-lime-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore Our
            <span className="text-gradient"> Featured Properties</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Discover best properties near top universities in UK, Australia and
            USA. <br /> Each property offers unique experiences and
            opportunities for your education journey.
          </p>
        </div>
        <Tabs defaultValue="GB" className="w-full flex flex-col gap-6">
          <TabsList className="mb-12 xl:mb-6 flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
            {filteredTabs.map((country) => (
              <TabsTrigger
                key={country!.country}
                value={country!.country}
                className="flex items-center justify-center gap-1 sm:gap-1 md:gap-2 cursor-pointer bg-gradient-to-r from-[var(--color-electric-500)] to-lime-500 hover:from-electric-600 hover:to-amber-600 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/30 data-[state=active]:scale-105 sm:data-[state=active]:scale-110 px-2 py-1 sm:px-3 sm:py-2"
              >
                <Image
                  src={`/${country!.country}/flag.png`}
                  alt={country!.country}
                  height={20}
                  width={24}
                  className="h-5 w-8"
                />
                <span className="">
                  {country!.country === "GB"
                    ? "UK"
                    : country!.country === "AU"
                    ? "AUS"
                    : country!.country === "US"
                    ? "USA"
                    : country!.country === "IE"
                    ? "IRE"
                    : country!.country === "NZ"
                    ? "NZL"
                    : country!.country === "CA"
                    ? "CAN"
                    : country!.country === "DE"
                    ? "DEU"
                    : country!.country === "FR"
                    ? "FRA"
                    : country!.country === "NL"
                    ? "NLD"
                    : country!.country}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {filteredTabs.map((item) => (
            <TabsContent key={item!.country} value={item!.country}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {item!.properties.map((property) => (
                  <DetailedPropertyCard
                    key={property._id}
                    property={property}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default PropertyTabs;
