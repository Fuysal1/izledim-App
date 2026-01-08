import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import { searchMovies } from '../../services/api';
import MovieCard from '../../components/MovieCard';
import { COLORS } from '../../styles/colors';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const movies = await searchMovies(query);
      setResults(movies);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Film ara..."
          placeholderTextColor={COLORS.textSecondary}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch} // Klavyede "Ara"ya basınca
          returnKeyType="search"
        />
      </View>

      <FlatList
        data={results}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })} />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2} // İki sütunlu liste
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  searchBox: { padding: 16, backgroundColor: COLORS.secondary },
  input: { backgroundColor: COLORS.card, padding: 12, borderRadius: 8, color: COLORS.text },
  list: { padding: 16, alignItems: 'center' },
});

export default SearchScreen;