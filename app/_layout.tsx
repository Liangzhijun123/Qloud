import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { Stack } from 'expo-router';
// import Sidebar from './drawer/Sidebar'; // Import Sidebar component
// import BottomBar from '../components/BottomBar'; // Import BottomBar component
// import HomeScreen from './index'; // Replace with actual paths
// import NotificationsScreen from './drawer/(screens)/NotificationsScreen';
// import ProfileScreen from './drawer/(screens)/Profile';
// import SettingsScreen from './drawer/(screens)/SettingsScreen';


const Layout: React.FC = () => {
  return (
    <View style={styles.container}>
      <Stack>
      <Stack.Screen
          name="index"
          options={{
            headerShown: false, // Hide header for index.tsx
          }}
        />
        <Stack.Screen name="drawer" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 34, // Adjust the width of the image
    height: 34, // Adjust the height of the image
    marginLeft: 12, // Add some padding for alignment
    resizeMode: 'contain', // Ensure the image scales properly
  },
});

export default Layout;
