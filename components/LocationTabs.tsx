"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { useGlobal } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";

const LocationTabs = () => {
  const router = useRouter()
  const { countries, fetchProperties, setFilterData } = useGlobal();
  const handleClick = async (city: string, country: string) => {
    setFilterData({ city, country, keyword: "" });
    fetchProperties(`/properties/city-properties?country=${country}&city=${city}`);
    router.push( `/properties?city=${city}&country=${country}`);
  };

  return (
    <>
      <section id="locations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Our
              <span className="text-gradient"> Top Locations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Discover student accommodations in the most vibrant locations in
              UK, Australia and USA. <br /> Each location offers unique
              experiences and opportunities for your education journey.
            </p>
          </div>
          <Tabs defaultValue="GB" className="w-full flex flex-col gap-6">
            <TabsList className="mb-6 flex justify-center gap-6 ">
              {["GB", "AU", "US"].map((code) => {
              const country = countries.find((c) => c.country === code);
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
                  ? "UK"
                  : country.country === "AU"
                  ? "AUS"
                  : "USA"}
                </TabsTrigger>
              );
              })}
            </TabsList>
            {countries.map((country) => (
              <TabsContent key={country.country} value={country.country}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {country.cities.map((loc, idx) => (
                      <div
                        className="relative rounded-lg overflow-hidden shadow group"
                        key={idx}
                        onClick={() => handleClick(loc.name, country.country)}
                      >
                        <Image
                        src={`/${country.country}/loc${(idx+1)%16}.jpg`}
                        alt={`${loc.name} Location ${idx + 1}`}
                        width={200}
                        height={200}
                        className="object-cover w-full h-40 transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Overlay for hover on md+ screens */}
                      <div className="hidden sm:flex cursor-pointer absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          {loc.name}
                        </span>
                      </div>
                      {/* Name in bottom left on small screens */}
                      <div className="sm:hidden absolute left-2 bottom-2 bg-black/60 rounded px-2 py-1">
                        <span className="text-white text-base font-medium">
                          {loc.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default LocationTabs;
