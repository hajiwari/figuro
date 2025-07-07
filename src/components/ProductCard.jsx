// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Badge, Check, X, Minus, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPrice } from '../utils/priceUtils';
import Dialog from './Dialog';

const ProductCard = ({ product }) => {
  const { addItem, isInCart, removeItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showAlreadyInCartDialog, setShowAlreadyInCartDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInCart(product.id)) {
      // Show dialog asking if they want to add another
      setShowAlreadyInCartDialog(true);
      return;
    }
    
    addItem(product);
    
    // Trigger success animation
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
    }, 2000);
  };

  const handleConfirmAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setShowAlreadyInCartDialog(false);
    
    // Trigger success animation
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
    }, 2000);
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowRemoveDialog(true);
  };

  const handleConfirmRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(product.id);
    setShowRemoveDialog(false);
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
    <>
      <div className="group bg-white rounded-3xl shadow-soft overflow-hidden hover:shadow-strong transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 flex flex-col h-full hover:rounded-3xl">
        <Link to={`/product/${product.id}`} className="flex flex-col h-full rounded-3xl overflow-hidden">
          <div className="relative overflow-hidden">
            <img
              src={product.images?.[0] || product.image}
              alt={product.name}
              className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Franchise Badge - Top Left - Only visible on hover */}
            {product.franchise && (
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.franchise}
              </div>
            )}
            
            {/* Black Gradient Overlay - Visible on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
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

            {/* Add to Cart Button - Slides up from bottom on hover */}
            <div className={`absolute bottom-0 left-0 right-0 flex justify-center transform translate-y-full group-hover:translate-y-[-20px] opacity-0 group-hover:opacity-100 transition-all duration-300 ${showSuccessAnimation ? 'invisible' : ''}`}>
              {isInCart(product.id) && !showSuccessAnimation ? (
                // Show both Add More and Remove options when item is in cart
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex flex-col items-center space-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="p-3 rounded-full transition-all duration-300 shadow-lg bg-green-500 text-white hover:bg-green-400 hover:scale-110">
                      <Check className="h-5 w-5" />
                    </div>
                    <span className="text-white font-semibold text-xs bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm">
                      Add More
                    </span>
                  </button>
                  
                  <button
                    onClick={handleRemoveFromCart}
                    className="flex flex-col items-center space-y-1"
                  >
                    <div className="p-3 rounded-full transition-all duration-300 shadow-lg bg-red-500 text-white hover:bg-red-400 hover:scale-110">
                      <Minus className="h-5 w-5" />
                    </div>
                    <span className="text-white font-semibold text-xs bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm">
                      Remove
                    </span>
                  </button>
                </div>
              ) : (
                // Show regular Add to Cart button
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex flex-col items-center space-y-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="p-4 rounded-full transition-all duration-300 shadow-lg bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-110">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <span className="text-white font-semibold text-sm bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm">
                    Add to Cart
                  </span>
                </button>
              )}
            </div>

            {/* Success Animation Overlay */}
            {showSuccessAnimation && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
                <div className="relative flex flex-col items-center justify-center">
                  {/* Animated Check Mark Container */}
                  <div className="relative bg-green-500 p-6 rounded-full mb-4 transform animate-[scaleIn_0.3s_ease-out_forwards] shadow-lg">
                    {/* Ripple Effects - Centered on check mark */}
                    <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-[ripple_1.5s_ease-out_infinite] opacity-40"></div>
                    <div className="absolute inset-0 border-2 border-green-300 rounded-full animate-[ripple_1.5s_ease-out_infinite] opacity-30" style={{ animationDelay: '0.3s' }}></div>
                    <div className="absolute inset-0 border border-green-200 rounded-full animate-[ripple_1.5s_ease-out_infinite] opacity-20" style={{ animationDelay: '0.6s' }}></div>
                    
                    {/* Check Mark SVG */}
                    <svg 
                      className="h-10 w-10 text-white relative z-10" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                        className="animate-[drawCheck_1s_ease-in-out_0.2s_forwards]"
                        style={{
                          strokeDasharray: '24',
                          strokeDashoffset: '24'
                        }}
                      />
                    </svg>
                  </div>
                  
                  {/* Success Text */}
                  <div className="text-center animate-[fadeInUp_0.5s_ease-out_0.4s_forwards] opacity-0">
                    <h4 className="text-white font-bold text-xl mb-2">
                      Added to Cart!
                    </h4>
                    <p className="text-white/90 text-sm font-medium">
                      {product.name}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sale Badge */}
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="absolute bottom-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </div>
            )}
          </div>

          {/* Tags below photo */}
          <div className="px-6 pt-3 pb-2">
            <div className="flex flex-wrap gap-2 min-h-[1.5rem]">
              {product.isNew && (
                <span className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-emerald-200">
                  <span className="mr-1.5">✨</span>
                  NEW
                </span>
              )}
              {product.onSale && (
                <span className="inline-flex items-center bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-amber-200">
                  <span className="mr-1.5">🔥</span>
                  SALE
                </span>
              )}
              {product.isLimited && (
                <span className="inline-flex items-center bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-purple-200">
                  <span className="mr-1.5">💎</span>
                  LIMITED
                </span>
              )}
            </div>
          </div>

          <div className="p-6 pt-1 flex flex-col flex-grow">
            {/* Product Info */}
            <div className="mb-3 flex-grow">
              <h3 className="text-lg font-bold font-display text-gray-900 mb-1 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                {product.name}
              </h3>
              {/* Brand */}
              <div className="mb-2">
                <span className="inline-block bg-gray-100 px-2 py-1 rounded-md text-xs font-medium text-gray-600">
                  {product.brand}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-500 ml-2 font-medium">
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            {/* Price and Stock */}
            <div className="space-y-2 mt-auto">
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

      {/* Dialogs */}
      <Dialog
        isOpen={showAlreadyInCartDialog}
        onClose={() => setShowAlreadyInCartDialog(false)}
        title="Already in Cart"
        description="This item is already in your cart. Would you like to add another one?"
        icon={ShoppingCart}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
        primaryAction={{
          label: "Add Another",
          onClick: handleConfirmAddToCart,
          className: "bg-yellow-500 text-black hover:bg-yellow-400"
        }}
        secondaryAction={{
          label: "Cancel"
        }}
      />

      <Dialog
        isOpen={showRemoveDialog}
        onClose={() => setShowRemoveDialog(false)}
        title="Remove from Cart"
        description="Are you sure you want to remove this item from your cart?"
        icon={X}
        iconBgColor="bg-red-100"
        iconColor="text-red-600"
        primaryAction={{
          label: "Remove",
          onClick: handleConfirmRemove,
          className: "bg-red-500 text-white hover:bg-red-600"
        }}
        secondaryAction={{
          label: "Cancel"
        }}
      />
    </>
  );
};

export default ProductCard;