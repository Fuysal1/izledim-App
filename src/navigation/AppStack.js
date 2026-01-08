import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; // Expo kullanıyorsan bu
// Eğer Expo değilse: import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../styles/colors';

// Ekranlar
import HomeScreen from '../screens/app/HomeScreen';
import SearchScreen from '../screens/app/SearchScreen';
import WatchlistScreen from '../screens/app/WatchlistScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import MovieDetailScreen from '../screens/app/MovieDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// İç içe navigasyon: Ana Sayfa'dan Detay'a geçiş için
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.secondary },
      headerTintColor: COLORS.text,
    }}
  >
    <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'İzledim' }} />
    <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Film Detayı' }} />
  </Stack.Navigator>
);

// Arama Sekmesi için Stack (Detay sayfasına gidebilmek için)
const SearchStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.secondary },
      headerTintColor: COLORS.text,
    }}
  >
    <Stack.Screen name="SearchMain" component={SearchScreen} options={{ title: 'Keşfet' }} />
    <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Film Detayı' }} />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Ana Sayfa') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Ara') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Listem') iconName = focused ? 'bookmark' : 'bookmark-outline';
          else if (route.name === 'Profil') iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: { backgroundColor: COLORS.secondary, borderTopColor: COLORS.card },
        headerShown: false, // Header'ı Stack Navigator'a bıraktık
      })}
    >
      <Tab.Screen name="Ana Sayfa" component={HomeStack} />
      <Tab.Screen name="Ara" component={SearchStack} />
      <Tab.Screen name="Listem" component={WatchlistScreen} options={{ headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.text, headerShown: true }} />
      <Tab.Screen name="Profil" component={ProfileScreen} options={{ headerStyle: { backgroundColor: COLORS.secondary }, headerTintColor: COLORS.text, headerShown: true }} />
    </Tab.Navigator>
  );
};

export default AppStack;