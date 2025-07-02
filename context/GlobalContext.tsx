"use client";

import { createContext, useContext, useState, PropsWithChildren } from "react";
import { fetchApi } from "@/utils/fetchApi";
import { Countries, CountryPropertyCount, Locations, Property, User } from "@/types/types";

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

// Create context with undefined as initial value
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
  const [countryProperty, setCountryProperty] = useState<CountryPropertyCount[]>([]);

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
      if (response) {
        setCountryProperty(response as CountryPropertyCount[]);
      } else {
        console.error("Invalid properties data received");
      }
    } catch (err) {
      console.error("Error in GlobalProvider useEffect:", err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetchApi("/user/profile");
      // Type guard to ensure response matches User type
      if (response && typeof response === "object" && "id" in response) {
        // adjust properties based on your User type
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
      console.error("Failed to fetch user profile:", err);
      setUser(null);
    }
  };

  // // Authentication methods
  // const signup = async (userData) => {
  //   try {
  //     const data = await makeRequest("post", "/signup", userData);
  //     setUser(data.user);
  //     router.push(
  //       data.user.role === "admin" ? "/admin/dashboard" : "/dashboard"
  //     );
  //     return data;
  //   } catch (err) {
  //     throw err;
  //   }
  // };

  // const login = async (credentials) => {
  //   try {
  //     const data = await makeRequest("post", "/login", credentials);
  //     setUser(data.user);
  //     router.push(
  //       data.user.role === "admin" ? "/admin/dashboard" : "/dashboard"
  //     );
  //     return data;
  //   } catch (err) {
  //     throw err;
  //   }
  // };

  // // OTP methods

  // const sendPhoneOtp = async (mobile) => {
  //   try {
  //     const res = await axios.post(`${API_BASE}/send-phone-otp`, { mobile });
  //     return res.data;
  //   } catch (err) {
  //     throw err.response?.data?.message || "Failed to send OTP";
  //   }
  // };

  // const sendEmailOtp = async (email) => {
  //   try {
  //     const res = await axios.post(`${API_BASE}/send-email-otp`, { email });
  //     return res.data;
  //   } catch (err) {
  //     throw err.response?.data?.message || "Failed to send OTP";
  //   }
  // };

  // const verifyOtp = async (identifier, otp, type) => {
  //   try {
  //     const res = await axios.post(`${API_BASE}/verify-otp`, {
  //       identifier,
  //       otp,
  //       type,
  //     });
  //     return res.data;
  //   } catch (err) {
  //     throw err.response?.data?.message || "OTP verification failed";
  //   }
  // };

  // const forgotPassword = async (mobile) => {
  //   try {
  //     const res = await axios.post(`${API_BASE}/forgot-password`, { mobile });
  //     return res.data;
  //   } catch (err) {
  //     throw err.response?.data?.message || "Password reset failed";
  //   }
  // };

  // const resetPassword = async (mobile, otp, newPassword) => {
  //   try {
  //     const res = await axios.post(`${API_BASE}/reset-password`, {
  //       mobile,
  //       otp,
  //       newPassword,
  //     });
  //     return res.data;
  //   } catch (err) {
  //     throw err.response?.data?.message || "Password reset failed";
  //   }
  // };

  // const logout = async () => {
  //   try {
  //     await axios.post(`${API_BASE}/logout`, {}, { withCredentials: true });
  //   } catch {}
  //   setUser(null);
  //   router.push("/login");
  // };

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
        location,
        setLocation,
        setSearchQuery,
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
        countryProperty
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
