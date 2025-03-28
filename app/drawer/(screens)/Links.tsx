import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

const profiles = [
    {
      id: "1",
      name: "Anne Boothman",
      location: "London, England",
      followers: "736K",
      connections: "174",
      interests: "3.3M",
      website1: "www.canva.com",
      website2: "www.qloudai.com",
      avatar: require("../../../assets/profile-icon-9.png"), // Replace with avatar image
      profileImage: "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/jungle-green-and-mercury-business-instagram-post-template-1s47b0dab025c1.webp", // Replace with profile image
    },
    {
      id: "2",
      name: "Marwan Al Asadi",
      location: "London, England",
      followers: "222K",
      connections: "249",
      interests: "2.7M",
      website1: "www.canva.com",
      website2: "www.qloudai.com",
      avatar: require("../../../assets/profile-icon-9.png"), // Replace with avatar image
      profileImage: "https://img.freepik.com/free-psd/digital-marketing-agency-corporate-social-media-banner-instagram-post-template_106176-2308.jpg", // Replace with profile image
    },
    {
      id: "3",
      name: "Sophia Carter",
      location: "New York, USA",
      followers: "420K",
      connections: "301",
      interests: "1.8M",
      website1: "www.techspot.com",
      website2: "www.sophiatech.com",
      avatar: require("../../../assets/profile-icon-9.png"),
      profileImage: "https://marketplace.canva.com/EAF-L0Oh4YY/1/0/1600w/canva-green-and-gold-corporate-business-grow-with-us-instagram-post-fWM3RBgFmdA.jpg",
    },
    {
      id: "4",
      name: "David Lee",
      location: "San Francisco, USA",
      followers: "512K",
      connections: "198",
      interests: "2.3M",
      website1: "www.davidinnovates.com",
      website2: "www.sftech.com",
      avatar: require("../../../assets/profile-icon-9.png"),
      profileImage: "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/jungle-green-and-mercury-business-instagram-post-template-1s47b0dab025c1.webp",
    },
    {
      id: "5",
      name: "Emily Zhang",
      location: "Toronto, Canada",
      followers: "381K",
      connections: "123",
      interests: "2.5M",
      website1: "www.innovatewithme.com",
      website2: "www.torontotech.com",
      avatar: require("../../../assets/profile-icon-9.png"),
      profileImage: "https://marketplace.canva.com/EAF-L0Oh4YY/1/0/1600w/canva-green-and-gold-corporate-business-grow-with-us-instagram-post-fWM3RBgFmdA.jpg",
    },
    {
      id: "6",
      name: "Rahul Patel",
      location: "Mumbai, India",
      followers: "590K",
      connections: "209",
      interests: "3.1M",
      website1: "www.mumbaitech.com",
      website2: "www.rahulp.com",
      avatar: require("../../../assets/profile-icon-9.png"),
      profileImage: "https://img.freepik.com/free-psd/digital-marketing-agency-corporate-social-media-banner-instagram-post-template_106176-2308.jpg",
    },
    {
      id: "7",
      name: "Olivia Brown",
      location: "Sydney, Australia",
      followers: "468K",
      connections: "182",
      interests: "2.9M",
      website1: "www.oliviadesigns.com",
      website2: "www.aussieconnect.com",
      avatar: require("../../../assets/profile-icon-9.png"),
      profileImage: "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/jungle-green-and-mercury-business-instagram-post-template-1s47b0dab025c1.webp",
    },
  ];
  

  const LinksScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleNextProfile = () => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        Alert.alert("End of List", "You have viewed all profiles.");
      }
    };
  
    const handlePreviousProfile = () => {
      if (currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    };
  
    const handleConnect = (name: string) => {
      Alert.alert("Connection Request", `You sent a connection request to ${name}.`);
    };
  
    const renderProfile = (profile: typeof profiles[0]) => (
      <View style={styles.card}>
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressSegment, { backgroundColor: "#4CAF50" }]} />
          <View style={[styles.progressSegment, { backgroundColor: "#4CAF50" }]} />
          <View style={[styles.progressSegment, { backgroundColor: "#000" }]} />
          <View style={[styles.progressSegment, { backgroundColor: "#000" }]} />
        </View>
  
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={profile.avatar} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.location}>{profile.location}</Text>
            <TouchableOpacity>
              <Text style={styles.link}>{profile.website1}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.link}>{profile.website2}</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profile.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profile.connections}</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{profile.interests}</Text>
            <Text style={styles.statLabel}>Interests</Text>
          </View>
        </View>
  
        {/* Profile Image */}
        <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
  
        {/* Connect Button */}
        <TouchableOpacity
          style={styles.connectButton}
          onPress={() => handleConnect(profile.name)}
        >
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      </View>
    );
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Change Preferences</Text>
          <Text style={styles.notificationBadge}>12</Text>
          <TouchableOpacity>
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
        </View>
  
        {/* Profile Card */}
        {renderProfile(profiles[currentIndex])}
  
        {/* Navigation Buttons */}
        <View style={styles.navigation}>
          <TouchableOpacity onPress={handlePreviousProfile}>
            <Text style={styles.navButton}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextProfile}>
            <Text style={styles.navButton}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FAFAFA",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#FFFFFF",
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    notificationBadge: {
      backgroundColor: "#000",
      color: "#FFF",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
    },
    addIcon: {
      fontSize: 24,
      color: "#007BFF",
    },
    card: {
      margin: 20,
      padding: 20,
      backgroundColor: "#FFF",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    progressBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    progressSegment: {
      height: 6,
      width: "22%",
      borderRadius: 3,
    },
    profileHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
    },
    profileInfo: {
      flex: 1,
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
    },
    location: {
      fontSize: 14,
      color: "#555",
    },
    link: {
      fontSize: 14,
      color: "#007BFF",
      textDecorationLine: "underline",
    },
    stats: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 20,
    },
    statItem: {
      alignItems: "center",
    },
    statNumber: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    statLabel: {
      fontSize: 12,
      color: "#888",
    },
    profileImage: {
      width: "100%",
      height: 180,
      borderRadius: 10,
      marginBottom: 20,
    },
    connectButton: {
      backgroundColor: "#000",
      paddingVertical: 12,
      alignItems: "center",
      borderRadius: 8,
    },
    connectButtonText: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 16,
    },
    navigation: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 50,
      marginTop: 20,
    },
    navButton: {
      fontSize: 30,
      color: "#888",
    },
  });
  
  export default LinksScreen;