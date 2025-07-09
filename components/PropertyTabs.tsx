"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";

import DetailedPropertyCard from "./DetailedPropertyCard";
import { useGlobal } from "@/context/GlobalContext";

const PropertyTabs = () => {
  const { countryProperty } = useGlobal();

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
          <TabsList className="mb-6 flex justify-center gap-6 ">
            {["GB", "AU", "US"].map((code) => {
              const country = countryProperty.find((c) => c.country === code);
              if (!country) return null;
              return (
                <TabsTrigger
                  key={country.country}
                  value={country.country}
                  className="flex justify-center gap-3 cursor-pointer bg-gradient-to-r from-[var(--color-electric-500)] to-lime-500 hover:from-electric-600 hover:to-amber-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/30 data-[state=active]:scale-120"
                >
                  <Image
                    src={`/${country.country}/flag.jpg`}
                    alt={country.country}
                    height={40}
                    width={40}
                  />
                  {country.country === "GB"
                    ? `UK `
                    : country.country === "AU"
                    ? `AUS `
                    : `USA `}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {countryProperty.map((item) => (
            <TabsContent key={item.country} value={item.country}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {item.properties.map((property) => (
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
