import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Ekran odaklanınca çalışsın diye
import { auth } from '../../config/firebase';
import { getWatchlist, removeFromWatchlist } from '../../services/firestore';
import MovieCard from '../../components/MovieCard';
import { COLORS } from '../../styles/colors';

const WatchlistScreen = ({ navigation }) => {
  const [watchlist, setWatchlist] = useState([]);

  // Kullanıcı bu sekmeye her tıkladığında listeyi yenile
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const data = await getWatchlist(userId);
      setWatchlist(data);
    }
  };

  const handleLongPress = (movieId) => {
    Alert.alert('Sil', 'Listeden kaldırmak istiyor musun?', [
      { text: 'İptal', style: 'cancel' },
      { 
        text: 'Sil', 
        style: 'destructive', 
        onPress: async () => {
          await removeFromWatchlist(auth.currentUser.uid, movieId);
          loadData(); // Listeyi güncelle
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      {watchlist.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Henüz film eklemedin.</Text>
        </View>
      ) : (
        <FlatList
          data={watchlist}
          renderItem={({ item }) => (
            <TouchableOpacity onLongPress={() => handleLongPress(item.movieId)}>
              <MovieCard 
                movie={{...item, id: item.movieId, poster_path: item.posterPath, vote_average: item.rating}} 
                onPress={() => navigation.navigate('MovieDetail', { movieId: item.movieId })} 
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: 16, alignItems: 'center' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: COLORS.textSecondary, fontSize: 16 },
});

export default WatchlistScreen;