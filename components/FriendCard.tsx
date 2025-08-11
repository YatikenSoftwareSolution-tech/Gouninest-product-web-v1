"use client";
import { X, ChevronDown, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useGlobal } from "@/context/GlobalContext";

interface CountryType {
  name: string;
  callingCode: string;
  flag: string;
}

interface FriendData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  agreeTerms: boolean;
  countryCode?: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  countryCode?: string;
}

interface FriendCardProps {
  friendData?: FriendData;
  userData?: UserData;
  handleFriendDataChange: (
    field: keyof FriendData,
    value: string | boolean | undefined
  ) => void;
  handleUserDataChange: (
    field: keyof UserData,
    value: string | undefined
  ) => void;
  handleShareToEarn: () => void;
  handleBackToMain: () => void;
  isTransitioning: boolean;
}

const FriendCard = ({
  friendData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    agreeTerms: false,
    countryCode: "",
  },
  userData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    countryCode: "",
  },
  handleFriendDataChange,
  handleUserDataChange,
  handleShareToEarn,
  handleBackToMain,
  isTransitioning,
}: FriendCardProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    null
  );
  const [selectedUserCountry, setSelectedUserCountry] =
    useState<CountryType | null>(null);
  const { allCountries, fetchAllCountries } = useGlobal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState<"user" | "friend">("user");

  useEffect(() => {
    if (allCountries.length <= 0) {
      fetchAllCountries();
    }
  }, [allCountries, fetchAllCountries]);

  const filteredCountries = allCountries.filter(
    (country: CountryType) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(country.callingCode)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const filteredUserCountries = allCountries.filter(
    (country: CountryType) =>
      country.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      String(country.callingCode)
        .toLowerCase()
        .includes(userSearchTerm.toLowerCase())
  );

  const handleCountrySelect = (country: CountryType) => {
    setSelectedCountry(country);
    handleFriendDataChange("countryCode", country.callingCode);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handleUserCountrySelect = (country: CountryType) => {
    setSelectedUserCountry(country);
    handleUserDataChange("countryCode", country.callingCode);
    setIsUserDropdownOpen(false);
    setUserSearchTerm("");
  };

  return (
    <>
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-65 backdrop-blur-xs px-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-500 w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Referral Sent!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for referring your friend!
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient h-2.5 rounded-full"
                style={{ animation: "progress 5s linear" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`absolute bottom-0 left-0 sm:-bottom-40 right-0 z-50 bg-white backdrop-blur-2xl border border-white/30 rounded-2xl p-3 sm:p-8 shadow-2xl max-h-[87vh] max-w-[90vw] overflow-y-auto transition-all duration-500 ${
          isTransitioning
            ? "opacity-0 transform scale-95 translate-x-4"
            : "opacity-100 transform scale-100 translate-x-0"
        }`}
      >
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackToMain}
            className="p-1 absolute right-2 top-2 text-gray-500 hover:text-gray-600 transition-transform hover:rotate-90 duration-300 hover:scale-110 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-black">
              Refer to your friend
            </h2>
            <p className="text-black text-sm">
              {activeSection === "user"
                ? "Add your details"
                : "Add your friend's details"}
            </p>
          </div>
        </div>

        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveSection("user")}
            className={`px-4 py-2 font-medium text-sm ${
              activeSection === "user"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500"
            }`}
          >
            Your Details
          </button>
          <button
            onClick={() => setActiveSection("friend")}
            className={`px-4 py-2 font-medium text-sm ${
              activeSection === "friend"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500"
            }`}
          >
            Friend&apos;s Details
          </button>
        </div>

        <div className="space-y-4">
          {activeSection === "user" ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  value={userData?.firstName || ""}
                  onChange={(e) =>
                    handleUserDataChange("firstName", e.target.value)
                  }
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 text-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={userData?.lastName || ""}
                  onChange={(e) =>
                    handleUserDataChange("lastName", e.target.value)
                  }
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 text-sm"
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                value={userData?.email || ""}
                onChange={(e) => handleUserDataChange("email", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 text-sm"
              />

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">
                  Phone Number*
                </label>
                <div className="relative">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-red-400 transition-all">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsUserDropdownOpen(!isUserDropdownOpen);
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border-r border-gray-300 min-w-[120px]"
                    >
                      {selectedUserCountry && (
                        <Image
                          src={selectedUserCountry?.flag}
                          alt={selectedUserCountry?.name}
                          width={20}
                          height={15}
                          className="h-4 w-6 object-cover rounded-sm"
                        />
                      )}
                      {selectedUserCountry && (
                        <span className="text-sm font-medium text-gray-700">
                          {selectedUserCountry.callingCode}
                        </span>
                      )}
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transition-transform ${
                          isUserDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <input
                      type="tel"
                      value={userData?.phone || ""}
                      onChange={(e) =>
                        handleUserDataChange("phone", e.target.value)
                      }
                      className="flex-1 p-3 text-sm focus:outline-none"
                      placeholder="Phone Number"
                      required
                    />
                  </div>

                  {isUserDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full z-50">
                      <div className="bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-auto">
                        <div className="p-2 border-b sticky top-0 bg-white z-10">
                          <input
                            type="text"
                            placeholder="Search countries..."
                            value={userSearchTerm}
                            onChange={(e) => setUserSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        {filteredUserCountries.map((country) => (
                          <button
                            key={`${country.callingCode}-${country.name}`}
                            type="button"
                            onClick={() => handleUserCountrySelect(country)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50"
                          >
                            <Image
                              src={country.flag}
                              alt={country.name}
                              width={20}
                              height={15}
                              className="h-4 w-6 object-cover rounded-sm"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {country.name}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              +{country.callingCode}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {isUserDropdownOpen && (
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserDropdownOpen(false)}
                    />
                  )}
                </div>
              </div>

              <input
                type="text"
                placeholder="Location or University"
                value={userData?.location || ""}
                onChange={(e) =>
                  handleUserDataChange("location", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-sm focus:ring-1 focus:ring-red-400"
              />

              <button
                onClick={() => setActiveSection("friend")}
                className="w-full bg-gradient-to-r from-[var(--color-electric-500)] to-lime-500 hover:bg-gradient-to-r hover:from-[var(--color-electric-600)] hover:to-lime-600 text-white py-2.5 rounded-lg font-semibold text-md transition-colors"
              >
                Continue to Friend&apos;s Details
              </button>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  value={friendData?.firstName || ""}
                  onChange={(e) =>
                    handleFriendDataChange("firstName", e.target.value)
                  }
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 text-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={friendData?.lastName || ""}
                  onChange={(e) =>
                    handleFriendDataChange("lastName", e.target.value)
                  }
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 text-sm"
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                value={friendData?.email || ""}
                onChange={(e) =>
                  handleFriendDataChange("email", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 text-sm"
              />

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">
                  Phone Number*
                </label>
                <div className="relative">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-red-400 transition-all">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border-r border-gray-300 min-w-[120px]"
                    >
                      {selectedCountry && (
                        <Image
                          src={selectedCountry?.flag}
                          alt={selectedCountry?.name}
                          width={20}
                          height={15}
                          className="h-4 w-6 object-cover rounded-sm"
                        />
                      )}
                      {selectedCountry && (
                        <span className="text-sm font-medium text-gray-700">
                          {selectedCountry.callingCode}
                        </span>
                      )}
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <input
                      type="tel"
                      value={friendData?.phone || ""}
                      onChange={(e) =>
                        handleFriendDataChange("phone", e.target.value)
                      }
                      className="flex-1 p-3 text-sm focus:outline-none"
                      placeholder="Phone Number"
                      required
                    />
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full z-50">
                      <div className="bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-auto">
                        <div className="p-2 border-b sticky top-0 bg-white z-10">
                          <input
                            type="text"
                            placeholder="Search countries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        {filteredCountries.map((country) => (
                          <button
                            key={`${country.callingCode}-${country.name}`}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50"
                          >
                            <Image
                              src={country.flag}
                              alt={country.name}
                              width={20}
                              height={15}
                              className="h-4 w-6 object-cover rounded-sm"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {country.name}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              +{country.callingCode}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {isDropdownOpen && (
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                  )}
                </div>
              </div>

              <input
                type="text"
                placeholder="Location or University"
                value={friendData?.location || ""}
                onChange={(e) =>
                  handleFriendDataChange("location", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none text-sm focus:ring-1 focus:ring-red-400"
              />

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={friendData?.agreeTerms || false}
                  onChange={(e) =>
                    handleFriendDataChange("agreeTerms", e.target.checked)
                  }
                  className="mt-1 w-4 h-4 text-red-500"
                />
                <label htmlFor="terms" className="text-xs text-gray-600">
                  I have read and agree to the{" "}
                  <span className="text-red-500">
                    &quot;Privacy Policy&quot;
                  </span>{" "}
                  and{" "}
                  <span className="text-red-500">
                    &quot;User Agreement&quot;
                  </span>
                  .
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setActiveSection("user")}
                  className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-lg font-semibold text-md transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    handleShareToEarn();
                    setIsSubmitted(true);
                    setTimeout(() => setIsSubmitted(false), 5000);
                  }}
                  disabled={!friendData?.agreeTerms}
                  className="w-2/3 bg-gradient-to-r from-[var(--color-electric-500)] to-lime-500 hover:bg-gradient-to-r hover:from-[var(--color-electric-600)] hover:to-lime-600 text-white py-2.5 rounded-lg font-semibold text-md transition-colors disabled:opacity-50"
                >
                  Share to earn
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FriendCard;
