// src/components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";
import figuroLogo from "../figuroLogo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-gray-500/10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src={figuroLogo}
                alt="Figuro Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your premier destination for collectible figurines, anime figures,
              and action figures from around the world. Quality guaranteed,
              collectors approved.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/figureshop"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800 hover:bg-gray-600 p-3 rounded-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://twitter.com/figureshop"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800 hover:bg-gray-600 p-3 rounded-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://instagram.com/figureshop"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800 hover:bg-accent-600 p-3 rounded-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://youtube.com/figureshop"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800 hover:bg-red-600 p-3 rounded-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center text-xs text-gray-400">
                <div className="bg-green-500/20 p-2 rounded-lg mr-2">
                  <Shield className="h-4 w-4 text-green-400" />
                </div>
                <span>Secure Shopping</span>
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-2">
                  <Truck className="h-4 w-4 text-blue-400" />
                </div>
                <span>Fast Shipping</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-display text-white">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/anime"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Anime Figures
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/action"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Action Figures
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/collectibles"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Collectibles
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/gaming"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Gaming Figures
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="text-gray-300 hover:text-accent-400 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/sale"
                  className="text-gray-300 hover:text-red-400 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Sale Items
                </Link>
              </li>
              <li>
                <Link
                  to="/pre-orders"
                  className="text-gray-300 hover:text-yellow-400 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Pre-Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-display text-white">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  to="/warranty"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Warranty
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-gray-100 transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-display text-white">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <div className="bg-gray-600/20 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                </div>
                <div className="text-gray-300 text-sm">
                  <p className="font-medium text-white">San Jose Del Monte</p>
                  <p>Bulacan, Philippines</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                </div>
                <div className="text-gray-300 text-sm">
                  <p className="font-medium text-white">+63 993 559 6199</p>
                  <p className="text-xs text-gray-400">Mon-Fri 9AM-6PM PHT</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                </div>
                <div className="text-gray-300 text-sm">
                  <p className="font-medium text-white">support@figuro.com</p>
                  <p className="text-xs text-gray-400">
                    We reply within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-gray-700/20 to-gray-600/20 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold font-display text-white mb-2">
                Stay Updated
              </h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Get the latest news on new arrivals, exclusive deals, and
                limited releases.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 min-w-0 px-4 py-3 bg-gray-800/80 text-white rounded-l-xl focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm placeholder-gray-400 border border-gray-600"
                  />
                  <button
                    type="submit"
                    disabled={subscribed}
                    className={`flex-shrink-0 px-4 py-3 rounded-r-xl transition-all duration-300 text-sm font-medium ${
                      subscribed
                        ? "bg-green-600 text-white"
                        : "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 transform hover:scale-105"
                    }`}
                  >
                    {subscribed ? (
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Done!
                      </span>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  ✨ Join 50,000+ collectors • No spam, unsubscribe anytime
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 mt-16 pt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <span className="text-sm text-gray-400 font-medium">
                We Accept:
              </span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-gray-800/50 px-4 py-2 rounded-xl">
                  <div className="bg-white rounded-lg p-2">
                    <CreditCard className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="text-xs text-gray-300">
                    <div className="flex space-x-2">
                      <span>Visa</span>
                      <span>•</span>
                      <span>Mastercard</span>
                      <span>•</span>
                      <span>PayPal</span>
                    </div>
                    <div className="text-gray-400 mt-1">
                      & Apple Pay, Google Pay
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">
                🔒 SSL Secured Checkout
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          {/* Developer Credit Section */}
          <div className="mb-8 text-center">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">
                Developed by Hajiwari
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Crafted with modern web technologies and tools
              </p>

              {/* Technology Stack */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {/* React */}
                <div className="flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.87.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                  </svg>
                  <span className="text-xs text-gray-300">React</span>
                </div>

                {/* Tailwind CSS */}
                <div className="flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                  <svg
                    className="h-5 w-5 text-cyan-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                  </svg>
                  <span className="text-xs text-gray-300">Tailwind</span>
                </div>

                {/* Firebase */}
                <div className="flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                  <svg
                    className="h-5 w-5 text-orange-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5.229 4.909l2.43 4.536L12 1.384l-.042-.047L5.229 4.909zm13.542 5.323L16.542 1.98 12.659 6.56 18.771 10.232zM12 13.422l-6.362-1.962 6.362 12.035 6.362-12.035L12 13.422zM5.229 4.909l2.43 4.536L12 1.384l-.042-.047L5.229 4.909zm3.67 8.47l4.732-5.829 3.84 6.701L12 13.422l-3.101-.043z" />
                  </svg>
                  <span className="text-xs text-gray-300">Firebase</span>
                </div>

                {/* VS Code */}
                <div className="flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                  <svg
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
                  </svg>
                  <span className="text-xs text-gray-300">VS Code</span>
                </div>

                {/* Git */}
                <div className="flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                  <svg
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
                  </svg>
                  <span className="text-xs text-gray-300">Git</span>
                </div>

                {/* Vercel */}
                <div className="flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                  <svg
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 22.525H0l12-21.05 12 21.05z" />
                  </svg>
                  <span className="text-xs text-gray-300">Vercel</span>
                </div>

                {/* Node.js */}
                <div className="flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                  <svg
                    className="h-5 w-5 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
                  </svg>
                  <span className="text-xs text-gray-300">Node.js</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="text-gray-400 text-sm text-center lg:text-left">
              © 2025 Figuro. All rights reserved.{" "}
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Cookie Policy
              </Link>
              <Link
                to="/accessibility"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Accessibility
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
