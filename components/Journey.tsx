"use client"
import { Card } from '@/components/ui/card';
import { Users, Building, Award, Globe } from 'lucide-react';
import Image from 'next/image';
import { forwardRef } from 'react';

const Journey = forwardRef<HTMLElement>((props, ref) => {
  const milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Founded with the mission to simplify accommodation search for international students.',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      stats: '500+ Students Helped'
    },
    {
      year: '2021',
      title: 'Rapid Growth',
      description: 'Expanded to 5 major UK cities and partnered with 50+ universities.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop',
      stats: '5,000+ Properties Listed'
    },
    {
      year: '2022',
      title: 'Innovation Focus',
      description: 'Introduced virtual tours and instant booking features, setting a new industry standard.',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
      stats: '15,000+ Bookings'
    },
    {
      year: '2023',
      title: 'National Presence',
      description: 'Established a nationwide presence across the UK with unparalleled student satisfaction.',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
      stats: '25,000+ Happy Students'
    }
  ];

  const achievements = [
    {
      icon: Users,
      number: "25K+",
      label: "Students Served",
      color: "text-[var(--color-electric-600)]",
    },
    {
      icon: Building,
      number: "4300+",
      label: "Partner Properties",
      color: "text-[var(--color-coral-600)]",
    },
    {
      icon: Award,
      number: "50+",
      label: "University Partners",
      color: "text-[var(--color-lime-600)]",
    },
    {
      icon: Globe,
      number: "260+",
      label: "Cities Covered",
      color: "text-[var(--color-electric-600)]",
    },
  ];

  return (
    <section ref={ref}className="py-20 bg-gradient-to-br from-[var(--color-electric-50)] to-lime-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our
            <span className="text-gradient"> Journey</span>
          </h2>
          <p>From Startup to Global Presence</p>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            From a humble beginning to becoming a leading student accommodation platform—here&apos;s how we&apos;ve grown:
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[var(--color-electric-500)] to-lime-500 hidden md:block"></div>

          {milestones.map((milestone, index) => (
            <div 
              key={index}
              className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[var(--color-electric-500)] rounded-full border-4 border-white shadow-lg hidden md:block z-10"></div>

              {/* Content Card */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                <Card className="p-6 border border-gray-300 hover:shadow-xl transition-all duration-300 animate-fade-in">
                  <div className="text-electric-600 font-bold text-2xl mb-2">{milestone.year}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                  <p className="text-gray-600 mb-4">{milestone.description}</p>
                  <div className="text-lime-600 font-semibold">{milestone.stats}</div>
                </Card>
              </div>

              {/* Image */}
              <div className={`w-full md:w-5/12 mt-6 md:mt-0 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                <Image 
                  src={milestone.image} 
                  alt={milestone.title}
                  height={120}
                  width={380}
                  className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 flex justify-center">
                <achievement.icon className={`w-12 h-12 ${achievement.color}`} />
              </div>
              <div className={`text-3xl md:text-4xl font-bold ${achievement.color} mb-2`}>
                {achievement.number}
              </div>
              <div className="text-gray-600 font-medium">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Journey.displayName = 'Journey';
export default Journey;
