"use client";

import { FormEvent } from "react";
import {
  X,
  ShieldCheck,
  BadgePercent,
  Headphones,
  Sparkles,
} from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission logic here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-65 backdrop-blur-xs px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
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
              className="w-1/2 border border-gray-300 rounded-md px-4 py-2"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-1/2 border border-gray-300 rounded-md px-4 py-2"
              required
            />
          </div>

          <div className="flex">
            <select
              name="countryCode"
              className="border border-gray-300 rounded-l-md px-3 py-2 bg-white"
              required
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              className="flex-1 border-t border-b border-r border-gray-300 rounded-r-md px-4 py-2"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location or University"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />

          <textarea
            name="needs"
            rows={3}
            placeholder="Tell us your rental needs: budget, commute, amenities, safety."
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />

          <div className="flex items-start gap-2 text-sm">
            <input type="checkbox" id="agree" required />
            <label htmlFor="agree" className="text-gray-600">
              I have read and agree to the{" "}
              <span className="text-pink-600 underline cursor-pointer">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="text-pink-600 underline cursor-pointer">
                User Agreement
              </span>
              .
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient text-white font-semibold py-3 rounded-md mt-2"
          >
            Request a Free Consultation
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationModal;
