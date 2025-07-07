// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import figuroLogo from '../figuroLogo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { currentUser, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={figuroLogo} 
              alt="Figuro Logo" 
              className="h-6 w-auto object-contain transform group-hover:scale-105 transition-transform duration-200 filter invert brightness-0 contrast-100"
            />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for amazing figurines..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 rounded-2xl focus:outline-none focus:bg-gray-700 transition-all duration-300 text-white placeholder-gray-400"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-gray-300 transition-colors" />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-gray-600 text-white p-2 rounded-xl hover:bg-gray-700 transition-colors duration-200 opacity-0 group-focus-within:opacity-100"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/products" 
              className={`transition-colors duration-200 font-medium relative group ${
                location.pathname.startsWith('/products') 
                  ? 'text-yellow-400' 
                  : 'text-gray-300 hover:text-gray-100'
              }`}
            >
              Products
              <span className={`absolute inset-x-0 -bottom-1 h-0.5 transform transition-transform duration-200 ${
                location.pathname.startsWith('/products')
                  ? 'bg-yellow-400 scale-x-100'
                  : 'bg-gray-300 scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
            <Link 
              to="/categories" 
              className={`transition-colors duration-200 font-medium relative group ${
                location.pathname.startsWith('/categories') 
                  ? 'text-yellow-400' 
                  : 'text-gray-300 hover:text-gray-100'
              }`}
            >
              Categories
              <span className={`absolute inset-x-0 -bottom-1 h-0.5 transform transition-transform duration-200 ${
                location.pathname.startsWith('/categories')
                  ? 'bg-yellow-400 scale-x-100'
                  : 'bg-gray-300 scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors duration-200 font-medium relative group ${
                location.pathname.startsWith('/about') 
                  ? 'text-yellow-400' 
                  : 'text-gray-300 hover:text-gray-100'
              }`}
            >
              About
              <span className={`absolute inset-x-0 -bottom-1 h-0.5 transform transition-transform duration-200 ${
                location.pathname.startsWith('/about')
                  ? 'bg-yellow-400 scale-x-100'
                  : 'bg-gray-300 scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 ml-8">
            {/* Favorites - Hidden on mobile */}
            <Link 
              to="/favorites" 
              className={`hidden md:flex relative p-3 transition-all duration-200 rounded-xl group ${
                location.pathname === '/favorites'
                  ? 'text-yellow-400 bg-gray-800'
                  : 'text-gray-300 hover:text-accent-400 hover:bg-gray-800'
              }`}
            >
              <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart - Hidden on mobile */}
            <Link 
              to="/cart" 
              className={`hidden md:flex relative p-3 transition-all duration-200 rounded-xl group ${
                location.pathname === '/cart'
                  ? 'text-yellow-400 bg-gray-800'
                  : 'text-gray-300 hover:text-gray-100 hover:bg-gray-800'
              }`}
            >
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 p-3 text-gray-300 hover:text-gray-100 transition-all duration-200 hover:bg-gray-800 rounded-xl group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium truncate max-w-24">
                      {currentUser.displayName || currentUser.email?.split('@')[0]}
                    </span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-strong border border-gray-100 py-2 z-50 animate-fade-in">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {currentUser.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                      <Link
                        to="/account"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3 text-gray-400" />
                        Account Settings
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-3 text-gray-400" />
                        My Orders
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/signin"
                    className="text-gray-300 hover:text-gray-100 transition-colors font-medium px-4 py-2 rounded-xl hover:bg-gray-800"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="hidden md:inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2.5 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 font-medium shadow-medium hover:shadow-strong transform hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-3 text-gray-300 hover:text-gray-100 transition-all duration-200 hover:bg-gray-800 rounded-xl"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-6 animate-fade-in">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search figurines..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 rounded-xl focus:outline-none focus:bg-gray-700 transition-all text-white placeholder-gray-400"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center mb-4">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="px-3 text-xs text-gray-400 font-medium">Quick Access</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* Mobile Cart and Favorites - Below Search */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Link
                to="/favorites"
                className={`relative flex flex-col items-center justify-center transition-all py-4 px-3 rounded-xl border ${
                  location.pathname === '/favorites'
                    ? 'text-yellow-400 bg-gray-800 border-yellow-400/30'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="relative">
                  <Heart className="h-6 w-6 mb-2" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {favorites.length}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">Favorites</span>
              </Link>
              <Link
                to="/cart"
                className={`relative flex flex-col items-center justify-center transition-all py-4 px-3 rounded-xl border ${
                  location.pathname === '/cart'
                    ? 'text-yellow-400 bg-gray-800 border-yellow-400/30'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 mb-2" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">Cart</span>
              </Link>
            </div>

            {/* Navigation Divider */}
            <div className="flex items-center mb-4">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="px-3 text-xs text-gray-400 font-medium">Navigation</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link
                to="/products"
                className={`flex items-center transition-all py-3 px-4 rounded-xl font-medium ${
                  location.pathname.startsWith('/products')
                    ? 'text-yellow-400 bg-gray-800'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/categories"
                className={`flex items-center transition-all py-3 px-4 rounded-xl font-medium ${
                  location.pathname.startsWith('/categories')
                    ? 'text-yellow-400 bg-gray-800'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className={`flex items-center transition-all py-3 px-4 rounded-xl font-medium ${
                  location.pathname.startsWith('/about')
                    ? 'text-yellow-400 bg-gray-800'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;