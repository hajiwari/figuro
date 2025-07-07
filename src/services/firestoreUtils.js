// src/services/firestoreUtils.js
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from './firebase';

// User Profile Operations
export const createUserProfile = async (userId, profileData) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Cart Operations
export const saveUserCart = async (userId, cartItems) => {
  try {
    await setDoc(doc(db, 'carts', userId), {
      items: cartItems,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving cart:', error);
    throw error;
  }
};

export const getUserCart = async (userId) => {
  try {
    const cartDoc = await getDoc(doc(db, 'carts', userId));
    return cartDoc.exists() ? cartDoc.data().items : [];
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
};

// Favorites Operations
export const saveUserFavorites = async (userId, favoriteItems) => {
  try {
    await setDoc(doc(db, 'favorites', userId), {
      items: favoriteItems,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving favorites:', error);
    throw error;
  }
};

export const getUserFavorites = async (userId) => {
  try {
    const favoritesDoc = await getDoc(doc(db, 'favorites', userId));
    return favoritesDoc.exists() ? favoritesDoc.data().items : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    throw error;
  }
};

// Order Operations
export const createOrder = async (orderData) => {
  try {
    const orderRef = doc(collection(db, 'orders'));
    await setDoc(orderRef, {
      ...orderData,
      id: orderRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return orderRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getUserOrders = async (userId) => {
  try {
    const ordersQuery = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const ordersSnapshot = await getDocs(ordersQuery);
    return ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting user orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Product Operations (for future use)
export const getProducts = async (filters = {}) => {
  try {
    let productsQuery = collection(db, 'products');
    
    if (filters.category) {
      productsQuery = query(productsQuery, where('category', '==', filters.category));
    }
    
    if (filters.brand) {
      productsQuery = query(productsQuery, where('brand', '==', filters.brand));
    }
    
    const productsSnapshot = await getDocs(productsQuery);
    return productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

export const getProduct = async (productId) => {
  try {
    const productDoc = await getDoc(doc(db, 'products', productId));
    return productDoc.exists() ? { id: productDoc.id, ...productDoc.data() } : null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};
