'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/lib/hooks/useAuth';
import { db, storage } from '@/lib/firebase/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  features: string[];
  images: string[];
  transmission: string;
  fuelType: string;
  bodyStyle: string;
  exteriorColor: string;
  interiorColor: string;
  vin: string;
}

export default function AdminInventoryManager() {
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  const initialCarState = {
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    description: '',
    features: [],
    images: [],
    transmission: '',
    fuelType: '',
    bodyStyle: '',
    exteriorColor: '',
    interiorColor: '',
    vin: ''
  };

  const [carData, setCarData] = useState(initialCarState);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageUpload = async (files: FileList) => {
    const newFiles = Array.from(files);
    setImageFiles(prev => [...prev, ...newFiles]);
  };

  const uploadImages = async (carId: string) => {
    const uploadedUrls = [];
    
    for (const file of imageFiles) {
      const imageRef = ref(storage, `cars/${carId}/${file.name}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      uploadedUrls.push(url);
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedCar) {
        // Update existing car
        const carRef = doc(db, 'cars', selectedCar.id);
        const imageUrls = await uploadImages(selectedCar.id);
        await updateDoc(carRef, {
          ...carData,
          images: [...selectedCar.images, ...imageUrls],
          updatedAt: new Date()
        });
      } else {
        // Add new car
        const docRef = await addDoc(collection(db, 'cars'), {
          ...carData,
          createdAt: new Date()
        });
        const imageUrls = await uploadImages(docRef.id);
        await updateDoc(docRef, { images: imageUrls });
      }

      setIsAddingCar(false);
      setSelectedCar(null);
      setCarData(initialCarState);
      setImageFiles([]);
    } catch (error) {
      console.error('Error saving car:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return;

    try {
      // Delete car document
      await deleteDoc(doc(db, 'cars', carId));
      
      // Delete associated images
      const carImages = cars.find(car => car.id === carId)?.images || [];
      for (const imageUrl of carImages) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }

      setCars(cars.filter(car => car.id !== carId));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Inventory Management</h2>
        <button
          onClick={() => setIsAddingCar(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Add New Car
        </button>
      </div>

      {(isAddingCar || selectedCar) && (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Make</label>
              <input
                type="text"
                value={carData.make}
                onChange={(e) => setCarData({ ...carData, make: e.target.value })}
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <input
                type="text"
                value={carData.model}
                onChange={(e) => setCarData({ ...carData, model: e.target.value })}
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <input
                type="number"
                value={carData.year}
                onChange={(e) => setCarData({ ...carData, year: parseInt(e.target.value) })}
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                value={carData.price}
                onChange={(e) => setCarData({ ...carData, price: parseInt(e.target.value) })}
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mileage</label>
              <input
                type="number"
                value={carData.mileage}
                onChange={(e) => setCarData({ ...carData, mileage: parseInt(e.target.value) })}
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">VIN</label>
              <input
                type="text"
                value={carData.vin}
                onChange={(e) => setCarData({ ...carData, vin: e.target.value })}
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Transmission</label>
              <select
                value={carData.transmission}
                onChange={(e) => setCarData({ ...carData, transmission: e.target.value })}
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                required
              >
                <option value="">Select Transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="DCT">DCT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fuel Type</label>
              <select
                value={carData.fuelType}
                onChange={(e) => setCarData({ ...carData, fuelType: e.target.value })}
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                required
              >
                <option value="">Select Fuel Type</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Body Style</label>
              <select
                value={carData.bodyStyle}
                onChange={(e) => setCarData({ ...carData, bodyStyle: e.target.value })}
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                required
              >
                <option value="">Select Body Style</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Wagon">Wagon</option>
                <option value="Truck">Truck</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Exterior Color</label>
              <input
                type="text"
                value={carData.exteriorColor}
                onChange={(e) => setCarData({ ...carData, exteriorColor: e.target.value })}
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Interior Color</label>
              <input
                type="text"
                value={carData.interiorColor}
                onChange={(e) => setCarData({ ...carData, interiorColor: e.target.value })}
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={carData.description}
              onChange={(e) => setCarData({ ...carData, description: e.target.value })}
              className="w-full bg-gray-700 rounded-md px-4 py-2 h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Features (comma-separated)</label>
            <input
              type="text"
              value={carData.features.join(', ')}
              onChange={(e) => setCarData({ ...carData, features: e.target.value.split(',').map(f => f.trim()) })}
              className="w-full bg-gray-700 rounded-md px-4 py-2"
              placeholder="Leather seats, Navigation, Sunroof"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
              className="w-full bg-gray-700 rounded-md px-4 py-2"
            />
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative aspect-video">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setIsAddingCar(false);
                setSelectedCar(null);
                setCarData(initialCarState);
                setImageFiles([]);
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : selectedCar ? 'Update Car' : 'Add Car'}
            </button>
          </div>
        </form>
      )}

      {/* Car list will be implemented here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-gray-800 rounded-lg overflow-hidden">
            {car.images[0] && (
              <div className="relative aspect-video">
                <Image
                  src={car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{car.year} {car.make} {car.model}</h3>
              <p className="text-gray-400">${car.price.toLocaleString()}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setSelectedCar(car);
                    setCarData(car);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(car.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 