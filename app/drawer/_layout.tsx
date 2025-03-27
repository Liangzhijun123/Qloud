import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import Drawer from 'expo-router/drawer';
import Sidebar from './Sidebar';

export default function Layout() {
  const CustomDrawerIcon = ({ navigation }: { navigation: any }) => (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.iconWrapper}>
      <Image
        source={require('../../assets/profile-icon-9.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );

  return (
    <Drawer
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => <CustomDrawerIcon navigation={navigation} />,
        headerTitle: 'Qloud'
      })}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrapper: {
    width: 50, // Circle container size
    height: 50, // Circle container size
    justifyContent: 'center', // Center the image inside
    alignItems: 'center', // Center the image inside
    marginLeft: 12, // Adjust for alignment
    marginBottom: 20
  },
  icon: {
    width: 34, // Icon width
    height: 34, // Icon height
    resizeMode: 'contain', // Ensure the image scales properly
  },
});
