"use client"
import { Search, Home, Key, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Search & Discover',
      description: 'Browse through thousands of verified student accommodations across the UK. Use our advanced filters to find exactly what you need.',
      color: 'bg-[var(--color-electric-500)]'
    },
    {
      icon: Home,
      title: 'Virtual Tours',
      description: 'Take virtual tours of properties, view detailed photos, and get all the information you need to make an informed decision.',
      color: 'bg-[var(--color-coral-500)]'
    },
    {
      icon: Key,
      title: 'Book Instantly',
      description: 'Secure your accommodation with our instant booking system. No more waiting weeks for responses from landlords.',
      color: 'bg-[var(--color-lime-500)]'
    },
    {
      icon: Heart,
      title: 'Move In & Enjoy',
      description: 'Move into your new home with confidence. Our support team is always here to help with any questions or concerns.',
      color: 'bg-[var(--color-electric-600)]'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 ">
            How
            <span className="text-gradient"> It Works</span>
          </h2>
          <p>From Search to Settlement, A Seamless Process</p>
          <p className="text-xl text-gray-600 max-w-3xl mt-6 mx-auto">
            Finding your ideal student accommodation has never been this easy. Follow these four simple steps to secure your future home.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="p-6 text-center border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to find your perfect accommodation?
          </h3>
          <Link href='/properties'>
          <button className="bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 hover:from-[var(--color-electric-600)] hover:to-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
            Start Your Search
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
