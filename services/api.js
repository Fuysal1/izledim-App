import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../utils/constants';

// 1. Axios İstemcisi (Client) Oluşturma
// Her istekte tekrar tekrar ayar yapmamak için genel bir yapı kuruyoruz.
const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 10000, // 10 saniye cevap gelmezse iptal et (Uygulama donmasın)
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor (İstek Yakalayıcı)
// Biz her istek attığımızda bu kod araya girer ve API Key'i otomatik ekler.
apiClient.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      api_key: TMDB_API_KEY, // Anahtarı ekledik
      language: 'tr-TR', // Veriler Türkçe gelsin
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==================== API FONKSİYONLARI ====================

// Popüler Filmleri Getir (Ana Sayfa)
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await apiClient.get('/movie/popular', {
      params: { page },
    });
    return response.data.results;
  } catch (error) {
    console.error('Popüler filmler hatası:', error);
    throw error;
  }
};

// Vizyondaki Filmleri Getir (Ana Sayfa)
export const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await apiClient.get('/movie/now_playing', {
      params: { page },
    });
    return response.data.results;
  } catch (error) {
    console.error('Vizyon filmleri hatası:', error);
    throw error;
  }
};

// Film Detayını Getir (Detay Sayfası)
export const getMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Detay hatası:', error);
    throw error;
  }
};

// Film Arama (Arama Sayfası)
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await apiClient.get('/search/movie', {
      params: { query, page },
    });
    return response.data.results;
  } catch (error) {
    console.error('Arama hatası:', error);
    throw error;
  }
};

export default apiClient;