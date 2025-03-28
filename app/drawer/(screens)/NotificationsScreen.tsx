import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Notif Section</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedScreen;
