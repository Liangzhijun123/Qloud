import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { AntDesign, Ionicons } from '@expo/vector-icons'; // Import icons

const { height, width } = Dimensions.get('window');

// Define the height of the header and bottom bar
const HEADER_HEIGHT = 56; // Approximate height of the header
const TAB_BAR_HEIGHT = 60; // Approximate height of the bottom bar
const REEL_HEIGHT = height - HEADER_HEIGHT - TAB_BAR_HEIGHT;

// Sample data for videos and user details
const reelsData = [
  {
    id: '1',
    videoUrl: require('../../../assets/videos/reel1.mp4'),
    username: '@User1',
    caption: 'Check out this amazing view! 🌄',
    likes: 1200,
    comments: 739,
    shares: 45,
    avatar: 'https://www.example.com/avatar1.jpg',
  },
  {
    id: '2',
    videoUrl: require('../../../assets/videos/reel2.mp4'),
    username: '@User2',
    caption: 'Dancing into the weekend 💃🎉',
    likes: 3200,
    comments: 1400,
    shares: 78,
    avatar: 'https://www.example.com/avatar2.jpg',
  },
  {
    id: '3',
    videoUrl: require('../../../assets/videos/reel3.mp4'),
    username: '@User3',
    caption: 'A moment to remember 🏞️✨',
    likes: 500,
    comments: 200,
    shares: 10,
    avatar: 'https://www.example.com/avatar3.jpg',
  },
  {
    id: '4',
    videoUrl: require('../../../assets/videos/reel4.mp4'),
    username: '@User4',
    caption: 'Fitness goals 💪🔥',
    likes: 3200,
    comments: 1400,
    shares: 78,
    avatar: 'https://www.example.com/avatar4.jpg',
  },
  {
    id: '5',
    videoUrl: require('../../../assets/videos/reel5.mp4'),
    username: '@User5',
    caption: 'Nature never ceases to amaze 🌳🌊',
    likes: 1200,
    comments: 739,
    shares: 45,
    avatar: 'https://www.example.com/avatar5.jpg',
  },
];

const Marketplace: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScrollEnd = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / REEL_HEIGHT); // Calculate the nearest reel index
    setCurrentIndex(index);
  };

  const toggleLike = (id: string) => {
    setLikes((prevLikes) =>
      prevLikes.map((like) =>
        like.id === id ? { ...like, liked: !like.liked, count: like.liked ? like.count - 1 : like.count + 1 } : like
      )
    );
  };

  const [likes, setLikes] = useState(reelsData.map((reel) => ({ id: reel.id, liked: false, count: reel.likes })));

  const renderReelItem = ({ item, index }: { item: typeof reelsData[0]; index: number }) => {
    const likeState = likes.find((like) => like.id === item.id);

    return (
      <View style={[styles.reelContainer, { height: REEL_HEIGHT }]}>
        <Video
          source={item.videoUrl}
          resizeMode={ResizeMode.COVER}
          shouldPlay={currentIndex === index} // Only plays the visible video
          isLooping
          style={styles.video}
        />
        {/* Bottom-left: User Info and Caption */}
        <View style={styles.bottomLeftOverlay}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>

        {/* Right-side: Actions (Likes, Comments, Shares) */}
        <View style={styles.rightOverlay}>
          <TouchableOpacity style={styles.actionButton} onPress={() => toggleLike(item.id)}>
            <AntDesign name="heart" size={30} color={likeState?.liked ? 'red' : 'white'} />
            <Text style={styles.actionText}>{likeState?.count}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={30} color="white" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social-outline" size={30} color="white" />
            <Text style={styles.actionText}>{item.shares}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reelsData}
        keyExtractor={(item) => item.id}
        renderItem={renderReelItem}
        pagingEnabled
        onMomentumScrollEnd={handleScrollEnd}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={REEL_HEIGHT}
        decelerationRate="fast"
        ref={flatListRef}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  list: {
    flex: 1,
  },
  reelContainer: {
    width,
    position: 'relative',
  },
  video: {
    height: '100%',
    width: '100%',
  },
  bottomLeftOverlay: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    width: '60%',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  caption: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 10,
  },
  rightOverlay: {
    position: 'absolute',
    bottom: 120,
    right: 10,
    alignItems: 'center',
  },
  actionButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default Marketplace;
