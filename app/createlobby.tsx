import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import Background from '@/components/Background';
import { UserContext } from '@/hooks/contexts/userContext';
import { router } from 'expo-router';
import axios from 'axios';
import baseApi from '@/constants/BaseApi';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateLobby() {
  const { user } = useContext(UserContext);
  const [sport, setSport] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [location, setLocation] = useState('GheorgheniPark');
  const [totalSpots, setTotalSpots] = useState('');
  const [skillLevel, setSkillLevel] = useState('Beginner');

  const locations = ['Gheorgheni Park', 'Iuliu Hatieganu Park', 'La Terenuri Park'];
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleCreateLobby = () => {
    if (!sport || !date || !time || !location || !totalSpots || !skillLevel) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'User not found.');
      return;
    }

    const api = baseApi + '/Lobbies';
    axios
      .post(api, {
        sport,
        date: date.toISOString().split('T')[0],
        time: time.toTimeString().split(' ')[0].slice(0, 5), // Get time without seconds
        location,
        totalSpots: parseInt(totalSpots),
        availableSpots: parseInt(totalSpots),
        skillLevel,
        ownerId: user.userId,
      })
      .then(() => {
        Alert.alert('Success', 'Lobby created successfully!');
        router.push('/(tabs)/mylobbies');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Failed to create lobby.');
      });
  };

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={require('@/assets/images/banner.png')}
          style={styles.banner}
        />
        <TextInput
          style={styles.input}
          placeholder="Sport"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={setSport}
          value={sport}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputContainer}>
          <Text style={styles.inputText}>Date: {date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.inputContainer}>
          <Text style={styles.inputText}>Time: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) {
                setTime(selectedTime);
              }
            }}
          />
        )}
        <View style={styles.pickerContainer}>
          <Picker selectedValue={location} onValueChange={(itemValue) => setLocation(itemValue)} style={styles.picker}>
            {locations.map((loc) => (
              <Picker.Item key={loc} label={loc} value={loc} />
            ))}
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Total Spots"
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={setTotalSpots}
          value={totalSpots}
          keyboardType="numeric"
        />
        <View style={styles.pickerContainer}>
          <Picker selectedValue={skillLevel} onValueChange={(itemValue: string) => setSkillLevel(itemValue)} style={styles.picker}>
            {skillLevels.map((level: string) => (
              <Picker.Item key={level} label={level} value={level} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCreateLobby}>
          <LinearGradient
            colors={['#2ecc71', '#3498db']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Create Lobby</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  inputText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 10,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  banner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 15, // Add rounded corners
    overflow: 'hidden', // Clip the image to the rounded bounds
  },
});