// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  // State for animated counters
  const [stats, setStats] = useState({
    collectors: 0,
    figures: 0,
    rating: 0
  });

  // State for section visibility
  const [visibleSections, setVisibleSections] = useState(new Set());
  
  // Refs for sections
  const featuresRef = useRef(null);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const newsletterRef = useRef(null);

  // Animate counters on mount
  useEffect(() => {
    const animateCounters = () => {
      const targetStats = {
        collectors: 10000,
        figures: 5000,
        rating: 4.9
      };

      const duration = 2000; // 2 seconds
      const steps = 60; // 60 frames
      const stepDuration = duration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setStats({
          collectors: Math.floor(0 + (targetStats.collectors - 0) * easeOutQuart),
          figures: Math.floor(0 + (targetStats.figures - 0) * easeOutQuart),
          rating: Math.round((0 + (targetStats.rating - 0) * easeOutQuart) * 10) / 10
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setStats(targetStats);
        }
      }, stepDuration);
    };

    // Start animation after component mounts
    const timer = setTimeout(animateCounters, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          setVisibleSections(prev => new Set(prev).add(sectionId));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = [featuresRef.current, categoriesRef.current, productsRef.current, newsletterRef.current];
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
  // Sample featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Demon Slayer Tanjiro Kamado Figure",
      brand: "Good Smile Company",
      description: "High-quality PVC figure with detailed sculpting and vibrant colors",
      price: 4999,
      originalPrice: 5999,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 124,
      stock: 15,
      scale: "1/8",
      height: "23cm",
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
      image: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 89,
      stock: 8,
      scale: "1/7",
      height: "26cm",
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
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 156,
      stock: 22,
      scale: "1/8",
      height: "21cm",
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
      image: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 203,
      stock: 5,
      scale: "1/8",
      height: "24cm",
      isNew: false,
      onSale: false,
      isLimited: true
    }
  ];

  const categories = [
    {
      name: "Anime Figures",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      count: "500+ Items"
    },
    {
      name: "Action Figures",
      image: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=300&h=200&fit=crop",
      count: "300+ Items"
    },
    {
      name: "Collectibles",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      count: "200+ Items"
    },
    {
      name: "Limited Edition",
      image: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=300&h=200&fit=crop",
      count: "50+ Items"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-screen">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* YouTube Embed with specific start and end times */}
          <iframe
            className="absolute inset-0 w-full h-full object-cover scale-150 md:scale-150 lg:scale-150 xl:scale-125"
            src="https://www.youtube.com/embed/P0napeBnTC8?autoplay=1&mute=1&loop=1&playlist=P0napeBnTC8&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&start=64&end=230&version=3"
            title="Background Video"
            frameBorder="0"
            allow="autoplay; fullscreen"
            style={{ 
              pointerEvents: 'none',
              minWidth: '100%',
              minHeight: '100%',
              width: '100vw',
              height: '100vh',
              objectFit: 'cover'
            }}
          ></iframe>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full lg:w-1/2 text-left relative">
            <div className="animate-fade-in">
              <div className="flex items-center mb-6 lg:mb-8">
                <img 
                  src="/figuroLogo.png" 
                  alt="Figuro Logo" 
                  className="h-8 md:h-10 lg:h-12 w-auto filter invert brightness-0 contrast-100"
                />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-4 lg:mb-6 leading-relaxed">
                <span className="text-white">Level Up Your</span>
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Shelf Game
                </span>
              </h1>
              <p className="text-lg sm:text-xl mb-6 lg:mb-8 text-gray-200 leading-relaxed max-w-xl">
                Discover the world's largest collection of premium anime figures, action figures, and collectibles from your favorite series. Each piece tells a story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/products"
                  className="group bg-yellow-400 text-gray-900 px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-semibold hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center shadow-strong hover:shadow-medium transform hover:scale-105"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/new-arrivals"
                  className="border-2 border-white/30 backdrop-blur-sm text-white px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 text-center"
                >
                  New Arrivals
                </Link>
              </div>
              
              {/* Animated Stats */}
              <div className="flex items-center gap-8 sm:gap-16 mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-white/20">
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    {stats.collectors.toLocaleString()}+
                  </div>
                  <div className="text-gray-300 text-sm">Happy Collectors</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    {stats.figures.toLocaleString()}+
                  </div>
                  <div className="text-gray-300 text-sm">Unique Figures</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    {stats.rating}★
                  </div>
                  <div className="text-gray-300 text-sm">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        data-section="features"
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has('features') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl font-bold font-display text-gray-900 mb-4">Why Choose Figuro?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We're committed to providing the best experience for collectors worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={`group text-center transition-all duration-700 ${
              visibleSections.has('features') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`} style={{ transitionDelay: visibleSections.has('features') ? '200ms' : '0ms' }}>
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Truck className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold font-display mb-3 text-gray-900">Free Shipping</h3>
              <p className="text-gray-600 leading-relaxed">Free worldwide shipping on orders over ₱4,000. Fast and secure delivery.</p>
            </div>
            
            <div className={`group text-center transition-all duration-700 ${
              visibleSections.has('features') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`} style={{ transitionDelay: visibleSections.has('features') ? '400ms' : '0ms' }}>
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold font-display mb-3 text-gray-900">100% Authentic</h3>
              <p className="text-gray-600 leading-relaxed">Every figure is guaranteed authentic from official manufacturers.</p>
            </div>
            
            <div className={`group text-center transition-all duration-700 ${
              visibleSections.has('features') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`} style={{ transitionDelay: visibleSections.has('features') ? '600ms' : '0ms' }}>
              <div className="bg-gradient-to-br from-accent-100 to-accent-200 rounded-3xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <RefreshCw className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold font-display mb-3 text-gray-900">Easy Returns</h3>
              <p className="text-gray-600 leading-relaxed">30-day hassle-free return policy. Your satisfaction guaranteed.</p>
            </div>
            
            <div className={`group text-center transition-all duration-700 ${
              visibleSections.has('features') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'
            }`} style={{ transitionDelay: visibleSections.has('features') ? '800ms' : '0ms' }}>
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-3xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold font-display mb-3 text-gray-900">Top Rated</h3>
              <p className="text-gray-600 leading-relaxed">Trusted by over 10,000 collectors worldwide with 4.9★ rating.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section 
        ref={categoriesRef}
        data-section="categories"
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has('categories') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore our diverse collection of figures across different categories and find your perfect collectible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                className={`group relative overflow-hidden rounded-3xl shadow-medium hover:shadow-strong transition-all duration-500 transform hover:scale-105 ${
                  visibleSections.has('categories') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: visibleSections.has('categories') ? `${200 + index * 150}ms` : '0ms' }}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-bold font-display mb-2 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm font-medium">{category.count}</p>
                  <div className="mt-4 flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Explore Collection</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section 
        ref={productsRef}
        data-section="products"
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has('products') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center bg-gray-200 text-gray-800 rounded-full px-4 py-2 mb-4">
              <Star className="h-4 w-4 mr-2 fill-current" />
              <span className="text-sm font-medium">Featured Collection</span>
            </div>
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">Handpicked for You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover our carefully curated selection of the most popular and highly-rated figures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={`transition-all duration-700 ${
                  visibleSections.has('products') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`} 
                style={{ transitionDelay: visibleSections.has('products') ? `${200 + index * 150}ms` : '0ms' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className={`text-center mt-16 transition-all duration-700 ${
            visibleSections.has('products') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: visibleSections.has('products') ? '800ms' : '0ms' }}>
            <Link
              to="/products"
              className="group inline-flex items-center bg-gradient-to-r from-gray-700 to-gray-800 text-white px-10 py-4 rounded-2xl font-semibold hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-medium hover:shadow-strong transform hover:scale-105"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section 
        ref={newsletterRef}
        data-section="newsletter"
        className="py-20 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 transition-all duration-700 ${
            visibleSections.has('newsletter') 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-20 scale-95'
          }`}>
            <h2 className="text-4xl font-bold font-display text-white mb-4">Stay in the Loop</h2>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              Be the first to know about new arrivals, exclusive deals, and limited edition releases. Join our community of collectors!
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 placeholder-gray-500 font-medium"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-xl font-bold hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 shadow-medium hover:shadow-strong transform hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
            </form>
            
            <p className="text-gray-300 text-sm mt-4">
              Join 50,000+ collectors • Unsubscribe anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;