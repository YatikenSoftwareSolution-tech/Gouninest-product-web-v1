"use client";

import { Input } from "@/components/ui/input";
import { MapPin, X, SearchIcon } from "lucide-react";
import { useGlobal } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SearchTabs from "./SearchTabs";

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

interface HeroSearchProps {
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
}

const HeroSearch = ({
  showSuggestions,
  setShowSuggestions,
}: HeroSearchProps) => {
  const {
    searchQuery,
    setSearchQuery,
    setLocation,
    getSearchSuggestions,
    countryProperty,
  } = useGlobal();

  const router = useRouter();
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("popular");
  const suggestionBoxRef = useRef<HTMLDivElement>(null);

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

  const getLocalSuggestions = (query: string): SuggestionItem[] => {
    const normalizedQuery = query.toLowerCase().trim();
    const localSuggestions: SuggestionItem[] = [];

    countryProperty?.forEach((country) => {
      country?.properties?.forEach((property) => {
        const location = property?.location;
        const university = property?.university;

        if (location?.city?.toLowerCase().includes(normalizedQuery)) {
          localSuggestions.push({
            name: location.city,
            city: location.city,
            country: location.country || country.label,
            type: "city",
            propertyCount: property?.propertyCount,
          });
        }

        if (university?.name?.toLowerCase().includes(normalizedQuery)) {
          localSuggestions.push({
            name: university.name,
            city: location?.city || "",
            country: location?.country || country.label,
            type: "university",
            acronym: university.acronym || "",
            propertyCount: property?.propertyCount,
          });
        }

        if (property?.title?.toLowerCase().includes(normalizedQuery)) {
          localSuggestions.push({
            name: property.title,
            city: location?.city || "",
            country: location?.country || country.label,
            type: "property",
            propertyId: property._id,
            region: location?.region,
            address: property.address,
            propertyCount: 1,
          });
        }
      });
    });

    const unique = localSuggestions.filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => t.name === item.name && t.type === item.type)
    );

    return unique.slice(0, 10);
  };

  const getFilteredSuggestions = (type: string): SuggestionItem[] => {
    return suggestions.filter((item) => item.type === type);
  };

  const getPopularCitiesFromCountries = (): SuggestionItem[] => {
    const result: SuggestionItem[] = [];

    countryProperty?.forEach((country) => {
      if (
        popularCountries.includes(country.value) ||
        popularCountries.includes(country.label)
      ) {
        country?.properties?.forEach((property) => {
          const location = property?.location;
          if (location?.city) {
            result.push({
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

    return result
      .filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) => t.name === item.name && t.type === item.type)
      )
      .slice(0, 20);
  };

  const getPopularUniversitiesFromCountries = (): SuggestionItem[] => {
    const result: SuggestionItem[] = [];

    countryProperty?.forEach((country) => {
      if (
        popularCountries.includes(country.value) ||
        popularCountries.includes(country.label)
      ) {
        country?.properties?.forEach((property) => {
          const university = property?.university;
          const location = property?.location;
          if (university?.name) {
            result.push({
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

    return result
      .filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) => t.name === item.name && t.type === item.type)
      )
      .slice(0, 20);
  };

  const handleSearch = () => {
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

 const handleSuggestionClick = (item: SuggestionItem) => {
  const { country, city, id: propertyId } = item;
  const query = new URLSearchParams();

  if (country) query.set("country", country);
  if (city) query.set("city", city);
  if (propertyId) query.set("propertyId", propertyId);

  router.push(`/properties?${query.toString()}`);
};
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setLocation({
        lat: coords.latitude.toString(),
        lon: coords.longitude.toString(),
      });
    });
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
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
      let apiSuggestionsRaw: unknown[] = [];

      try {
        apiSuggestionsRaw = await getSearchSuggestions(value);
      } catch (err) {
        console.error("API suggestion error:", err);
      }

      const apiSuggestions: SuggestionItem[] = (
        apiSuggestionsRaw as SuggestionItem[]
      ).map((item) => ({
        name: item.name,
        type: item.type,
        city: item.city,
        country: item.country,
        acronym: item.acronym,
        propertyId: item.propertyId,
        region: item.region,
        address: item.address,
        propertyCount: item.propertyCount,
      }));

      const combinedSuggestions = [
        ...localSuggestions,
        ...apiSuggestions.filter(
          (apiItem) =>
            !localSuggestions.some(
              (localItem) =>
                localItem.name.toLowerCase() === apiItem.name.toLowerCase()
            )
        ),
      ].slice(0, 10);

      setSuggestions(combinedSuggestions);
    } catch (err) {
      console.error("Suggestion error:", err);
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
  }, []);

  return (
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
          <SearchTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isSearching={isSearching}
            hasSearched={hasSearched}
            searchQuery={searchQuery}
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
            getPopularCitiesFromCountries={getPopularCitiesFromCountries}
            getPopularUniversitiesFromCountries={
              getPopularUniversitiesFromCountries
            }
            getFilteredSuggestions={getFilteredSuggestions}
          />
        </div>
      )}
    </div>
  );
};

export default HeroSearch;
