import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

const RatingBadge = ({ rating }) => {
  // Puana göre renk belirleme mantığı
  const getBadgeColor = () => {
    if (rating >= 7) return COLORS.success; // 7 ve üstü Yeşil
    if (rating >= 5) return COLORS.warning; // 5-7 arası Sarı
    return COLORS.error; // 5 altı Kırmızı
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
      <Text style={styles.ratingText}>
        {rating.toFixed(1)} {/* Tek ondalık basamak göster (7.4 gibi) */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default RatingBadge;