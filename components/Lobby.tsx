import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import the Ionicons icon set from react-native-vector-icons
import { useNavigation } from "@react-navigation/native";

interface LobbyProps {
  lobby: {
    availableSpots: number;
    createdAt: string;
    date: string;
    latitude: number;
    lobbyId: number;
    lobbyPlayers: Array<any>;
    location: string;
    longitude: number;
    messages: Array<any>;
    owner: any;
    ownerId: number;
    skillLevel: string;
    sport: string;
    time: string;
    totalSpots: number;
  };
}

export const Lobby: React.FC<LobbyProps> = ({ lobby }) => {
  const navigation = useNavigation();

  const goToLobbyDetails = () => {
    // navigation.navigate("LobbyDetail", { lobbyId: lobby.lobbyId });
  };

  return (
    <View style={styles.extraPadding}>
        <TouchableOpacity style={styles.container} onPress={goToLobbyDetails}>
        <Text style={styles.sport}>{lobby.sport}</Text>
        <Text style={styles.location}>{lobby.location}</Text>
        <View style={styles.spotsContainer}>
            <Text style={styles.spotsLabel}>Spots Available: </Text>
            <Text style={styles.spotsCount}>
            {lobby.availableSpots} / {lobby.totalSpots}
            </Text>
        </View>
        <Text style={styles.skillLevel}>Skill Level: {lobby.skillLevel}</Text>
        <Text style={styles.time}>
            Time: {lobby.time} on {new Date(lobby.date).toLocaleDateString()}
        </Text>

        <Icon
            name="chevron-forward"
            size={24}
            color="#000"
            style={styles.arrowIcon}
        />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    extraPadding: {
        padding: 5,
    },
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  sport: { fontSize: 18, fontWeight: "bold", color: "#333" },
  location: { fontSize: 16, color: "#666" },
  spotsContainer: { flexDirection: "row", alignItems: "center" },
  spotsLabel: { fontSize: 14, color: "#666" },
  spotsCount: { fontSize: 14, fontWeight: "bold", color: "#333" },
  skillLevel: { fontSize: 14, color: "#666", marginVertical: 4 },
  time: { fontSize: 14, color: "#666" },
  arrowIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
