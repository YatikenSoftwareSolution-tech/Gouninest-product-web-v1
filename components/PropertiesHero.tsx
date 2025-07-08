"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useGlobal } from "@/context/GlobalContext";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  shape: "circle" | "square" | "triangle" | "pentagon";
}

const PropertiesHero = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const { searchQuery, setSearchQuery, fetchProperties, location, setLocation, fetchTopProperties } = useGlobal();

  useEffect(() => {
    const colors = [
      "#ef4444",
      "#3b82f6",
      "#fbbf24",
      "#10b981",
      "#8b5cf6",
      "#f97316",
    ];
    const shapes: ("circle" | "square" | "triangle" | "pentagon")[] = [
      "circle",
      "square",
      "triangle",
      "pentagon",
    ];

    const initialBubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 60 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 5,
      speedY: (Math.random() - 0.5) * 5,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    setBubbles(initialBubbles);

    const animateBubbles = () => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => {
          let newX = bubble.x + bubble.speedX;
          let newY = bubble.y + bubble.speedY;
          let newSpeedX = bubble.speedX;
          let newSpeedY = bubble.speedY;

          // Bounce off walls
          if (newX <= 0 || newX >= window.innerWidth - bubble.size) {
            newSpeedX = -newSpeedX;
            newX = Math.max(0, Math.min(newX, window.innerWidth - bubble.size));
          }
          if (newY <= 0 || newY >= window.innerHeight - bubble.size) {
            newSpeedY = -newSpeedY;
            newY = Math.max(
              0,
              Math.min(newY, window.innerHeight - bubble.size)
            );
          }

          return {
            ...bubble,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
          };
        })
      );
    };

    const interval = setInterval(animateBubbles, 16);
    return () => clearInterval(interval);
  }, []);

  const getShapeStyle = (bubble: Bubble) => {
    const baseStyle = {
      position: "absolute" as const,
      left: bubble.x,
      top: bubble.y,
      width: bubble.size,
      height: bubble.size,
      backgroundColor: bubble.color,
      opacity: 0.7,
      transition: "all 0.016s linear",
    };

    switch (bubble.shape) {
      case "circle":
        return { ...baseStyle, borderRadius: "50%" };
      case "square":
        return { ...baseStyle, borderRadius: "0" };
      case "triangle":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          width: 0,
          height: 0,
          borderLeft: `${bubble.size / 2}px solid transparent`,
          borderRight: `${bubble.size / 2}px solid transparent`,
          borderBottom: `${bubble.size}px solid ${bubble.color}`,
        };
      case "pentagon":
        return {
          ...baseStyle,
          borderRadius: "20%",
          transform: "rotate(45deg)",
        };
      default:
        return { ...baseStyle, borderRadius: "50%" };
    }
  };

  const handleSearch = async () => {
    if(searchQuery !== ''){
      await fetchProperties(`/properties/searchproperties?keyword=${searchQuery}`);
    }else{
      await fetchProperties(`/properties/searchproperties?latitude=${location.lat}&longitude=${location.lon}`);
    }
  };

  const getLocation = async () => {
    try {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude.toString(), lon: longitude.toString() });
      });
    } catch (error) {
      console.log(
        "An unexpected error occurred while getting location.",
        error
      );
    }
  };

  useEffect(() => {
    fetchTopProperties();
  });

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[var(--color-electric-100)] to-lime-100 overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((bubble) => (
          <div key={bubble.id} style={getShapeStyle(bubble)} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 ">
            Find 
            <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent"> Your </span> 
            Perfect
            <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent">
              {" "}
              Nest
            </span>
          </h1>
          <p className=" mb-6 max-w-4xl mx-auto">
            Browse through our extensive collection of verified student accommodations with advanced search filters.
          </p>
          <p className=" text-xl text-gray-600 mb-6 max-w-3xl mx-auto">Search for housing options in the UK, Australia, and the USA, designed for convenience, safety, and flexibility.</p>
        </div>

        {/* Search Form */}
        <div
          className="flex flex-col sm:flex-row items-center md:gap-4 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto animate-scale-in shadow-2xl"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative flex-1 w-full">
            <MapPin
              className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-blue-700 w-6 h-6 cursor-pointer"
              onClick={getLocation}
            />
            <Input
              type="text"
              placeholder={
          searchQuery === "" && location.lat === "" && location.lon === ""
            ? "Search by location or university"
            : undefined
              }
              value={
          searchQuery !== ""
            ? searchQuery
            : location.lat !== "" && location.lon !== ""
            ? location.lat + " " + location.lon
            : ""
              }
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-4 h-12 text-lg bg-white/70 glass-effect border-white/40 text-dark placeholder-dark focus:border-[var(--color-electric-400)] focus:bg-white/80 rounded-xl shadow-md"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="w-full sm:w-auto h-12 px-8 mt-2 sm:mt-0 bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 hover:from-electric-600 hover:to-amber-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/30 animate-pulse-glow flex items-center justify-center"
          >
            <Search className="w-6 h-6 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertiesHero;
