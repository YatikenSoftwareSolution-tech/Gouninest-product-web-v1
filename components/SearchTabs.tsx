"use client";

import {
  Loader2Icon,
  GraduationCap,
  SearchIcon,
  MapPin,
  Home,
} from "lucide-react";
import { Tabs, TabsContent } from "./ui/tabs";
import { City, Property } from "@/types/types";
import { useGlobal } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PropertyModal from "./PropertyModal";

interface SuggestionItem {
  name: string;
  city: string;
  country: string;
  type: "city" | "university" | "property";
  acronym?: string;
  propertyCount?: number;
  propertyId?: string;
  region?: string;
  address?: string;
}

interface SearchTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSearching: boolean;
  hasSearched: boolean;
  searchQuery: string;
  suggestions: SuggestionItem[];
  handleSuggestionClick: (item: SuggestionItem) => void;
  getPopularCitiesFromCountries: (countryId: string) => SuggestionItem[];
  filteredUniversities: string[];
  getFilteredSuggestions: (type: string) => SuggestionItem[];
  filteredCities: { city: City, country: string }[];
  searchedProperties: Property[]
}

const SearchTabs = ({
  activeTab,
  setActiveTab,
  isSearching,
  hasSearched,
  searchQuery,
  suggestions,
  filteredUniversities,
  filteredCities,
  searchedProperties
}: SearchTabsProps) => {

  const { fetchProperties } = useGlobal();
  const router = useRouter();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCityClick = async (item: { city: City, country: string }) => {
    await fetchProperties(`/properties/searchproperties?city=${item.city.name}&country=${item.country}`)
    router.push(`/properties?city=${item.city.name}&country=${item.country}`)
  }

  const handleInitialUniClick = async (uni: string) => {
    await fetchProperties(`/properties/searchproperties?keyword=${uni}&field=university`)
    router.push(`/properties?university=${uni}`)
  }

  const hasResults =
    (filteredCities && filteredCities.length > 0) ||
    (filteredUniversities && filteredUniversities.length > 0) ||
    (searchedProperties && searchedProperties.length > 0) ||
    (suggestions && suggestions.length > 0);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="border-b border-gray-200 mb-4 mt-3 px-4 bg-white sticky top-0 z-10">
        <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
          {[
            { id: "all", label: "All", icon: SearchIcon },
            { id: "city", label: "City", icon: MapPin },
            { id: "properties", label: "Properties", icon: MapPin },
            { id: "university", label: "University", icon: GraduationCap },
            { id: "neighborhood", label: "Nearby", icon: MapPin },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                ? "border-red-500 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <TabsContent value="all">
        <div className="max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center p-4 text-gray-500">
              <Loader2Icon className="w-4 h-4 animate-spin mr-2" />
              <span className="text-sm">Searching...</span>
            </div>
          ) : hasResults ? (
            <div className="divide-y divide-gray-100">
              {searchedProperties.map((item, index) => (
                <button
                  key={index}
                  className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  onClick={() => handlePropertyClick(item)}
                >
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-800 leading-tight">
                        {item.title}{" "}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {item.location.city}, {item.location.country}
                  </div>
                </button>
              ))}

              {filteredCities.map((item, index) => (
                <button
                  key={index}
                  className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  onClick={() => handleCityClick(item)}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-800 leading-tight">
                        {item.city.name}{" "}

                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {item.country}
                  </div>

                </button>
              ))}
              {filteredUniversities.map((item, index) => (
                <button
                  key={index}
                  className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  onClick={() => handleInitialUniClick(item)}
                >
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-800 leading-tight">
                        {item}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    University
                  </div>
                </button>
              ))}
              {/* {suggestions.map((item, index) => (
                <button
                  key={index}
                  className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  onClick={() => handleSuggestionClick(item)}
                >
                  <div className="flex items-start gap-3">


                  </div>
                  {item.propertyCount && (
                    <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {item.propertyCount}{" "}
                      {item.propertyCount === 1 ? "property" : "properties"}
                    </div>
                  )}
                </button>
              ))} */}
            </div>
          ) : hasSearched ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <SearchIcon className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No results found</p>
              <p className="text-xs text-gray-400 mt-1">
                Try different keywords or check spelling
              </p>
            </div>
          ) : null}
        </div>
      </TabsContent>

      <TabsContent value="city">
        <div className="max-h-60 overflow-y-auto">
          {filteredCities.map((item, index) => (
            <button
              key={index}
              className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              onClick={() => handleCityClick(item)}
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                <div className="flex flex-col">
                  <div className="text-sm font-semibold text-gray-800 leading-tight">
                    {item.city.name}{" "}

                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                {item.country}
              </div>

            </button>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="university">
        <div className="max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center p-4 text-gray-500">
              <Loader2Icon className="w-4 h-4 animate-spin mr-2" />
              <span className="text-sm">Searching properties...</span>
            </div>
          ) : searchQuery.trim() === "" ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <SearchIcon className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">
                Search for universities by title
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Enter keywords to find specific universities
              </p>
            </div>
          ) : filteredUniversities.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredUniversities.map((item, index) => (
                <button
                  key={index}
                  className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  onClick={() => handleInitialUniClick(item)}
                >
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-800 leading-tight">
                        {item}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    University
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <GraduationCap className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No university found</p>
              <p className="text-xs text-gray-400 mt-1">
                Try different keywords or check spelling
              </p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="properties">
        <div className="max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center p-4 text-gray-500">
              <Loader2Icon className="w-4 h-4 animate-spin mr-2" />
              <span className="text-sm">Searching properties...</span>
            </div>
          ) : searchQuery.trim() === "" ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <SearchIcon className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">
                Search for properties by title
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Enter keywords to find specific properties
              </p>
            </div>
          ) : searchedProperties.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {searchedProperties.map((item, index) => (
                <button
                  key={index}
                  className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  onClick={() => handlePropertyClick(item)}
                >
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-800 leading-tight">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {item.address ||
                          [
                            item.location.city,
                            item?.location.region,
                            item.location.country,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    Property
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Home className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No properties found</p>
              <p className="text-xs text-gray-400 mt-1">
                Try different keywords or check spelling
              </p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="neighborhood">
        <div className="max-h-60 overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center p-4 text-gray-500">
              <Loader2Icon className="w-4 h-4 animate-spin mr-2" />
              <span className="text-sm">Searching properties...</span>
            </div>
          ) : searchQuery.trim() === "" ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <SearchIcon className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">
                Search for properties by title
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Enter keywords to find specific properties
              </p>
            </div>
          ) : searchedProperties.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {searchedProperties.map((item, index) => (
                <button
                  key={index}
                  className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  onClick={() => handlePropertyClick(item)}
                >
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-800 leading-tight">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {item.address ||
                          [
                            item.location.city,
                            item?.location.region,
                            item.location.country,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    Property
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Home className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No properties found</p>
              <p className="text-xs text-gray-400 mt-1">
                Try different keywords or check spelling
              </p>
            </div>
          )}
        </div>
      </TabsContent>
      {selectedProperty && <PropertyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedProperty={selectedProperty}
      />}

    </Tabs>
  );
};

export default SearchTabs;
