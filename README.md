# Figuro - Anime Figure E-Commerce Platform

A modern, responsive e-commerce platform specializing in anime figures and collectibles. Built with React, Firebase, and Tailwind CSS with beautiful product cards, advanced filtering, and seamless user experience.

![Figuro Logo](public/figuroLogo.png)

## 🚀 Live Demo

Visit the live application: [https://figuro.vercel.app](https://figuro.vercel.app)

## ✨ Features

### Core E-Commerce Functionality
- **Product Catalog**: Browse anime figures with advanced filtering and search
- **Product Details**: Detailed product pages with multiple images and specifications  
- **Shopping Cart**: Add, remove, and manage items with persistent storage
- **Favorites/Wishlist**: Save products for later viewing
- **User Authentication**: Secure login and registration with Firebase Auth
- **Order Tracking**: Track your orders with detailed status updates

### Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Beautiful Product Cards**: Hover effects and smooth animations
- **Image Optimization**: Top-aligned product images for better character visibility
- **Interactive Elements**: Smooth transitions and loading states
- **Category Navigation**: Browse by anime series, scale, brand, etc.
- **Advanced Filtering**: Filter by price, brand, scale, availability

### Additional Features
- Help Center with comprehensive FAQ
- Shipping and return information
- Size guides for figure scales
- Contact support system
- Privacy policy and terms of service

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v6
- **Styling**: Tailwind CSS, Custom CSS animations
- **Backend**: Firebase (Authentication, Firestore Database)
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Deployment**: Vercel/Netlify ready

## 📁 Project Structure

```
figuro/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Footer.jsx      # Site footer with links and newsletter
│   │   ├── Header.jsx      # Navigation header with search and cart
│   │   ├── PrivateRoute.jsx # Route protection wrapper
│   │   └── ProductCard.jsx  # Product display card component
│   ├── context/           # React Context providers
│   │   ├── AuthContext.jsx      # Firebase authentication state
│   │   ├── CartContext.jsx      # Shopping cart state management
│   │   └── FavoritesContext.jsx # Favorites state management
│   ├── pages/             # Main application pages
│   │   ├── AccountSettings.jsx  # User profile and settings
│   │   ├── Cart.jsx            # Shopping cart page
│   │   ├── Favorites.jsx       # User's favorite items
│   │   ├── Home.jsx            # Landing page
│   │   ├── ProductDetails.jsx  # Individual product view
│   │   ├── ProductList.jsx     # Product catalog and search
│   │   ├── SignIn.jsx          # User authentication
│   │   └── SignUp.jsx          # User registration
│   ├── services/          # External service integrations (planned)
│   ├── App.css           # Component-specific styles (mostly unused)
│   ├── App.jsx           # Main application component with routing
│   ├── index.css         # Global styles and Tailwind CSS
│   ├── index.js          # Application entry point
│   ├── reportWebVitals.js # Performance monitoring
│   └── setupTests.js     # Test configuration
├── build/                # Production build output
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🛠 Technologies Used

### Frontend
- **React 19.1.0** - UI library
- **React Router DOM 7.6.3** - Client-side routing
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Lucide React 0.525.0** - Icon library

### Backend & Services
- **Firebase 11.10.0** - Authentication and database
- **Stripe 18.3.0** - Payment processing (integration planned)

### Development Tools
- **React Scripts 5.0.1** - Build tooling
- **Testing Library** - Component testing utilities
- **PostCSS & Autoprefixer** - CSS processing

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd figuro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase configuration**
   - Create a Firebase project
   - Add your Firebase config to the AuthContext
   - Enable Authentication and Firestore

4. **Start development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Key Components

### Context Providers

#### [`AuthContext`](src/context/AuthContext.jsx)
- Firebase authentication integration
- User sign up, sign in, and logout functionality
- User profile management
- Protected route authentication

#### [`CartContext`](src/context/CartContext.jsx)
- Shopping cart state management
- Add, remove, and update item quantities
- Local storage persistence
- Cart total calculations

#### [`FavoritesContext`](src/context/FavoritesContext.jsx)
- Favorites list management
- Add/remove favorites functionality
- Local storage persistence
- Toggle favorite status

### Main Pages

#### [`Home`](src/pages/Home.jsx)
- Hero section with featured products
- Category showcase
- Featured products grid
- Newsletter signup

#### [`ProductList`](src/pages/ProductList.jsx)
- Product catalog with filtering
- Search functionality
- Category-based browsing
- Grid/list view toggle

#### [`ProductDetails`](src/pages/ProductDetails.jsx)
- Detailed product information
- Image gallery with zoom
- Product reviews and ratings
- Add to cart/favorites functionality

#### [`Cart`](src/pages/Cart.jsx)
- Shopping cart management
- Quantity updates
- Promo code application
- Checkout process

#### [`AccountSettings`](src/pages/AccountSettings.jsx)
- User profile management
- Password changes
- Address management
- Order history
- Notification preferences

### Layout Components

#### [`Header`](src/components/Header.jsx)
- Navigation menu
- Search functionality
- User account dropdown
- Cart and favorites counters

#### [`Footer`](src/components/Footer.jsx)
- Site links and information
- Newsletter subscription
- Social media links
- Payment method icons

## 🎨 Styling

The application uses **Tailwind CSS** for styling with custom utilities defined in [`index.css`](src/index.css):

- Custom scrollbar styles
- Animation utilities
- Line clamp utilities for text truncation
- Glass morphism effects
- Loading shimmer animations
- Custom form controls
- Responsive grid layouts

## 🔒 Authentication & Security

- Firebase Authentication for user management
- Protected routes with [`PrivateRoute`](src/components/PrivateRoute.jsx) component
- Secure user data handling
- Password validation and requirements

## 📦 State Management

The application uses React Context for state management:

- **Authentication State**: User login status and profile data
- **Cart State**: Shopping cart items and quantities
- **Favorites State**: User's saved favorite items

All states persist to localStorage for enhanced user experience.

## 🚦 Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (irreversible)

## 🌐 Deployment

The application is built using Create React App and can be deployed to any static hosting service. The [`build`](build/) directory contains the production-ready files.

## 📧 Contact & Support

The application includes comprehensive help and support pages:
- Contact form
- FAQ section
- Shipping information
- Return policies
- Size guides
- Order tracking

## 🔮 Future Enhancements

- Complete Stripe payment integration
- Real product database integration
- Advanced filtering and search
- User reviews and ratings system
- Wishlist sharing
- Mobile app version

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for collectors