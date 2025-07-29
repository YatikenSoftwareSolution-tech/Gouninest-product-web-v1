"use client";

import { useState } from "react";
import HeroSearch from "./HeroSearch";
import HeroStats from "./HeroStats";
import {CountryPropertyCount, CountryCityPropertyCount, CountryLocationCount, Universities} from '@/types/types'

// interface SuggestionItem {
//   name: string;
//   city?: string;
//   country?: string;
//   propertyCount?: number;
//   _id?: string;
// }

interface SearchWrapperProps {
  countryProperty: CountryPropertyCount[];
  locations: CountryCityPropertyCount[];
  countries: CountryLocationCount[];
  universities: Universities[]
}

const SearchWrapper = ({ countryProperty, locations, countries }: SearchWrapperProps) => {

  const [showSuggestions, setShowSuggestions] = useState(false);

  // const getSearchSuggestions = (keyword: string): SuggestionItem[] => {
  //   if (!keyword.trim()) return [];

  //   const lowerKeyword = keyword.toLowerCase();
  //   console.log("Searching for:", lowerKeyword); // Debug log

  //   // Debug logs to check data
  //   // console.log("countryProperty data:", countryProperty);
  //   // console.log("locations data:", locations);

  //   const matchedCountries = (countryProperty || [])
  //     .filter((item) => {
  //       const name = item?.name?.toLowerCase() || "";
  //       return name.includes(lowerKeyword);
  //     })
  //     .map((item) => ({
  //       name: item.name,
  //       country: item.name,
  //       propertyCount: item.propertyCount,
  //       _id: item._id,
  //     }));

  //   const matchedLocations = (locations || [])
  //     .filter((item) => {
  //       const name = item?.name?.toLowerCase() || "";
  //       return name.includes(lowerKeyword);
  //     })
  //     .map((item) => ({
  //       name: item.name,
  //       city: item.city,
  //       country: item.country,
  //       propertyCount: item.propertyCount,
  //       _id: item._id,
  //     }));

  //   const results = [...matchedCountries, ...matchedLocations].slice(0, 10);
  //   console.log("Search results:", results); // Debug log
  //   return results;
  // };

  return (

    <>

      <div
        className="flex flex-col sm:flex-row items-center md:gap-4  max-w-4xl mx-auto"
        style={{ animationDelay: "0.4s" }}
      >
        <HeroSearch
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          countryProperty={countryProperty}
          locations={locations}
          countries={countries}
          universities={[]}
        />
      </div>

      <HeroStats showSuggestions={showSuggestions} />
    </>
  );
};

export default SearchWrapper;
