"use client";

import { MapPin, X, Search as SearchIcon, GraduationCap } from "lucide-react";
import { useGlobal } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import SearchTabs from "./SearchTabs";
import { fetchApi } from "@/utils/fetchApi";
import {
  CountryCityPropertyCount,
  CountryLocationCount,
  CountryPropertyCount,
  Property,
  Universities,
} from "@/types/types";

interface SuggestionItem {
  id?: string;
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

interface HeaderSearchProps {
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  countryProperty: CountryPropertyCount[];
  locations: CountryCityPropertyCount[];
  countries: CountryLocationCount[];
  universities: Universities[];
}

const HeaderSearch = ({
  showSuggestions,
  setShowSuggestions,
  countries,
  locations,
  universities,
  countryProperty,
}: HeaderSearchProps) => {
  const { fetchProperties, setFilterData } = useGlobal();

  const router = useRouter();
  const suggestionBoxRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeCountryTab, setActiveCountryTab] = useState("US");
  const [activeSearchTab, setActiveSearchTab] = useState("all");

  const allUniversityNames = universities
    ? universities.flatMap((u) => u.universities)
    : [];

  const filteredUniversities =
    searchQuery.trim() === ""
      ? allUniversityNames
      : allUniversityNames.filter((uni) =>
          uni.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );

  const allCitiesWithCountry = locations
    ? locations.flatMap((l) =>
        l.cities.map((city) => ({
          city,
          country: l.country,
        }))
      )
    : [];

