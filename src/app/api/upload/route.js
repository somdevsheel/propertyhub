// src/app/api/upload/route.js
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { uploadImage } from '@/lib/cloudinary'; // Named import

export async function POST(request) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const formData = await request.formData();
    const files = formData.getAll('images');
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      );
    }
    
    const uploadedImages = [];
    
    for (const file of files) {
      // Convert file to base64
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
      
      // Upload to Cloudinary
      const result = await uploadImage(base64, 'properties');
      uploadedImages.push(result);
    }
    
    return NextResponse.json({
      success: true,
      data: uploadedImages,
    });
  } catch (error) {
    console.error('POST /api/upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload images' },
      { status: 500 }
    );
  }
}