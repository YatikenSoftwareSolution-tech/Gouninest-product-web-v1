"use client";

interface HeroStatsProps {
  showSuggestions: boolean;
}

const HeroStats = ({ showSuggestions }: HeroStatsProps) => {
  return (
    <div
      className={`z-0 grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 md:mt-16 transition-all duration-300 ${
        showSuggestions ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"
      }`}
      style={{ animationDelay: "0.6s" }}
    >
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
          1000+
        </div>
        <div className="text-white/90 drop-shadow-sm">Properties</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
          50+
        </div>
        <div className="text-white/90 drop-shadow-sm">Cities</div>
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
          25K+
        </div>
        <div className="text-white/90 drop-shadow-sm">Happy Students</div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl flex justify-center items-center font-bold text-white mb-2 drop-shadow-md">
          4.8 <span className="text-[20px]">⭐</span>
        </div>
        <div className="text-white/90 drop-shadow-sm">Average Rating</div>
      </div>
    </div>
  );
};

export default HeroStats;
