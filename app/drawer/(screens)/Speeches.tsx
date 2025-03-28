import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";

const podcastData = [
  {
    id: "1",
    title: "Think and Grow Rich",
    host: "Joe Rogan",
    listeningCount: 4892,
    tags: ["Investments", "Finance", "Success"],
    backgroundImage: "https://marketplace.canva.com/EAFIP4_9nrI/1/0/1600w/canva-black-neon-welcome-bank-podcast-cover-zBty84ekuGw.jpg",
  },
  {
    id: "2",
    title: "How To Become A Millionaire",
    host: "John Doe",
    listeningCount: 3412,
    tags: ["Crypto", "NFTs", "Money"],
    backgroundImage: "https://marketplace.canva.com/EAF2kzxrgHQ/1/0/1600w/canva-black-gold-classy-podcast-show-cover-O9Jpr6u4VFk.jpg",
  },
  {
    id: "3",
    title: "The Future of AI",
    host: "Elon Musk",
    listeningCount: 5800,
    tags: ["AI", "Technology", "Futurism"],
    backgroundImage: "https://marketplace.canva.com/EAF7zeRK6Xs/1/0/1600w/canva-dark-blue-and-white-simple-podcast-cover-u6VtMeFLkKo.jpg",
  },
  {
    id: "4",
    title: "Breaking into Tech",
    host: "Jane Smith",
    listeningCount: 2120,
    tags: ["Tech", "Startups", "Careers"],
    backgroundImage: "https://marketplace.canva.com/EAE4srSf2GE/1/0/1600w/canva-orange-and-black-simple-photo-podcast-cover-VjomFWcRlhI.jpg",
  },
  {
    id: "5",
    title: "The Art of Happiness",
    host: "Dalai Lama",
    listeningCount: 1560,
    tags: ["Happiness", "Mindfulness", "Well-being"],
    backgroundImage: "https://cdn.prod.website-files.com/5f6bd5d85587b65348960e08/60ffd79ec427d515494d5cab_Style.png",
  },
  {
    id: "6",
    title: "Decoding Crypto",
    host: "Satoshi Nakamoto",
    listeningCount: 4220,
    tags: ["Crypto", "Blockchain", "Finance"],
    backgroundImage: "https://marketplace.canva.com/EAE4srSf2GE/1/0/1600w/canva-orange-and-black-simple-photo-podcast-cover-VjomFWcRlhI.jpg",
  },
  {
    id: "7",
    title: "Mastering Leadership",
    host: "Simon Sinek",
    listeningCount: 3100,
    tags: ["Leadership", "Inspiration", "Success"],
    backgroundImage: "https://marketplace.canva.com/EAF7zeRK6Xs/1/0/1600w/canva-dark-blue-and-white-simple-podcast-cover-u6VtMeFLkKo.jpg",
  },
];

const TrendingPodcasts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcastData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState<any>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredPodcasts(podcastData);
    } else {
      const filtered = podcastData.filter((podcast) =>
        podcast.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPodcasts(filtered);
    }
  };

  const handlePodcastPress = (podcast: any) => {
    setSelectedPodcast(podcast);
    setModalVisible(true);
  };

  const handleJoinPodcast = () => {
    Alert.alert("Joined Podcast", `You joined "${selectedPodcast?.title}"`);
    setModalVisible(false);
  };

  const renderPodcast = ({ item }: { item: typeof podcastData[0] }) => (
    <TouchableOpacity
      style={styles.podcastCard}
      onPress={() => handlePodcastPress(item)}
    >
      <ImageBackground
        source={{ uri: item.backgroundImage }}
        style={styles.podcastImage}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.podcastTitle}>{item.title}</Text>
          <Text style={styles.podcastHost}>
          <Text style={styles.hostBadge}>Host - </Text> {item.host}
          </Text>
          <Text style={styles.listeningCount}>{item.listeningCount} Listening</Text>
        </View>
      </ImageBackground>
      <Text style={styles.podcastTags}>{item.tags.join(" • ")}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search podcasts"
          placeholderTextColor="#bbb"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Podcast List */}
      <FlatList
        data={filteredPodcasts}
        renderItem={renderPodcast}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Podcast Join Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedPodcast?.title || "Podcast"}
            </Text>
            <Text style={styles.modalHost}>
              Hosted by: {selectedPodcast?.host || "Host"}
            </Text>
            <Text style={styles.modalListeningCount}>
              {selectedPodcast?.listeningCount || 0} Listening
            </Text>
            <TouchableOpacity style={styles.joinButton} onPress={handleJoinPodcast}>
              <Text style={styles.joinButtonText}>Join Podcast</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background for BW theme
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#222",
    color: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
    padding: 10
  },
  icon: {
    color: "#fff",
    fontSize: 20,
  },
  listContainer: {
    padding: 10,
  },
  podcastCard: {
    marginBottom: 20,
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    overflow: "hidden",
  },
  podcastImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
  },
  podcastTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  podcastHost: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  hostBadge: {
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  listeningCount: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 5,
  },
  podcastTags: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 5,
    padding: 10,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    backgroundColor: "#1c1c1c",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  modalHost: {
    fontSize: 16,
    color: "#bbb",
    marginBottom: 10,
  },
  modalListeningCount: {
    fontSize: 14,
    color: "#bbb",
    marginBottom: 20,
  },
  joinButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  closeButtonText: {
    color: "#aaa",
  },
});

export default TrendingPodcasts;
