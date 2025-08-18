import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import ChooseUs from "@/components/ChooseUs";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import GetInTouch from "@/components/GetInTouch";
import SearchWrapper from "@/components/SearchWrapper";
import ScrollTransition from "@/components/ScrollTransition";
import Testimonials from "@/components/Testimonials";
import React from "react";
import { fetchLocationCountInCountries, fetchPropertiesCountInLocations, fetchTopProperties, fetchUniversities } from "@/constants/api";
import { CountryCityPropertyCount, CountryLocationCount, CountryPropertyCount, Universities } from "@/types/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyTabs from "@/components/PropertyTabs";
import CityCard from "@/components/CityCard";


const Home = async () => {
  const MAX_CITIES = 12;
  const [countries, locations, countryProperty, universities] =
    await Promise.all([
      fetchLocationCountInCountries() as Promise<CountryLocationCount[]>,
      fetchPropertiesCountInLocations() as Promise<CountryCityPropertyCount[]>,
      fetchTopProperties() as Promise<CountryPropertyCount[]>,
      fetchUniversities() as Promise<Universities[] | []>,
    ]);

  return (
    <div>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <video
            src="https://storage.googleapis.com/gouninest/Uninest2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
            preload="auto"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="absolute inset-0 z-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--color-electric-400)]/10 rounded-full animate-float" />
          <div
            className="absolute top-40 right-20 w-16 h-16 bg-amber-400/10 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-40 left-20 w-24 h-24 bg-[var(--color-coral-400)]/10 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-20 right-10 w-12 h-12 bg-[var(--color-electric-300)]/10 rounded-full animate-float"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
        <div className="mt-20 md:mt-40 relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-8 min-h-[600px]">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
            <span className="block text-gradient bg-gradient-to-r from-[var(--color-electric-200)] via-amber-200 to-[var(--color-coral-200)] bg-clip-text text-transparent drop-shadow-lg">
              Find Your Perfect Student Home
            </span>
          </h1>

          <p className="text-white max-w-3xl mb-4 mx-auto animate-fade-in drop-shadow-md">
            Explore student rooms close to top universities in the UK, Australia,
            and the US. Safe, fully furnished, and move-in ready options for every
            budget.
          </p>
          <SearchWrapper
            countryProperty={countryProperty}
            locations={locations}
            countries={countries}
            universities={universities}
          />
        </div>

      </section>
      <ScrollTransition />

      <section id="locations" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Our
              <span className="text-gradient"> Top Locations</span>
            </h2>
            <p
              className=" text-gray-700  max-w-2xl mx-auto animate-fade-in drop-shadow-md"
              style={{ animationDelay: "0.2s" }}
            >
              Explore student rooms close to top universities in the UK,
              Australia, and the US. Safe, fully furnished, and move-in ready
              options for every budget.
            </p>
          </div>
          <Tabs defaultValue="GB" className="w-full flex flex-col gap-6">
            <TabsList className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
              {Array.isArray(countries) && countries.map((country: CountryLocationCount) => (
                <TabsTrigger
                  key={country.country}
                  value={country.country}
                  className="flex items-center justify-center gap-1 sm:gap-2 md:gap-2 cursor-pointer bg-gradient-to-r from-[var(--color-electric-500)] to-lime-500 hover:from-electric-600 hover:to-amber-600 text-white text-xs sm:text-sm md:text-base font-medium rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-electric-500/30 data-[state=active]:scale-105 sm:data-[state=active]:scale-110 px-2 py-1 sm:px-3 sm:py-2"
                >
                  <Image
                    src={`/${country.country}/flag.png`}
                    alt={country.country}
                    height={24}
                    width={24}
                    className="h-5 w-8"
                    priority
                  />
                  <div className="flex flex-col xs:flex-row items-center gap-0 xs:gap-1">
                    <span className="text-xs sm:text-sm md:text-base">
                      {country.country === "GB"
                        ? "UK"
                        : country.country === "AU"
                          ? "AUS"
                          : country.country === "US"
                            ? "USA"
                            : country.country === "IE"
                              ? "IRE"
                              : country.country === "NZ"
                                ? "NZL"
                                : country.country === "CA"
                                  ? "CAN"
                                  : country.country === "DE"
                                    ? "DEU"
                                    : country.country === "FR"
                                      ? "FRA"
                                      : country.country === "NL"
                                        ? "NLD"
                                        : country.country}
                    </span>
                    <span className="text-xs opacity-80">
                      ({country.count})
                    </span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            {locations?.map((country: CountryCityPropertyCount) => (
              <TabsContent key={country.country} value={country.country}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {country.cities.slice(0, MAX_CITIES).map((loc, idx) =>(
                    <CityCard key={idx} loc={loc} idx={idx} country={country}/>
                  ))}
                </div>
                {country.cities.length > MAX_CITIES && (
                  <div className="flex justify-center mt-8">
                    <Link
                      href={`/properties/all-city?country=${country.country}`}
                      className="flex justify-center items-center cursor-pointer px-6 py-2 rounded-full bg-gradient-to-r from-[var(--color-electric-500)] to-amber-600 text-white font-semibold shadow hover:from-electric-600 hover:to-lime-600 transition"
                    >
                      View All Cities <ArrowRight className="inline h-4 w-4" />
                    </Link>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      <PropertyTabs countryProperty={countryProperty} />

      <ChooseUs />
      <FeaturedBlogs />
      <ScrollTransition />
      <Testimonials />
      <GetInTouch />
    </div>
  );
};

export default Home;
