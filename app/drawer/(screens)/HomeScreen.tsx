import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const Home = () =>  {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/logo.png')} // Replace with your logo path test check in
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Qloud</Text>
      <Text style={styles.subtitle}>Empowering your business through innovation and technology.</Text>

      <TouchableOpacity style={styles.ctaButton}>
        <Link href={'/drawer/(tabs)/Home'} style={styles.ctaText}>
          Learn More
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 25,
    paddingHorizontal: 10,
  },
  ctaButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  ctaText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    textDecorationLine: 'none',
  },
});

export default Home;