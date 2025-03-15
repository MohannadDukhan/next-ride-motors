'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/hero-car.jpg"
          alt="Mercedes-AMG at sunset"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>
      
      <div 
        className="relative h-full flex items-center"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Experience Luxury & Performance
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-md">
            Discover our exclusive collection of premium vehicles
          </p>
          <Link 
            href="/inventory"
            className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors inline-block shadow-lg"
          >
            Explore Our Inventory
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero; 