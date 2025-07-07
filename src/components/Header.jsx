// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
              className="h-8 w-auto object-contain transform group-hover:scale-105 transition-transform duration-200 filter invert brightness-0 contrast-100"
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
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:bg-gray-700 transition-all duration-300 text-white placeholder-gray-400"
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
              className="text-gray-300 hover:text-gray-100 transition-colors duration-200 font-medium relative group"
            >
              Products
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
            <Link 
              to="/categories" 
              className="text-gray-300 hover:text-gray-100 transition-colors duration-200 font-medium relative group"
            >
              Categories
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
            <Link 
              to="/about" 
              className="text-gray-300 hover:text-gray-100 transition-colors duration-200 font-medium relative group"
            >
              About
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gray-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 ml-8">
            {/* Favorites */}
            <Link 
              to="/favorites" 
              className="relative p-3 text-gray-300 hover:text-accent-400 transition-all duration-200 hover:bg-gray-800 rounded-xl group"
            >
              <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-3 text-gray-300 hover:text-gray-100 transition-all duration-200 hover:bg-gray-800 rounded-xl group"
            >
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold animate-pulse">
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
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2.5 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium shadow-medium hover:shadow-strong transform hover:scale-105"
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
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-gray-700 transition-all text-white placeholder-gray-400"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link
                to="/products"
                className="flex items-center text-gray-300 hover:text-primary-400 hover:bg-gray-800 transition-all py-3 px-4 rounded-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="flex items-center text-gray-300 hover:text-primary-400 hover:bg-gray-800 transition-all py-3 px-4 rounded-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className="flex items-center text-gray-300 hover:text-primary-400 hover:bg-gray-800 transition-all py-3 px-4 rounded-xl font-medium"
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