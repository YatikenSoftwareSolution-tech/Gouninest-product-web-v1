"use client"
import { useEffect, useState } from 'react';

const ScrollTransition = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Trigger splash when scrolling past 50% of hero section
      if (scrollPosition > heroHeight * 0.5 && scrollPosition < heroHeight * 1.2) {
        if (!showSplash) {
          setShowSplash(true);
          // Hide splash after animation
          setTimeout(() => setShowSplash(false), 2000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSplash]);

  return (
    <>
      {showSplash && (
        <div className="color-splash">
          <div className="color-orb color-orb-red"></div>
          <div className="color-orb color-orb-blue"></div>
          <div className="color-orb color-orb-yellow"></div>
          <div className="color-orb color-orb-green"></div>
        </div>
      )}
    </>
  );
};

export default ScrollTransition;
