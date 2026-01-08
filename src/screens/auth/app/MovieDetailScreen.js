import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { getMovieDetails } from '../../services/api';
import { addToWatchlist, isInWatchlist } from '../../services/firestore'; // Veritabanı fonksiyonları
import { auth } from '../../config/firebase';
import LoadingSpinner from '../../components/LoadingSpinner';
import RatingBadge from '../../components/RatingBadge';
import { TMDB_IMAGE_BASE_URL, TMDB_BACKDROP_URL, PLACEHOLDER_IMAGE } from '../../utils/constants';
import { COLORS } from '../../styles/colors';

const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params; // Önceki sayfadan gelen Film ID'si
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false); // Listede ekli mi?
  const [addingToList, setAddingToList] = useState(false); // Buton yükleniyor mu?

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 1. Film detayını çek
      const details = await getMovieDetails(movieId);
      setMovie(details);

      // 2. Kullanıcı giriş yapmışsa, listesinde var mı kontrol et
      const userId = auth.currentUser?.uid;
      if (userId) {
        const exists = await isInWatchlist(userId, movieId);
        setInWatchlist(exists);
      }
    } catch (error) {
      Alert.alert('Hata', 'Film detayları yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddButton = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    setAddingToList(true);
    try {
      // Veritabanına kaydet
      await addToWatchlist(userId, movie);
      setInWatchlist(true); // Butonu yeşile çevir
      Alert.alert('Başarılı', 'Listene eklendi!');
    } catch (error) {
      Alert.alert('Hata', 'Listeye eklenirken sorun oluştu.');
    } finally {
      setAddingToList(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!movie) return <View><Text>Film bulunamadı.</Text></View>;

  return (
    <ScrollView style={styles.container}>
      {/* Büyük Arka Plan Resmi */}
      <Image 
        source={{ uri: movie.backdrop_path ? TMDB_BACKDROP_URL + movie.backdrop_path : PLACEHOLDER_IMAGE }} 
        style={styles.backdrop} 
      />

      <View style={styles.content}>
        <View style={styles.headerContainer}>
          {/* Küçük Poster */}
          <Image 
            source={{ uri: movie.poster_path ? TMDB_IMAGE_BASE_URL + movie.poster_path : PLACEHOLDER_IMAGE }} 
            style={styles.poster} 
          />
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.metaRow}>
              <RatingBadge rating={movie.vote_average} />
              <Text style={styles.metaText}>{movie.release_date?.split('-')[0]}</Text>
              <Text style={styles.metaText}>{movie.runtime} dk</Text>
            </View>
          </View>
        </View>

        {/* Ekleme Butonu */}
        <TouchableOpacity
          style={[styles.button, inWatchlist && styles.buttonAdded]}
          onPress={handleAddButton}
          disabled={inWatchlist || addingToList}
        >
          <Text style={styles.buttonText}>
            {inWatchlist ? '✓ Listende Ekli' : '+ Listeme Ekle'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Özet</Text>
        <Text style={styles.overview}>{movie.overview || "Özet bilgisi bulunmuyor."}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  backdrop: { width: '100%', height: 250, opacity: 0.7 },
  content: { padding: 16 },
  headerContainer: { flexDirection: 'row', marginTop: -80, marginBottom: 20 },
  poster: { width: 100, height: 150, borderRadius: 8, borderWidth: 2, borderColor: COLORS.background },
  headerInfo: { flex: 1, marginLeft: 16, justifyContent: 'flex-end' },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  metaText: { color: COLORS.textSecondary },
  button: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 8, alignItems: 'center', marginVertical: 10 },
  buttonAdded: { backgroundColor: COLORS.success },
  buttonText: { color: COLORS.text, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
  overview: { color: COLORS.textSecondary, lineHeight: 22 },
});

export default MovieDetailScreen;