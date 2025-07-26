"use client";

import { FormEvent, useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  BadgePercent,
  Headphones,
  Sparkles,
  ChevronDown,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useGlobal } from "@/context/GlobalContext";
import Link from "next/link";
import { AllCountries } from "@/types/types";

interface GetInTouchModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId?: string; 
  isEnquiry?: boolean;
}

const GetInTouchModal: React.FC<GetInTouchModalProps> = ({
  isOpen,
  onClose,
  propertyId,
  isEnquiry = false,
}) => {
  const { submitEnquiry } = useGlobal();
  const [selectedCountry, setSelectedCountry] = useState<AllCountries | undefined>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const { allCountries,fetchAllCountries } = useGlobal();

    useEffect(() => { 
    if (allCountries.length <= 0) {
      fetchAllCountries();
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const payload = {
        firstName: formValues.firstName as string,
        lastName: formValues.lastName as string,
        phone: `${selectedCountry?.callingCode}${formValues.phoneNumber}`,
        email: formValues.email as string,
        message: formValues.needs as string,
        ...(propertyId && { propertyId }),
        ...(formValues.location && { location: formValues.location as string }),
      };

      await submitEnquiry(payload);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting enquiry:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitted) {
      timer = setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isSubmitted, onClose]);

  const filteredCountries = allCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(country.callingCode).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Success Notification Popup */}
      {isSubmitted && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center backdrop-brightness-65 backdrop-blur-xs px-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-500 w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
              {isEnquiry ? "Enquiry Sent!" : "Form Submitted Successfully!"}
            </h2>
            <p className="text-gray-600 mb-6">
              {isEnquiry
                ? "We'll get back to you with more details soon."
                : "Thank you for contacting us. We'll get back to you soon."}
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

      {/* Main Form Modal */}
      {!isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-65 backdrop-blur-xs px-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 max-sm:w-4 max-sm:h-4 transition-transform duration-300 hover:rotate-90" />
            </button>

            <h2 className="text-2xl font-bold text-center mb-2">
              {isEnquiry
                ? "Enquire About This Property"
                : "Live in Your Dream Home"}
            </h2>

            <div className="flex justify-center gap-4 text-sm text-gray-600 mb-6 flex-wrap text-center">
              <div className="flex items-center gap-1">
                <ShieldCheck className="text-blue-500 w-4 h-4" />
                Verified Listings
              </div>
              <div className="flex items-center gap-1">
                <BadgePercent className="text-blue-500 w-4 h-4" />
                Price-Match Guarantee
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="text-blue-500 w-4 h-4" />
                Exclusive Offers
              </div>
              <div className="flex items-center gap-1">
                <Headphones className="text-blue-500 w-4 h-4" />
                1-on-1 Professional Support
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Phone Input with Country Flag Dropdown */}
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all">
                  {/* Country Dropdown Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors border-r border-gray-300 min-w-[120px]"
                  >
                    {selectedCountry && <Image
                      src={selectedCountry?.flag}
                      alt={selectedCountry?.name}
                      width={20}
                      height={15}
                      className="h-4 w-6 object-cover rounded-sm"
                    />}
                    {selectedCountry && <span className="text-sm font-medium text-gray-700">
                      {selectedCountry.callingCode}
                    </span>}
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Phone Input Field */}
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="flex-1 px-4 py-2 text-sm focus:outline-none"
                    required
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full z-50">
                    <div className="bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-auto">
                      {/* Search Field */}
                      <div className="p-2 border-b border-gray-100 sticky top-0 bg-white z-10">
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                          autoFocus
                        />
                      </div>

                      {/* Country List */}
                      <div className="divide-y divide-gray-100">
                        {filteredCountries.map((country) => (
                          <button
                            key={`${country.callingCode}-${country.name}`}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCountry(country);
                              setIsDropdownOpen(false);
                              setSearchTerm("");
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                          >
                            <Image
                              src={country.flag}
                              alt={country.name}
                              width={20}
                              height={15}
                              className="h-4 w-6 object-cover rounded-sm"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-900 truncate">
                                  {country.name}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">
                                  {country.callingCode}
                                </span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Click-outside overlay */}
                {isDropdownOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                )}
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />

              <input
                type="text"
                name="location"
                placeholder="Location or University"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required={!isEnquiry}
              />

              <textarea
                name="needs"
                rows={3}
                placeholder={
                  isEnquiry
                    ? "Tell us what you'd like to know about this property"
                    : "Tell us your rental needs: budget, commute, amenities, safety."
                }
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                required
              />

              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  id="agree"
                  required
                  className="mt-1 accent-purple-500"
                />
                <label htmlFor="agree" className="text-gray-600">
                  I have read and agree to the{" "}
                  <Link
                    href="/policies"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from bubbling up to modal
                      window.open("/policies", "_blank"); // Open in new tab
                    }}
                    className="text-pink-600 underline cursor-pointer hover:text-pink-700"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/terms"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from bubbling up to modal
                      window.open("/terms", "_blank"); // Open in new tab
                    }}
                    className="text-pink-600 underline cursor-pointer hover:text-pink-700"
                  >
                    Terms
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient text-white font-semibold py-3 rounded-md mt-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    {isEnquiry ? "Sending Enquiry..." : "Submitting..."}
                  </>
                ) : isEnquiry ? (
                  "Enquire Now"
                ) : (
                  "Get In Touch"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GetInTouchModal;
