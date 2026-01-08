// src/models/Property.js
import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Property name is required'],
    trim: true,
  },
  propertyType: {
    type: String,
    required: [true, 'Property type is required'],
    enum: ['Apartment', 'House', 'Villa', 'Plot', 'Commercial', 'Other'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  area: {
    type: String,
    required: [true, 'Area is required'],
    trim: true,
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    trim: true,
  },
  totalArea: {
    type: Number,
    required: [true, 'Total area is required'],
  },
  bedrooms: {
    type: Number,
    required: [true, 'Number of bedrooms is required'],
    min: 0,
  },
  bathrooms: {
    type: Number,
    required: [true, 'Number of bathrooms is required'],
    min: 0,
  },
  floors: {
    type: Number,
    required: [true, 'Number of floors is required'],
    min: 0,
  },
  price: {
    type: Number,
    default: null,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  images: [{
    url: String,
    publicId: String, // For Cloudinary deletion
  }],
  status: {
    type: String,
    enum: ['Available', 'Sold'],
    default: 'Available',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for search optimization
PropertySchema.index({ city: 1, area: 1, status: 1 });
PropertySchema.index({ propertyType: 1, status: 1 });
PropertySchema.index({ featured: 1, status: 1 });

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);