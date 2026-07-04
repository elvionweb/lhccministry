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
    <div className="min-h-screen bg-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-blue-700 mb-4 tracking-tight">
            Our Gallery
          </h1>
          <p className="text-gray-600 text-lg font-body">
            Experience the joy, worship, and community at Liberty House Christian Center.
          </p>
        </div>

        {/* Filter */}
        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
        />

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <>
            <GalleryGrid 
              images={visibleImages} 
              onImageClick={handleImageClick} 
            />

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                  className="bg-blue-50 text-blue-700 font-bold px-8 py-3 rounded-full hover:bg-blue-100 transition-colors shadow-sm"
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
