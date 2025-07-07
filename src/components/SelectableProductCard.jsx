// src/components/SelectableProductCard.jsx
import React from 'react';
import { Check } from 'lucide-react';
import ProductCard from './ProductCard';

const SelectableProductCard = ({ product, isSelected, onSelect, showSelection = false }) => {
  return (
    <div className="relative">
      {/* Selection Overlay */}
      {showSelection && (
        <div className="absolute top-2 left-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect(product.id);
            }}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              isSelected
                ? 'bg-yellow-500 border-yellow-500 text-white'
                : 'bg-white border-gray-300 hover:border-yellow-400'
            }`}
          >
            {isSelected && <Check className="h-4 w-4" />}
          </button>
        </div>
      )}
      
      {/* Product Card */}
      <div className={`transition-all duration-200 ${isSelected ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}`}>
        <ProductCard product={product} />
      </div>
    </div>
  );
};

export default SelectableProductCard;
