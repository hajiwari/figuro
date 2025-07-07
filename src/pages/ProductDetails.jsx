// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Plus, Minus, Share2, Truck, Shield, RefreshCw, Eye, AlertCircle, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import Dialog from '../components/Dialog';
import { formatPrice, calculateSavings } from '../utils/priceUtils';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [showZoom, setShowZoom] = useState(false);
  const [showAlreadyInCartDialog, setShowAlreadyInCartDialog] = useState(false);
  
  const { addItem, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Complete product database - synced with ProductList.jsx
  const allProducts = [
    {
      id: 1,
      name: "Demon Slayer Tanjiro Kamado Figure",
      brand: "Good Smile Company",
      franchise: "Demon Slayer",
      description: "High-quality PVC figure with detailed sculpting and vibrant colors",
      price: 4999,
      originalPrice: 5999,
      images: [
        "https://otakuhobbitoysph.com/cdn/shop/files/1-56_42841355-65a4-4f83-984a-4eb71910a25b.jpg",
        "https://otakuhobbitoysph.com/cdn/shop/files/1-56_42841355-65a4-4f83-984a-4eb71910a25b.jpg",
        "https://otakuhobbitoysph.com/cdn/shop/files/1-56_42841355-65a4-4f83-984a-4eb71910a25b.jpg",
        "https://otakuhobbitoysph.com/cdn/shop/files/1-56_42841355-65a4-4f83-984a-4eb71910a25b.jpg"
      ],
      image: "https://otakuhobbitoysph.com/cdn/shop/files/1-56_42841355-65a4-4f83-984a-4eb71910a25b.jpg",
      rating: 4.8,
      reviewCount: 124,
      stock: 15,
      scale: "1/8",
      height: "23cm",
      weight: "350g",
      material: "PVC, ABS",
      manufacturer: "Good Smile Company",
      series: "Demon Slayer: Kimetsu no Yaiba",
      character: "Tanjiro Kamado",
      releaseDate: "December 2023",
      category: "anime",
      sku: "GSC-DM-TAN-001",
      barcode: "4580416906593",
      isNew: true,
      onSale: true,
      isLimited: false,
      features: [
        "Highly detailed sculpting and painting",
        "Premium PVC construction for durability",
        "Authentic character design from the anime",
        "Collector-grade quality packaging",
        "Limited edition art box included",
        "Certificate of authenticity",
        "Display base included"
      ]
    },
    {
      id: 2,
      name: "Attack on Titan Eren Yeager",
      brand: "Kotobukiya",
      franchise: "Attack on Titan",
      description: "Premium collectible figure with interchangeable parts",
      price: 7199,
      images: [
        "https://hubbytetoystore.com/cdn/shop/products/PP960_eren_repkg_01.jpg",
        "https://hubbytetoystore.com/cdn/shop/products/PP960_eren_repkg_01.jpg",
        "https://hubbytetoystore.com/cdn/shop/products/PP960_eren_repkg_01.jpg",
        "https://hubbytetoystore.com/cdn/shop/products/PP960_eren_repkg_01.jpg"
      ],
      image: "https://hubbytetoystore.com/cdn/shop/products/PP960_eren_repkg_01.jpg",
      rating: 4.9,
      reviewCount: 89,
      stock: 8,
      scale: "1/7",
      height: "26cm",
      weight: "420g",
      material: "PVC, ABS",
      manufacturer: "Kotobukiya",
      series: "Attack on Titan",
      character: "Eren Yeager",
      releaseDate: "November 2023",
      category: "anime",
      sku: "KOT-AOT-ERE-001",
      barcode: "4934054013456",
      isNew: false,
      onSale: false,
      isLimited: true,
      features: [
        "Interchangeable parts included",
        "Multiple display options",
        "High-quality sculpting",
        "Premium paint application",
        "Official licensed product",
        "Collector's packaging"
      ]
    },
    {
      id: 3,
      name: "S.H.Figuarts Naruto Shippuden Uzumaki Naruto Sage Mode",
      brand: "Banpresto",
      franchise: "Naruto",
      description: "Detailed figure featuring Naruto in his iconic Sage Mode",
      price: 3899,
      images: [
        "https://hyper-toys.com/shop/s-h-figuarts-naruto-shippuden-uzumaki-naruto-sage-mode-savior-of-konoha/",
        "https://hyper-toys.com/shop/s-h-figuarts-naruto-shippuden-uzumaki-naruto-sage-mode-savior-of-konoha/",
        "https://hyper-toys.com/shop/s-h-figuarts-naruto-shippuden-uzumaki-naruto-sage-mode-savior-of-konoha/",
        "https://hyper-toys.com/shop/s-h-figuarts-naruto-shippuden-uzumaki-naruto-sage-mode-savior-of-konoha/"
      ],
      image: "https://hyper-toys.com/shop/s-h-figuarts-naruto-shippuden-uzumaki-naruto-sage-mode-savior-of-konoha/",
      rating: 4.7,
      reviewCount: 156,
      stock: 22,
      scale: "1/8",
      height: "21cm",
      weight: "300g",
      material: "PVC",
      manufacturer: "Banpresto",
      series: "Naruto Shippuden",
      character: "Naruto Uzumaki",
      releaseDate: "October 2023",
      category: "anime",
      sku: "BAN-NAR-SAG-001",
      barcode: "4983164168234",
      isNew: true,
      onSale: false,
      isLimited: false,
      features: [
        "Sage Mode design",
        "Dynamic pose",
        "Detailed sculpting",
        "Official Banpresto quality",
        "Perfect for display",
        "Authentic character likeness"
      ]
    },
    {
      id: 4,
      name: "Portrait of Pirates One Piece Monkey D. Luffy",
      brand: "Megahouse",
      franchise: "One Piece",
      description: "Portrait of Pirates series with exceptional attention to detail",
      price: 8299,
      images: [
        "https://m.media-amazon.com/images/I/61La4QK5NXL._AC_SX679_.jpg",
        "https://m.media-amazon.com/images/I/61La4QK5NXL._AC_SX679_.jpg",
        "https://m.media-amazon.com/images/I/61La4QK5NXL._AC_SX679_.jpg",
        "https://m.media-amazon.com/images/I/61La4QK5NXL._AC_SX679_.jpg"
      ],
      image: "https://m.media-amazon.com/images/I/61La4QK5NXL._AC_SX679_.jpg",
      rating: 4.9,
      reviewCount: 203,
      stock: 5,
      scale: "1/8",
      height: "24cm",
      weight: "380g",
      material: "PVC, ABS",
      manufacturer: "Megahouse",
      series: "One Piece",
      character: "Monkey D. Luffy",
      releaseDate: "September 2023",
      category: "anime",
      sku: "MEG-OP-LUF-001",
      barcode: "4535123827415",
      isNew: false,
      onSale: false,
      isLimited: true,
      features: [
        "Portrait of Pirates series",
        "Exceptional detail",
        "Premium materials",
        "Limited edition",
        "Collector's item",
        "Museum quality"
      ]
    },
    {
      id: 5,
      name: "Hot Toys Spider-Man Advanced Suit Figure",
      brand: "Hot Toys",
      franchise: "Marvel",
      description: "Movie-accurate Spider-Man figure with web accessories",
      price: 16599,
      images: [
        "https://popcollectibles.store/cdn/shop/files/464276671_954218806742132_8335042455641682387_n_1200x1200.jpg?v=1729597356",
        "https://popcollectibles.store/cdn/shop/files/464276671_954218806742132_8335042455641682387_n_1200x1200.jpg?v=1729597356",
        "https://popcollectibles.store/cdn/shop/files/464276671_954218806742132_8335042455641682387_n_1200x1200.jpg?v=1729597356",
        "https://popcollectibles.store/cdn/shop/files/464276671_954218806742132_8335042455641682387_n_1200x1200.jpg?v=1729597356"
      ],
      image: "https://popcollectibles.store/cdn/shop/files/464276671_954218806742132_8335042455641682387_n_1200x1200.jpg?v=1729597356",
      rating: 4.8,
      reviewCount: 67,
      stock: 12,
      scale: "1/6",
      height: "30cm",
      weight: "800g",
      material: "Fabric, PVC, Diecast",
      manufacturer: "Hot Toys",
      series: "Marvel",
      character: "Spider-Man",
      releaseDate: "August 2023",
      category: "action",
      sku: "HT-MAR-SPD-001",
      barcode: "4897011186394",
      isNew: false,
      onSale: false,
      isLimited: false,
      features: [
        "Movie-accurate design",
        "Web accessories included",
        "Premium fabric costume",
        "Articulated joints",
        "Multiple hand options",
        "Display stand included"
      ]
    },
    {
      id: 6,
      name: "Dragon Ball Z Goku Super Saiyan",
      brand: "Bandai",
      franchise: "Dragon Ball",
      description: "Highly detailed Goku figure in Super Saiyan form",
      price: 4399,
      originalPrice: 5499,
      images: [
        "https://m.media-amazon.com/images/I/618yACswqgL._UF894,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/618yACswqgL._UF894,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/618yACswqgL._UF894,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/618yACswqgL._UF894,1000_QL80_.jpg"
      ],
      image: "https://m.media-amazon.com/images/I/618yACswqgL._UF894,1000_QL80_.jpg",
      rating: 4.6,
      reviewCount: 234,
      stock: 18,
      scale: "1/8",
      height: "22cm",
      weight: "320g",
      material: "PVC",
      manufacturer: "Bandai",
      series: "Dragon Ball Z",
      character: "Goku",
      releaseDate: "July 2023",
      category: "anime",
      sku: "BAN-DBZ-GOK-001",
      barcode: "4549660314578",
      isNew: false,
      onSale: true,
      isLimited: false,
      features: [
        "Super Saiyan transformation",
        "Dynamic pose",
        "Detailed hair sculpting",
        "Energy effects included",
        "Official Bandai quality",
        "Perfect for display"
      ]
    },
    {
      id: 7,
      name: "Nendoroid Pokemon Pikachu",
      brand: "Good Smile Company",
      franchise: "Pokemon",
      description: "Adorable Pikachu with multiple expressions and accessories",
      price: 3049,
      images: [
        "https://images.bigbadtoystore.com/images/p/full/2017/07/29081bae-acbf-4479-a15e-742a1dfdd8d6.jpg",
        "https://images.bigbadtoystore.com/images/p/full/2017/07/29081bae-acbf-4479-a15e-742a1dfdd8d6.jpg",
        "https://images.bigbadtoystore.com/images/p/full/2017/07/29081bae-acbf-4479-a15e-742a1dfdd8d6.jpg",
        "https://images.bigbadtoystore.com/images/p/full/2017/07/29081bae-acbf-4479-a15e-742a1dfdd8d6.jpg"
      ],
      image: "https://images.bigbadtoystore.com/images/p/full/2017/07/29081bae-acbf-4479-a15e-742a1dfdd8d6.jpg",
      rating: 4.5,
      reviewCount: 312,
      stock: 25,
      scale: "Nendoroid",
      height: "10cm",
      weight: "150g",
      material: "PVC, ABS",
      manufacturer: "Good Smile Company",
      series: "Pokemon",
      character: "Pikachu",
      releaseDate: "June 2023",
      category: "collectibles",
      sku: "GSC-POK-PIK-001",
      barcode: "4580416906685",
      isNew: true,
      onSale: false,
      isLimited: false,
      features: [
        "Multiple expressions",
        "Interchangeable parts",
        "Adorable design",
        "High-quality Nendoroid",
        "Perfect for collectors",
        "Accessories included"
      ]
    },
    {
      id: 8,
      name: "Batman Dark Knight Figure",
      brand: "Queen Studios",
      franchise: "DC Comics",
      description: "Premium statue with incredible detail and craftsmanship",
      price: 22199,
      images: [
        "https://hubbytetoystore.com/cdn/shop/products/07_ec7d24de-57d7-4727-8c15-473128dfd787.jpg",
        "https://hubbytetoystore.com/cdn/shop/products/07_ec7d24de-57d7-4727-8c15-473128dfd787.jpg",
        "https://hubbytetoystore.com/cdn/shop/products/07_ec7d24de-57d7-4727-8c15-473128dfd787.jpg",
        "https://hubbytetoystore.com/cdn/shop/products/07_ec7d24de-57d7-4727-8c15-473128dfd787.jpg"
      ],
      image: "https://hubbytetoystore.com/cdn/shop/products/07_ec7d24de-57d7-4727-8c15-473128dfd787.jpg",
      rating: 4.9,
      reviewCount: 45,
      stock: 3,
      scale: "1/3",
      height: "45cm",
      weight: "2500g",
      material: "Polystone, Fabric",
      manufacturer: "Queen Studios",
      series: "DC Comics",
      character: "Batman",
      releaseDate: "May 2023",
      category: "action",
      sku: "QS-DC-BAT-001",
      barcode: "6971272630147",
      isNew: false,
      onSale: false,
      isLimited: true,
      features: [
        "Museum quality craftsmanship",
        "Incredible detail",
        "Premium materials",
        "Limited edition",
        "Collector's piece",
        "Certificate of authenticity"
      ]
    },
    {
      id: 9,
      name: "Final Fantasy VII Remake Cloud Strife Figure",
      brand: "Square Enix",
      franchise: "Final Fantasy",
      description: "Iconic Cloud figure with Buster Sword and detailed armor",
      price: 10549,
      originalPrice: 12199,
      images: [
        "https://img.oggettifantastici.com/2025/01/x_sqexff07zz379.jpg",
        "https://img.oggettifantastici.com/2025/01/x_sqexff07zz379.jpg",
        "https://img.oggettifantastici.com/2025/01/x_sqexff07zz379.jpg",
        "https://img.oggettifantastici.com/2025/01/x_sqexff07zz379.jpg"
      ],
      image: "https://img.oggettifantastici.com/2025/01/x_sqexff07zz379.jpg",
      rating: 4.7,
      reviewCount: 98,
      stock: 7,
      scale: "1/7",
      height: "28cm",
      weight: "650g",
      material: "PVC, ABS",
      manufacturer: "Square Enix",
      series: "Final Fantasy VII",
      character: "Cloud Strife",
      releaseDate: "April 2023",
      category: "gaming",
      sku: "SE-FF7-CLD-001",
      barcode: "4988601343989",
      isNew: false,
      onSale: true,
      isLimited: false,
      features: [
        "Buster Sword included",
        "Detailed armor",
        "High-quality sculpting",
        "Official Square Enix",
        "Gaming collectible",
        "Display base included"
      ]
    },
    {
      id: 10,
      name: "Figuarts ZERO Sailor Moon Eternal",
      brand: "Bandai",
      franchise: "Sailor Moon",
      description: "Beautiful Sailor Moon figure in her Eternal form",
      price: 6649,
      images: [
        "https://tamashiiweb.com/images/item/item_0000013875_LfYgq7nz_01.jpg",
        "https://tamashiiweb.com/images/item/item_0000013875_LfYgq7nz_01.jpg",
        "https://tamashiiweb.com/images/item/item_0000013875_LfYgq7nz_01.jpg",
        "https://tamashiiweb.com/images/item/item_0000013875_LfYgq7nz_01.jpg"
      ],
      image: "https://tamashiiweb.com/images/item/item_0000013875_LfYgq7nz_01.jpg",
      rating: 4.8,
      reviewCount: 167,
      stock: 11,
      scale: "1/8",
      height: "25cm",
      weight: "400g",
      material: "PVC, ABS",
      manufacturer: "Bandai",
      series: "Sailor Moon",
      character: "Sailor Moon",
      releaseDate: "March 2023",
      category: "anime",
      sku: "BAN-SM-ETR-001",
      barcode: "4573102615893",
      isNew: true,
      onSale: false,
      isLimited: false,
      features: [
        "Eternal form design",
        "Beautiful sculpting",
        "Detailed costume",
        "Figuarts ZERO quality",
        "Perfect for display",
        "Official Bandai product"
      ]
    },
    {
      id: 11,
      name: "Hot Toys Iron Man Mark 85 Diecast",
      brand: "Hot Toys",
      franchise: "Marvel",
      description: "Premium diecast figure with LED features and accessories",
      price: 24949,
      images: [
        "https://i.pinimg.com/736x/08/04/19/08041945ce7639185169aadbaca33a16.jpg",
        "https://i.pinimg.com/736x/08/04/19/08041945ce7639185169aadbaca33a16.jpg",
        "https://i.pinimg.com/736x/08/04/19/08041945ce7639185169aadbaca33a16.jpg",
        "https://i.pinimg.com/736x/08/04/19/08041945ce7639185169aadbaca33a16.jpg"
      ],
      image: "https://i.pinimg.com/736x/08/04/19/08041945ce7639185169aadbaca33a16.jpg",
      rating: 4.9,
      reviewCount: 78,
      stock: 4,
      scale: "1/6",
      height: "32cm",
      weight: "1200g",
      material: "Diecast, PVC, Fabric",
      manufacturer: "Hot Toys",
      series: "Marvel",
      character: "Iron Man",
      releaseDate: "February 2023",
      category: "action",
      sku: "HT-MAR-IM85-001",
      barcode: "4897011186486",
      isNew: false,
      onSale: false,
      isLimited: true,
      features: [
        "LED light features",
        "Diecast construction",
        "Premium accessories",
        "Movie-accurate design",
        "Limited edition",
        "Certificate included"
      ]
    },
    {
      id: 12,
      name: "Good Smile Racing Hatsune Miku 2019 Ver.",
      brand: "Good Smile Company",
      franchise: "Vocaloid",
      description: "Special racing version of the popular virtual singer",
      price: 7749,
      originalPrice: 8849,
      images: [
        "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/product/image/36455/nz9XrQND4gYt86pVsHGULdSM0weCAhvT.jpg",
        "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/product/image/36455/nz9XrQND4gYt86pVsHGULdSM0weCAhvT.jpg",
        "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/product/image/36455/nz9XrQND4gYt86pVsHGULdSM0weCAhvT.jpg",
        "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/product/image/36455/nz9XrQND4gYt86pVsHGULdSM0weCAhvT.jpg"
      ],
      image: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/product/image/36455/nz9XrQND4gYt86pVsHGULdSM0weCAhvT.jpg",
      rating: 4.6,
      reviewCount: 145,
      stock: 9,
      scale: "1/8",
      height: "23cm",
      weight: "370g",
      material: "PVC, ABS",
      manufacturer: "Good Smile Company",
      series: "Vocaloid",
      character: "Hatsune Miku",
      releaseDate: "January 2023",
      category: "anime",
      sku: "GSC-VOC-MIK-001",
      barcode: "4580416906777",
      isNew: false,
      onSale: true,
      isLimited: false,
      features: [
        "Racing theme design",
        "Special 2019 version",
        "High-quality sculpting",
        "Good Smile Racing",
        "Collectible item",
        "Display stand included"
      ]
    }
  ];

  // Find the specific product based on ID
  const getProductById = (productId) => {
    return allProducts.find(p => p.id === parseInt(productId)) || allProducts[0];
  };

  const currentProduct = getProductById(id);

  // Enhanced product specifications
  const getProductSpecs = (product) => ({
    "Product Code": product.sku,
    "Scale": product.scale,
    "Height": `Approximately ${product.height}`,
    "Weight": product.weight,
    "Material": product.material,
    "Manufacturer": product.manufacturer,
    "Series": product.series,
    "Character": product.character,
    "Release Date": product.releaseDate,
    "Origin": "Japan",
    "Age Rating": "15+",
    "Package Dimensions": "25 x 18 x 15 cm"
  });

  const sampleProduct = {
    ...currentProduct,
    specifications: getProductSpecs(currentProduct),
    shippingInfo: {
      "Standard Shipping": "5-7 business days",
      "Express Shipping": "2-3 business days",
      "International": "10-15 business days",
      "Free Shipping": "Orders over ₱4,000"
    },
    isNew: currentProduct.isNew,
    isNew: currentProduct.isNew,
    onSale: currentProduct.onSale,
    isLimited: currentProduct.isLimited
  };

  // Get related products (same category, excluding current product)
  const getRelatedProducts = (currentProduct) => {
    return allProducts
      .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
      .slice(0, 4);
  };

  const relatedProducts = getRelatedProducts(currentProduct);

  const reviews = [
    {
      id: 1,
      user: "AnimeCollector92",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      date: "2024-01-15",
      verified: true,
      title: "Outstanding Quality!",
      comment: "Absolutely stunning figure! The details are incredible and the paint job is flawless. The packaging was also excellent. Definitely worth the price and would recommend to any Demon Slayer fan.",
      helpful: 23,
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop"]
    },
    {
      id: 2,
      user: "FigureFanatic",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      rating: 4,
      date: "2024-01-10",
      verified: true,
      title: "Great figure, minor issues",
      comment: "Great quality figure, though shipping took a bit longer than expected. The figure itself exceeded my expectations. Small paint imperfection on the back but barely noticeable.",
      helpful: 15,
      images: []
    },
    {
      id: 3,
      user: "DemonSlayerFan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      date: "2024-01-05",
      verified: false,
      title: "Perfect addition to collection",
      comment: "Perfect addition to my Demon Slayer collection. The pose and expression capture Tanjiro perfectly! Will definitely be buying more from this series.",
      helpful: 31,
      images: []
    },
    {
      id: 4,
      user: "CollectorPro",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      rating: 5,
      date: "2023-12-28",
      verified: true,
      title: "Museum quality",
      comment: "This figure is museum quality. Every detail is perfect, from the facial expression to the intricate patterns on his haori. Good Smile Company outdid themselves.",
      helpful: 42,
      images: ["https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=100&h=100&fit=crop"]
    },
    {
      id: 5,
      user: "AnimeFigures",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c14e?w=40&h=40&fit=crop&crop=face",
      rating: 4,
      date: "2023-12-20",
      verified: true,
      title: "Solid purchase",
      comment: "Solid purchase overall. The figure looks exactly like the promotional images. Packaging could be better but the figure itself is pristine.",
      helpful: 18,
      images: []
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProduct(sampleProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (isInCart(product.id)) {
      setShowAlreadyInCartDialog(true);
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const handleConfirmAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setShowAlreadyInCartDialog(false);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400 opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }

    return stars;
  };

  const calculateAverageRating = () => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-800">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = calculateAverageRating();
  const ratingDistribution = getRatingDistribution();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <Link to={`/categories/${product.category}`} className="text-gray-500 hover:text-gray-700">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-md overflow-hidden relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover object-top cursor-zoom-in"
                onClick={() => setShowZoom(true)}
              />
              <button
                onClick={() => setShowZoom(true)}
                className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.isNew && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  New
                </span>
              )}
              {product.onSale && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  Sale
                </span>
              )}
              {product.isLimited && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Limited Edition
                </span>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {renderStars(parseFloat(averageRating))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {averageRating} ({reviews.length} reviews)
                </span>
              </div>

              {/* SKU */}
              <p className="text-sm text-gray-500 mb-4">SKU: {product.sku}</p>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {product.onSale && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  Save {calculateSavings(product.originalPrice, product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Scale:</span>
                <span className="font-medium">{product.scale}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Height:</span>
                <span className="font-medium">{product.height}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Material:</span>
                <span className="font-medium">{product.material}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">Stock:</span>
                <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isInCart(product.id)
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.stock === 0 ? 'Out of Stock' : isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
                
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isFavorite(product.id)
                      ? 'bg-red-50 border-red-300 text-red-600'
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                </button>
                
                <button 
                  onClick={handleShare}
                  className="p-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center text-sm text-blue-800">
                <Truck className="h-5 w-5 mr-2" />
                <span>Free shipping on orders over ₱4,000</span>
              </div>
              <div className="flex items-center text-sm text-blue-800">
                <Shield className="h-5 w-5 mr-2" />
                <span>Authentic guarantee</span>
              </div>
              <div className="flex items-center text-sm text-blue-800">
                <RefreshCw className="h-5 w-5 mr-2" />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['description', 'specifications', 'shipping', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'specifications' ? 'Specs' : tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                  
                  <h4 className="text-md font-semibold mb-3">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Shipping Options</h4>
                    <div className="space-y-2">
                      {Object.entries(product.shippingInfo).map(([method, time]) => (
                        <div key={method} className="flex justify-between py-2">
                          <span className="text-gray-700">{method}:</span>
                          <span className="text-gray-600">{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Important Notes</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Items are carefully packaged to prevent damage</li>
                      <li>• Tracking information provided for all orders</li>
                      <li>• Signature may be required for high-value items</li>
                      <li>• International orders may incur customs fees</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Rating Summary */}
                  <div className="lg:w-1/3">
                    <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="text-center mb-4">
                        <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating}</div>
                        <div className="flex justify-center mb-2">
                          {renderStars(parseFloat(averageRating))}
                        </div>
                        <div className="text-sm text-gray-600">Based on {reviews.length} reviews</div>
                      </div>
                      
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map(stars => (
                          <div key={stars} className="flex items-center">
                            <span className="text-sm w-3">{stars}</span>
                            <Star className="h-4 w-4 text-yellow-400 mx-1" />
                            <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full" 
                                style={{ width: `${(ratingDistribution[stars] / reviews.length) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm w-6 text-gray-600">{ratingDistribution[stars]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="lg:w-2/3">
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={review.avatar} 
                              alt={review.user}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-900">{review.user}</span>
                                  {review.verified && (
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                      <Check className="h-3 w-3 mr-1" />
                                      Verified
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              
                              <div className="flex items-center mb-2">
                                <div className="flex mr-2">
                                  {renderStars(review.rating)}
                                </div>
                                {review.title && (
                                  <h4 className="font-medium text-gray-900">{review.title}</h4>
                                )}
                              </div>
                              
                              <p className="text-gray-700 mb-3">{review.comment}</p>
                              
                              {review.images.length > 0 && (
                                <div className="flex space-x-2 mb-3">
                                  {review.images.map((image, index) => (
                                    <img 
                                      key={index}
                                      src={image} 
                                      alt={`Review image ${index + 1}`}
                                      className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80"
                                    />
                                  ))}
                                </div>
                              )}
                              
                              <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                                <span>Helpful ({review.helpful})</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        Write a Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 3).map((recentProduct) => (
              <ProductCard key={`recent-${recentProduct.id}`} product={recentProduct} />
            ))}
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {showZoom && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowZoom(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Mobile Sticky Add to Cart */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <div className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</div>
            <div className="text-sm text-gray-600 truncate">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
          </div>
          <button
            onClick={() => toggleFavorite(product)}
            className={`p-3 rounded-lg border transition-colors flex-shrink-0 ${
              isFavorite(product.id)
                ? 'bg-red-50 border-red-300 text-red-600'
                : 'bg-white border-gray-300 text-gray-600'
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isInCart(product.id)
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Already in Cart Dialog */}
      <Dialog
        isOpen={showAlreadyInCartDialog}
        onClose={() => setShowAlreadyInCartDialog(false)}
        title="Already in Cart"
        description={`This item is already in your cart. Would you like to add ${quantity} more?`}
        icon={ShoppingCart}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
        primaryAction={{
          label: `Add ${quantity} More`,
          onClick: handleConfirmAddToCart,
          className: "bg-yellow-500 text-black hover:bg-yellow-400"
        }}
        secondaryAction={{
          label: "Cancel"
        }}
      />
    </div>
  );
};

export default ProductDetails;