// src/context/FavoritesContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

// Favorites actions
const FAVORITES_ACTIONS = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  LOAD_FAVORITES: 'LOAD_FAVORITES',
  CLEAR_FAVORITES: 'CLEAR_FAVORITES'
};

// Favorites reducer
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case FAVORITES_ACTIONS.ADD_FAVORITE:
      if (state.items.find(item => item.id === action.payload.id)) {
        return state; // Item already in favorites
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case FAVORITES_ACTIONS.REMOVE_FAVORITE:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case FAVORITES_ACTIONS.LOAD_FAVORITES:
      return {
        ...state,
        items: action.payload
      };

    case FAVORITES_ACTIONS.CLEAR_FAVORITES:
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { items: [] });
  const { currentUser } = useAuth();

  // Save favorites to Firestore
  const saveFavoritesToFirestore = async (items) => {
    if (currentUser) {
      try {
        await setDoc(doc(db, 'favorites', currentUser.uid), {
          items: items,
          updatedAt: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error saving favorites to Firestore:', error);
      }
    }
  };

  // Load favorites from Firestore when user logs in
  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(doc(db, 'favorites', currentUser.uid), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          dispatch({ type: FAVORITES_ACTIONS.LOAD_FAVORITES, payload: data.items || [] });
        }
      });

      return () => unsubscribe();
    } else {
      // If no user, load from localStorage
      const savedFavorites = localStorage.getItem('figurine-favorites');
      if (savedFavorites) {
        try {
          const parsedFavorites = JSON.parse(savedFavorites);
          dispatch({ type: FAVORITES_ACTIONS.LOAD_FAVORITES, payload: parsedFavorites });
        } catch (error) {
          console.error('Error loading favorites from localStorage:', error);
        }
      }
    }
  }, [currentUser]);

  // Save favorites to Firestore and localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      saveFavoritesToFirestore(state.items);
    } else {
      localStorage.setItem('figurine-favorites', JSON.stringify(state.items));
    }
  }, [state.items, currentUser]);

  // Add item to favorites
  const addFavorite = (item) => {
    dispatch({ type: FAVORITES_ACTIONS.ADD_FAVORITE, payload: item });
  };

  // Remove item from favorites
  const removeFavorite = (itemId) => {
    dispatch({ type: FAVORITES_ACTIONS.REMOVE_FAVORITE, payload: itemId });
  };

  // Clear all favorites
  const clearFavorites = () => {
    dispatch({ type: FAVORITES_ACTIONS.CLEAR_FAVORITES });
  };

  // Check if item is in favorites
  const isFavorite = (itemId) => {
    return state.items.some(item => item.id === itemId);
  };

  // Toggle favorite status
  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  const value = {
    favorites: state.items,
    addFavorite,
    removeFavorite,
    clearFavorites,
    isFavorite,
    toggleFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};