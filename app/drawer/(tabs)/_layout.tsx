import { Tabs } from 'expo-router';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 105,
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                    paddingHorizontal: 0,
                    paddingTop: 20,
                    paddingBottom: 20,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="EmailScreen"
                options={{
                    title: 'Email',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../../../assets/email.png')}
                            style={styles.icon}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="MarketplaceScreen"
                options={{
                    title: 'Marketplace',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../../../assets/marketplace.png')}
                            style={styles.icon}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Home" // Place Home tab at the center
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../../../assets/logo.png')} // Ensure correct image path
                            style={[styles.centerIcon]} // Use larger size for center icon
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="ConnectionScreen"
                options={{
                    title: 'Connections',
                    tabBarIcon: () => (
                        <Image
                            source={require('../../../assets/connections.png')}
                            style={styles.icon}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Myra"
                options={{
                    title: 'Myra',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../../../assets/myra.png')}
                            style={styles.icon}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 48,
        height: 48,
    },
    centerIcon: {
        width: 60, // Larger size for the center icon
        height: 60,
    },
});
