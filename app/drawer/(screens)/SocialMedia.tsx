import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const SocialMedia = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Follow Us</Text>

      <TouchableOpacity style={styles.option}>
        <FontAwesome name="facebook" size={28} color="#4267B2" />
        <Text style={styles.optionText}>Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <FontAwesome name="twitter" size={28} color="#1DA1F2" />
        <Text style={styles.optionText}>Twitter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <FontAwesome name="instagram" size={28} color="#C13584" />
        <Text style={styles.optionText}>Instagram</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Entypo name="linkedin" size={28} color="#0077B5" />
        <Text style={styles.optionText}>LinkedIn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingVertical: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    color: "#000",
    marginLeft: 15,
    fontWeight: "500",
  },
});

export default SocialMedia;
