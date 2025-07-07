// src/utils/priceUtils.js

/**
 * Format a price in Philippine Peso with proper thousands separators
 * @param {number} price - The price to format
 * @returns {string} - Formatted price string with ₱ symbol
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '₱0';
  }
  
  return `₱${price.toLocaleString('en-PH')}`;
};

/**
 * Format price range for filtering
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price (optional)
 * @returns {string} - Formatted price range
 */
export const formatPriceRange = (min, max = null) => {
  const minFormatted = formatPrice(min);
  
  if (max === null) {
    return `${minFormatted}+`;
  }
  
  const maxFormatted = formatPrice(max);
  return `${minFormatted} - ${maxFormatted}`;
};

/**
 * Calculate percentage discount
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @returns {number} - Percentage discount (rounded)
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  if (originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

/**
 * Calculate savings amount
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @returns {string} - Formatted savings amount
 */
export const calculateSavings = (originalPrice, salePrice) => {
  const savings = originalPrice - salePrice;
  return formatPrice(savings);
};
