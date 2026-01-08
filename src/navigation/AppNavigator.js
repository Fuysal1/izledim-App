import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import LoadingSpinner from '../components/LoadingSpinner';

const AppNavigator = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase dinleyicisi: Kullanıcı giriş/çıkış yaptığında tetiklenir
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe; // Uygulama kapanınca dinlemeyi durdur
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <NavigationContainer>
      {/* Kullanıcı varsa Ana Sayfa, yoksa Login ekranı */}
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;