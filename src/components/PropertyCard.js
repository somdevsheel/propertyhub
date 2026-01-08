'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PropertyCard({ property }) {
  if (!property) return null;

  const {
    _id,
    name,
    city,
    area,
    totalArea,
    bedrooms,
    bathrooms,
    price,
    images,
    propertyType,
  } = property;

  return (
    <Link href={`/properties/${_id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        
        {/* Image */}
        <div className="relative h-56 w-full bg-gray-200">
          {images && images.length > 0 && images[0]?.url ? (
            <Image
              src={images[0].url}
              alt={name || 'Property image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No Image Available
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {propertyType || 'Property'}
            </span>

            {price && (
              <span className="text-lg font-bold text-gray-900">
                ₹{Number(price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {name || 'Untitled Property'}
          </h3>

          <p className="text-sm text-gray-600 mb-3">
            {area || 'Area'}, {city || 'City'}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                🛏 {bedrooms ?? 0} Beds
              </span>
              <span className="flex items-center gap-1">
                🚿 {bathrooms ?? 0} Baths
              </span>
            </div>

            {totalArea && (
              <span className="font-medium">
                {totalArea} sq ft
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
