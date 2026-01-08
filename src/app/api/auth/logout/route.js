// src/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logout successful',
  });
  
  // Clear cookie
  const cookieOptions = clearAuthCookie();
  response.cookies.set(cookieOptions);
  
  return response;
}