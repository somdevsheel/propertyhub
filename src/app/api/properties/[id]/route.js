// src/app/api/properties/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import { verifyToken } from '@/lib/auth';
import { deleteImages } from '@/lib/cloudinary';

// GET - Fetch single property
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    // Await params in Next.js 15
    const { id } = await params;
    
    const property = await Property.findById(id).lean();
    
    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error('GET /api/properties/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}

// PUT - Update property (Admin only)
export async function PUT(request, { params }) {
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
    
    await connectDB();
    
    // Await params in Next.js 15
    const { id } = await params;
    
    const body = await request.json();
    const property = await Property.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error('PUT /api/properties/[id] error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update property' },
      { status: 500 }
    );
  }
}

// DELETE - Delete property (Admin only)
export async function DELETE(request, { params }) {
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
    
    await connectDB();
    
    // Await params in Next.js 15
    const { id } = await params;
    
    const property = await Property.findById(id);
    
    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      );
    }
    
    // Delete images from Cloudinary
    if (property.images && property.images.length > 0) {
      const publicIds = property.images.map(img => img.publicId).filter(Boolean);
      if (publicIds.length > 0) {
        await deleteImages(publicIds);
      }
    }
    
    await Property.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error) {
    console.error('DELETE /api/properties/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete property' },
      { status: 500 }
    );
  }
}