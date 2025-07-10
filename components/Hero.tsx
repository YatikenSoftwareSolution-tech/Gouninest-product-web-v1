"use client";

import { Input } from "@/components/ui/input";
import {
  MapPin,
  Loader2Icon,
  GraduationCap,
  X,
  SearchIcon,
} from "lucide-react";
import { useGlobal } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent } from "./ui/tabs";

interface SuggestionItem {
  name: string;
  city?: string;
  country?: string;
  propertyCount?: number;
  type?: "city" | "university";
  acronym?: string;
  region?: string;
  
}

const Hero = () => {
  const {
    searchQuery,
    fetchLocationCountInCountries,
    fetchPropertiesCountInLocations,
    setSearchQuery,
    fetchProperties,
    fetchTopProperties,
    location,
    setLocation,
    fetchUserProfile,
    getSearchSuggestions,
    countryProperty,
  } = useGlobal();

  const router = useRouter();
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("popular");
  const suggestionBoxRef = useRef<HTMLDivElement>(null);

  // Popular countries to show in the popular tab
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
  

  const clearSearch = () => {
    setSearchQuery("");
    setLocation({ lat: "", lon: "" });
    setShowSuggestions(false);
    setSuggestions([]);
  };

  useEffect(() => {
    clearSearch();
    fetchUserProfile();
    fetchLocationCountInCountries();
    fetchPropertiesCountInLocations();
    fetchTopProperties();
  }, []);

  const getLocalSuggestions = (query: string): SuggestionItem[] => {
    const normalizedQuery = query.toLowerCase().trim();
    const suggestions: SuggestionItem[] = [];

    countryProperty?.forEach((country) => {
      country?.properties?.forEach((property) => {
        const location = property?.location;
        const university = property?.university;

        if (
          location?.city?.toLowerCase().includes(normalizedQuery) &&
          location?.city
        ) {
          suggestions.push({
            name: location.city,
            city: location.city,
            country: location.country || country.label,
            type: "city",
            propertyCount: property?.propertyCount,
          });
        }

        if (
          university?.name?.toLowerCase().includes(normalizedQuery) &&
          university?.name
        ) {
          suggestions.push({
            name: university.name,
            city: location?.city || "",
            country: location?.country || country.label,
            type: "university",
            acronym: university.acronym || "",
            propertyCount: property?.propertyCount,
          });
        }
      });
    });

    const uniqueSuggestions = suggestions.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.name === item.name)
    );

    return uniqueSuggestions.slice(0, 10);
  };

  // Filter suggestions by type
  const getFilteredSuggestions = (type: string): SuggestionItem[] => {
    if (type === "city") {
      return suggestions.filter((item) => item.type === "city");
    } else if (type === "university") {
      return suggestions.filter((item) => item.type === "university");
    }
    return suggestions;
  };

  // Get popular cities from specific countries
  const getPopularCitiesFromCountries = () => {
    const popularCities: SuggestionItem[] = [];

    countryProperty?.forEach((country) => {
      // Check if country is in our popular countries list
      if (
        popularCountries.includes(country.value) ||
        popularCountries.includes(country.label)
      ) {
        country?.properties?.forEach((property) => {
          const location = property?.location;
          if (location?.city) {
            popularCities.push({
              name: location.city,
              city: location.city,
              country: location.country || country.label,
              type: "city",
              propertyCount: property?.propertyCount,
            });
          }
        });
      }
    });

    // Remove duplicates and limit
    const uniqueCities = popularCities.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.name === item.name)
    );

    return uniqueCities.slice(0, 20);
  };

  // Get popular universities from specific countries
  const getPopularUniversitiesFromCountries = () => {
    const popularUniversities: SuggestionItem[] = [];

    countryProperty?.forEach((country) => {
      // Check if country is in our popular countries list
      if (
        popularCountries.includes(country.value) ||
        popularCountries.includes(country.label)
      ) {
        country?.properties?.forEach((property) => {
          const university = property?.university;
          const location = property?.location;
          if (university?.name) {
            popularUniversities.push({
              name: university.name,
              city: location?.city || "",
              country: location?.country || country.label,
              type: "university",
              acronym: university.acronym || "",
              propertyCount: property?.propertyCount,
            });
          }
        });
      }
    });

    // Remove duplicates and limit
    const uniqueUniversities = popularUniversities.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.name === item.name)
    );

    return uniqueUniversities.slice(0, 20);
  };

  const handleSearch = async () => {
    if (searchQuery !== "") {
      const selectedSuggestion = suggestions.find(
        (suggestion) => suggestion.name === searchQuery
      );

      const params = new URLSearchParams();
      if (selectedSuggestion) {
        if (selectedSuggestion.country)
          params.append("country", selectedSuggestion.country);
        if (selectedSuggestion.city)
          params.append("city", selectedSuggestion.city);
      } else {
        params.append("city", searchQuery);
      }

      router.push(`/properties?${params.toString()}`);
    } else {
      await fetchProperties(
        `/properties/searchproperties?latitude=${location.lat}&longitude=${location.lon}`
      );
      router.push("/properties");
    }

    setShowSuggestions(false);
  };

  const handleSuggestionClick = (item: SuggestionItem) => {
    setSearchQuery(item.name);
    setShowSuggestions(false);

    const params = new URLSearchParams();
    if (item.country) params.append("country", item.country);
    if (item.city) params.append("city", item.city);

    router.push(`/properties?${params.toString()}`);
  };

  const getLocation = async () => {
    try {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude.toString(), lon: longitude.toString() });
      });
    } catch (error) {
      console.log("Error getting location.", error);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(true);
      setActiveTab("popular");
      setIsSearching(false);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setShowSuggestions(true);
    setActiveTab("all");
    setHasSearched(true);

    try {
      const localSuggestions = getLocalSuggestions(value);
      let apiSuggestions: SuggestionItem[] = [];
      try {
        apiSuggestions = await getSearchSuggestions(value);
      } catch (error) {
        console.error("Error getting API suggestions:", error);
      }

      const combinedSuggestions = [
        ...localSuggestions,
        ...apiSuggestions.filter(
          (apiSuggestion) =>
            !localSuggestions.some(
              (localSuggestion) =>
                localSuggestion.name.toLowerCase() ===
                apiSuggestion.name.toLowerCase()
            )
        ),
      ].slice(0, 10);

      setSuggestions(combinedSuggestions);
    } catch (error) {
      console.error("Error getting suggestions:", error);
      setSuggestions(getLocalSuggestions(value));
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target as Node)
      ) {
        clearSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
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

      {/* Hero Content */}
      <div className="mt-20 md:mt-40 relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-8 min-h-[600px]">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
          <span className="block text-gradient bg-gradient-to-r from-[var(--color-electric-200)] via-amber-200 to-[var(--color-coral-200)] bg-clip-text text-transparent drop-shadow-lg">
            Find Your Perfect Student Home
          </span>
        </h1>

        <p className="text-white max-w-3xl mx-auto animate-fade-in drop-shadow-md">
          Live near campus, pay less.
        </p>
        <p className="text-white mb-12 max-w-3xl mx-auto animate-fade-in drop-shadow-md">
          We cut costs, not comfort — your budget-friendly upgrade.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center md:gap-4 p-6 md:p-8 max-w-4xl mx-auto"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative flex-1 w-full">
            <MapPin
              className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-blue-700 w-6 h-6 cursor-pointer"
              onClick={getLocation}
            />
            <Input
              type="text"
              placeholder="Search by city, location or university"
              value={searchQuery}
              onChange={handleInputChange}
              className="pl-14 pr-4 h-12 text-lg bg-white/70 glass-effect border-white/40 text-dark placeholder-dark focus:border-[var(--color-electric-400)] focus:bg-white/80 rounded-xl shadow-md"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {searchQuery ? (
              <X
                onClick={clearSearch}
                className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 text-blue-700 w-6 h-6 cursor-pointer"
              />
            ) : (
              <SearchIcon
                onClick={handleSearch}
                className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 text-blue-700 w-6 h-6 cursor-pointer"
              />
            )}

            {showSuggestions && (
              <div
                ref={suggestionBoxRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transition-all duration-300"
              >
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <div className="border-b border-gray-200 mb-4 mt-3 px-4 bg-white sticky top-0 z-10">
                    <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
                      {[
                        ...(searchQuery.trim() === ""
                          ? [{ id: "popular", label: "Popular", icon: MapPin }]
                          : [{ id: "all", label: "All", icon: SearchIcon }]),
                        { id: "city", label: "City", icon: MapPin },
                        {
                          id: "university",
                          label: "University",
                          icon: GraduationCap,
                        },
                        { id: "properties", label: "Properties", icon: MapPin },
                        { id: "neighborhood", label: "Nearby", icon: MapPin },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                            activeTab === tab.id
                              ? "border-red-500 text-red-600"
                              : "border-transparent text-gray-500 hover:text-gray-700"
                          }`}
                          aria-current={
                            activeTab === tab.id ? "page" : undefined
                          }
                        >
                          <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                          {tab.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <TabsContent value="popular">
                    <div className="p-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          Popular Cities ({popularCountries.join(", ")})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4 text-sm text-gray-600">
                          {getPopularCitiesFromCountries().map(
                            (city, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(city)}
                                className="text-left hover:text-blue-600 hover:underline transition-colors"
                              >
                                {city.name}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-gray-500" />
                          Popular Universities ({popularCountries.join(", ")})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm text-gray-600">
                          {getPopularUniversitiesFromCountries().map(
                            (school, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(school)}
                                className="text-left hover:text-blue-600 hover:underline transition-colors"
                              >
                                {school.name}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

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
                                  {item.propertyCount === 1
                                    ? "property"
                                    : "properties"}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      ) : hasSearched ? (
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                          <SearchIcon className="w-8 h-8 text-gray-300 mb-2" />
                          <p className="text-sm text-gray-500">
                            No results found
                          </p>
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
                            {getPopularCitiesFromCountries().map(
                              (city, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(city)}
                                  className="text-left hover:text-blue-600 hover:underline transition-colors"
                                >
                                  {city.name}
                                </button>
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
                                  {item.propertyCount === 1
                                    ? "property"
                                    : "properties"}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                          <MapPin className="w-8 h-8 text-gray-300 mb-2" />
                          <p className="text-sm text-gray-500">
                            No cities found
                          </p>
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
                          <span className="text-sm">
                            Searching universities...
                          </span>
                        </div>
                      ) : searchQuery.trim() === "" ? (
                        <div className="p-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-gray-500" />
                            Popular Universities ({popularCountries.join(", ")})
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm text-gray-600">
                            {getPopularUniversitiesFromCountries().map(
                              (school, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(school)}
                                  className="text-left hover:text-blue-600 hover:underline transition-colors"
                                >
                                  {school.name}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      ) : getFilteredSuggestions("university").length > 0 ? (
                        <div className="divide-y divide-gray-100">
                          {getFilteredSuggestions("university").map(
                            (item, index) => (
                              <button
                                key={index}
                                className="flex w-full justify-between items-start px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                                onClick={() => handleSuggestionClick(item)}
                              >
                                <div className="flex items-start gap-3">
                                  <GraduationCap className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
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
                                    {item.propertyCount === 1
                                      ? "property"
                                      : "properties"}
                                  </div>
                                )}
                              </button>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                          <GraduationCap className="w-8 h-8 text-gray-300 mb-2" />
                          <p className="text-sm text-gray-500">
                            No universities found
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Try different keywords or check spelling
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="properties">
                    <div className="max-h-60 overflow-y-auto">
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <SearchIcon className="w-8 h-8 text-gray-300 mb-2" />
                        <p className="text-sm text-gray-500">
                          Property search coming soon
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Search for specific properties and buildings
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="neighborhood">
                    <div className="max-h-60 overflow-y-auto">
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <MapPin className="w-8 h-8 text-gray-300 mb-2" />
                        <p className="text-sm text-gray-500">
                          Neighborhood search coming soon
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Find properties near specific areas and landmarks
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section - Always present but visually hidden when suggestions are open */}
        <div
          className={`z-0 grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 md:mt-16 transition-all duration-300 ${
            showSuggestions
              ? "opacity-0 h-0 overflow-hidden"
              : "opacity-100 h-auto"
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
              1000+
            </div>
            <div className="text-white/90 drop-shadow-sm">Properties</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
              50+
            </div>
            <div className="text-white/90 drop-shadow-sm">Cities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
              25K+
            </div>
            <div className="text-white/90 drop-shadow-sm">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl flex justify-center items-center font-bold text-white mb-2 drop-shadow-md">
              4.8 <span className="text-[20px]">⭐</span>
            </div>
            <div className="text-white/90 drop-shadow-sm">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
