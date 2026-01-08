import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { COLORS } from '../styles/colors';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.secondary },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitleVisible: false, // iOS'te "Geri" yazısını gizle
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} // Giriş ekranında üst bar olmasın
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ title: 'Hesap Oluştur' }} 
      />
    </Stack.Navigator>
  );
};

export default AuthStack;