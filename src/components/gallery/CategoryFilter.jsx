import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onSelect }) => {
  return (
    <div
      role="group"
      aria-label="Filter gallery by category"
      className="-mx-4 mb-8 flex snap-x gap-2.5 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:mx-0 sm:px-0 md:flex-wrap md:justify-center md:gap-3 md:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((category) => {
        const active = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            aria-pressed={active}
            className={`shrink-0 snap-center rounded-full px-5 py-2.5 text-sm font-bold shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 active:scale-95 sm:px-6 ${
              active
                ? 'bg-amber-300 text-gray-900 shadow-lg ring-1 ring-amber-200'
                : 'bg-white text-gray-700 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;