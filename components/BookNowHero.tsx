"use client"
import { Calendar, Home, Key, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  shape: 'circle' | 'square' | 'triangle' | 'pentagon';
}

const BookNowHero = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  
    useEffect(() => {
      const colors = ['#ef4444', '#3b82f6', '#fbbf24', '#10b981', '#8b5cf6', '#f97316'];
      const shapes: ('circle' | 'square' | 'triangle' | 'pentagon')[] = ['circle', 'square', 'triangle', 'pentagon'];
      
      const initialBubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 60 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 5,
        speedY: (Math.random() - 0.5) * 5,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      }));
  
      setBubbles(initialBubbles);
  
      const animateBubbles = () => {
        setBubbles(prevBubbles => 
          prevBubbles.map(bubble => {
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
              newY = Math.max(0, Math.min(newY, window.innerHeight - bubble.size));
            }
  
            return {
              ...bubble,
              x: newX,
              y: newY,
              speedX: newSpeedX,
              speedY: newSpeedY
            };
          })
        );
      };
  
      const interval = setInterval(animateBubbles, 16);
      return () => clearInterval(interval);
    }, []);
  
    const getShapeStyle = (bubble: Bubble) => {
      const baseStyle = {
        position: 'absolute' as const,
        left: bubble.x,
        top: bubble.y,
        width: bubble.size,
        height: bubble.size,
        backgroundColor: bubble.color,
        opacity: 0.7,
        transition: 'all 0.016s linear'
      };
  
      switch (bubble.shape) {
        case 'circle':
          return { ...baseStyle, borderRadius: '50%' };
        case 'square':
          return { ...baseStyle, borderRadius: '0' };
        case 'triangle':
          return {
            ...baseStyle,
            backgroundColor: 'transparent',
            width: 0,
            height: 0,
            borderLeft: `${bubble.size / 2}px solid transparent`,
            borderRight: `${bubble.size / 2}px solid transparent`,
            borderBottom: `${bubble.size}px solid ${bubble.color}`
          };
        case 'pentagon':
          return { ...baseStyle, borderRadius: '20%', transform: 'rotate(45deg)' };
        default:
          return { ...baseStyle, borderRadius: '50%' };
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
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Book Your
            <span className="text-gradient bg-gradient-to-r from-lime-500 to-[var(--color-coral-500)] bg-clip-text text-transparent">
              {" "}
              Perfect Nest
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Secure your ideal student accommodation in just a few easy steps.
            Your perfect home away from home awaits.
          </p>
        </div>

        {/* Process Steps */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center hover-scale">
            <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">1</span>
            </div>
            <Home className="w-8 h-8 text-lime-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Choose Property
            </h3>
            <p className="text-gray-600 text-sm">
              Select from our verified properties
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center hover-scale">
            <div className="w-12 h-12 bg-[var(--color-coral-500)] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <Calendar className="w-8 h-8 text-[var(--color-coral-500)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Select Dates
            </h3>
            <p className="text-gray-600 text-sm">Pick your move-in dates</p>
          </div>

          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center hover-scale">
            <div className="w-12 h-12 bg-[var(--color-electric-500)] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">3</span>
            </div>
            <Shield className="w-8 h-8 text-[var(--color-electric-600)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure Payment
            </h3>
            <p className="text-gray-600 text-sm">Complete secure booking</p>
          </div>

          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center hover-scale">
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">4</span>
            </div>
            <Key className="w-8 h-8 text-amber-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Get Keys
            </h3>
            <p className="text-gray-600 text-sm">
              Move in and enjoy your new home
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookNowHero;