// // src/app/api/auth/verify/route.js
// import { NextResponse } from 'next/server';
// import { verifyAdmin } from '@/lib/auth';

// export async function GET() {
//   try {
//     const admin = await verifyAdmin();
    
//     if (!admin) {
//       return NextResponse.json(
//         { success: false, error: 'Not authenticated' },
//         { status: 401 }
//       );
//     }
    
//     return NextResponse.json({
//       success: true,
//       data: admin,
//     });
//   } catch (error) {
//     console.error('GET /api/auth/verify error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Verification failed' },
//       { status: 500 }
//     );
//   }
// }



// src/app/api/auth/verify/route.js
import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const admin = await verifyAdmin();
    
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error('GET /api/auth/verify error:', error);
    return NextResponse.json(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}