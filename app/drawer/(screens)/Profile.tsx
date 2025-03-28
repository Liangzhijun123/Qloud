import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const posts = [
    { id: '1', image: require('../../../assets/conn1.png') },
    { id: '2', image: require('../../../assets/conn4.jpg') },
    { id: '3', image: require('../../../assets/Conn3.jpeg') },
    { id: '4', image: require('../../../assets/conn4.jpg') },
    { id: '5', image: require('../../../assets/conn1.png') },
    { id: '6', image: require('../../../assets/conn2.jpeg') },
    { id: '7', image: require('../../../assets/conn4.jpg') },
    { id: '8', image: require('../../../assets/conn1.png') },
    { id: '9', image: require('../../../assets/Conn3.jpeg') },
    { id: '10', image: require('../../../assets/conn2.jpeg') },
    { id: '11', image: require('../../../assets/conn4.jpg') },
    { id: '12', image: require('../../../assets/conn1.png') },
  ];

  const renderPost = ({ item }: { item: { id: string; image: any } }) => (
    <TouchableOpacity style={styles.postContainer}>
      <Image source={item.image} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      numColumns={3}
      ListHeaderComponent={
        <>
          {/* Profile Header */}
          <View style={styles.header}>
            <Image
              source={require('../../../assets/profile-icon-9.png')} // Replace with your profile image
              style={styles.profilePicture}
            />
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>736K</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>174</Text>
                <Text style={styles.statLabel}>Connections</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3.3M</Text>
                <Text style={styles.statLabel}>Raised</Text>
              </View>
            </View>
          </View>

          {/* Name and Links */}
          <View style={styles.profileDetails}>
            <Text style={styles.name}>Marwan Al Asadi</Text>
            <Text style={styles.location}>London, England</Text>
            <TouchableOpacity>
              <Text style={styles.link}>www.canva.com</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.link}>www.qloudai.com</Text>
            </TouchableOpacity>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Connect</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Message</Text>
            </TouchableOpacity>
          </View>

          {/* Separator */}
          <View style={styles.separator} />

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/marketplace.png')}
                style={styles.tabIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/connections.png')}
                style={styles.tabIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={28} color="black" />
            </TouchableOpacity>
          </View>
        </>
      }
      renderItem={renderPost}
      contentContainerStyle={styles.postsGrid}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  profileDetails: {
    alignItems: 'center',
    marginVertical: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: 'gray',
  },
  link: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 15,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tabIcon: {
    height: 28,
    width: 28,
  },
  postsGrid: {
    paddingHorizontal: 10,
  },
  postContainer: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});

export default Profile;
