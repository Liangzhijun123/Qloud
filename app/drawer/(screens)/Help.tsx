import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const HelpCenter = () => {
  const [expandedOption, setExpandedOption] = useState<string | null>(null);

  const handleOptionPress = (option: string) => {
    setExpandedOption((prev) => (prev === option ? null : option));
  };

  const renderOption = (option: string, answer: string) => (
    <View key={option} style={styles.optionContainer}>
      <TouchableOpacity
        style={styles.option}
        onPress={() => handleOptionPress(option)}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
      {expandedOption === option && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help Center</Text>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Section: FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQs</Text>
          {renderOption(
            "What is Qloud?",
            "Qloud is a platform designed to connect professionals and provide access to communities, tools, and mentorship opportunities."
          )}
          {renderOption(
            "How to use Qloud?",
            "Using Qloud is simple: sign up, join communities, and connect with like-minded individuals to collaborate and grow."
          )}
          {renderOption(
            "Subscription and Pricing",
            "Qloud offers various subscription plans tailored to meet individual and business needs. Visit our pricing page for more details."
          )}
        </View>

        {/* Section: Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderOption(
            "Report a Problem",
            "If you encounter any issues, please report them through our support form or contact our team directly."
          )}
          {renderOption(
            "Contact Support",
            "Our support team is available 24/7 to assist you. You can reach out to us via email or through the in-app chat feature."
          )}
        </View>

        {/* Section: Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal</Text>
          {renderOption(
            "Terms of Service",
            "Our Terms of Service outline the rules and guidelines for using the Qloud platform. Please review them carefully."
          )}
          {renderOption(
            "Privacy Policy",
            "Qloud values your privacy. Read our Privacy Policy to understand how we collect, use, and protect your data."
          )}
          {renderOption(
            "Cookie Policy",
            "We use cookies to improve your experience on our platform. Learn more about our cookie usage in our Cookie Policy."
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  optionContainer: {
    marginBottom: 10,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#555",
  },
  answerContainer: {
    backgroundColor: "#000",
    padding: 15,
    marginTop: 5,
    borderRadius: 8,
  },
  answerText: {
    fontSize: 14,
    color: "white",
  },
});

export default HelpCenter;
