"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  university: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    university: "King's College London",
    image:
      "/avatars/Avatar4.avif",
    rating: 5,
    text: "Go Uninest made finding the perfect accommodation so easy! The property was exactly as described, and the location was perfect for getting to university. The staff were incredibly helpful throughout the entire process.",
  },
  {
    id: 2,
    name: "Michael Chen",
    university: "University of Manchester",
    image:
      "/avatars/Avatar1.avif",
    rating: 5,
    text: "I was worried about finding good student housing, but Go Uninest exceeded all my expectations. The amenities are top-notch, and I've made so many friends in the community. Highly recommend!",
  },
  {
    id: 3,
    name: "Emma Thompson",
    university: "University of Birmingham",
    image:
      "/avatars/Avatar5.avif",
    rating: 5,
    text: "The booking process was seamless, and the property management team is always responsive. My studio apartment is modern, clean, and perfectly located. Couldn't be happier with my choice!",
  },
  {
    id: 4,
    name: "James Wilson",
    university: "Imperial College London",
    image:
      "/avatars/Avatar2.webp",
    rating: 5,
    text: "Great value for money and excellent facilities. The gym and study areas are fantastic, and the location is unbeatable. Go Uninest really understands what students need.",
  },
  {
    id: 5,
    name: "Priya Patel",
    university: "University of Edinburgh",
    image:
      "/avatars/Avatar3.avif",
    rating: 5,
    text: "Moving to a new city was stressful, but Go Uninest made the accommodation part worry-free. The virtual tours were accurate, and the move-in process was smooth. Five stars!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  // determine how many cards to show based on window width
  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      if (w >= 1700) setVisibleCount(5);     // large screens
      else if (w >= 768) setVisibleCount(3); // medium screens
      else setVisibleCount(1);               // small screens
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  // navigate by visibleCount
  const nextTestimonial = () =>
    setCurrentIndex((i) => (i + visibleCount) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentIndex((i) =>
      (i - visibleCount + testimonials.length) % testimonials.length
    );

  // slice out the testimonials to display, wrapping around
  const displayed = Array.from({ length: visibleCount }).map((_, idx) =>
    testimonials[(currentIndex + idx) % testimonials.length]
  );

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-[var(--color-electric-50)] to-lime-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What 
            <span className="text-gradient"> Students </span>
            Say
            <span className="text-gradient">  About Us </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
           Our platform is built on trust and satisfaction. With thousands of verified reviews, we continue to deliver reliable housing solutions for students across the UK, Australia, and the US.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev / Next buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-transform duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-transform duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Cards grid */}
          <div
            className={`flex justify-between gap-4 md:gap-6 lg:gap-8
            `}
          >
            {displayed.map((t) => (
              <Card
                key={t.id}
                className="p-6 border border-gray-300 rounded-2xl shadow-lg transition-transform duration-500 hover:shadow-xl"
              >
                <Quote className="w-8 h-8 text-[var(--color-electric-400)] mb-4" />
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  “{t.text}”
                </p>
                <div className="flex items-center mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
                <div className="flex items-center">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{t.name}</h4>
                    <p className="text-gray-600 text-sm">{t.university}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
