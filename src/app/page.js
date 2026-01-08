// // src/app/page.js
// import Link from 'next/link';
// import PropertyCard from '@/components/PropertyCard';

// export const metadata = {
//   title: 'PropertyHub - Find Your Dream Property',
//   description: 'Browse premium property listings without ads. Clean, fast, and trustworthy.',
// };

// async function getFeaturedProperties() {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/properties?featured=true&status=Available`, {
//       cache: 'no-store',
//     });
    
//     if (!res.ok) return [];
    
//     const data = await res.json();
//     return data.data || [];
//   } catch (error) {
//     console.error('Failed to fetch featured properties:', error);
//     return [];
//   }
// }

// export default async function Home() {
//   const featuredProperties = await getFeaturedProperties();

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
//         <div className="container mx-auto px-4">
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">
//               Find Your Dream Property
//             </h1>
//             <p className="text-xl mb-8 text-blue-100">
//               Browse our curated collection of premium properties. No ads, no spam, just quality listings.
//             </p>
//             <div className="flex gap-4 justify-center">
//               <Link
//                 href="/properties"
//                 className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
//               >
//                 Browse Properties
//               </Link>
//               <Link
//                 href="/contact"
//                 className="bg-blue-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors border border-blue-500"
//               >
//                 Contact Us
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Search Section */}
//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-2xl font-bold mb-6 text-center">Quick Search</h2>
//             <form action="/properties" method="get" className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <select
//                   name="propertyType"
//                   className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Property Type</option>
//                   <option value="Apartment">Apartment</option>
//                   <option value="House">House</option>
//                   <option value="Villa">Villa</option>
//                   <option value="Plot">Plot</option>
//                   <option value="Commercial">Commercial</option>
//                 </select>
//                 <select
//                   name="bedrooms"
//                   className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Bedrooms</option>
//                   <option value="1">1</option>
//                   <option value="2">2</option>
//                   <option value="3">3</option>
//                   <option value="4">4</option>
//                   <option value="5">5+</option>
//                 </select>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
//               >
//                 Search Properties
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* Featured Properties */}
//       {featuredProperties.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
//               <p className="text-gray-600">Handpicked properties just for you</p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               {featuredProperties.slice(0, 6).map((property) => (
//                 <PropertyCard key={property._id} property={property} />
//               ))}
//             </div>
            
//             <div className="text-center">
//               <Link
//                 href="/properties"
//                 className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
//               >
//                 View All Properties
//               </Link>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Why Choose Us */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
//             <p className="text-gray-600">We prioritize your experience above everything</p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-md text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">No Ads, Ever</h3>
//               <p className="text-gray-600">Clean, distraction-free browsing experience</p>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-md text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
//               <p className="text-gray-600">Your information stays confidential</p>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-md text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Fast & Simple</h3>
//               <p className="text-gray-600">Quick loading, easy navigation</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


// src/app/page.js
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';

// Force dynamic rendering for API calls
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'PropertyHub - Find Your Dream Property',
  description: 'Browse premium property listings without ads. Clean, fast, and trustworthy.',
};

async function getFeaturedProperties() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/properties?featured=true&status=Available`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch featured properties:', error);
    return [];
  }
}

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Dream Property
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Browse our curated collection of premium properties. No ads, no spam, just quality listings.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/properties"
                className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
              >
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="bg-blue-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors border border-blue-500"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Quick Search</h2>
            <form action="/properties" method="get" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="propertyType"
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <select
                  name="bedrooms"
                  className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Bedrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Search Properties
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featuredProperties.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
              <p className="text-gray-600">Handpicked properties just for you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProperties.slice(0, 6).map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
            
            <div className="text-center">
              <Link
                href="/properties"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Properties
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600">We prioritize your experience above everything</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Ads, Ever</h3>
              <p className="text-gray-600">Clean, distraction-free browsing experience</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-600">Your information stays confidential</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Simple</h3>
              <p className="text-gray-600">Quick loading, easy navigation</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}