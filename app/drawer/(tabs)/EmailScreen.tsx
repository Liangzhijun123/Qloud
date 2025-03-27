import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Email {
  id: string;
  sender: string;
  preview: string;
  fullText: string;
  date: string;
}

interface Message {
  id: string;
  text: string;
  sender: boolean; // true for sender, false for received
  image?: string; // Optional for sending images
}

const emails: Email[] = [
  {
    id: '1',
    sender: 'Marwan Al Asadi',
    preview: 'Hello! I just wanted to check...',
    fullText: 'Hello! I just wanted to check up on you and let you know that the business is good but I really need your help with this part of the market.',
    date: 'Yesterday',
  },
  {
    id: '2',
    sender: 'Christopher Kyle',
    preview: 'Good afternoon Marwan. Please reply...',
    fullText: 'Good afternoon Marwan. Please reply to my E-mail at your earliest convenience. We need to discuss the upcoming project timelines.',
    date: 'Monday',
  },
  {
    id: '3',
    sender: 'Nike Meetings',
    preview: 'Our meeting is scheduled...',
    fullText: 'Our meeting is scheduled to be held on the coming Friday. Please review the agenda and provide your feedback before the meeting.',
    date: 'Thursday',
  },
  {
    id: '4',
    sender: 'Oliver Chris',
    preview: 'Hello! I just wanted to...',
    fullText: 'Hello! I just wanted to let you know that the new marketing campaign is live, and we are already seeing promising results.',
    date: '26/11/2024',
  },
  {
    id: '5',
    sender: 'Anna Brown',
    preview: 'Don’t forget about the quarterly...',
    fullText: 'Don’t forget about the quarterly report due next week. Please ensure all necessary updates are included in the final submission.',
    date: 'Friday',
  },
  {
    id: '6',
    sender: 'Steve Jobs',
    preview: 'Let’s discuss the UI improvements...',
    fullText: 'Let’s discuss the UI improvements for the app. I’ve outlined some ideas that I believe will enhance the user experience significantly.',
    date: 'Tuesday',
  },
  {
    id: '7',
    sender: 'Marketing Team',
    preview: 'Here’s the final draft for...',
    fullText: 'Here’s the final draft for the campaign. Please review and provide your approval so we can proceed with the launch.',
    date: 'Sunday',
  },
  {
    id: '8',
    sender: 'Human Resources',
    preview: 'Please complete your annual...',
    fullText: 'Please complete your annual compliance training before the deadline. Failure to comply may result in disciplinary actions.',
    date: '1 week ago',
  },
  {
    id: '9',
    sender: 'Project Management',
    preview: 'The deadline for the sprint is...',
    fullText: 'The deadline for the sprint is fast approaching. Ensure all tasks are completed and blockers are resolved in time.',
    date: 'Last Month',
  },
  {
    id: '10',
    sender: 'John Doe',
    preview: 'Hi! It was great catching up...',
    fullText: 'Hi! It was great catching up earlier. Let’s stay in touch and work together on the ideas we discussed.',
    date: '3 days ago',
  },
  {
    id: '11',
    sender: 'Client Services',
    preview: 'We’ve received your support...',
    fullText: 'We’ve received your support request and are currently reviewing it. Our team will get back to you shortly.',
    date: 'Saturday',
  },
  {
    id: '12',
    sender: 'Mary Ann',
    preview: 'Can you share the latest...',
    fullText: 'Can you share the latest updates for the project? I want to ensure we are aligned before the next meeting.',
    date: 'This Morning',
  },
];

const EmailScreen: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [messages, setMessages] = useState<Message[]>([]); // For chat messages
  const [textInput, setTextInput] = useState<string>(''); // For input text

  const handleSendMessage = () => {
    if (textInput.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Math.random().toString(), text: textInput, sender: true },
      ]);
      setTextInput('');
    }
  };


  const renderInbox = () => (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Search" />
      <View style={styles.filters}>
        {['All', 'Groups', 'Favorites', 'Myra', 'Requests', 'Sent', 'Trash', 'Archived'].map((filter) => (
          <TouchableOpacity key={filter} style={styles.filterButton}>
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={emails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.emailItem} onPress={() => setSelectedEmail(item)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.sender.charAt(0)}</Text>
            </View>
            <View style={styles.emailContent}>
              <Text style={styles.sender}>{item.sender}</Text>
              <Text style={styles.preview}>{item.preview}</Text>
            </View>
            <Text style={styles.date}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const EmailDetailScreen = ({ email, goBack }: { email: Email; goBack: () => void }) => {
    const [livePreview, setLivePreview] = useState<string>(''); // Live preview of user input
  
    const allMessages = [
      { id: 'preset', text: email.fullText, sender: false }, // Preset message from fullText
      ...messages,
      ...(livePreview ? [{ id: 'preview', text: livePreview, sender: true }] : []),
    ];
  
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90} // Adjust offset for iOS/Android
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={goBack}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <View>
                <Text style={styles.sender}>{email.sender}</Text>
                <Text style={styles.username}>{email.date}</Text>
              </View>
            </View>
  
            {/* Message Body */}
            <FlatList
              data={allMessages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.messageBubble,
                    item.sender ? styles.senderBubble : styles.receiverBubble,
                  ]}
                >
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.messageImage} />
                  ) : (
                    <Text style={item.sender ? styles.senderText : styles.receiverText}>
                      {item.text}
                    </Text>
                  )}
                </View>
              )}
              style={styles.messageContainer}
              contentContainerStyle={{ paddingBottom: 10 }}
            />
  
            {/* Input Area */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type a message..."
                value={textInput}
                onChangeText={(value) => {
                  setTextInput(value);
                  setLivePreview(value); // Update the live preview
                }}
                multiline
              />
              <TouchableOpacity onPress={handleSendMessage}>
                <Ionicons name="send" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };
  

  return selectedEmail ? (
    <EmailDetailScreen email={selectedEmail} goBack={() => setSelectedEmail(null)} />
  ) : (
    renderInbox()
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
  },
  emailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  emailContent: { flex: 1 },
  sender: { fontSize: 18, fontWeight: 'bold', color: 'black' },
  preview: { fontSize: 14, color: '#555', marginTop: 3 },
  date: { fontSize: 12, color: '#999' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  username: { fontSize: 14, color: '#666' },
  messageContainer: { flex: 1, marginVertical: 10 },
  messageBubble: {
    marginVertical: 5,
    maxWidth: '70%',
    padding: 10,
    borderRadius: 15,
  },
  senderBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  receiverBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
  },
  senderText: { color: 'black' },
  receiverText: { color: 'white' },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 0, // For bottom navigation
  },
  backButton: {
    marginRight: 10,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  filterButton: {
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  filterText: { fontSize: 14, color: 'white', fontWeight: '500' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
    backgroundColor: 'white', // To distinguish it from the message area
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    textAlignVertical: 'top', // Aligns text to the top for multiline input
  },
});

export default EmailScreen;
