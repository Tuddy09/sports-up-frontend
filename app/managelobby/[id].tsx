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
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import LobbyCard from "@/components/LobbyCard";

interface JoinRequest {
  userId: number;
  user: {
    username: string;
  };
  status: string;
  // Add other fields as needed
}

interface RouteParams {
  lobbyId: string;
}

export default function ManageLobbyScreen() {
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  //   const { lobbyId } = route.params;
  const router = useRouter();
  const lobbyId = useLocalSearchParams().id;

  // Guard clause: check if 'query' is populated and contains 'id'
  // const lobbyId = query?.id;

  const { user } = useContext(UserContext);
  const [lobbyDetails, setLobbyDetails] = useState<Lobby | null>(null);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);

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
      console.error(error);
      Alert.alert("Error", "Failed to load lobby details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRequestsToJoin = async () => {
    try {
      const response = await axios.get(`${baseApi}/Requests/${lobbyId}`);
      setJoinRequests(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to load requests.");
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
      console.error("Error accepting request:", error);
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
                <Text>Username: {request.user.username}</Text>{" "}
                {/* Accessing username */}
                <View style={styles.buttonRow}>
                  <Button
                    title="Accept"
                    onPress={() => handleAccept(request.userId)}
                  />
                  <Button
                    title="Reject"
                    color="red"
                    onPress={() => handleReject(request.userId)}
                  />
                </View>
              </View>
            ))
          ) : (
            <Text>No pending join requests</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.95)", // Light, translucent white background
    borderRadius: 15,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5, // Adding shadow and elevation for a "card" effect
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700", // Bold and large font
    color: "#2ecc71", // Matching gradient start color for emphasis
    marginBottom: 12,
  },
  requestCard: {
    padding: 18,
    backgroundColor: "rgba(255, 255, 255, 0.95)", // Matching translucent white background
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5, // Card-like shadow
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  // Additional styling for each request card's contents
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "600", // Slightly bold font for the username
    color: "#34495e", // Dark gray color
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: "#7f8c8d", // Lighter gray for informational text
  },
});
