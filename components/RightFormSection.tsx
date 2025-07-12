import { Property } from "@/types/types";

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

const RightFormSection: React.FC<RightFormSectionProps> = ({
  selectedProperty,
  formData,
  handleChange,
}) => {
  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 lg:sticky lg:top-4 h-fit">
      <div className="mb-4 sm:mb-6">
        <div className="text-xl sm:text-2xl font-bold">
          £{selectedProperty.price || "313"} /week
        </div>
        <div className="text-xs sm:text-sm text-gray-600">
          Advance rent £{selectedProperty.advanceRent || "185"}
        </div>
      </div>

      <form className="space-y-3 sm:space-y-4">
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
          <div className="flex">
            <select className="p-2 text-sm border border-gray-300 rounded-l">
              <option>+91</option>
              <option>+44</option>
              <option>+1</option>
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 p-2 text-sm border-t border-b border-r border-gray-300 rounded-r"
              required
            />
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
              (Optional) agree to the platform transferring my information...
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
  );
};

export default RightFormSection;