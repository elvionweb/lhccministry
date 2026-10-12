import React from 'react';
import GalleryCard from './GalleryCard';

const GalleryGrid = ({ images, onImageClick }) => {
  if (!images || images.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-white/25 bg-white/5 px-6 py-16 text-center sm:py-20">
        <p className="font-medium text-white/70">No images found for this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-6">
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