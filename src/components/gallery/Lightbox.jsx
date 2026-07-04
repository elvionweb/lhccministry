import React, { useEffect } from 'react';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent scrolling behind
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // restore
    };
  }, [onClose, onNext, onPrev]);

  if (!images[currentIndex]) return null;

  const currentImage = images[currentIndex];
  // Reapply optimization for full view if needed, but original or slight optimize is fine
  const optimizedUrl = currentImage.imageUrl.replace('/upload/', '/upload/q_auto,f_auto/');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
      >
        <HiX className="w-8 h-8" />
      </button>

      {/* Prev Button */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 z-50 hidden md:block"
      >
        <HiChevronLeft className="w-12 h-12" />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 z-50 hidden md:block"
      >
        <HiChevronRight className="w-12 h-12" />
      </button>

      {/* Image container */}
      <div className="relative w-full max-w-5xl px-4 md:px-16 flex flex-col items-center justify-center h-full">
        <img
          src={optimizedUrl}
          alt={currentImage.title || currentImage.category}
          className="max-h-[85vh] max-w-full object-contain select-none"
        />
        
        {/* Caption */}
        <div className="absolute bottom-6 left-0 w-full text-center px-4">
          <span className="inline-block bg-blue-700 text-white text-xs px-2 py-1 rounded-md font-bold mb-2">
            {currentImage.category}
          </span>
          {currentImage.title && (
            <p className="text-white text-sm md:text-base font-medium">
              {currentImage.title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
