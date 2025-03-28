import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const daysInMonth = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  marker: null as string | null,
  text: "",
}));

const Calendar = () => {
  const [calendarData, setCalendarData] = useState<Array<{
    day: number;
    marker: string | null;
    text: string;
  }>>(daysInMonth);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [markerType, setMarkerType] = useState<string>(""); // "circle", "X", "$"
  const [customText, setCustomText] = useState<string>("");

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
  };

  const handleAddMarker = () => {
    if (selectedDay === null) {
      Alert.alert("Error", "Please select a day to mark.");
      return;
    }

    setCalendarData((prevData) =>
      prevData.map((item) =>
        item.day === selectedDay
          ? { ...item, marker: markerType, text: customText }
          : item
      )
    );

    // Reset inputs
    setSelectedDay(null);
    setMarkerType("");
    setCustomText("");
  };

  const renderDay = ({ item }: { item: { day: number; marker: string | null; text: string } }) => (
    <TouchableOpacity
      style={[styles.dayContainer, selectedDay === item.day && styles.selectedDay]}
      onPress={() => handleDayPress(item.day)}
    >
      <Text style={styles.dayText}>{item.day}</Text>
      {item.marker === "$" && (
        <View style={styles.markerContainer}>
          <Text style={styles.dollarMarker}>$</Text>
        </View>
      )}
      {item.marker === "circle" && (
        <View style={styles.circleMarker}>
          <Text></Text>
        </View>
      )}
      {item.marker === "X" && (
        <Text style={styles.xMarker}>X</Text>
      )}
      {item.text !== "" && <Text style={styles.textMarker}>{item.text}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Qloud Calendar</Text>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter marker type (circle, X, $)"
          placeholderTextColor="black" // Set placeholder color to black
          value={markerType}
          onChangeText={setMarkerType}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter custom text"
          placeholderTextColor="black" // Set placeholder color to black
          value={customText}
          onChangeText={setCustomText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddMarker}>
          <Text style={styles.addButtonText}>Add Marker</Text>
        </TouchableOpacity>
      </View>

      {/* Days of the Week */}
      <View style={styles.weekContainer}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <Text key={day} style={styles.weekText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Days */}
      <FlatList
        data={calendarData}
        renderItem={renderDay}
        keyExtractor={(item) => item.day.toString()}
        numColumns={7}
        contentContainerStyle={styles.calendarContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    color: "black",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    flex: 1,
  },
  calendarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dayContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 2, // Add margin to create space between the boxes
    position: "relative",
    backgroundColor: "#fff", // Ensure proper background
  },
  selectedDay: {
    backgroundColor: "#e0e0e0",
  },
  dayText: {
    fontSize: 16,
    textAlign: "center",
  },
  markerContainer: {
    position: "absolute",
    bottom: 10, // Adjusted for better placement
    backgroundColor: "#000",
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  dollarMarker: {
    color: "#fff",
    fontWeight: "bold",
  },
  circleMarker: {
    position: "absolute",
    bottom: 10, // Adjusted for better placement
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 15,
    width: 25,
    height: 25,
  },
  xMarker: {
    position: "absolute",
    bottom: 10, // Adjusted for better placement
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
  textMarker: {
    position: "absolute",
    bottom: -5, // Adjusted to align better with text
    fontSize: 12,
    color: "blue",
    textAlign: "center",
  },
});

export default Calendar;
