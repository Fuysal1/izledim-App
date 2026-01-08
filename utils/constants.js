// src/utils/constants.js

// TMDB API Ayarları

export const TMDB_API_KEY = '6fee9d853c9059d91d0a38dd7acaef8f'; 
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Resim URL'leri
// TMDB bize resim adını "/resim.jpg" diye verir, başına bu linkleri ekleriz.
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Liste için (Hızlı)
export const TMDB_BACKDROP_URL = 'https://image.tmdb.org/t/p/original'; // Detay için (HD)

// Filmin resmi yoksa gösterilecek yedek resim
export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/500x750?text=No+Image';