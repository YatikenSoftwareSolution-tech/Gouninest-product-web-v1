"use client";

import { createContext, useContext, useState, PropsWithChildren } from "react";
import { fetchApi } from "@/utils/fetchApi";
import {
  Countries,
  CountryPropertyCount,
  Locations,
  Property,
  User,
  Universities
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
  getSearchSuggestions: (keyword: string) => SuggestionItem[];
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
  submitEnquiry: (data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    message: string;
    propertyId?: string;
    location?: string;
  }) => Promise<void>;

  fetchUniversities: () => void;
  searchProperties: (keyword: string, field: string) => Promise<Property[]>;
  cityImages: image [];
  fetchImages: () => void;
  universities: Universities[];
}

interface FilterData {
  country: string;
  city: string;
  keyword: string;
  lat?: number;
  lon?: number;
}


interface SuggestionItem {
  name: string;
  city?: string;
  country?: string;
  propertyCount?: number;
  _id?: string;
}



interface image{
  country: string;
  cities: []
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
  const [cityImages, setCityImages] = useState<image[]>([]);
  const [universities, setUniversities] = useState<Universities[]>([]);
  const fetchImages = async () =>{
    try {
      const response = await fetchApi('/city-images');
      if (
        response 
      ) {
        setCityImages(response as image[]);
      }
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  }

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

  const getSearchSuggestions = (keyword: string): SuggestionItem[] => {
    if (!keyword.trim()) return [];

    const lowerKeyword = keyword.toLowerCase();
    console.log("Searching for:", lowerKeyword); // Debug log

    // Debug logs to check data
    // console.log("countryProperty data:", countryProperty);
    // console.log("locations data:", locations);

    const matchedCountries = (countryProperty || [])
      .filter((item) => {
        const name = item?.name?.toLowerCase() || "";
        return name.includes(lowerKeyword);
      })
      .map((item) => ({
        name: item.name,
        country: item.name,
        propertyCount: item.propertyCount,
        _id: item._id,
      }));

    const matchedLocations = (locations || [])
      .filter((item) => {
        const name = item?.name?.toLowerCase() || "";
        return name.includes(lowerKeyword);
      })
      .map((item) => ({
        name: item.name,
        city: item.city,
        country: item.country,
        propertyCount: item.propertyCount,
        _id: item._id,
      }));

    const results = [...matchedCountries, ...matchedLocations].slice(0, 10);
    console.log("Search results:", results); // Debug log
    return results;
  };

  const submitEnquiry = async (data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    message: string;
    propertyId?: string;
    location?: string;
  }) => {
    try {
      setLoading(true);

      const response = await fetchApi("/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response && typeof response === "object" && "message" in response) {
        console.log("Enquiry submitted successfully.");
      } else {
        console.error(
          "Enquiry submission failed:",
          response || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error while submitting enquiry:", error);
      setError("Failed to submit enquiry.");
    } finally {
      setLoading(false);
    }
  };


  const fetchUniversities = async () => {
    try{
      const response =  await fetchApi('/university')
      setUniversities(response as Universities[])
    }catch (err){
      console.log(err)
    }
  }

  const searchProperties = async (
    keyword: string,
    field: string
  ): Promise<Property[]> => {
    try {
      setLoading(true);
      const response = await fetchApi(
        `/properties/searchproperties?keyword=${encodeURIComponent(
          keyword
        )}&field=${encodeURIComponent(field)}`
      );

      if (
        typeof response === "object" &&
        response !== null &&
        "properties" in response
      ) {
        return response.properties as Property[];
      }
      throw new Error("Invalid response format");
    } catch (err) {
      console.error("Failed to search properties:", err);
      setError("Failed to search properties");
      return [];
    } finally {
      setLoading(false);
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
        getSearchSuggestions,
        submitEnquiry,
        fetchUniversities,
        searchProperties,
        fetchImages,
        cityImages,
        universities
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
