// src/app/properties/page.js
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';

export const metadata = {
  title: 'Properties - PropertyHub',
  description: 'Browse all available properties',
};

async function getProperties(searchParams) {
  try {
    const params = new URLSearchParams();
    
    const filters = await searchParams;
    
    if (filters.city) params.set('city', filters.city);
    if (filters.propertyType) params.set('propertyType', filters.propertyType);
    if (filters.minArea) params.set('minArea', filters.minArea);
    if (filters.maxArea) params.set('maxArea', filters.maxArea);
    if (filters.bedrooms) params.set('bedrooms', filters.bedrooms);
    if (filters.floors) params.set('floors', filters.floors);
    
    params.set('status', 'Available');
    
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/properties?${params.toString()}`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    return [];
  }
}

export default async function PropertiesPage({ searchParams }) {
  const properties = await getProperties(searchParams);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Browse Properties</h1>
        
        <PropertyFilters />
        
        {properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Properties Found
            </h2>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters or check back later for new listings.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-gray-600">
              Found {properties.length} {properties.length === 1 ? 'property' : 'properties'}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}