"use client";

import { useGlobal } from "@/context/GlobalContext";
import { useEffect, useState } from "react";
import HeroSearch from "./HeroSearch";
import HeroStats from "./HeroStats";

const Hero = () => {
  const {
    fetchLocationCountInCountries,
    fetchPropertiesCountInLocations,
    fetchTopProperties,
    fetchUserProfile,
  } = useGlobal();

  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchUserProfile();
    fetchLocationCountInCountries();
    fetchPropertiesCountInLocations();
    fetchTopProperties();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <video
          src="https://storage.googleapis.com/gouninest/Uninest2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--color-electric-400)]/10 rounded-full animate-float" />
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-amber-400/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-24 h-24 bg-[var(--color-coral-400)]/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-12 h-12 bg-[var(--color-electric-300)]/10 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Hero Content */}
      <div className="mt-20 md:mt-40 relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-8 min-h-[600px]">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
          <span className="block text-gradient bg-gradient-to-r from-[var(--color-electric-200)] via-amber-200 to-[var(--color-coral-200)] bg-clip-text text-transparent drop-shadow-lg">
            Find Your Perfect Student Home
          </span>
        </h1>

        <p className="text-white max-w-3xl mx-auto animate-fade-in drop-shadow-md">
          Live near campus, pay less.
        </p>
        <p className="text-white mb-12 max-w-3xl mx-auto animate-fade-in drop-shadow-md">
          We cut costs, not comfort — your budget-friendly upgrade.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center md:gap-4 p-6 md:p-8 max-w-4xl mx-auto"
          style={{ animationDelay: "0.4s" }}
        >
          <HeroSearch
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
          />
        </div>

        <HeroStats showSuggestions={showSuggestions} />
      </div>
    </section>
  );
};

export default Hero;
