// // src/app/admin/properties/page.js
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function AdminPropertiesPage() {
//   const router = useRouter();
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuth();
//     fetchProperties();
//   }, []);

//   const checkAuth = async () => {
//     const token = localStorage.getItem('admin_token');
//     if (!token) {
//       router.push('/admin/login');
//     }
//   };

//   const fetchProperties = async () => {
//     try {
//       const token = localStorage.getItem('admin_token');
//       const response = await fetch('/api/properties', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       if (data.success) {
//         setProperties(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching properties:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this property?')) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('admin_token');
//       const response = await fetch(`/api/properties/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       if (data.success) {
//         alert('Property deleted successfully');
//         fetchProperties();
//       } else {
//         alert('Failed to delete property');
//       }
//     } catch (error) {
//       console.error('Error deleting property:', error);
//       alert('Error deleting property');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-xl">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm mb-8">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-700">
//               ← Back to Dashboard
//             </Link>
//             <h1 className="text-2xl font-bold text-gray-900">Manage Properties</h1>
//             <div className="w-32"></div>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4">
//         {/* Add New Button */}
//         <div className="mb-6">
//           <Link
//             href="/admin/properties/new"
//             className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
//           >
//             + Add New Property
//           </Link>
//         </div>

//         {/* Properties List */}
//         {properties.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-12 text-center">
//             <p className="text-gray-600 mb-4">No properties found</p>
//             <Link
//               href="/admin/properties/new"
//               className="text-blue-600 hover:text-blue-700 font-medium"
//             >
//               Add your first property
//             </Link>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Property
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Location
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {properties.map((property) => (
//                   <tr key={property._id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         {property.images && property.images.length > 0 ? (
//                           <div className="relative h-12 w-12 flex-shrink-0 mr-4">
//                             <Image
//                               src={property.images[0].url}
//                               alt={property.name}
//                               fill
//                               className="rounded object-cover"
//                             />
//                           </div>
//                         ) : (
//                           <div className="h-12 w-12 bg-gray-200 rounded flex-shrink-0 mr-4"></div>
//                         )}
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">
//                             {property.name}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {property.bedrooms} bed • {property.bathrooms} bath • {property.totalArea} sq ft
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">{property.city}</div>
//                       <div className="text-sm text-gray-500">{property.area}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="text-sm text-gray-900">{property.propertyType}</span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="text-sm text-gray-900">
//                         {property.price ? `₹${property.price.toLocaleString('en-IN')}` : 'N/A'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           property.status === 'Available'
//                             ? 'bg-green-100 text-green-800'
//                             : 'bg-red-100 text-red-800'
//                         }`}
//                       >
//                         {property.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <Link
//                         href={`/properties/${property._id}`}
//                         target="_blank"
//                         className="text-blue-600 hover:text-blue-900 mr-4"
//                       >
//                         View
//                       </Link>
//                       <Link
//                         href={`/admin/properties/edit/${property._id}`}
//                         className="text-indigo-600 hover:text-indigo-900 mr-4"
//                       >
//                         Edit
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(property._id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// src/app/properties/page.js
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Properties - PropertyHub',
  description: 'Browse all available properties',
};

async function getProperties(searchParams) {
  try {
    const params = new URLSearchParams();
    
    if (searchParams.city) params.set('city', searchParams.city);
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