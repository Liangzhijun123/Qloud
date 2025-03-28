import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const Files1: React.FC = () => {
  const [files, setFiles] = useState<{ id: string; uri: string; name: string }[]>([]);

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all file types
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const { assets } = result;
        if (assets && assets[0]) {
          const newFile = {
            id: files.length.toString(),
            uri: assets[0].uri,
            name: assets[0].name,
          };
          setFiles((prevFiles) => [...prevFiles, newFile]);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not upload the file.");
    }
  };

  const renderFile = ({ item }: { item: { id: string; uri: string; name: string } }) => (
    <View style={styles.fileContainer}>
      <Image
        source={{ uri: item.uri }}
        style={styles.fileImage}
        resizeMode="cover"
      />
      <Text style={styles.fileName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Your Files</Text>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>Upload File</Text>
      </TouchableOpacity>

      {/* File Grid */}
      {files.length > 0 ? (
        <FlatList
          data={files}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderFile}
          contentContainerStyle={styles.fileGrid}
        />
      ) : (
        <Text style={styles.emptyText}>No files uploaded yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  fileGrid: {
    justifyContent: 'center',
  },
  fileContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  fileImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  fileName: {
    fontSize: 14,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
    marginTop: 20,
  },
});

export default Files1;
