"use client";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";

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

const ContactsHero = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

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

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[var(--color-electric-100)] to-lime-100 overflow-hidden flex items-center justify-center">
      {/* Animated Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((bubble) => (
          <div key={bubble.id} style={getShapeStyle(bubble)} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in mt-20 md:mt-0">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Get In
            <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-lime-500 bg-clip-text text-transparent">
              {" "}
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re here to help you find your ideal student accommodation in
            the UK, Australia, or the US. Whether you&apos;re an incoming
            international student or relocating to a new city, our dedicated
            team is here to support you every step of the way.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <a
            href="tel:+442071234567"
            className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center hover-scale transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-500)]"
            aria-label="Call Us"
          >
            <Phone className="w-8 h-8 text-[var(--color-electric-500)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Call Us
            </h3>
            <p className="text-gray-600">+91 9870468034</p>
            <p className="text-gray-600">+1 3153410000</p>
            <p className="text-gray-600">+44 2079933000</p>
          </a>

          <a
            href="mailto:info@gouninest.com"
            className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center hover-scale transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
            aria-label="Email Us"
          >
            <Mail className="w-8 h-8 text-lime-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Email Us
            </h3>
            <p className="text-gray-600">info@gouninest.com</p>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=First+Floor+85+Great+Portland+Street+London+W1W+7LT+United+Kingdom"
            target="_blank"
            rel="noopener noreferrer"
            className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center hover-scale transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-coral-500)]"
            aria-label="Visit Us"
          >
            <MapPin className="w-8 h-8 text-[var(--color-coral-500)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Visit Us
            </h3>
            <p className="text-gray-600">
              First Floor 85 Great Portland Street London W1W 7LT United Kingdom
            </p>
          </a>

          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center hover-scale">
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

export default ContactsHero;
