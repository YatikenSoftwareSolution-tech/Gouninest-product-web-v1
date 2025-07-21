"use client";

import {
  Loader2Icon,
  GraduationCap,
  SearchIcon,
  MapPin,
  Home,
} from "lucide-react";
import { Tabs, TabsContent } from "./ui/tabs";
// import { Universities } from "@/types/types";

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
}

const SearchTabs = ({
  activeTab,
  setActiveTab,
  isSearching,
  hasSearched,
  searchQuery,
  suggestions,
  handleSuggestionClick,
  getPopularCitiesFromCountries,
  // getPopularUniversitiesFromCountries,
  getFilteredSuggestions,
  filteredUniversities,
}: SearchTabsProps) => {
  const popularCountries = [
    "UK",
    "US",
    "AU",
    "IT",
    "UAE",
    "CA",
    "DE",
    "FR",
    "ES",
    "NL",
  ];

  console.log(filteredUniversities)

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
          ) : suggestions.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {suggestions.map((item, index) => (
                <button
                  key={index}
                  className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  onClick={() => handleSuggestionClick(item)}
                >
                  <div className="flex items-start gap-3">
                    {item.type === "university" ? (
                      <GraduationCap className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                    ) : (
                      <MapPin className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                    )}
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-800 leading-tight">
                        {item?.acronym && `(${item.acronym}) `}
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {[item.city, item?.region, item.country]
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                    </div>
                  </div>
                  {item.propertyCount && (
                    <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {item.propertyCount}{" "}
                      {item.propertyCount === 1 ? "property" : "properties"}
                    </div>
                  )}
                </button>
              ))}
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
          {isSearching ? (
            <div className="flex items-center justify-center p-4 text-gray-500">
              <Loader2Icon className="w-4 h-4 animate-spin mr-2" />
              <span className="text-sm">Searching cities...</span>
            </div>
          ) : searchQuery.trim() === "" ? (
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                Popular Cities ({popularCountries.join(", ")})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm text-gray-600">
                {popularCountries.map((countryId) =>
                  getPopularCitiesFromCountries(countryId).map(
                    (city, index) => (
                      <button
                        key={`${countryId}-${index}`}
                        onClick={() => handleSuggestionClick(city)}
                        className="text-left hover:text-blue-600 hover:underline transition-colors"
                      >
                        {city.name}
                      </button>
                    )
                  )
                )}
              </div>
            </div>
          ) : getFilteredSuggestions("city").length > 0 ? (
            <div className="divide-y divide-gray-100">
              {getFilteredSuggestions("city").map((item, index) => (
                <button
                  key={index}
                  className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  onClick={() => handleSuggestionClick(item)}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-800 leading-tight">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {[item?.region, item.country]
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                    </div>
                  </div>
                  {item.propertyCount && (
                    <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {item.propertyCount}{" "}
                      {item.propertyCount === 1 ? "property" : "properties"}
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <MapPin className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No cities found</p>
              <p className="text-xs text-gray-400 mt-1">
                Try different keywords or check spelling
              </p>
            </div>
          )}
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
                Search for properties by title
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Enter keywords to find specific properties
              </p>
            </div>
          ) : filteredUniversities.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredUniversities.map((item, index) => (
                <button
                  key={index}
                  className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  // onClick={() => handleSuggestionClick(item)}
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
          ) : getFilteredSuggestions("property").length > 0 ? (
            <div className="divide-y divide-gray-100">
              {getFilteredSuggestions("property").map((item, index) => (
                <button
                  key={index}
                  className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  onClick={() => handleSuggestionClick(item)}
                >
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-800 leading-tight">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {item.address ||
                          [item.city, item?.region, item.country]
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
          ) : getFilteredSuggestions("property").length > 0 ? (
            <div className="divide-y divide-gray-100">
              {getFilteredSuggestions("property").map((item, index) => (
                <button
                  key={index}
                  className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  onClick={() => handleSuggestionClick(item)}
                >
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-gray-800 leading-tight">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {item.address ||
                          [item.city, item?.region, item.country]
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


    </Tabs>
  );
};

export default SearchTabs;
