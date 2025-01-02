import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { UserContext } from "@/hooks/contexts/userContext";
import Background from "@/components/Background";
import baseApi from "@/constants/BaseApi";
import { Lobby } from "@/interfaces/Lobby";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import LobbyCard from "@/components/LobbyCard";

interface PlayerRating {
  toUserId?: string; // For ratings given
  fromUserId?: string; // For ratings received
  rating: number;
  comment: string;
}

interface LobbyPlayer {
  userId: string;
  username: string;
  email: string;
  ratingsGiven: PlayerRating[]; // Array of ratings given by the user
  ratingsReceived: PlayerRating[]; // Array of ratings received by the user
}

// Hardcoded user data
const hardcodedUser = {
  userId: "1",
  username: "JohnDoe",
  email: "johndoe@example.com",
  ratingsGiven: [
    { toUserId: "2", rating: 5, comment: "Great player!" },
    { toUserId: "3", rating: 4, comment: "Good sportsmanship." },
  ],
  ratingsReceived: [
    // { fromUserId: 4, rating: 5, comment: "Fantastic team player!" },
  ],
};

export default function RatingScreen() {
  const lobbyId = useLocalSearchParams().id;

  const router = useRouter();

  const { user } = useContext(UserContext);
  const [lobbyDetails, setLobbyDetails] = useState<Lobby | null>(null);
  const [lobbyPlayers, setLobbyPlayers] = useState<LobbyPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lobbyId) {
      fetchLobbyDetails();
      fetchLobbyPlayers();
    }
  }, [lobbyId]);

  const fetchLobbyDetails = async () => {
    try {
      const response = await axios.get(`${baseApi}/Lobbies/${lobbyId}`);
      setLobbyDetails(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to load lobby details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLobbyPlayers = async () => {
    try {
      const response = await axios.get(`${baseApi}/Users/lobbyusers/${lobbyId}`)
      const playersInLobby = response.data;
      setLobbyPlayers(playersInLobby.filter((player : User) => player.userId !== user?.userId));
      console.log("lobby players: ", playersInLobby);
    } catch (error) {
      Alert.alert("Error", "Failed to load players.");
    }
  };

  // Handle rating a player
  const handleRatePlayer = async (userId: string) => {
    try {
      // Redirect to rating page
      router.push(`/lobby/${lobbyId}/rating/${userId}` as Href<string>);
    } catch (error) {
      Alert.alert("Error", "Failed to navigate to rating page.");
    }
  };

  const hasRatedPlayer = (playerId: string) => {
    // Check if the current user has already rated this player
    return hardcodedUser.ratingsGiven.some(
      (rating) => rating.toUserId === playerId
    );
  };

  const removePlayerFromRateList = (playerId: string) => {
    // Remove player from the list if rated
    setLobbyPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.userId !== playerId)
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!lobbyDetails) {
    return <Text>No lobby found.</Text>;
  }

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <LobbyCard lobby={lobbyDetails} onPress={() => {}} />
        </View>

        <View style={styles.playersContainer}>
          <Text style={styles.sectionTitle}>Players to Rate</Text>
          {lobbyPlayers.length > 0 ? (
            lobbyPlayers.map((player) => {
              const isRated = hasRatedPlayer(player.userId);
              return (
                <View key={player.userId} style={styles.playerCard}>
                  <Text style={styles.usernameText}>
                    Username: {player.username}
                  </Text>

                  {/* If player has ratings, show them */}
                  {player.ratingsReceived &&
                  player.ratingsReceived.length > 0 ? (
                    player.ratingsReceived.map((rating, index) => (
                      <View key={index} style={styles.container}>
                        <Text>Rating: {rating.rating}</Text>
                        <Text>Comment: {rating.comment}</Text>
                      </View>
                    ))
                  ) : (
                    <Text>No ratings given by you yet.</Text>
                  )}

                  {/* Show the "Rate" button only if the current user hasn't rated this player */}
                  {!isRated && (
                    <View style={styles.buttonRow}>
                      <Button
                        title="Rate"
                        onPress={() => {
                          handleRatePlayer(player.userId);
                          removePlayerFromRateList(player.userId); // Remove player from the rate list after navigating to the rating page
                        }}
                        color="#3498db" // Blue for rating action
                      />
                    </View>
                  )}
                </View>
              );
            })
          ) : (
            <Text>No players to rate.</Text>
          )}
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  playersContainer: {
    padding: 18,
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 16,
  },
  playerCard: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: "#7f8c8d",
  },
});
