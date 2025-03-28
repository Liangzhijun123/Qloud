import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Settings = () => {
  const [expandedOption, setExpandedOption] = useState<string | null>(null);

  const handleOptionPress = (option: string) => {
    setExpandedOption((prev) => (prev === option ? null : option));
  };

  const renderOption = (category: string, options: string[]) => (
    <View key={category} style={styles.optionContainer}>
      <TouchableOpacity
        style={[
          styles.option,
          expandedOption === category && styles.optionActive,
        ]}
        onPress={() => handleOptionPress(category)}
      >
        <Text style={styles.optionText}>{category}</Text>
      </TouchableOpacity>
      {expandedOption === category &&
        options.map((option, index) => (
          <View key={index} style={styles.subOption}>
            <Text style={styles.subOptionText}>{option}</Text>
          </View>
        ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <ScrollView contentContainerStyle={styles.content}>
        {renderOption("Account Settings", [
          "Change Password",
          "Update Email",
          "Manage Subscriptions",
        ])}
        {renderOption("Notification Preferences", [
          "Email Notifications",
          "Push Notifications",
          "SMS Notifications",
        ])}
        {renderOption("Privacy Settings", [
          "Block/Unblock Users",
          "Manage Data Sharing",
          "Two-Factor Authentication",
        ])}
        {renderOption("Appearance", [
          "Dark Mode",
          "Light Mode",
          "Customize Theme",
        ])}
        {renderOption("Language", ["English", "French", "Spanish", "German"])}
        {renderOption("App Preferences", [
          "Clear Cache",
          "App Version Info",
          "Reset to Default Settings",
        ])}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
  },
  content: {
    paddingBottom: 20,
  },
  optionContainer: {
    marginBottom: 15,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderRadius: 8,
  },
  optionActive: {
    backgroundColor: "#333",
  },
  optionText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  subOption: {
    marginTop: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  subOptionText: {
    fontSize: 16,
    color: "#555",
  },
});

export default Settings;
