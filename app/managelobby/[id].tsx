import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { UserContext } from "@/hooks/contexts/userContext";
import Background from "@/components/Background";
import baseApi from "@/constants/BaseApi";
import { Lobby } from "@/interfaces/Lobby";
import { useLocalSearchParams, useRouter } from "expo-router";
import LobbyCard from "@/components/LobbyCard";

interface JoinRequest {
  userId: number;
  username: string;
  status: string;
  // Add other fields as needed
}

interface RouteParams {
  lobbyId: string;
}

export default function ManageLobbyScreen() {
  const lobbyId = useLocalSearchParams().id;

  const { user } = useContext(UserContext);
  const [lobbyDetails, setLobbyDetails] = useState<Lobby | null>(null);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (lobbyId) {
      console.log("Managing lobby with id:", lobbyId);
      fetchLobbyDetails();
      fetchRequestsToJoin();
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

  const fetchRequestsToJoin = async () => {
    try {
      const response = await axios.get(`${baseApi}/LobbyPlayers/Requests/${lobbyId}`);
      setJoinRequests(response.data);
    } catch (error) {
      Alert.alert("No join requests found.");
    }
  };

  // Handle accepting a join request
  const handleAccept = async (userId: any) => {
    try {
      await axios.put(`${baseApi}/LobbyPlayers/Accept`, {
        LobbyId: lobbyId,
        UserId: userId,
      });
      setJoinRequests(
        joinRequests.filter((request) => request.userId !== userId)
      );
      Alert.alert("Request accepted");
    } catch (error) {
      Alert.alert("Failed to accept request");
    }
  };

  // Handle rejecting a join request
  const handleReject = async (userId: any) => {
    try {
      await axios.delete(`${baseApi}/LobbyPlayers/Reject`, {
        data: { LobbyId: lobbyId, UserId: userId },
      });
      setJoinRequests(
        joinRequests.filter((request) => request.userId !== userId)
      );
      if (lobbyDetails) {
        lobbyDetails.availableSpots += 1;
      }
      Alert.alert("Request rejected");
    } catch (error) {
      console.error("Error rejecting request:", error);
      Alert.alert("Failed to reject request");
    }
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
          <LobbyCard lobby={lobbyDetails} onPress={function (): void {}} />
        </View>

        <View style={styles.requestsContainer}>
          <Text style={styles.sectionTitle}>Join Requests</Text>
          {joinRequests.length > 0 ? (
            joinRequests.map((request) => (
              <View key={request.userId} style={styles.requestCard}>
                <Text style={styles.usernameText}>Username: {request.username}</Text>
                {/* Accessing username */}
                <View style={styles.buttonRow}>
                  <Button
                    title="Accept"
                    onPress={() => handleAccept(request.userId)}
                    color="#2ecc71" // Green color for accept button
                  />
                  <Button
                    title="Reject"
                    onPress={() => handleReject(request.userId)}
                    color="#e74c3c" // Red color for reject button
                  />
                </View>
              </View>
            ))
          ) : (
            <Text>No pending join requests</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => router.push(`/lobby/${lobbyId}/messages`)} //change to [lobbyId] when implemented
        >
          <Text style={styles.chatButtonText}>Go to Chat</Text>
        </TouchableOpacity>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  lobbyDetails: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  // Style for the requests section
  requestsContainer: {
    padding: 18,
    backgroundColor: "#f9f9f9", // Light gray background
    borderRadius: 15,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4, // Slightly reduced shadow and elevation for a softer effect
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold", // Bold and large font
    color: "#34495e", // Dark gray color for emphasis
    marginBottom: 16,
  },
  requestCard: {
    padding: 16,
    backgroundColor: "#ffffff", // White background
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4, // Slightly reduced shadow and elevation for a softer effect
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Space between buttons
    marginTop: 12,
  },
  // Additional styling for each request card's contents
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold", // Bold font for the username
    color: "#2c3e50", // Darker gray color
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: "#7f8c8d", // Lighter gray for informational text
  },
  chatButton: {
    backgroundColor: "#3498db",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
    alignItems: "center",
  },
  chatButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});