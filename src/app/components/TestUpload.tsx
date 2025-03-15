'use client';

import { useState } from 'react';
import { storage, db } from '@/lib/firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

export default function TestUpload() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setResult('Please select an image first');
      return;
    }

    try {
      setLoading(true);
      
      // 1. Upload image to Firebase Storage
      const storageRef = ref(storage, `cars/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      // 2. Add car data to Firestore
      const carData = {
        make: 'Test Make',
        model: 'Test Model',
        year: 2024,
        imageUrl,
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'cars'), carData);
      setResult(`Success! Car added with ID: ${docRef.id}`);
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-50 bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto my-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Test Car Upload</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Car Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full border rounded p-2 cursor-pointer"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? 'Uploading...' : 'Upload Test Car'}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          {result}
        </div>
      )}
    </div>
  );
} 