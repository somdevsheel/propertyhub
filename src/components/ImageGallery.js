// src/components/ImageGallery.js
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-lg">No Images Available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage].url}
          alt={`Property image ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-24 rounded-lg overflow-hidden ${
                selectedImage === index
                  ? 'ring-2 ring-blue-600'
                  : 'ring-1 ring-gray-300 hover:ring-2 hover:ring-blue-400'
              }`}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="text-center text-sm text-gray-600">
        Image {selectedImage + 1} of {images.length}
      </div>
    </div>
  );
}