  const filteredCities =
    searchQuery.trim() === ""
      ? allCitiesWithCountry
      : allCitiesWithCountry.filter(
          (c) =>
            c.city.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase().trim()) ||
            c.country.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );

  const countryTabs =
    countries?.map((country) => ({
      id: country.country,
      label:
        country.country === "GB"
          ? "UK"
          : country.country === "AU"
          ? "AUS"
          : country.country === "US"
          ? "US"
          : country.country,
    })) || [];

  const getCitiesForCountry = useCallback(
    (countryId: string): SuggestionItem[] => {
      if (!locations || locations.length === 0) return [];

      const countryData = locations.find((loc) => loc.country === countryId);
      if (!countryData?.cities) return [];

      return countryData.cities.map((city) => ({
        name: city.name,
        city: city.name,
        country: countryId,
        type: "city",
        propertyCount: city.count,
      }));
    },
    [locations]
  );

  const handleSuggestionClick = useCallback(
    async (item: SuggestionItem) => {
      const { country, city, id: propertyId } = item;

      if (propertyId) {
        router.push(`/properties/${propertyId}`);
      } else {
        try {
          await fetchProperties(
            `/properties/city-properties?country=${country}&city=${city}`
          );
          setFilterData({ city, country, keyword: "" });
          router.push(`/properties?city=${city}&country=${country}`);
        } catch (err) {
          console.error("Failed to fetch properties:", err);
        }
      }

      setShowSuggestions(false);
    },
    [fetchProperties, router, setFilterData, setShowSuggestions]
  );

  const getLocalSuggestions = useCallback(
    (query: string): SuggestionItem[] => {
      const normalizedQuery = query.toLowerCase().trim();
      if (!countryProperty) return [];

      const localSuggestions: SuggestionItem[] = [];

      countryProperty.forEach((country) => {
        country.properties?.forEach((property) => {
          const loc = property?.location;
          const uni = property?.university;

          if (loc?.city?.toLowerCase().includes(normalizedQuery)) {
            localSuggestions.push({
              name: loc.city,
              city: loc.city,
              country: loc.country || country.label,
              type: "city",
              propertyCount: property?.propertyCount,
            });
          }

          if (uni?.name?.toLowerCase().includes(normalizedQuery)) {
            localSuggestions.push({
              name: uni.name,
              city: loc?.city || "",
              country: loc?.country || country.label,
              type: "university",
              acronym: uni.acronym || "",
              propertyCount: property?.propertyCount,
            });
          }

          if (property?.title?.toLowerCase().includes(normalizedQuery)) {
            localSuggestions.push({
              name: property.title,
              city: loc?.city || "",
              country: loc?.country || country.label,
              type: "property",
              propertyId: property._id,
              region: loc?.region,
              address: property.address,
              propertyCount: 1,
            });
          }
        });
      });

      return localSuggestions
        .filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.name === item.name && t.type === item.type)
        )
        .slice(0, 10);
    },
    [countryProperty]
  );

  const handleInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);

      if (value.trim() === "") {
        setSuggestions([]);
        setShowSuggestions(true);
        setIsSearching(false);
        setHasSearched(false);
        return;
      }

      setIsSearching(true);
      setShowSuggestions(true);
      setHasSearched(true);

      try {
        const localSuggestions = getLocalSuggestions(value);
        setSuggestions(localSuggestions);
      } catch (err) {
        console.error("Suggestion error:", err);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    },
    [getLocalSuggestions, setShowSuggestions]
  );

  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      router.push("/properties");
      return;
    }

    const selected = suggestions.find((s) => s.name === searchQuery);
    const params = new URLSearchParams();

    if (selected) {
      if (selected.country) params.append("country", selected.country);
      if (selected.city) params.append("city", selected.city);
    } else {
      params.append("city", searchQuery);
    }

    router.push(`/properties?${params.toString()}`);
    setShowSuggestions(false);
  };

  const handleInputClick = () => {
    if (!showSuggestions) {
      setShowSuggestions(true);
    }
  };

  const handleInitialUniClick = async (uni: string) => {
    await fetchProperties(
      `/properties/searchproperties?keyword=${uni}&field=university`
    );
    router.push(`/properties?university=${uni}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSuggestions]);

  const [searchedProperties, setSearchedProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchedProperties([]);
      return;
    }

    const timer = setTimeout(() => {
      const fetchCities = async () => {
        setIsSearching(true);
        try {
          const response = await fetchApi(
            `/properties/searchproperties?keyword=${searchQuery}&field=city`
          );
          console.log(response);
        } catch (err) {
          console.log(err);
        } finally {
          setIsSearching(false);
        }
      };
      const fetchProperties = async () => {
        setIsSearching(true);
        try {
          const response = (await fetchApi(
            `/properties/searchproperties?keyword=${searchQuery}`
          )) as { properties: Property[] };
          setSearchedProperties(response.properties);
        } catch (err) {
          console.log(err);
        } finally {
          setIsSearching(false);
        }
      };
      fetchCities();
      fetchProperties();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div style={{ zIndex: 9999 }} className="relative flex-1 w-full">
      <form onSubmit={handleSearch} className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder="Search City | University | Neighborhood | Property"
          className="w-full pl-4 pr-12 py-2 bg-white border border-gray-300 rounded-full"
        />
        {searchQuery ? (
          <X
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer"
          />
        ) : (
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white p-2 rounded-full"
          >
            <SearchIcon size={16} />
          </button>
        )}
      </form>

      {showSuggestions && (
        <div
          ref={suggestionBoxRef}
          style={{ zIndex: 9999 }}
          className="w-full min-w-[300px] absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl transition-all duration-300"
        >
          {searchQuery.trim() === "" ? (
            <div className="px-4 py-2">
              <div className="border-b border-gray-200 mb-4">
                <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
                  {countryTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCountryTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeCountryTab === tab.id
                          ? "border-red-500 text-red-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
                  <h4 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    Cities in{" "}
                    <span className="text-blue-600">
                      {
                        countryTabs.find((t) => t.id === activeCountryTab)
                          ?.label
                      }
                    </span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 max-h-34 overflow-y-auto custom-scrollbar pr-1">
                    {getCitiesForCountry(activeCountryTab).map((city) => (
                      <button
                        key={`${city.country}-${city.city}`}
                        onClick={() => handleSuggestionClick(city)}
                        className="text-left hover:text-blue-600 transition-colors duration-200 flex justify-between items-center px-2 py-1.5 rounded-md hover:bg-blue-50"
                      >
                        <span className="truncate">{city.name}</span>
                        <span className="text-xs text-gray-400 ml-3 shrink-0">
                          ({city.propertyCount})
                        </span>
                      </button>
                    ))}
                  </div>
                  <h4 className="text-base font-semibold text-gray-800 my-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    Universities in{" "}
                    <span className="text-blue-600">
                      {
                        countryTabs.find((t) => t.id === activeCountryTab)
                          ?.label
                      }
                    </span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 max-h-30 overflow-y-auto custom-scrollbar pr-1">
                    {universities
                      ?.find((t) => t.countryCode === activeCountryTab)
                      ?.universities?.map((uni) => (
                        <p
                          key={uni}
                          onClick={() => handleInitialUniClick(uni)}
                          className="text-left hover:text-blue-600 transition-colors duration-200 flex justify-between items-center px-2 py-1.5 rounded-md hover:bg-blue-50"
                        >
                          {uni}
                        </p>
                      )) ?? []}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <SearchTabs
              activeTab={activeSearchTab}
              setActiveTab={setActiveSearchTab}
              isSearching={isSearching}
              hasSearched={hasSearched}
              searchQuery={searchQuery}
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
              getPopularCitiesFromCountries={getCitiesForCountry}
              filteredUniversities={filteredUniversities}
              filteredCities={filteredCities}
              searchedProperties={searchedProperties}
              getFilteredSuggestions={(type) =>
                suggestions.filter((item) => item.type === type)
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
