import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onSelect }) => {
  return (
    <div className="flex overflow-x-auto py-4 px-2 gap-3 no-scrollbar mb-6 snap-x">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`shrink-0 snap-center px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-md ${
            activeCategory === category
              ? 'bg-blue-700 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
