"use client";
import FriendCard from "@/components/FriendCard";
import LinkCard from "@/components/LinkCard";
import MainCard from "@/components/MainCard";
import { ArrowRight, Gift, Heart, Share2, Sparkles, Users } from "lucide-react";
import { useEffect, useState } from "react";

type FriendData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  agreeTerms: boolean;
  countryCode?: string;
};

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  countryCode?: string;
};

type FriendDataField = keyof FriendData;
type FriendDataValue = string | boolean | undefined; 

type UserDataField = keyof UserData;
type UserDataValue = string | undefined;

export default function ReferPage() {
  const [copied, setCopied] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [currentView, setCurrentView] = useState<"main" | "link" | "friend">(
    "main"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [friendData, setFriendData] = useState<FriendData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    agreeTerms: false,
  });

  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://gouninest.com/referral/giftc");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGetReferralLink = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView("link");
      setIsTransitioning(false);
    }, 300);
  };

  const handleInviteFriends = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView("friend");
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackToMain = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView("main");
      setIsTransitioning(false);
    }, 300);
  };

  const handleFriendDataChange = (
    field: FriendDataField,
    value: FriendDataValue
  ) => {
    setFriendData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUserDataChange = (field: UserDataField, value: UserDataValue) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleShareToEarn = () => {
    console.log("Sharing friend data:", friendData);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView("main");
      setIsTransitioning(false);
      setFriendData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        agreeTerms: false,
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <div
        className="relative z-10 h-full flex items-center justify-center px-3 sm:px-6 pt-20 pb-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 backdrop-brightness-70"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-0 sm:gap-12 items-center">
            {/* Left Content */}
            <div className="h-[250px] sm:h-full text-white space-y-8 sm:space-y-4 animate-fade-in-up">
              <div className="mt-10 flex items-center space-x-2 text-purple-300 font-medium">
                <Sparkles className="w-5 h-5" />
                <span>Exclusive Referral Program</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Refer
                </span>{" "}
                <span className="text-white">& Earn</span>
              </h1>

              <p className="text-xl text-white leading-relaxed max-w-lg">
                Claim your £50 reward! Customize your gift card by choosing from
                a range of popular brands.
              </p>
              <Heart className="w-20 h-20 ml-3 text-red-400 animate-pulse hidden sm:block" />
            </div>

            {/* Right Card - Dynamic Content */}
            <div
              className={`transform transition-all duration-700 ease-in-out max-w-md ml-0 sm:ml-40 ${
                animateCards
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative min-h-[400px] flex justify-center items-center">
                {currentView === "main" && (
                  <MainCard
                    handleGetReferralLink={handleGetReferralLink}
                    handleInviteFriends={handleInviteFriends}
                    isTransitioning={isTransitioning}
                  />
                )}
                {currentView === "link" && (
                  <LinkCard
                    copied={copied}
                    handleCopyLink={handleCopyLink}
                    handleBackToMain={handleBackToMain}
                    isTransitioning={isTransitioning}
                  />
                )}
                {currentView === "friend" && (
                  <FriendCard
                    friendData={friendData}
                    userData={userData}
                    handleFriendDataChange={handleFriendDataChange}
                    handleUserDataChange={handleUserDataChange}
                    handleShareToEarn={handleShareToEarn}
                    handleBackToMain={handleBackToMain}
                    isTransitioning={isTransitioning}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="relative py-2">
        <div className="container mx-auto px-3 max-w-6xl">
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold text-black m-2">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Refer
              </span>{" "}
              in just 3 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Share2,
                title: "Share ",
                description:
                  "Send your unique referral link to friends and family through any channel",
                color: "from-blue-500 to-cyan-500",
                delay: "0ms",
              },
              {
                step: "02",
                icon: Users,
                title: "Let them book",
                description:
                  "Your friend book with us! You get £50 of the booking fee",
                color: "from-purple-500 to-pink-500",
                delay: "200ms",
              },
              {
                step: "03",
                icon: Gift,
                title: "Earn",
                description: "You get £50 gift cards",
                color: "from-emerald-500 to-teal-500",
                delay: "400ms",
              },
            ].map((item, index) => {
              return (
                <div
                  key={index}
                  className="group relative"
                  style={{ animationDelay: item.delay }}
                >
                  <div className="relative mt-2 bg-blue-50 backdrop-blur-lg border border-white/50 rounded-3xl p-3 hover:bg-blue-100 transition-all duration-500 transform hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-purple-500/20 h-[135px]">
                    {/* Step Number */}
                    <div className="absolute -top-2 left-0">
                      <div
                        className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                      >
                        {item.step}
                      </div>
                    </div>

                    {/* Icon */}
                    {/* <div className="mb-2">
                      <div
                        className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${item.color} bg-opacity-20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div> */}

                    {/* Content */}
                    <h3 className="text-xl font-bold text-black mb-4 text-center">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-center leading-relaxed">
                      {item.description}
                    </p>

                    {/* Hover Arrow */}
                    <div className="mt-0.5 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
}
