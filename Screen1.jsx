import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'notesList';

const Screen1 = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const saveNote = async () => {
    if (input.trim() === '') return;
    const updated = [...notes, input];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNotes(updated);
    setInput('');
  };

  const loadNotes = async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) setNotes(JSON.parse(saved));
  };

  const deleteNote = async (index) => {
    const updated = notes.filter((_, i) => i !== index);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNotes(updated);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>📝 {item}</Text>
      <TouchableOpacity onPress={() => deleteNote(index)}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🗒️ My Notes</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter note..."
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={saveNote}>
          <Text style={styles.addButtonText}>＋</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet</Text>}
      />

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Screen2', { passedNotes: notes })}
      >
        <Text style={styles.nextText}>➡ Go to Screen 2</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f0ff', // Light lavender
    padding: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#4b0082', // Indigo
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f5ff', // Soft lavender
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#8A2BE2', // Blue violet
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  noteItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noteText: {
    fontSize: 16,
    color: '#333',
  },
  deleteIcon: {
    fontSize: 20,
    color: '#D32F2F', // Dark red
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#8A2BE2', // Blue violet
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#999',
    fontSize: 16,
  },
});

export default Screen1;
