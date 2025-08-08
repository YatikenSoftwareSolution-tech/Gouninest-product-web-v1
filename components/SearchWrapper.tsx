"use client";

import { useState } from "react";
import HeroSearch from "./HeroSearch";
import HeroStats from "./HeroStats";
import {
  CountryPropertyCount,
  CountryCityPropertyCount,
  CountryLocationCount,
  Universities,
} from "@/types/types";

interface SearchWrapperProps {
  countryProperty: CountryPropertyCount[];
  locations: CountryCityPropertyCount[];
  countries: CountryLocationCount[];
  universities: Universities[];
}

const SearchWrapper = ({
  countryProperty,
  locations,
  countries,
  universities,
}: SearchWrapperProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

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
          universities={universities}
        />
      </div>

      <HeroStats showSuggestions={showSuggestions} />
    </>
  );
};

export default SearchWrapper;
