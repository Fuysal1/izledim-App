// src/config/firebase.js

// 1. Firebase kütüphanelerini çağırıyoruz
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 2. Firebase Ayarları 
const firebaseConfig = {
  apiKey: "AIzaSyBPZ_1VO5DscTbGYKnirukto5jL6Pvb9og",
  authDomain: "izledimapp-d3302.firebaseapp.com",
  projectId: "izledimapp-d3302",
  storageBucket: "izledimapp-d3302.firebasestorage.app",
  messagingSenderId: "888769327932",
  appId: "1:888769327932:web:f80776c10bba5314af6439",
  measurementId: "G-BWPPKXPYV8"
};

// 3. Uygulamayı başlatıyoruz (Initialize)
const app = initializeApp(firebaseConfig);

// 4. Servisleri dışarıya açıyoruz (Export)
// Authentication servisi (Giriş/Çıkış işlemleri için)
export const auth = getAuth(app);

// Firestore Veritabanı servisi (Veri kaydetmek/çekmek için)
export const db = getFirestore(app);

export default app;