import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase'; // Ayarladığımız db bağlantısını çağırdık

// 1. Listeye Ekleme Fonksiyonu
export const addToWatchlist = async (userId, movieData) => {
  try {
    // Veriyi kaydedeceğimiz yol: users -> [KullanıcıID] -> watchlist -> [FilmID]
    const watchlistRef = doc(db, 'users', userId, 'watchlist', String(movieData.id));
    
    // Veriyi yazıyoruz (Varsa üzerine yazar, yoksa oluşturur)
    await setDoc(watchlistRef, {
      movieId: movieData.id,
      title: movieData.title,
      posterPath: movieData.poster_path,
      rating: movieData.vote_average,
      releaseDate: movieData.release_date,
      addedAt: new Date().toISOString(), // Ne zaman eklendi?
    });
    
    console.log('Film listeye eklendi');
    return true;
  } catch (error) {
    console.error('Listeye ekleme hatası:', error);
    throw error;
  }
};

// 2. Bu film zaten listede mi? (Kontrol)
export const isInWatchlist = async (userId, movieId) => {
  try {
    const watchlistRef = doc(db, 'users', userId, 'watchlist', String(movieId));
    const docSnap = await getDoc(watchlistRef);
    return docSnap.exists(); // Varsa true döner
  } catch (error) {
    console.error('Kontrol hatası:', error);
    return false;
  }
};

// 3. Kullanıcının Listesini Getir
export const getWatchlist = async (userId) => {
  try {
    const watchlistRef = collection(db, 'users', userId, 'watchlist');
    // Eklenme tarihine göre sırala (En yeni en üstte)
    const q = query(watchlistRef, orderBy('addedAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    
    // Gelen karışık veriyi düzgün bir listeye çevir
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Liste çekilemedi:', error);
    throw error;
  }
};

// 4. Listeden Sil
export const removeFromWatchlist = async (userId, movieId) => {
  try {
    const watchlistRef = doc(db, 'users', userId, 'watchlist', String(movieId));
    await deleteDoc(watchlistRef);
    return true;
  } catch (error) {
    console.error('Silme hatası:', error);
    throw error;
  }
};