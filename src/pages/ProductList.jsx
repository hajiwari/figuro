// src/pages/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category: urlCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: urlCategory || '',
    brand: '',
    priceRange: '',
    scale: '',
    inStock: false,
    onSale: false,
    sortBy: 'name'
  });

  // Sample products data
  const sampleProducts = [
    {
      id: 1,
      name: "Demon Slayer Tanjiro Kamado Figure",
      brand: "Good Smile Company",
      description: "High-quality PVC figure with detailed sculpting and vibrant colors",
      price: 4999,
      originalPrice: 5999,
      image: "https://otakuhobbitoysph.com/cdn/shop/files/1-56_42841355-65a4-4f83-984a-4eb71910a25b.jpg",
      rating: 4.8,
      reviewCount: 124,
      stock: 15,
      scale: "1/8",
      height: "23cm",
      category: "anime",
      isNew: true,
      onSale: true,
      isLimited: false
    },
    {
      id: 2,
      name: "Attack on Titan Eren Yeager",
      brand: "Kotobukiya",
      description: "Premium collectible figure with interchangeable parts",
      price: 7199,
      image: "https://hubbytetoystore.com/cdn/shop/products/PP960_eren_repkg_01.jpg",
      rating: 4.9,
      reviewCount: 89,
      stock: 8,
      scale: "1/7",
      height: "26cm",
      category: "anime",
      isNew: false,
      onSale: false,
      isLimited: true
    },
    {
      id: 3,
      name: "Naruto Uzumaki Sage Mode",
      brand: "Banpresto",
      description: "Detailed figure featuring Naruto in his iconic Sage Mode",
      price: 3899,
      image: "https://static.wikia.nocookie.net/naruto/images/d/dd/Naruto_Part_II.png",
      rating: 4.7,
      reviewCount: 156,
      stock: 22,
      scale: "1/8",
      height: "21cm",
      category: "anime",
      isNew: true,
      onSale: false,
      isLimited: false
    },
    {
      id: 4,
      name: "One Piece Monkey D. Luffy",
      brand: "Megahouse",
      description: "Portrait of Pirates series with exceptional attention to detail",
      price: 8299,
      image: "https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png",
      rating: 4.9,
      reviewCount: 203,
      stock: 5,
      scale: "1/8",
      height: "24cm",
      category: "anime",
      isNew: false,
      onSale: false,
      isLimited: true
    },
    {
      id: 5,
      name: "Marvel Spider-Man Action Figure",
      brand: "Hot Toys",
      description: "Movie-accurate Spider-Man figure with web accessories",
      price: 16599,
      image: "https://static.wikia.nocookie.net/spidermanps4/images/1/1c/Spider-Man_PS4_Classic_Suit.png",
      rating: 4.8,
      reviewCount: 67,
      stock: 12,
      scale: "1/6",
      height: "30cm",
      category: "action",
      isNew: false,
      onSale: false,
      isLimited: false
    },
    {
      id: 6,
      name: "Dragon Ball Z Goku Super Saiyan",
      brand: "Bandai",
      description: "Highly detailed Goku figure in Super Saiyan form",
      price: 4399,
      originalPrice: 5499,
      image: "https://m.media-amazon.com/images/I/618yACswqgL._UF894,1000_QL80_.jpg",
      rating: 4.6,
      reviewCount: 234,
      stock: 18,
      scale: "1/8",
      height: "22cm",
      category: "anime",
      isNew: false,
      onSale: true,
      isLimited: false
    },
    {
      id: 7,
      name: "Pokemon Pikachu Nendoroid",
      brand: "Good Smile Company",
      description: "Adorable Pikachu with multiple expressions and accessories",
      price: 3049,
      image: "https://static.wikia.nocookie.net/pokemon/images/0/0d/025Pikachu.png",
      rating: 4.5,
      reviewCount: 312,
      stock: 25,
      scale: "Nendoroid",
      height: "10cm",
      category: "collectibles",
      isNew: true,
      onSale: false,
      isLimited: false
    },
    {
      id: 8,
      name: "Batman Dark Knight Figure",
      brand: "Queen Studios",
      description: "Premium statue with incredible detail and craftsmanship",
      price: 22199,
      image: "https://hubbytetoystore.com/cdn/shop/products/07_ec7d24de-57d7-4727-8c15-473128dfd787.jpg",
      rating: 4.9,
      reviewCount: 45,
      stock: 3,
      scale: "1/3",
      height: "45cm",
      category: "action",
      isNew: false,
      onSale: false,
      isLimited: true
    },
    {
      id: 9,
      name: "Final Fantasy Cloud Strife",
      brand: "Square Enix",
      description: "Iconic Cloud figure with Buster Sword and detailed armor",
      price: 10549,
      originalPrice: 12199,
      image: "https://static.wikia.nocookie.net/finalfantasy/images/1/1a/Cloud_Strife_from_FFVII_Remake_render.png",
      rating: 4.7,
      reviewCount: 98,
      stock: 7,
      scale: "1/7",
      height: "28cm",
      category: "gaming",
      isNew: false,
      onSale: true,
      isLimited: false
    },
    {
      id: 10,
      name: "Sailor Moon Eternal Figure",
      brand: "Bandai",
      description: "Beautiful Sailor Moon figure in her Eternal form",
      price: 6649,
      image: "https://static.wikia.nocookie.net/sailormoon/images/f/fc/Sailor_Moon_Eternal.png",
      rating: 4.8,
      reviewCount: 167,
      stock: 11,
      scale: "1/8",
      height: "25cm",
      category: "anime",
      isNew: true,
      onSale: false,
      isLimited: false
    },
    {
      id: 11,
      name: "Iron Man Mark 85 Diecast",
      brand: "Hot Toys",
      description: "Premium diecast figure with LED features and accessories",
      price: 24949,
      image: "https://static.wikia.nocookie.net/marveldatabase/images/0/06/Iron_Man_Armor_Model_85_from_Marvel_Database.png",
      rating: 4.9,
      reviewCount: 78,
      stock: 4,
      scale: "1/6",
      height: "32cm",
      category: "action",
      isNew: false,
      onSale: false,
      isLimited: true
    },
    {
      id: 12,
      name: "Hatsune Miku Racing Ver.",
      brand: "Good Smile Company",
      description: "Special racing version of the popular virtual singer",
      price: 7749,
      originalPrice: 8849,
      image: "https://static.wikia.nocookie.net/vocaloid/images/c/cd/Hatsune_Miku_V4X.png",
      rating: 4.6,
      reviewCount: 145,
      stock: 9,
      scale: "1/8",
      height: "23cm",
      category: "anime",
      isNew: false,
      onSale: true,
      isLimited: false
    }
  ];

  const brands = ["Good Smile Company", "Kotobukiya", "Banpresto", "Megahouse", "Hot Toys", "Bandai", "Sideshow", "Square Enix"];
  const scales = ["1/4", "1/6", "1/7", "1/8", "1/10", "1/12", "Nendoroid"];
  const categories = ["anime", "action", "collectibles", "gaming", "limited"];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 500);
  }, []);

  // Update filters when URL category changes
  useEffect(() => {
    if (urlCategory) {
      setFilters(prev => ({
        ...prev,
        category: urlCategory
      }));
    }
  }, [urlCategory]);

  useEffect(() => {
    let filtered = [...products];
    const searchQuery = searchParams.get('search');

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply brand filter
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Apply scale filter
    if (filters.scale) {
      filtered = filtered.filter(product => product.scale === filters.scale);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(product => product.price >= min && product.price <= max);
      } else {
        filtered = filtered.filter(product => product.price >= min);
      }
    }

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    // Apply sale filter
    if (filters.onSale) {
      filtered = filtered.filter(product => product.onSale);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [products, filters, searchParams]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      priceRange: '',
      scale: '',
      inStock: false,
      onSale: false,
      sortBy: 'name'
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== '' && value !== false && value !== 'name'
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {searchParams.get('search') ? 
              `Search Results for "${searchParams.get('search')}"` : 
              'All Products'
            }
          </h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Clear All ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Prices</option>
                  <option value="0-2000">₱0 - ₱2,000</option>
                  <option value="2000-5000">₱2,000 - ₱5,000</option>
                  <option value="5000-10000">₱5,000 - ₱10,000</option>
                  <option value="10000-15000">₱10,000 - ₱15,000</option>
                  <option value="15000-25000">₱15,000 - ₱25,000</option>
                  <option value="25000">₱25,000+</option>
                </select>
              </div>

              {/* Scale Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scale
                </label>
                <select
                  value={filters.scale}
                  onChange={(e) => handleFilterChange('scale', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Scales</option>
                  {scales.map(scale => (
                    <option key={scale} value={scale}>{scale}</option>
                  ))}
                </select>
              </div>

              {/* Checkbox Filters */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">On Sale</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 ml-1">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <label className="text-sm text-gray-700 font-medium whitespace-nowrap">Sort by:</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0 flex-1 sm:flex-none"
                  >
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                    <option value="popularity">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <div key={product.id} className="h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <Filter className="h-16 w-16 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination (if needed) */}
            {filteredProducts.length > 20 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-md">
                    1
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;