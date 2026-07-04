import React from 'react';
import GalleryCard from './GalleryCard';

const GalleryGrid = ({ images, onImageClick }) => {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 font-medium">No images found for this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {images.map((image) => (
        <GalleryCard
          key={image._id}
          image={image}
          onClick={onImageClick}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
