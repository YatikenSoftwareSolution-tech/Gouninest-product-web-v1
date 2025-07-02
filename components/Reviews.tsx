"use client"
import { Star, MessageCircle, Users, Award } from 'lucide-react';
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


const ReviewsHero = () => {
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
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 ">
            Student
            <span className="text-gradient bg-gradient-to-r from-[var(--color-coral-500)] to-[var(--color-electric-500)] bg-clip-text text-transparent">
              {" "}
              Reviews
            </span>
          </h1>
          <p className="mb-6 max-w-4xl mx-auto">
            Real voices. Real experiences. Discover what students from around the world have to say about booking with GoUninest.
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform is built on trust and satisfaction. With thousands of verified reviews, we continue to deliver reliable housing solutions for students across the UK, Australia, and the US.
          </p>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-scale-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center hover-scale">
            <Star className="w-8 h-8 text-amber-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">4.8</div>
            <div className="text-gray-600">Average Rating</div>
          </div>

          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center hover-scale">
            <MessageCircle className="w-8 h-8 text-[var(--color-electric-500)] mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">2.5K+</div>
            <div className="text-gray-600">Total Reviews</div>
          </div>

          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center hover-scale">
            <Users className="w-8 h-8 text-[var(--color-coral-500)] mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>

          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl p-6 text-center hover-scale">
            <Award className="w-8 h-8 text-lime-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">12</div>
            <div className="text-gray-600">Awards Won</div>
          </div>
        </div>
      </div>
    </section>
  );  
};

export default ReviewsHero;