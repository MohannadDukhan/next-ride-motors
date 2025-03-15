'use client';

import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase/firebase';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import Link from 'next/link';
import Image from 'next/image';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  imageUrl: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'cars'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Car[];
      setCars(carList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (car: Car) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      // Delete image from Storage
      const imageRef = ref(storage, car.imageUrl);
      await deleteObject(imageRef);

      // Delete document from Firestore
      await deleteDoc(doc(db, 'cars', car.id));
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Error deleting car. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Car Listings</h1>
        <Link 
          href="/admin/cars/new" 
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Add New Car
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-20 w-32 relative">
                    <Image
                      src={car.imageUrl}
                      alt={`${car.make} ${car.model}`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{car.make}</td>
                <td className="px-6 py-4 whitespace-nowrap">{car.model}</td>
                <td className="px-6 py-4 whitespace-nowrap">{car.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/cars/${car.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(car)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {cars.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No cars found. Add your first car listing!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 