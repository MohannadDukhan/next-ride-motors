'use client';

import Image from 'next/image';
import Link from 'next/link';

const vehicles = [
  {
    id: 1,
    name: '2023 Mercedes-Benz AMG GT',
    price: 135900,
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42',
    specs: {
      mileage: '12,500 mi',
      transmission: 'Automatic',
      engine: '4.0L V8 Biturbo'
    }
  },
  {
    id: 2,
    name: '2023 BMW M4 Competition',
    price: 89900,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
    specs: {
      mileage: '8,900 mi',
      transmission: 'Automatic',
      engine: '3.0L I6 Twin-Turbo'
    }
  },
  {
    id: 3,
    name: '2023 Porsche 911 GT3',
    price: 169900,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e',
    specs: {
      mileage: '5,200 mi',
      transmission: 'PDK',
      engine: '4.0L Flat-6'
    }
  }
];

const FeaturedVehicles = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Featured Vehicles</h2>
          <p className="mt-4 text-xl text-gray-400">
            Discover our hand-picked selection of premium vehicles
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              <div className="relative h-48">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">{vehicle.name}</h3>
                <p className="mt-2 text-2xl font-bold text-red-500">
                  ${vehicle.price.toLocaleString()}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-400">
                  <div>
                    <p className="font-semibold">Mileage</p>
                    <p>{vehicle.specs.mileage}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Transmission</p>
                    <p>{vehicle.specs.transmission}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Engine</p>
                    <p>{vehicle.specs.engine}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/inventory"
            className="inline-block bg-transparent border-2 border-red-600 text-red-600 px-8 py-3 rounded-full hover:bg-red-600 hover:text-white transition-colors"
          >
            View All Inventory
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles; 