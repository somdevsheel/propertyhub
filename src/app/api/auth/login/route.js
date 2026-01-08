// // src/app/api/auth/login/route.js
// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb';
// import Admin from '@/models/Admin';
// import { generateToken, setAuthCookie } from '@/lib/auth';

// export async function POST(request) {
//   try {
//     await connectDB();
    
//     const { username, password } = await request.json();
    
//     if (!username || !password) {
//       return NextResponse.json(
//         { success: false, error: 'Username and password are required' },
//         { status: 400 }
//       );
//     }
    
//     // Find admin with password field
//     const admin = await Admin.findOne({ username }).select('+password');
    
//     if (!admin || !admin.isActive) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }
    
//     // Compare password
//     const isMatch = await admin.comparePassword(password);
    
//     if (!isMatch) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }
    
//     // Update last login
//     admin.lastLogin = new Date();
//     await admin.save();
    
//     // Generate token
//     const token = generateToken({
//       id: admin._id,
//       username: admin.username,
//       role: admin.role,
//     });
    
//     // Create response with cookie
//     const response = NextResponse.json({
//       success: true,
//       message: 'Login successful',
//       data: {
//         id: admin._id,
//         username: admin.username,
//         email: admin.email,
//         role: admin.role,
//       },
//       token,
//     });
    
//     // Set cookie
//     const cookieOptions = setAuthCookie(token);
//     response.cookies.set(cookieOptions);
    
//     return response;
//   } catch (error) {
//     console.error('POST /api/auth/login error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Login failed' },
//       { status: 500 }
//     );
//   }
// }


// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { generateToken, setAuthCookie } from '@/lib/auth';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    await connectDB();
    
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // Find admin with password field
    const admin = await Admin.findOne({ username }).select('+password');
    
    if (!admin || !admin.isActive) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Compare password
    const isMatch = await admin.comparePassword(password);
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    
    // Generate token
    const token = generateToken({
      id: admin._id,
      username: admin.username,
      role: admin.role,
    });
    
    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
    
    // Set cookie
    const cookieOptions = setAuthCookie(token);
    response.cookies.set(cookieOptions);
    
    return response;
  } catch (error) {
    console.error('POST /api/auth/login error:', error);
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}