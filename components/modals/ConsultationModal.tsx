"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  X,
  ShieldCheck,
  BadgePercent,
  Headphones,
  Sparkles,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const countries = [
  { code: "IN", dial_code: "+91", name: "India" },
  { code: "US", dial_code: "+1", name: "United States" },
  { code: "GB", dial_code: "+44", name: "United Kingdom" },
  { code: "AU", dial_code: "+61", name: "Australia" },
  { code: "CA", dial_code: "+1", name: "Canada" },
  { code: "IE", dial_code: "+353", name: "Ireland" },
  { code: "NZ", dial_code: "+64", name: "New Zealand" },
  { code: "DE", dial_code: "+49", name: "Germany" },
  { code: "FR", dial_code: "+33", name: "France" },
  { code: "NL", dial_code: "+31", name: "Netherlands" },
];

const getFlagUrl = (code: string) =>
  `https://flagcdn.com/w40/${code.toLowerCase()}.jpg`;

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, onClose]);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dial_code.includes(searchTerm)
  );

  if (!isOpen) return null;

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
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-65 backdrop-blur-xs px-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-center mb-2">
              Live in Your Dream Home
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
                  className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>

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
                    <Image
                      src={getFlagUrl(selectedCountry.code)}
                      alt={selectedCountry.name}
                      width={20}
                      height={15}
                      className="h-4 w-6 object-cover rounded-sm"
                    />
                    <span className="text-sm text-gray-700">
                      {selectedCountry.dial_code}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
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
                          key={country.code}
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
                            src={getFlagUrl(country.code)}
                            alt={country.name}
                            width={20}
                            height={15}
                            className="h-4 w-6 object-cover rounded-sm"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {country.name}
                          </span>
                          <span className="text-sm text-gray-500 ml-auto">
                            {country.dial_code}
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

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />

              <input
                type="text"
                name="location"
                placeholder="Location or University"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />

              <textarea
                name="needs"
                rows={3}
                placeholder="Tell us your rental needs: budget, commute, amenities, safety."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
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
                  <span className="text-pink-600 underline cursor-pointer hover:text-pink-700">
                    Privacy Policy
                  </span>{" "}
                  and{" "}
                  <span className="text-pink-600 underline cursor-pointer hover:text-pink-700">
                    User Agreement
                  </span>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient text-white font-semibold py-3 rounded-md mt-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Request a Free Consultation
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultationModal;
