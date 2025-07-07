// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Badge } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPrice } from '../utils/priceUtils';

const ProductCard = ({ product }) => {
  const { addItem, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="group bg-white rounded-3xl shadow-soft overflow-hidden hover:shadow-strong transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-4 right-4 p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-soft ${
              isFavorite(product.id)
                ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white'
                : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-accent-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
          </button>

          {/* Add to Cart Button - Only visible on hover */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 px-4 py-2 rounded-xl font-semibold text-sm flex items-center shadow-medium hover:shadow-strong disabled:opacity-50 disabled:cursor-not-allowed ${
              isInCart(product.id)
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-white hover:bg-gray-800'
            }`}
          >
            {isInCart(product.id) ? (
              <>
                <Badge className="h-4 w-4 mr-1" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </>
            )}
          </button>

          {/* Sale Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute bottom-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
        </div>

        {/* Tags below photo */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {product.isNew && (
              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-soft">
                ✨ New
              </span>
            )}
            {product.onSale && (
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-soft">
                🔥 Sale
              </span>
            )}
            {product.isLimited && (
              <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-soft">
                💎 Limited
              </span>
            )}
          </div>
        </div>

        <div className="p-6 pt-2 flex flex-col flex-grow">
          {/* Product Info */}
          <div className="mb-4 flex-grow">
            <h3 className="text-lg font-bold font-display text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm font-medium text-primary-600 mb-2">{product.brand}</p>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500 ml-2 font-medium">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price and Stock */}
          <div className="space-y-3 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-display text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through font-medium">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Stock Status */}
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                {product.stock > 0 ? (
                  <span className="text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    {product.stock} in stock
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    Out of stock
                  </span>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 rounded-xl p-2">
              <span className="font-medium">Scale: {product.scale}</span>
              <span className="font-medium">Height: {product.height}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;