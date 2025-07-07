// src/pages/Categories.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      name: "Anime Figures",
      slug: "anime",
      image: "https://mrwallpaper.com/images/high/demon-slayer-anime-figures-2now37a0ly211xg1.jpg",
      count: "500+ Items",
      description: "Premium anime figures from your favorite series including Demon Slayer, Attack on Titan, and more"
    },
    {
      name: "Action Figures",
      slug: "action",
      image: "https://images.squarespace-cdn.com/content/v1/51b3dc8ee4b051b96ceb10de/cae311df-3ffb-49cb-8f29-c3b0933509a1/hot-toys-deadpool-wolverine-figures-feature-lady-pool-shirtless-wolverine-and-more.jpg",
      count: "300+ Items",
      description: "High-quality action figures from movies, comics, and TV shows"
    },
    {
      name: "Collectibles",
      slug: "collectibles",
      image: "https://cdn.shopify.com/s/files/1/0013/6105/1705/files/Ranked_The_Top_7_Best_Action_Figure_Brands_for_Collectors.jpg?v=1713425120",
      count: "200+ Items",
      description: "Rare and unique collectible figures for serious collectors"
    },
    {
      name: "Gaming Figures",
      slug: "gaming",
      image: "https://wallpapers.com/images/hd/mass-effect-female-characters-4k-ks6bm2env8skz4xf.jpg",
      count: "150+ Items",
      description: "Gaming characters from popular video games and franchises"
    },
    {
      name: "Limited Edition",
      slug: "limited",
      image: "https://images.bigbadtoystore.com/images/p/full/2025/05/46b94f43-1cd3-4c5d-8c38-67e31c963e2c.jpg",
      count: "50+ Items",
      description: "Exclusive limited edition figures with numbered certificates"
    },
    {
      name: "Nendoroids",
      slug: "nendoroid",
      image: "https://i.pinimg.com/736x/f0/47/15/f047158c610643d1063d455352656562.jpg",
      count: "100+ Items",
      description: "Cute chibi-style figures with interchangeable parts and accessories"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of figures across different categories and find your perfect collectible.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
            >
              {/* Category Image */}
              <div className="aspect-w-16 aspect-h-10 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              {/* Category Info */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-1 group-hover:translate-y-[-2px] transition-transform duration-300">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm font-medium mb-2">{category.count}</p>
                  <p className="text-white/80 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {category.description}
                  </p>
                  <div className="flex items-center text-white/90 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Browse Collection</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Brands Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Good Smile Company',
              'Kotobukiya',
              'Bandai',
              'Square Enix',
              'Sideshow',
              'Hot Toys'
            ].map((brand, index) => (
              <Link
                key={index}
                to={`/products?brand=${encodeURIComponent(brand)}`}
                className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow duration-200 border border-gray-200"
              >
                <span className="text-gray-800 font-medium text-sm">{brand}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Collections */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/new-arrivals"
              className="group p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-2">New Arrivals</h3>
              <p className="text-blue-700 text-sm mb-3">Latest figures just added to our collection</p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-800">
                <span className="text-sm font-medium">Explore New</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/sale"
              className="group p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-red-900 mb-2">On Sale</h3>
              <p className="text-red-700 text-sm mb-3">Great deals on premium figures</p>
              <div className="flex items-center text-red-600 group-hover:text-red-800">
                <span className="text-sm font-medium">Shop Sale</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/pre-orders"
              className="group p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-green-900 mb-2">Pre-Orders</h3>
              <p className="text-green-700 text-sm mb-3">Reserve upcoming releases early</p>
              <div className="flex items-center text-green-600 group-hover:text-green-800">
                <span className="text-sm font-medium">Pre-Order</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
