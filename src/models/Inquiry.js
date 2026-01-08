// // src/models/Inquiry.js
// import mongoose from 'mongoose';

// const InquirySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     trim: true,
//     lowercase: true,
//     match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
//   },
//   phone: {
//     type: String,
//     required: [true, 'Phone number is required'],
//     trim: true,
//   },
//   message: {
//     type: String,
//     required: [true, 'Message is required'],
//     trim: true,
//   },
//   propertyId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Property',
//     default: null,
//   },
//   propertyName: {
//     type: String,
//     default: null,
//   },
//   status: {
//     type: String,
//     enum: ['New', 'Read', 'Contacted', 'Closed'],
//     default: 'New',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// }, {
//   timestamps: true,
// });

// // Index for faster queries
// InquirySchema.index({ status: 1, createdAt: -1 });
// InquirySchema.index({ propertyId: 1 });

// // Export with proper check for existing model
// const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);

// export default Inquiry;

// src/models/Inquiry.js
import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    default: null,
  },
  propertyName: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Contacted', 'Closed'],
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for faster queries
InquirySchema.index({ status: 1, createdAt: -1 });
InquirySchema.index({ propertyId: 1 });

// Export with proper check for existing model
const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);

export default Inquiry;