import Link from "next/link";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedVehicles from './components/FeaturedVehicles';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm1-8h4v2h-6V7h2v5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Service & Support</h3>
              <p className="text-gray-400">Professional assistance available during business hours to help with your automotive needs.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.995 6.9a.998.998 0 00-.548-.795l-8-4a1 1 0 00-.895 0l-8 4a1.002 1.002 0 00-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 00.812 0c9.55-4.247 8.6-14.907 8.589-15.014zM12 20.897C4.173 17.148 4.951 8.89 5.074 7.026L12 3.545l6.926 3.48c.123 1.865.901 10.122-6.926 13.872z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quality Guarantee</h3>
              <p className="text-gray-400">Every vehicle undergoes rigorous inspection and certification process.</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM9 9h6v2H9V9zm0 4h6v2H9v-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy Financing</h3>
              <p className="text-gray-400">Flexible financing options tailored to your needs and budget.</p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedVehicles />

      <section className="py-20 bg-[url('/showroom.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Experience Luxury</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Visit our state-of-the-art showroom and discover our curated collection of premium vehicles. 
            Our expert team is ready to help you find your perfect match.
          </p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
            Schedule a Visit
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
