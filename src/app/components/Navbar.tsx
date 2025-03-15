'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <div className="relative w-[200px] h-[40px] flex items-center">
                <span className="text-2xl font-bold text-white">Next Ride</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link 
                href="/" 
                className={`${pathname === '/' ? 'text-red-500' : 'text-white'} hover:text-red-500 transition-colors`}
              >
                Home
              </Link>
              <Link 
                href="/inventory" 
                className={`${pathname === '/inventory' ? 'text-red-500' : 'text-white'} hover:text-red-500 transition-colors`}
              >
                Inventory
              </Link>
              <Link 
                href="/about" 
                className={`${pathname === '/about' ? 'text-red-500' : 'text-white'} hover:text-red-500 transition-colors`}
              >
                About
              </Link>
              <Link 
                href="/services" 
                className={`${pathname === '/services' ? 'text-red-500' : 'text-white'} hover:text-red-500 transition-colors`}
              >
                Services
              </Link>
              <Link 
                href="/contact" 
                className={`${pathname === '/contact' ? 'text-red-500' : 'text-white'} hover:text-red-500 transition-colors`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 