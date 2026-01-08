import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { COLORS } from '../../styles/colors';

const ProfileScreen = () => {
  const handleLogout = () => {
    Alert.alert('Çıkış', 'Çıkış yapmak istediğine emin misin?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Çıkış Yap', style: 'destructive', onPress: () => signOut(auth) }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Giriş Yapılan E-posta:</Text>
        <Text style={styles.email}>{auth.currentUser?.email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', padding: 20 },
  infoBox: { marginBottom: 40, alignItems: 'center' },
  label: { color: COLORS.textSecondary, marginBottom: 10 },
  email: { color: COLORS.text, fontSize: 20, fontWeight: 'bold' },
  logoutButton: { backgroundColor: COLORS.error, padding: 16, borderRadius: 8, alignItems: 'center' },
  logoutText: { color: COLORS.text, fontWeight: 'bold', fontSize: 16 },
});

export default ProfileScreen;