import React, { useState, useEffect, useMemo, useContext } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LobbyCard from '@/components/LobbyCard';
import Background from '@/components/Background';
import axios from 'axios';
import baseApi from '@/constants/BaseApi';
import { router } from 'expo-router';
import { UserContext } from '@/hooks/contexts/userContext';

export default function MyLobbiesScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Owned');
  const [ownedLobbies, setOwnedLobbies] = useState([]);
  const [joinedLobbies, setJoinedLobbies] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchLobbies = async () => {
      if (!user) return;
      try {
        const ownedResponse = await axios.get(`${baseApi}/Lobbies/owned/${user.userId}`);
        setOwnedLobbies(ownedResponse.data);
        const joinedResponse = await axios.get(`${baseApi}/Lobbies/joined/${user.userId}`);
        setJoinedLobbies(joinedResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLobbies();
  }, [user]);

  const filteredLobbies = useMemo(() => {
    return selectedFilter === 'Owned' ? ownedLobbies : joinedLobbies;
  }, [selectedFilter, ownedLobbies, joinedLobbies]);

  const handlePress = (lobby: never) => {
    console.log('Pressed lobby:', lobby);
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title="Create New Lobby"
            onPress={() => router.push('/createlobby')}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedFilter}
            onValueChange={(itemValue) => setSelectedFilter(itemValue)}
            style={styles.dropdown}
          >
            <Picker.Item label="Owned Lobbies" value="Owned" />
            <Picker.Item label="Joined Lobbies" value="Joined" />
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
  buttonContainer: {
    marginTop: 16,
    marginBottom: 16,
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