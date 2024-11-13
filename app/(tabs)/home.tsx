import React, { useState, useMemo, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import LobbyCard from "@/components/LobbyCard";
import Background from "@/components/Background";
import axios from "axios";
import baseApi from "@/constants/BaseApi";

export default function HomeScreen() {
  const [selectedSport, setSelectedSport] = useState("All");
  const [lobbies, setLobbies] = useState<
    {
      sport: string;
      skillLevel: string;
      latitude: number;
      longitude: number;
      date: string;
      time: string;
      availableSpots: number;
      totalSpots: number;
      location: string;
    }[]
  >([]);

  useEffect(() => {
    const url = baseApi + "/Lobbies";
    axios.get(url).then((response) => {
      setLobbies(response.data);
    });
  }, []);

  const sports = useMemo(() => {
    const uniqueSports = [
      "All",
      ...new Set(lobbies.map((lobby) => lobby.sport)),
    ];
    return uniqueSports;
  }, [lobbies]);

  const filteredLobbies = useMemo(() => {
    if (selectedSport === "All") return lobbies;
    return lobbies.filter((lobby) => lobby.sport === selectedSport);
  }, [lobbies, selectedSport]);

  const handlePress = (lobby: {
    lobbyId: number;
    sport: string;
    skillLevel: string;
    latitude: number;
    longitude: number;
    date: string;
    time: string;
    availableSpots: number;
    totalSpots: number;
    location: string;
  }) => {
    console.log("Pressed lobby:", lobby);
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
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
  },
  dropdown: {
    height: 50,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingTop: 32,
//     paddingBottom: 32,
//   },
//   cardWrapper: {
//     marginBottom: 16,
//   },
//   dropdownContainer: {
//     marginBottom: 16,
//     backgroundColor: "#ffffff",
//     borderRadius: 12, // Smooth rounded corners
//     elevation: 5, // More prominent shadow for better depth
//     shadowColor: "#000", // Optional shadow for iOS
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   dropdown: {
//     height: 50, // Adjust the height for a better size
//     backgroundColor: "#f2f2f2", // Light gray background
//     borderRadius: 8, // Rounded corners
//     paddingHorizontal: 12, // Add padding for better spacing inside the dropdown
//     fontSize: 16, // Slightly larger font size for readability
//     color: "#333", // Darker text for better contrast
//     borderWidth: 1, // Subtle border for structure
//     borderColor: "#ddd", // Light gray border for soft edges
//     justifyContent: "center", // Center text vertically
//   },
//   dropdownText: {
//     fontSize: 16, // Ensure the text is large enough
//     color: "#333", // Dark text color for contrast
//     paddingVertical: 12, // Padding for better touch area
//   },
//   dropdownArrow: {
//     position: "absolute",
//     right: 12,
//     top: "50%",
//     transform: [{ translateY: -10 }], // Center the arrow vertically
//   },
// });
