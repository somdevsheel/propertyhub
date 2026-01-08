// src/app/api/properties/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import { verifyToken } from '@/lib/auth';

// GET - Fetch all properties (with filters)
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const propertyType = searchParams.get('propertyType');
    const minArea = searchParams.get('minArea');
    const maxArea = searchParams.get('maxArea');
    const bedrooms = searchParams.get('bedrooms');
    const floors = searchParams.get('floors');
    const status = searchParams.get('status') || 'Available';
    const featured = searchParams.get('featured');
    
    // Build query
    const query = { status };
    
    if (city) query.city = new RegExp(city, 'i');
    if (propertyType) query.propertyType = propertyType;
    if (bedrooms) query.bedrooms = parseInt(bedrooms);
    if (floors) query.floors = parseInt(floors);
    if (featured) query.featured = featured === 'true';
    
    if (minArea || maxArea) {
      query.totalArea = {};
      if (minArea) query.totalArea.$gte = parseInt(minArea);
      if (maxArea) query.totalArea.$lte = parseInt(maxArea);
    }
    
    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error('GET /api/properties error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

// POST - Create new property (Admin only)
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
    
    await connectDB();
    
    const body = await request.json();
    const property = await Property.create(body);
    
    return NextResponse.json({
      success: true,
      data: property,
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/properties error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create property' },
      { status: 500 }
    );
  }
}