import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";

interface TeamType {
  id: string;
  name: string;
  members: number;
  image: string;
}

const categories = ["Tech", "Finance", "E-Commerce", "Fashion"];
const trendingTeams = [
  { id: "1", name: "Calorie.AI", members: 12, image: "https://via.placeholder.com/150" },
  { id: "2", name: "Tech Bro's", members: 18, image: "https://via.placeholder.com/150" },
];

const Team = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(null);
  const [tasks, setTasks] = useState([
    { id: "1", task: "Meeting", inCharge: "Alissa", status: "Pending" },
    { id: "2", task: "Marketing", inCharge: "Martin", status: "Done" },
    { id: "3", task: "Paperwork", inCharge: "Alissa", status: "In Progress" },
  ]);
  const [newTeamName, setNewTeamName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newTeamImage, setNewTeamImage] = useState("");

  const handleJoinTeam = (team: TeamType) => {
    setSelectedTeam(team);
    setCurrentStep(3);
  };

  const handleCreateTeam = () => {
    if (!newTeamName || !newCategory || !newTeamImage) {
      Alert.alert("Error", "Please fill all the fields to create a team.");
      return;
    }
    Alert.alert("Success", `Community '${newTeamName}' created successfully!`);
    setNewTeamName("");
    setNewCategory("");
    setNewTeamImage("");
    setCurrentStep(1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.joinTeam}>
            <Text style={styles.title}>JOIN TEAM</Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Text style={styles.category}>{item}</Text>
              )}
              numColumns={2}
              contentContainerStyle={styles.categoryContainer}
            />
            <Text style={styles.subtitle}>TRENDING</Text>
            <FlatList
              data={trendingTeams}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.teamCard}
                  onPress={() => handleJoinTeam(item)}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.teamImage}
                  />
                  <Text style={styles.teamName}>{item.name}</Text>
                  <Text style={styles.teamMembers}>
                    {item.members} members
                  </Text>
                </TouchableOpacity>
              )}
              horizontal
              contentContainerStyle={styles.teamList}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.createTeam}>
            <Text style={styles.title}>Create Community</Text>
            <TextInput
              style={styles.input}
              placeholder="Team Name"
              placeholderTextColor="#aaa"
              value={newTeamName}
              onChangeText={setNewTeamName}
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              placeholderTextColor="#aaa"
              value={newCategory}
              onChangeText={setNewCategory}
            />
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => setNewTeamImage("https://via.placeholder.com/150")}
            >
              <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
            {newTeamImage ? (
              <Image
                source={{ uri: newTeamImage }}
                style={styles.uploadedImage}
              />
            ) : null}
            <TouchableOpacity style={styles.createButton} onPress={handleCreateTeam}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View style={styles.manageTeam}>
            {selectedTeam && (
              <>
                <Text style={styles.title}>{selectedTeam.name}</Text>
                <FlatList
                  data={tasks}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.taskRow}>
                      <Text style={styles.taskText}>{item.task}</Text>
                      <Text style={styles.taskText}>{item.inCharge}</Text>
                      <Text style={styles.taskStatus}>{item.status}</Text>
                    </View>
                  )}
                />
                <TouchableOpacity style={styles.addTaskButton}>
                  <Text style={styles.addTaskButtonText}>Add Task</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={() => setCurrentStep(1)}>
                  <Text style={styles.backButtonText}>Back to Join</Text>
                </TouchableOpacity>
              </>
            )}
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
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  joinTeam: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    fontSize: 16,
    color: "#fff",
    margin: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    textAlign: "center",
  },
  teamList: {
    paddingTop: 10,
  },
  teamCard: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#222",
  },
  teamImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  teamMembers: {
    fontSize: 14,
    color: "#aaa",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  uploadedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  manageTeam: {
    flex: 1,
  },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  taskText: {
    fontSize: 16,
    color: "#fff",
  },
  taskStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00FF00",
  },
  addTaskButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  addTaskButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#444",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  createTeam: {
    flex: 1,
  },
});

export default Team;
