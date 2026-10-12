import React from 'react';
import { HiZoomIn } from 'react-icons/hi';

const GalleryCard = ({ image, onClick }) => {
  // Construct optimized cloudinary URL
  const optimizedUrl = image.imageUrl.replace('/upload/', '/upload/q_auto,f_auto/');

  return (
    <div 
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl bg-gray-800 shadow-md ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:rounded-2xl"
      onClick={() => onClick(image)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(image);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${image.title || image.category} photo`}
    >
      {/* Image always fills the square, whatever its own dimensions */}
      <img
        src={optimizedUrl}
        alt={image.title || image.category}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Overlay: shown on hover/focus, and always on touch devices */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/25 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4 [@media(hover:none)]:opacity-100">
        <span className="mb-1.5 w-max max-w-full truncate rounded-md bg-blue-700 px-2 py-1 text-[10px] font-bold text-white sm:mb-2 sm:text-xs">
          {image.category}
        </span>
        {image.title && (
          <h3 className="line-clamp-2 text-xs font-bold leading-snug text-white sm:text-sm md:text-base">
            {image.title}
          </h3>
        )}
      </div>

      {/* Zoom badge */}
      <span
        aria-hidden="true"
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-blue-700 opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:opacity-100 sm:right-3 sm:top-3 sm:h-9 sm:w-9"
      >
        <HiZoomIn className="h-5 w-5" />
      </span>
    </div>
  );
};

export default GalleryCard;