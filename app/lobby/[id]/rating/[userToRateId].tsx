import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams, Href } from "expo-router";
import axios from "axios";
import { UserContext } from "@/hooks/contexts/userContext";
import baseApi from "@/constants/BaseApi";
import { PlayerRating } from "@/interfaces/PlayerRating";
import Background from "@/components/Background";

export default function UserRatingScreen() {
  const { user } = useContext(UserContext); // Current logged-in user
  const router = useRouter();
  const { id: lobbyId, userToRateId: userToRateId } = useLocalSearchParams(); // Lobby and player info from the URL

  const [rating, setRating] = useState<number>(0); // Rating value (1-5)
  const [comment, setComment] = useState<string>(""); // Comment text
  const [loading, setLoading] = useState<boolean>(false);
  const [playerUsername, setPlayerUsername] = useState<string>("");

  const playerId = Array.isArray(userToRateId) ? userToRateId[0] : userToRateId;

  useEffect(() => {
    const fetchPlayerUsername = async () => {
      try {
        const response = await axios.get(`${baseApi}/Users/${playerId}`);
        setPlayerUsername(response.data.username);
      } catch (error) {
        console.error("Failed to fetch player username:", error);
        setPlayerUsername("Unknown Player");
      }
    };

    fetchPlayerUsername();
  }, [playerId]);

  const handleRatingSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Error", "Please select a rating.");
      return;
    }

    if (!comment) {
      Alert.alert("Error", "Please provide a comment.");
      return;
    }

    setLoading(true);

    try {
      const playerRating: PlayerRating = {
        toUserId: playerId, // Player to be rated
        fromUserId: user?.userId || "", // Current logged-in user
        rating,
        comment,
      };

      // Call the API to submit the rating
      await axios.post(`${baseApi}/PlayerRating`, playerRating); // TODO: change this api accordingly

      Alert.alert("Success", "Your rating has been submitted.");
      router.push(`/lobby/${lobbyId}/rating` as Href<string>);
    } catch (error) {
      Alert.alert("Error", "Failed to submit rating.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Rate {playerUsername || "Player"}</Text>

          <Text style={styles.subtitle}>Select a Rating:</Text>
          <View style={styles.ratingButtons}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Button
                key={value}
                title={`${value}`}
                onPress={() => setRating(value)}
                color={value <= rating ? "#2ecc71" : "#7f8c8d"}
              />
            ))}
          </View>

          <Text style={styles.subtitle}>Leave a Comment:</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Your comment here..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />

          <Button
            title={loading ? "Submitting..." : "Submit Rating"}
            onPress={handleRatingSubmit}
            disabled={loading}
            color="#3498db"
          />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    width: "90%",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    color: "#2c3e50",
  },
  ratingButtons: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "center",
    gap: 8,
  },
  commentInput: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    marginBottom: 16,
    fontSize: 16,
  },
});
