import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../utils/api';
import CategoryFilter from '../components/gallery/CategoryFilter';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Lightbox from '../components/gallery/Lightbox';

const CATEGORIES = ['All', 'Sunday Service', 'Youth Event', 'Worship Night', 'Outreach', 'Weddings', 'Women Programe', 'Other'];
const ITEMS_PER_PAGE = 20;

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Pagination
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Lightbox
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    loadImages();
  }, [activeCategory]);

  const loadImages = async () => {
    try {
      setLoading(true);
      // fetchGallery expects category, where 'All' should be passed as 'All' or omitted. API handles it.
      const data = await fetchGallery(activeCategory);
      setImages(data || []);
      setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on category change
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };

  const handleImageClick = (image) => {
    const index = images.findIndex((img) => img._id === image._id);
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => setLightboxIndex(null);
  
  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };
  
  const handlePrev = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-950">
      {/* ---------- Hero header ---------- */}
      <header className="relative isolate overflow-hidden bg-gradient-to-br from-blue-700 via-blue-900 to-gray-950 px-4 pb-14 pt-28 text-center sm:pb-20 sm:pt-32">
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-10 -z-10 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300 sm:text-sm">
          Moments &amp; Memories
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Our Gallery
        </h1>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-300" />
        <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-6 text-blue-100 sm:text-base md:text-lg">
          Experience the joy, worship, and community at Liberty House Christian Center.
        </p>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        {/* Filter */}
        <div className="relative z-10 -mt-7 sm:-mt-9">
          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/15 border-t-amber-300" />
            <p className="text-sm font-medium text-white/70">Loading photos…</p>
          </div>
        ) : (
          <>
            {images.length > 0 && (
              <p className="mb-5 px-1 text-sm font-medium text-white/60">
                {images.length} {images.length === 1 ? 'photo' : 'photos'}
                {activeCategory !== 'All' && ` in ${activeCategory}`}
              </p>
            )}

            <GalleryGrid 
              images={visibleImages} 
              onImageClick={handleImageClick} 
            />

            {/* Load More */}
            {hasMore && (
              <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
                <p className="text-xs font-medium text-white/60">
                  Showing {visibleImages.length} of {images.length}
                </p>
                <button
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                  className="w-full max-w-xs rounded-full bg-white px-8 py-3 font-bold text-blue-700 shadow-lg transition-all duration-300 hover:bg-amber-300 hover:text-gray-900 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 active:scale-95 sm:w-auto"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};

export default GalleryPage;