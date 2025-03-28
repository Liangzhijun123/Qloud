import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";

const PreLogin = ({ navigation }: { navigation: any }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();

  const screens = [
    {
      content: (
        <View style={styles.contentContainer}>
          <Image
            source={require("../../../assets/loginImage.png")}
            style={styles.image}
          />
          <Text style={styles.logo}>QLOUD</Text>
        </View>
      ),
    },
    {
      content: (
        <View style={styles.contentContainer}>
          <Image
            source={require("../../../assets/prelogin1.png")}
            style={styles.image}
          />
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Join Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    },
    {
      content: (
        <View style={styles.contentContainer}>
          <Image
            source={require("../../../assets/prelogin2.png")}
            style={styles.image}
          />
          <Text style={styles.text}>
            Suspendisse varius enim in eros elementum tristique.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Join Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    },
    {
      content: (
        <View style={styles.contentContainer}>
          <Image
            source={require("../../../assets/prelogin3.png")}
            style={styles.image}
          />
          <Text style={styles.text}>
            Curabitur gravida arcu ac tortor dignissim convallis.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Join Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      {screens[currentScreen].content}
      <View style={styles.dotsContainer}>
        {screens.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => setCurrentScreen(index)}>
            <View
              style={[styles.dot, currentScreen === index && styles.activeDot]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;
const aspectRatio = 16 / 9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 20,
    position: "relative",
  },
  image: {
    width: screenWidth,
    height: 900,
    resizeMode: "cover",
    zIndex: 1,
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000",
    paddingTop: 150,
    marginBottom: 20,
    zIndex: 2,
    position: "absolute",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  joinButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
  },
  signInButton: {
    backgroundColor: "#555",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 300,
    position: "absolute",
    
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#000",
  },
});

export default PreLogin;
