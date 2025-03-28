import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const categories = [
  "Tourism",
  "Tech",
  "Retail",
  "Furniture",
  "Finance",
  "Food",
  "Real Estate",
  "Fashion",
  "Manufacturing",
];

const mentors = [
  "Jeff Bezos",
  "Elon Musk",
  "Sam Altman",
  "Bill Gates",
  "Virgil Abloh",
  "Rick Owens",
  "Mark Cuban",
  "Kanye West",
];

const MentorPathway = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleNext = () => {
    if (step === 1 && !selectedCategory) {
      Alert.alert("Error", "Please select a category.");
      return;
    }
    if (step === 2 && !selectedMentor) {
      Alert.alert("Error", "Please select a mentor.");
      return;
    }
    if (step < 3) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleSend = () => {
    if (message.trim() === "") {
      Alert.alert("Error", "Message cannot be empty.");
      return;
    }
    Alert.alert("Message Sent", `Message to ${selectedMentor}: ${message}`);
    setMessage(""); // Clear the message input
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.modal}>
            <Text style={styles.title}>Select a Category</Text>
            <View style={styles.categories}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category && styles.selectedCategoryText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View style={styles.modal}>
            <Text style={styles.title}>Select a Mentor</Text>
            <View style={styles.mentors}>
              {mentors.map((mentorName) => (
                <TouchableOpacity
                  key={mentorName}
                  style={[
                    styles.mentorButton,
                    selectedMentor === mentorName && styles.selectedMentorButton,
                  ]}
                  onPress={() => setSelectedMentor(mentorName)}
                >
                  <Text
                    style={[
                      styles.mentorText,
                      selectedMentor === mentorName && styles.selectedMentorText,
                    ]}
                  >
                    {mentorName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View style={styles.modal}>
            <Text style={styles.title}>
              Hey, {selectedMentor}, What questions do you have for me?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your message"
              placeholderTextColor="#aaa"
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.nextButton} onPress={handleSend}>
              <Text style={styles.nextButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderStep()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  modal: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  categoryButton: {
    margin: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  selectedCategory: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  mentors: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  mentorButton: {
    margin: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  mentorText: {
    fontSize: 16,
    color: "#333",
  },
  selectedMentorButton: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  selectedMentorText: {
    color: "#fff",
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MentorPathway;
