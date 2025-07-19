import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const GetInTouch = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In
            <span className="text-gradient"> Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We&rsquo;re here to help you find your perfect student
            accommodation.
          </p>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Contact us anytime - our team is ready to answer your questions and
            guide you through the process.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            href="tel:+442071234567"
            className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center"
            aria-label="Call Us"
          >
            <Phone className="w-8 h-8 text-[var(--color-electric-500)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Call Us
            </h3>
            <p className="text-gray-600">+44 2079933000</p>
            <p className="text-gray-600">+91 9870468034</p>
            <p className="text-gray-600">+1 3153410000</p>
          </Link>

          <Link
            href="mailto:info@gouninest.com"
            className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center "
            aria-label="Email Us"
          >
            <Mail className="w-8 h-8 text-lime-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Email Us
            </h3>
            <p className="text-gray-600">info@gouninest.com</p>
          </Link>

          <Link
            href="https://www.google.com/maps/search/?api=1&query=123+Student+Street,+London"
            target="_blank"
            rel="noopener noreferrer"
            className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center "
            aria-label="Visit Us"
          >
            <MapPin className="w-8 h-8 text-[var(--color-coral-500)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Visit Us
            </h3>
            First Floor 85 Great Portland Street London W1W 7LT United Kingdom
            <p className="text-gray-600"></p>
          </Link>

          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center ">
            <Clock className="w-8 h-8 text-[var(--color-electric-400)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Office Hours
            </h3>
            <p className="text-gray-600">Mon-Sat: 9AM-6PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
