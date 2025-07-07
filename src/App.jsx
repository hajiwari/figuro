// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers - Import all contexts
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Page Components - Import all pages
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AccountSettings from './pages/AccountSettings';

// Import Tailwind CSS
import './index.css';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Back to top button component
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 group"
          aria-label="Back to top"
        >
          <svg 
            className="w-6 h-6 transform group-hover:scale-110 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <ScrollToTop />
            <div className="App min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:category" element={<ProductList />} />
                  
                  {/* Authentication Routes */}
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  
                  {/* Cart and Favorites (accessible to all) */}
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/favorites" element={<Favorites />} />
                  
                  {/* Protected Routes */}
                  <Route path="/account" element={
                    <PrivateRoute>
                      <AccountSettings />
                    </PrivateRoute>
                  } />
                  
                  {/* Additional Product Routes */}
                  <Route path="/new-arrivals" element={<ProductList />} />
                  <Route path="/sale" element={<ProductList />} />
                  <Route path="/pre-orders" element={<ProductList />} />
                  
                  {/* Static/Info Pages */}
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/size-guide" element={<SizeGuide />} />
                  
                  {/* 404 Route - Must be last */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <BackToTopButton />
            </div>
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

// Static Page Components (embedded in App.jsx for simplicity)
function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About FigureShop</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              We're passionate collectors ourselves, dedicated to bringing you the finest selection of 
              anime figures, action figures, and collectibles from around the world.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Quality guaranteed, collectors approved. Every figure is authentic and carefully inspected 
              before shipping to ensure you receive the perfect addition to your collection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">10,000+</h3>
                <p className="text-gray-600">Happy Collectors</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">5,000+</h3>
                <p className="text-gray-600">Figures Available</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">99%</h3>
                <p className="text-gray-600">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">We're here to help with any questions or concerns</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-600">support@figuro.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">+63 993 559 6199</p>
                <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM PHT</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p className="text-gray-600">
                  San Jose Del Monte<br />
                  Bulacan, Philippines
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Product Question</option>
                  <option>Technical Issue</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Shipping() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Shipping Information</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Shipping Options</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <span className="font-medium">Standard Shipping</span>
                  <p className="text-sm text-gray-600">3-5 business days</p>
                </div>
                <span className="font-semibold">₱150</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <span className="font-medium">Express Shipping</span>
                  <p className="text-sm text-gray-600">1-2 business days</p>
                </div>
                <span className="font-semibold">₱300</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <div>
                  <span className="font-medium">Free Shipping</span>
                  <p className="text-sm text-gray-600">Orders over ₱4,000</p>
                </div>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Domestic Shipping</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <span className="font-medium">Metro Manila</span>
                  <p className="text-sm text-gray-600">1-2 business days</p>
                </div>
                <span className="font-semibold">₱100</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <div>
                  <span className="font-medium">Luzon</span>
                  <p className="text-sm text-gray-600">2-4 business days</p>
                </div>
                <span className="font-semibold">₱150</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <div>
                  <span className="font-medium">Visayas & Mindanao</span>
                  <p className="text-sm text-gray-600">3-7 business days</p>
                </div>
                <span className="font-semibold">₱200</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Notes</h3>
          <ul className="text-blue-800 space-y-2">
            <li>• All figures are carefully packaged to prevent damage during shipping</li>
            <li>• Tracking information is provided for all orders</li>
            <li>• Signature may be required for high-value items (₱10,000+)</li>
            <li>• Remote areas may require additional delivery time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Returns() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Returns & Exchanges</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Return Policy</h2>
          <p className="text-gray-600 mb-6">
            We want you to be completely satisfied with your purchase. We offer 30-day returns on all items 
            in original condition. Items must be unopened and in original packaging with all accessories included.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">What can be returned?</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✅ Unopened figures in original packaging</li>
                <li>✅ Items with manufacturing defects</li>
                <li>✅ Incorrect items shipped</li>
                <li>✅ Damaged items (with photos)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">What cannot be returned?</h3>
              <ul className="space-y-2 text-gray-600">
                <li>❌ Opened or displayed figures</li>
                <li>❌ Custom or personalized items</li>
                <li>❌ Items damaged by customer</li>
                <li>❌ Returns after 30 days</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Return Process</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Contact Support</h3>
                <p className="text-gray-600">Email us at returns@figuro.com with your order number and reason for return.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Receive Authorization</h3>
                <p className="text-gray-600">We'll send you a return authorization number and prepaid shipping label.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Package Securely</h3>
                <p className="text-gray-600">Pack the item in its original packaging and include all accessories.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">4</div>
              <div>
                <h3 className="font-semibold mb-2">Ship the Item</h3>
                <p className="text-gray-600">Use the provided shipping label and drop off at any authorized location.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">5</div>
              <div>
                <h3 className="font-semibold mb-2">Receive Refund</h3>
                <p className="text-gray-600">Your refund will be processed within 5-7 business days of receiving the item.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 3-5 business days within the Philippines. Express shipping takes 1-2 business days. Remote areas may require additional delivery time."
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free standard shipping on all orders over ₱4,000 within the Philippines."
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely! Once your order ships, you'll receive a tracking number via email that you can use to monitor your package's progress."
        }
      ]
    },
    {
      category: "Products & Authenticity",
      questions: [
        {
          question: "Are your figures authentic?",
          answer: "Yes, all our figures are 100% authentic and sourced directly from official manufacturers like Good Smile Company, Kotobukiya, and others."
        },
        {
          question: "Do you sell pre-owned figures?",
          answer: "No, we only sell brand new, unopened figures. All items come in their original packaging with manufacturer seals intact."
        },
        {
          question: "What if my figure arrives damaged?",
          answer: "If your figure arrives damaged, please contact us within 48 hours with photos. We'll arrange for a replacement or full refund immediately."
        }
      ]
    },
    {
      category: "Account & Payments",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard), PayPal, Apple Pay, and Google Pay."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption and never store your payment information on our servers."
        },
        {
          question: "Can I cancel my order?",
          answer: "Orders can be cancelled within 24 hours if they haven't been shipped yet. Contact our support team as soon as possible."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Find answers to common questions about our products and services</p>
        </div>
        
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{category.category}</h2>
              <div className="space-y-6">
                {category.questions.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
          <a href="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          <div>
            <p className="text-gray-600 mb-6 text-lg">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-500">Last updated: January 1, 2024</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">We collect information you provide directly, such as when you:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Create an account or make a purchase</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact customer service</li>
              <li>Participate in surveys or promotions</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Process orders and provide customer service</li>
              <li>Send you updates about your orders</li>
              <li>Improve our products and services</li>
              <li>Send promotional communications (with your consent)</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
            <p className="text-gray-600">
              We do not sell, trade, or rent your personal information to third parties. We may share your information 
              only with trusted service providers who help us operate our business, such as payment processors and 
              shipping companies.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this privacy policy, please contact us at privacy@figuro.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Terms of Service</h1>
        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          <div>
            <p className="text-gray-600 mb-6 text-lg">
              By using our website, you agree to these terms and conditions.
            </p>
            <p className="text-sm text-gray-500">Last updated: January 1, 2024</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Use of Website</h2>
            <p className="text-gray-600 mb-4">
              You may use our website for lawful purposes only. You agree not to use the site in any way that 
              violates applicable laws or regulations or infringes on the rights of others.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
            <p className="text-gray-600 mb-4">
              We strive to provide accurate product information, but we do not warrant that all information 
              is complete, accurate, or error-free. Colors and details may vary from what appears on your screen.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Orders and Payments</h2>
            <p className="text-gray-600 mb-4">
              All orders are subject to acceptance and availability. We reserve the right to refuse or cancel 
              any order at any time. Prices are subject to change without notice.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-gray-600">
              Our liability is limited to the purchase price of the product. We are not responsible for any 
              indirect, special, or consequential damages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Help() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600">How can we help you today?</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-4">Order Support</h3>
            <p className="text-gray-600 mb-4">
              Need help with your order? Track packages, make changes, or get updates.
            </p>
            <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
              Contact Order Support →
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-4">Product Questions</h3>
            <p className="text-gray-600 mb-4">
              Questions about specific products, authenticity, or availability.
            </p>
            <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
              Ask Product Questions →
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-4">Account Help</h3>
            <p className="text-gray-600 mb-4">
              Manage your account, update information, or reset your password.
            </p>
            <a href="/account" className="text-blue-600 hover:text-blue-800 font-medium">
              Get Account Help →
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-4">Returns & Exchanges</h3>
            <p className="text-gray-600 mb-4">
              Need to return or exchange an item? We'll guide you through the process.
            </p>
            <a href="/returns" className="text-blue-600 hover:text-blue-800 font-medium">
              Start Return Process →
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-4">Technical Support</h3>
            <p className="text-gray-600 mb-4">
              Website issues, payment problems, or other technical difficulties.
            </p>
            <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
              Get Technical Support →
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-4">Shipping & Tracking</h3>
            <p className="text-gray-600 mb-4">
              Track your order, update shipping addresses, or learn about delivery options.
            </p>
            <a href="/shipping" className="text-blue-600 hover:text-blue-800 font-medium">
              Shipping Information →
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Popular Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Getting Started</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/signup" className="hover:text-blue-600">Creating an account</a></li>
                <li><a href="/faq" className="hover:text-blue-600">How to place an order</a></li>
                <li><a href="/faq" className="hover:text-blue-600">Payment methods accepted</a></li>
                <li><a href="/shipping" className="hover:text-blue-600">Shipping options</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Orders & Delivery</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/track-order" className="hover:text-blue-600">Track my order</a></li>
                <li><a href="/faq" className="hover:text-blue-600">Change delivery address</a></li>
                <li><a href="/returns" className="hover:text-blue-600">Return an item</a></li>
                <li><a href="/faq" className="hover:text-blue-600">Cancel my order</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackOrder() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-lg text-gray-600">Enter your order number to see the latest updates</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order Number</label>
              <input 
                type="text" 
                placeholder="e.g., ORD-123456789"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter the email used for your order"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Track Order
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you're having trouble tracking your order, our customer service team is here to help.
            </p>
            <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
              Contact Customer Service →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SizeGuide() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Figure Size Guide</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Understanding Figure Scales</h2>
          <p className="text-gray-600 mb-6">
            Figure scales indicate the size ratio compared to the original character. Here's what each scale means:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">1/4 Scale</h3>
              <p className="text-gray-600 mb-2">Height: ~40-45cm</p>
              <p className="text-sm text-gray-500">Large, premium figures with incredible detail</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">1/6 Scale</h3>
              <p className="text-gray-600 mb-2">Height: ~28-30cm</p>
              <p className="text-sm text-gray-500">Popular for action figures and collectibles</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">1/7 Scale</h3>
              <p className="text-gray-600 mb-2">Height: ~22-25cm</p>
              <p className="text-sm text-gray-500">Common scale for anime figures</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">1/8 Scale</h3>
              <p className="text-gray-600 mb-2">Height: ~18-22cm</p>
              <p className="text-sm text-gray-500">Most popular scale for anime figures</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">1/10 Scale</h3>
              <p className="text-gray-600 mb-2">Height: ~15-18cm</p>
              <p className="text-sm text-gray-500">Compact figures, great for collections</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Nendoroid</h3>
              <p className="text-gray-600 mb-2">Height: ~10cm</p>
              <p className="text-sm text-gray-500">Chibi-style figures with interchangeable parts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Notes</h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Heights are approximate and may vary between manufacturers</li>
            <li>• Some figures may be taller or shorter due to pose or design</li>
            <li>• Always check the specific dimensions in the product description</li>
            <li>• Consider the space you have available for display</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to a new location.
        </p>
        <div className="space-x-4">
          <a 
            href="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Go Home
          </a>
          <a 
            href="/products" 
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors inline-block"
          >
            Browse Products
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;