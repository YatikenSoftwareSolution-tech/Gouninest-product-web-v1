"use client";
import { useGlobal } from "@/context/GlobalContext";
import {
  MapPin,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Footer = () => {
  const { fetchProperties, setFilterData } = useGlobal();
  const router = useRouter();

  const phoneNumbers = [
    { code: "+91", number: "9870468034", countryCode: "IN" },
    { code: "+44", number: "2079933000", countryCode: "GB" },
    { code: "+1", number: "3153410000", countryCode: "US" },
  ];

  const countryNames: Record<string, string> = {
    GB: "United Kingdom",
    US: "United States of America",
    AU: "Australia",
    CA: "Canada",
    DE: "Germany",
    FR: "France",
    IE: "Ireland",
    NZ: "New Zealand",
    NL: "Netherlands",
  };

  const cityMap: Record<string, string> = {
    GB: "London",
    AU: "Sydney",
    US: "Boston",
    IE: "Dublin",
    NZ: "Auckland",
    CA: "Toronto",
    DE: "Berlin",
    FR: "Paris",
    NL: "Amsterdam",
  };

  // Function to handle click on city links
  const handleClick = async (city: string, country: string) => {
    setFilterData({ city, country, keyword: "" });
    fetchProperties(
      `/properties/city-properties?country=${country}&city=${city}`
    );
    router.push(`/properties?city=${city}&country=${country}`);
  };
  return (
    <footer className="bg-gray-900 text-white px-12 sm:px-6">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between">
            {/* Company Info */}
            <div className="animate-fade-in w-[80%] md:w-1/5">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src={"/Logo.png"}
                  alt="Go Uninest"
                  height={120}
                  width={120}
                />
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                GoUniNest helps students across UK, Australia and USA find
                quality, verified housing near universities. With secure
                listings, flexible leases, and real-time support, GoUniNest
                makes it simple to settle into student life with confidence.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://www.facebook.com/profile.php?id=61577828576999#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-electric-400 transition-colors duration-300"
                >
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link
                  href="https://www.instagram.com/gouninest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-electric-400 transition-colors duration-300"
                >
                  <Instagram className="w-6 h-6" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/gouninest/about/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-electric-400 transition-colors duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </Link>
                <Link
                  href="https://youtube.com/gouninest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-electric-400 transition-colors duration-300"
                >
                  <Youtube className="w-6 h-6" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div
              className="animate-fade-in "
              style={{ animationDelay: "0.1s" }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-electric-400 transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-electric-400 transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/properties"
                    className="text-gray-400 hover:text-electric-400 transition-colors duration-300"
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reviews"
                    className="text-gray-400 hover:text-electric-400 transition-colors duration-300"
                  >
                    Reviews
                  </Link>
                </li>

                <li>
                  <Link
                    href="/blogs"
                    className="text-gray-400 hover:text-electric-400 transition-colors duration-300"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacts"
                    className="text-gray-400 hover:text-electric-400 transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div
              className="animate-fade-in "
              style={{ animationDelay: "0.2s" }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">
                Services
              </h4>
              <ul className="space-y-3">
                <li className="text-gray-400 hover:text-electric-400 transition-colors duration-300">
                  Property Search
                </li>
                <li className="text-gray-400 hover:text-electric-400 transition-colors duration-300">
                  Virtual Tours
                </li>
                <li className="text-gray-400 hover:text-electric-400 transition-colors duration-300">
                  Booking Management
                </li>
                <li className="text-gray-400 hover:text-electric-400 transition-colors duration-300">
                  Student Services
                </li>
                <li className="text-gray-400 hover:text-electric-400 transition-colors duration-300">
                  Maintenance
                </li>
                <li className="text-gray-400 hover:text-electric-400 transition-colors duration-300">
                  Community Events
                </li>
              </ul>
            </div>

            <div
              className="animate-fade-in "
              style={{ animationDelay: "0.2s" }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Explore</h4>
              <ul className="space-y-3">
                {Object.entries(countryNames).map(([code, name]) => (
                  <li
                    key={code}
                    onClick={() => handleClick(cityMap[code], code)}
                    className="cursor-pointer text-gray-400 hover:text-electric-400 transition-colors duration-300"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div
              className="animate-fade-in w-full sm:w-1/4"
              style={{ animationDelay: "0.3s" }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">
                Contact Us
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-electric-400 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-400">
                    First Floor 85 Great Portland Street
                    <br />
                    London W1W 7LT United Kingdom
                  </p>
                </div>
                <div className="flex flex-col space-y-5">
                  {phoneNumbers.map(({ code, number, countryCode }) => (
                    <div key={code} className="flex items-center space-x-2">
                      <Image
                        src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                        alt={`${countryCode} Flag`}
                        width={40}
                        height={16}
                        className="rounded-sm w-6 h-4  sm:w-8 sm:h-6"
                      />
                      <p>{`${code} ${number}`}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-coral-400 mr-3" />
                  <p className="text-gray-400">info@gouninest.co.uk</p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-6">
                <h5 className="text-white font-semibold mb-2">Office Hours</h5>
                <p className="text-gray-400 text-sm">
                  Monday - Saturday: 9:00 AM - 6:00 PM
                  <br />
                  {/* Saturday: 10:00 AM - 4:00 PM */}
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Go Uninest. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row justify-start space-x-6 gap-1 sm:gap-0 mt-4 md:mt-0">
              <Link
                href="/policies"
                className="text-gray-400 hover:text-electric-400 text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-electric-400 text-sm transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="text-gray-400 hover:text-electric-400 text-sm transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
