// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  const signup = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      
      // Try to create user document in Firestore - don't fail signup if this fails
      try {
        await setDoc(doc(db, 'users', result.user.uid), {
          email: email,
          displayName: displayName,
          phone: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        
        // Initialize empty cart for the user
        await setDoc(doc(db, 'carts', result.user.uid), {
          items: [],
          updatedAt: new Date().toISOString()
        });
        
        // Initialize empty favorites for the user
        await setDoc(doc(db, 'favorites', result.user.uid), {
          items: [],
          updatedAt: new Date().toISOString()
        });
      } catch (firestoreError) {
        console.warn('Firestore operations failed during signup (user account still created):', firestoreError);
        // Don't throw here - user account was successfully created
      }
      
      return result;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  };

  // Sign in function
  const signin = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  // Sign out function
  const logout = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      if (currentUser) {
        // Update Firebase Auth profile
        if (updates.displayName) {
          await updateProfile(currentUser, { displayName: updates.displayName });
        }
        
        if (updates.email && updates.email !== currentUser.email) {
          await updateEmail(currentUser, updates.email);
        }
        
        if (updates.password) {
          await updatePassword(currentUser, updates.password);
        }
        
        // Update Firestore user document
        const userRef = doc(db, 'users', currentUser.uid);
        const updateData = {
          updatedAt: new Date().toISOString()
        };
        
        // Only include non-password fields for Firestore
        if (updates.displayName !== undefined) updateData.displayName = updates.displayName;
        if (updates.email !== undefined) updateData.email = updates.email;
        if (updates.phone !== undefined) updateData.phone = updates.phone;
        if (updates.dateOfBirth !== undefined) updateData.dateOfBirth = updates.dateOfBirth;
        if (updates.gender !== undefined) updateData.gender = updates.gender;
        if (updates.bio !== undefined) updateData.bio = updates.bio;
        if (updates.address !== undefined) updateData.address = updates.address;
        
        await updateDoc(userRef, updateData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Get user data from Firestore
  const getUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  };

  // Get current user's full profile from Firestore
  const getCurrentUserProfile = async () => {
    try {
      if (currentUser) {
        return await getUserData(currentUser.uid);
      }
      return null;
    } catch (error) {
      console.error('Error getting current user profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    updateUserProfile,
    getUserData,
    getCurrentUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};