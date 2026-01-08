import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase'; // Ayarladığımız Firebase'i çağırdık
import { COLORS } from '../../styles/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Giriş Yap Butonuna Basılınca
  const handleLogin = async () => {
    // 1. Boş alan kontrolü
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    setLoading(true);
    try {
      // 2. Firebase'e sor: Bu kullanıcı var mı?
      await signInWithEmailAndPassword(auth, email, password);
      // Başarılıysa Navigasyon (AppNavigator) otomatik olarak Ana Sayfaya atacak.
      // O yüzden burada "navigation.navigate" dememize gerek yok.
    } catch (error) {
      // 3. Hata varsa kullanıcıya söyle
      let errorMessage = 'Giriş yapılamadı.';
      
      if (error.code === 'auth/user-not-found') errorMessage = 'Bu e-posta ile kayıtlı kullanıcı yok.';
      if (error.code === 'auth/wrong-password') errorMessage = 'Şifre hatalı.';
      if (error.code === 'auth/invalid-email') errorMessage = 'Geçersiz e-posta formatı.';
      
      Alert.alert('Giriş Hatası', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>İzledim</Text>
        <Text style={styles.subtitle}>Film ve dizilerini takip et</Text>

        {/* E-posta Kutusu */}
        <TextInput
          style={styles.input}
          placeholder="E-posta Adresi"
          placeholderTextColor={COLORS.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Şifre Kutusu */}
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor={COLORS.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry // Şifreyi gizle (****)
        />

        {/* Giriş Butonu */}
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Text>
        </TouchableOpacity>

        {/* Kayıt Ol Linki */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>
            Hesabın yok mu? <Text style={styles.linkBold}>Kayıt Ol</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary, // Netflix Kırmızısı
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 48,
  },
  input: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
  },
  linkBold: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default LoginScreen;