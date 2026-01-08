import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { getPopularMovies, getNowPlayingMovies } from '../../services/api'; // API'yi çağırdık
import MovieCard from '../../components/MovieCard'; // Kart tasarımını çağırdık
import LoadingSpinner from '../../components/LoadingSpinner'; // Dönme efektini çağırdık
import { COLORS } from '../../styles/colors';

const HomeScreen = ({ navigation }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Sayfa açılınca verileri çek
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      // İki isteği aynı anda at (Promise.all ile daha hızlı)
      const [popular, nowPlaying] = await Promise.all([
        getPopularMovies(),
        getNowPlayingMovies(),
      ]);

      setPopularMovies(popular);
      setNowPlayingMovies(nowPlaying);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Ekranı aşağı çekince yenileme özelliği
  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies();
  };

  // Karta tıklayınca Detay sayfasına git
  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
      }
    >
      {/* Bölüm 1: Popüler Filmler */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popüler Filmler</Text>
        <FlatList
          data={popularMovies}
          renderItem={({ item }) => (
            <MovieCard 
              movie={item} 
              onPress={() => handleMoviePress(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal // Yatay kaydırma
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* Bölüm 2: Vizyondakiler */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vizyondakiler</Text>
        <FlatList
          data={nowPlayingMovies}
          renderItem={({ item }) => (
            <MovieCard 
              movie={item} 
              onPress={() => handleMoviePress(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 16,
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});

export default HomeScreen;