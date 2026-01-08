import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TMDB_IMAGE_BASE_URL, PLACEHOLDER_IMAGE } from '../utils/constants';
import { COLORS } from '../styles/colors';
import RatingBadge from './RatingBadge';

const MovieCard = ({ movie, onPress }) => {
  // Eğer poster varsa linki oluştur, yoksa yedek resmi kullan
  const imageUrl = movie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : PLACEHOLDER_IMAGE;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Film Posteri */}
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.poster}
        resizeMode="cover"
      />
      
      {/* Sağ üst köşeye puan rozetini koyuyoruz */}
      {movie.vote_average > 0 && (
        <View style={styles.ratingContainer}>
          <RatingBadge rating={movie.vote_average} />
        </View>
      )}
      
      {/* Film Bilgileri */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        
        {/* Çıkış Yılı */}
        {movie.release_date && (
          <Text style={styles.year}>
            {movie.release_date.split('-')[0]}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,     // Kart genişliği
    marginRight: 12, // Kartlar arası boşluk
    marginBottom: 16,
  },
  poster: {
    width: '100%',
    height: 210,
    borderRadius: 8,
    backgroundColor: COLORS.card,
  },
  ratingContainer: {
    position: 'absolute', // Resmin üzerine bindirmek için
    top: 8,
    right: 8,
  },
  infoContainer: {
    marginTop: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  year: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default MovieCard;