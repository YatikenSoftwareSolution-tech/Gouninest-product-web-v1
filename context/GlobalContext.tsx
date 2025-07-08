"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { fetchApi } from "@/utils/fetchApi";
import {
  Countries,
  CountryPropertyCount,
  Locations,
  Property,
  User,
} from "@/types/types";

interface GlobalContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  fetchUserProfile: () => Promise<void>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: { lat: string; lon: string };
  setLocation: (query: { lat: string; lon: string }) => void;
  fetchProperties: (url: string) => void;
  fetchLocationCountInCountries: () => void;
  fetchPropertiesCountInLocations: () => void;
  fetchTopProperties: () => void;
  properties: Property[];
  bookProperty: Property | null;
  setBookProperty: (property: Property | null) => void;
  countries: Countries;
  filterData: FilterData | null;
  setFilterData: (data: FilterData | null) => void;
  selectedBlog: number | null;
  setSelectedBlog: (blogId: number | null) => void;
  locations: Locations;
  countryProperty: CountryPropertyCount[];
}

interface FilterData {
  country: string;
  city: string;
  keyword: string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({ lat: "", lon: "" });
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookProperty, setBookProperty] = useState<Property | null>(null);
  const [countries, setCountries] = useState<Countries>([]);
  const [locations, setLocations] = useState<Locations>([]);
  const [filterData, setFilterData] = useState<FilterData | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);
  const [countryProperty, setCountryProperty] = useState<
    CountryPropertyCount[]
  >([]);
  const [hasFetchedUser, setHasFetchedUser] = useState(false);

  const fetchUserProfile = async () => {
    if (hasFetchedUser) return;
    setHasFetchedUser(true);

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("gouninest-token")
        : null;

    if (!token) {
      console.warn("No token found, skipping user fetch.");
      return;
    }

    try {
      const response = await fetchApi("/user");
      if (response && typeof response === "object" && "_id" in response) {
        setUser(response as User);
      } else {
        setUser(null);
        console.error("Invalid user data received");
      }
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      setUser(null);
    }
  };

  const fetchProperties = async (url: string) => {
    try {
      const response = await fetchApi(url);
      if (
        response &&
        typeof response === "object" &&
        "properties" in response
      ) {
        setProperties(response.properties as Property[]);
      }
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  const fetchLocationCountInCountries = async () => {
    try {
      const response = await fetchApi("/properties/countries");
      if (response) {
        setCountries(response as Countries);
      } else {
        console.error("Invalid countries data received");
      }
    } catch (err) {
      console.error("Failed to fetch location count in countries:", err);
    }
  };

  const fetchPropertiesCountInLocations = async () => {
    try {
      const response = await fetchApi("/properties/all-cities");
      setLocations(response as Locations);
    } catch (err) {
      console.error("Failed to fetch cities:", err);
    }
  };

  const fetchTopProperties = async () => {
    try {
      const response = await fetchApi("/properties/top-by-country");

      if (
        response &&
        JSON.stringify(response) !== JSON.stringify(countryProperty)
      ) {
        setCountryProperty(response as CountryPropertyCount[]);
      }
    } catch (err) {
      console.error("Error in fetchTopProperties:", err);
    }
  };


  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        fetchUserProfile,
        bookProperty,
        setBookProperty,
        searchQuery,
        setSearchQuery,
        location,
        setLocation,
        fetchProperties,
        properties,
        fetchLocationCountInCountries,
        fetchPropertiesCountInLocations,
        fetchTopProperties,
        countries,
        locations,
        filterData,
        setFilterData,
        selectedBlog,
        setSelectedBlog,
        countryProperty,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
