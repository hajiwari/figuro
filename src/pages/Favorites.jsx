// src/pages/Favorites.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();
  const { addItem } = useCart();

  const handleAddAllToCart = () => {
    favorites.forEach(item => addItem(item));
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Favorites Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start browsing our collection and add items to your favorites by clicking the heart icon on any product.
            </p>
            <Link
              to="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites</h1>
            <p className="text-gray-600">
              {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <button
              onClick={handleAddAllToCart}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add All to Cart
            </button>
            <button
              onClick={clearFavorites}
              className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Clear Favorites
            </button>
          </div>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
          >
            <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
            Continue Shopping
          </Link>
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tips for Managing Your Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 rounded-full p-2 mt-1">
                <Heart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Save for Later</h3>
                <p className="text-sm text-gray-600">
                  Keep track of items you're interested in but not ready to buy yet.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-full p-2 mt-1">
                <ShoppingCart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Quick Add to Cart</h3>
                <p className="text-sm text-gray-600">
                  Easily add multiple favorite items to your cart at once.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 rounded-full p-2 mt-1">
                <ArrowRight className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Stay Updated</h3>
                <p className="text-sm text-gray-600">
                  Get notified when your favorite items go on sale or are back in stock.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;