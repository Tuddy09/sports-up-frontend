import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LobbyCard from '@/components/LobbyCard';
import Background from '@/components/Background';

export default function HomeScreen() {
  const [selectedSport, setSelectedSport] = useState('All');

  const lobbies = [
    {
      sport: 'Soccer',
      skillLevel: 'Intermediate',
      latitude: 46.770920,
      longitude: 23.589920,
      date: '2023-10-01',
      time: '14:00',
      availableSpots: 3,
      totalSpots: 10,
      location: 'Gheorgheni Park',
    },
    {
      sport: 'Basketball',
      skillLevel: 'Beginner',
      latitude: 46.771000,
      longitude: 23.590000,
      date: '2023-10-02',
      time: '16:00',
      availableSpots: 5,
      totalSpots: 12,
      location: 'La Terenuri',
    },
    {
      sport: 'Tennis',
      skillLevel: 'Advanced',
      latitude: 46.772000,
      longitude: 23.591000,
      date: '2023-10-03',
      time: '10:00',
      availableSpots: 1,
      totalSpots: 4,
      location: 'Cluj Arena',
    },
    // Add more lobbies as needed
  ];

  const sports = useMemo(() => {
    const uniqueSports = ['All', ...new Set(lobbies.map(lobby => lobby.sport))];
    return uniqueSports;
  }, [lobbies]);

  const filteredLobbies = useMemo(() => {
    if (selectedSport === 'All') return lobbies;
    return lobbies.filter(lobby => lobby.sport === selectedSport);
  }, [lobbies, selectedSport]);

  const handlePress = (lobby: { sport: string; skillLevel: string; latitude: number; longitude: number; date: string; time: string; availableSpots: number; totalSpots: number; location: string; }) => {
    console.log('Pressed lobby:', lobby);
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.dropdownContainer}>
            <Picker
            selectedValue={selectedSport}
            onValueChange={(itemValue: string) => setSelectedSport(itemValue)}
            style={styles.dropdown}
            >
            {sports.map((sport: string) => (
              <Picker.Item key={sport} label={sport} value={sport} />
            ))}
            </Picker>
        </View>
        {filteredLobbies.map((lobby, index) => (
          <View key={index} style={styles.cardWrapper}>
            <LobbyCard lobby={lobby} onPress={() => handlePress(lobby)} />
          </View>
        ))}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  dropdownContainer: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  dropdown: {
    height: 50,
  },
});