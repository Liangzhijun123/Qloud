import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';


const Connection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      title: 'Calorie Tracking App',
      company: 'Calorietracker',
      price: '3499$',
      likes: '739K',
      revenue: '1.26M',
      image: require('../../../assets/conn1.png'), // Use require here
    },
    {
      id: 2,
      title: 'AI Personal Stylist',
      company: 'Styliister',
      price: '1999$',
      likes: '500K',
      revenue: '890K',
      image: require('../../../assets/conn2.jpeg'),
    },
    {
      id: 3,
      title: 'Eco Friendly Advice',
      company: 'GreenGains',
      price: '750$',
      likes: '600K',
      revenue: '2.5M',
      image: require('../../../assets/Conn3.jpeg'),
    },
    {
      id: 4,
      title: 'AI Investment App',
      company: 'Investcircle',
      price: '23000$',
      likes: '1.2M',
      revenue: '8.5M',
      image: require('../../../assets/conn4.jpg'),
    },
    {
      id: 5,
      title: 'AI Chef Recommendation',
      company: 'Chefy',
      price: '3999$',
      likes: '2M',
      revenue: '6.7M',
      image: require('../../../assets/conn5.png'),
    },
    {
      id: 6,
      title: 'Organize Public Events',
      company: 'Buddies',
      price: '2700$',
      likes: '800K',
      revenue: '3.2M',
      image: require('../../../assets/conn6.png'),
    },
  ];
  

  return (
    <View style={styles.container}>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        <Text style={[styles.category, styles.activeCategory]}>Products</Text>
        <Text style={styles.category}>Companies</Text>
        <Text style={styles.category}>Services</Text>
      </View>

      {/* Filters */}
      <ScrollView horizontal style={styles.filters}>
        <Text style={styles.filter}>All</Text>
        <Text style={styles.filter}>Agencies</Text>
        <Text style={styles.filter}>Apps</Text>
        <Text style={styles.filter}>E-commerce</Text>
        <Text style={styles.filter}>Fashion</Text>
      </ScrollView>

      {/* Product Grid */}
      <ScrollView contentContainerStyle={styles.productGrid}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={[
              styles.productCard,
              hoveredCard === product.id && styles.productCardHover,
            ]}
            onPressIn={() => setHoveredCard(product.id)}
            onPressOut={() => setHoveredCard(null)}
          >
            <Image source={product.image} style={styles.productImage} />
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productCompany}>{product.company}</Text>
            <View style={styles.productDetails}>
              <Text style={styles.productLikes}>❤️ {product.likes}</Text>
              <Text style={styles.productRevenue}>💵 {product.revenue}</Text>
            </View>
            <Text style={styles.productPrice}>{product.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: 'black',
  },
  searchBar: {
    padding: 10,
    backgroundColor: 'black',
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    color: 'black',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'black',
  },
  category: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  activeCategory: {
    textDecorationLine: 'underline',
  },
  filters: {
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  filter: {
    marginHorizontal: 10,
    paddingBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 15,
  },
  productCard: {
    width: '45%',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  productCardHover: {
    backgroundColor: '#ddd', // Lighten background on hover
    elevation: 6, // Increase shadow for hover
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  productTitle: {
    fontWeight: 'bold',
    color: 'black',
  },
  productCompany: {
    color: 'gray',
    fontSize: 12,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  productLikes: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold'
  },
  productRevenue: {
    color: 'green',
    fontSize: 12,
    fontWeight: 'bold'
  },
  productPrice: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default Connection;
