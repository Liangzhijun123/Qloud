import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

const Contact = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      {/* Contact Credentials */}
      <View style={styles.credentials}>
        <Text style={styles.credentialText}>📍 Address: 123 Main Street, London, UK</Text>
        <Text style={styles.credentialText}>📧 Email: support@qloud.com</Text>
        <Text style={styles.credentialText}>📞 Phone: +44 123 456 7890</Text>
      </View>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.textArea}
        placeholder="Your Message"
        placeholderTextColor="#aaa"
        multiline
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  credentials: {
    marginBottom: 20,
    alignItems: "center",
  },
  credentialText: {
    fontSize: 16,
    color: "#000",
    marginVertical: 5,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    color: "#000",
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    color: "#000",
    fontSize: 16,
    height: 120,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Contact;
