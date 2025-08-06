"use client";
import React, { useEffect, useState } from "react";
import { AllCountries, Property } from "@/types/types";
import Image from "next/image";
import { CheckCircle, ChevronDown } from "lucide-react";
import { useGlobal } from "@/context/GlobalContext";
import emailjs from "@emailjs/browser";


interface RightFormSectionProps {
  selectedProperty: Property;
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

// Static currency symbols by country
const CURRENCY_SYMBOLS = {
  GB: "£",
  AU: "A$",
  US: "$",
  IE: "€",
  NZ: "NZ$",
  CA: "C$",
  DE: "€",
  FR: "€",
  NL: "€",
} as const;


const RightFormSection: React.FC<RightFormSectionProps> = ({
  selectedProperty,
  formData,
  handleChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<AllCountries | undefined>();
  const { allCountries, fetchAllCountries } = useGlobal();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (allCountries.length <= 0) {
      fetchAllCountries();
    }
  }, []);
  // Read countryCode directly from selectedProperty
  const countryCode =
    selectedProperty.countryCode as keyof typeof CURRENCY_SYMBOLS;
  const symbol = CURRENCY_SYMBOLS[countryCode] || "£";

  const weeklyPrice = selectedProperty.price ?? 313;
  const advanceRent = selectedProperty.advanceRent ?? 185;
  const monthlyPrice = weeklyPrice * 4;

  const format = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const filteredCountries = allCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(country.callingCode).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullPhone = selectedCountry
      ? `${selectedCountry.callingCode} ${formData.phone}`
      : formData.phone;

    const templateParams = {
      user_name: `${formData.firstName} ${formData.lastName}`,
      user_email: formData.email,
      user_phone: fullPhone,
      user_location: selectedProperty.city || "Not provided",
      user_message: "User submitted a property enquiry",
      property_id: selectedProperty.id || "-",
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      alert("Enquiry sent successfully!");
      setIsSubmitted(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitted) {
      timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isSubmitted]);


  return (
    <>
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-65 backdrop-blur-xs px-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-500 w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you! Our team will contact you shortly.
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
      
      {!isSubmitted && (
        <div className="w-full text-left bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 lg:sticky lg:top-4 h-fit">
          <div className="mb-4 sm:mb-6">
            <div className="text-xl sm:text-2xl font-bold">
              {symbol}
              {format(weeklyPrice)} /week
            </div>
            <div className="text-lg font-semibold mt-1">
              {symbol}
              {format(monthlyPrice)} /month
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">
              Advance rent {symbol}
              {format(advanceRent)}
            </div>
          </div>

          <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="firstName"
                className="block text-xs sm:text-sm font-medium mb-1"
              >
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-xs sm:text-sm font-medium mb-1"
              >
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium mb-1"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 text-sm border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs sm:text-sm font-medium mb-1"
              >
                Phone Number*
              </label>
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 transition-all">
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
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 p-2 text-sm focus:outline-none"
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
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                          autoFocus
                        />
                      </div>
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
                            {country.callingCode}
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

            <div className="space-y-2">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 mr-2"
                />
                <label htmlFor="agreeTerms" className="text-xs text-gray-600">
                  (Optional) agree to the platform transferring my
                  information...
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreePrivacy"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                  className="mt-1 mr-2"
                  required
                />
                <label htmlFor="agreePrivacy" className="text-xs text-gray-600">
                  I agree to the Privacy Policy and User Agreement.
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base cursor-pointer"
            >
              Find My Home
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RightFormSection;
