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
import { countryData } from "../constants/home";

interface SuggestionItem {
  name: string;
  city?: string;
  country?: string;
  propertyCount?: number;
  type?: "city" | "country" | "university";
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
  } = useGlobal();

  const router = useRouter();
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const suggestionBoxRef = useRef<HTMLDivElement>(null);

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

    countryData.forEach((country) => {
      if (country.label.toLowerCase().includes(normalizedQuery)) {
        suggestions.push({
          name: country.label,
          country: country.label,
          type: "country",
        });
      }

      country.locations.forEach((location) => {
        if (location.name.toLowerCase().includes(normalizedQuery)) {
          suggestions.push({
            name: location.name,
            city: location.name,
            country: country.label,
            type: "city",
          });
        }
      });
    });

    const uniqueSuggestions = suggestions.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.name === item.name)
    );

    return uniqueSuggestions.slice(0, 8);
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
      console.log(
        "An unexpected error occurred while getting location.",
        error
      );
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setShowSuggestions(true);
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
          className="flex flex-col sm:flex-row items-center md:gap-4 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto animate-scale-in shadow-2xl"
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
                className={`absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transition-all duration-300 ${
                  showSuggestions
                    ? "opacity-100 visible pointer-events-auto"
                    : "opacity-0 invisible pointer-events-none"
                }`}
              >
                <div className="sticky top-0 z-20 px-4 py-2 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-800">
                    Suggestions
                  </span>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {isSearching ? (
                    <div className="flex items-center p-4 text-gray-500">
                      <Loader2Icon className="w-4 h-4 animate-spin" />
                      <span className="ml-2 text-sm">Searching...</span>
                    </div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleSuggestionClick(item)}
                      >
                        <div className="flex items-start gap-3">
                          <GraduationCap className="w-5 h-5 mt-0.5 text-gray-600 shrink-0" />
                          <div className="flex flex-col text-left">
                            <div className="text-sm font-semibold text-gray-800 leading-tight">
                              {item?.acronym && `(${item.acronym})`} {item.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {[item.city, item?.region, item.country]
                                .filter(Boolean)
                                .join(", ")}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                          {item.propertyCount} properties
                        </div>
                      </div>
                    ))
                  ) : hasSearched ? (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No results found
                    </div>
                  ) : null}
                </div>
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
