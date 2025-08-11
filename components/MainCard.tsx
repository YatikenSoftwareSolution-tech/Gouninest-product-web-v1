"use client";
import React from "react";
import { Share2, Users } from "lucide-react";

interface MainCardProps {
  handleGetReferralLink: () => void;
  handleInviteFriends: () => void;
  isTransitioning: boolean;
}

// Main Card Component
const MainCard = ({
  handleGetReferralLink,
  handleInviteFriends,
  isTransitioning,
}: MainCardProps) => (
  <div
    className={`flex justify-center items-center flex-col bg-white backdrop-blur-2xl border border-white/30 rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 ${
      isTransitioning
        ? "opacity-0 transform scale-95"
        : "opacity-100 transform scale-100"
    }`}
  >
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-black mb-1">
        Refer via Link
      </h2>
      <p className="text-sm sm:text-base text-black">
        Click below to get your referral link
      </p>
    </div>

    <div className="w-full space-y-3">
      <button
        onClick={handleGetReferralLink}
        className="w-full bg-gradient-to-r from-[var(--color-electric-500)] to-lime-500 hover:bg-gradient-to-r hover:from-[var(--color-electric-600)] hover:to-lime-600 text-white py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg shadow-lg shadow-purple-500/25 transform hover:scale-[1.025] transition-all duration-300 flex items-center justify-center space-x-2 px-4 sm:px-28 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isTransitioning}
      >
        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Get Referral Link</span>
      </button>

      <div className="flex items-center">
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-black/50 to-transparent"></div>
        <span className="mx-2 sm:mx-4 text-gray-500 text-xs sm:text-sm font-medium">
          or
        </span>
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-black/50 to-transparent"></div>
      </div>

      <button
        onClick={handleInviteFriends}
        className="w-full border-2 border-red-400 text-red-500 hover:bg-red-100 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transform hover:scale-[1.025] transition-all duration-300 flex items-center justify-center space-x-2 px-4 sm:px-28 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isTransitioning}
      >
        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Refer to friend</span>
      </button>
    </div>
  </div>
);

export default MainCard;
