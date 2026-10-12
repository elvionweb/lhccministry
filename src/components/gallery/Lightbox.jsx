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

  const navBtn =
    'flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 active:scale-90 md:h-14 md:w-14';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentImage.title || currentImage.category}
      className="fixed inset-0 z-[100] flex h-[100dvh] flex-col bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* ---------- Top bar: counter + close ---------- */}
      <div className="flex shrink-0 items-center justify-between px-4 pb-2 pt-4 sm:px-6 sm:pt-6">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tabular-nums text-white/90 backdrop-blur sm:text-sm">
          {currentIndex + 1} / {images.length}
        </span>

        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Close"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur transition-colors hover:bg-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <HiX className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>
      </div>

      {/* ---------- Image area ---------- */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-6 md:px-24">
        {/* Prev Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
          className={`${navBtn} absolute left-2 top-1/2 z-10 -translate-y-1/2 sm:left-4`}
        >
          <HiChevronLeft className="h-6 w-6 md:h-9 md:w-9" />
        </button>

        <img
          src={optimizedUrl}
          alt={currentImage.title || currentImage.category}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl"
        />

        {/* Next Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
          className={`${navBtn} absolute right-2 top-1/2 z-10 -translate-y-1/2 sm:right-4`}
        >
          <HiChevronRight className="h-6 w-6 md:h-9 md:w-9" />
        </button>
      </div>

      {/* ---------- Caption ---------- */}
      <div className="shrink-0 px-4 pb-5 pt-3 text-center sm:pb-6">
        <span className="mb-2 inline-block rounded-md bg-blue-700 px-2.5 py-1 text-xs font-bold text-white">
          {currentImage.category}
        </span>
        {currentImage.title && (
          <p className="mx-auto max-w-2xl text-sm font-medium text-white md:text-base">
            {currentImage.title}
          </p>
        )}
      </div>
    </div>
  );
};

export default Lightbox;