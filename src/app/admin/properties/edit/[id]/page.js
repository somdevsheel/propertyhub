// src/app/admin/properties/edit/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PropertyForm from '@/components/PropertyForm';

export default function EditPropertyPage({ params }) {
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchProperty();
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setProperty(data.data);
      } else {
        alert('Property not found');
        router.push('/admin/properties');
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      alert('Error loading property');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm mb-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin/properties" className="text-blue-600 hover:text-blue-700">
              ← Back to Properties
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <PropertyForm initialData={property} isEdit={true} />
        </div>
      </div>
    </div>
  );
}