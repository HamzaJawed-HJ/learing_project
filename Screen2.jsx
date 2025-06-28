import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Screen2 = ({ route }) => {
  const { passedNotes } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Notes from Screen 1</Text>
      <FlatList
        data={passedNotes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.noteItem}>{index + 1}. {item}</Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No data received</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f0ff', // Matching background
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4b0082', // Indigo
    textAlign: 'center',
  },
  noteItem: {
    fontSize: 16,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
  },
});

export default Screen2;
