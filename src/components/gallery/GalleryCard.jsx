import React from 'react';

const GalleryCard = ({ image, onClick }) => {
  // Construct optimized cloudinary URL
  const optimizedUrl = image.imageUrl.replace('/upload/', '/upload/q_auto,f_auto/');

  return (
    <div 
      className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md bg-gray-100 aspect-square"
      onClick={() => onClick(image)}
    >
      <img
        src={optimizedUrl}
        alt={image.title || image.category}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <span className="text-xs font-bold text-white bg-blue-700 px-2 py-1 rounded-md w-max mb-2">
          {image.category}
        </span>
        {image.title && (
          <h3 className="text-white font-bold text-sm md:text-base line-clamp-2">
            {image.title}
          </h3>
        )}
      </div>
    </div>
  );
};

export default GalleryCard;
