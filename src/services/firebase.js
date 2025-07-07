// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGtDqccQvo_9o8IlhIpy4Hno8ZP2HWfP4",
  authDomain: "figuro-b431d.firebaseapp.com",
  projectId: "figuro-b431d",
  storageBucket: "figuro-b431d.firebasestorage.app",
  messagingSenderId: "1098824391128",
  appId: "1:1098824391128:web:a11efcb7f0f1f445a27aad",
  measurementId: "G-KJNV52V0G1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
