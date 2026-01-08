// src/app/properties/[id]/page.js
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ContactForm from '@/components/ContactForm';

async function getProperty(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/properties/${id}`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) return null;
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch property:', error);
    return null;
  }
}

export default async function PropertyDetailPage({ params }) {
  const property = await getProperty(params.id);
  
  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {property.images && property.images.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  <div className="relative h-96 w-full">
                    <Image
                      src={property.images[0].url}
                      alt={property.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {property.images.length > 1 && (
                    <div className="grid grid-cols-3 gap-2 p-2">
                      {property.images.slice(1, 4).map((image, index) => (
                        <div key={index} className="relative h-32">
                          <Image
                            src={image.url}
                            alt={`${property.name} ${index + 2}`}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Images Available</span>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded">
                  {property.propertyType}
                </span>
                <span className={`text-sm font-medium px-3 py-1 rounded ${
                  property.status === 'Available'
                    ? 'text-green-600 bg-green-50'
                    : 'text-red-600 bg-red-50'
                }`}>
                  {property.status}
                </span>
              </div>

              <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{property.area}, {property.city}, {property.pincode}</span>
              </div>

              {property.price && (
                <div className="text-3xl font-bold text-blue-600 mb-6">
                  ₹{property.price.toLocaleString('en-IN')}
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{property.totalArea}</div>
                  <div className="text-sm text-gray-600">sq ft</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-900">{property.floors}</div>
                  <div className="text-sm text-gray-600">Floors</div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ContactForm
                propertyId={property._id}
                propertyName={property.name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}