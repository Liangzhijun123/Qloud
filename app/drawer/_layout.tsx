import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from './Sidebar';
import Login from './(screens)/Login';
import PreLogin from './(screens)/PreLogin';

const Drawer = createDrawerNavigator();

const CustomDrawerIcon = ({ navigation }: { navigation: any }) => (
  <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.iconWrapper}>
    <Image source={require('../../assets/profile-icon-9.png')} style={styles.icon} />
  </TouchableOpacity>
);

export default function Layout() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => <CustomDrawerIcon navigation={navigation} />,
        headerTitle: 'Qloud',
      })}
    >
      <Drawer.Screen name="PreLogin" component={PreLogin} />
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    marginBottom: 20,
  },
  icon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
});
