import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import baseApi from "@/constants/BaseApi";

export default function UserProfile() {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  const mockProfiles = [
    {
      avatar: 1,
      username: "JohnDoe",
      age: 25,
      totalMatchesPlayed: 120,
      preferredSport: "Football",
      overallRating: 4,
    },
    {
      avatar: 3,
      username: "JaneSmith",
      age: 30,
      totalMatchesPlayed: 95,
      preferredSport: "Tennis",
      overallRating: 2,
    },
    {
      avatar: 5,
      username: "MikeJohnson",
      age: 22,
      totalMatchesPlayed: 60,
      preferredSport: "Basketball",
      overallRating: 1,
    },
  ];

  useEffect(() => {
    setProfileData(mockProfiles[0]);
  }, []);

  //   useEffect(() => {
  //     const fetchProfile = async () => {
  //       try {
  //         const response = await axios.get(`${baseApi}/User/Profile`);
  //         setProfileData(response.data);
  //       } catch (error) {
  //         Alert.alert("Error", "Failed to fetch profile data");
  //         console.log(error);
  //       }
  //     };

  //     fetchProfile();
  //   }, []);

  const getSkillLevel = (rating: number) => {
    if (!rating) return "Unknown";
    if (rating >= 1 && rating <= 2) return "Beginner";
    if (rating > 2 && rating <= 4) return "Intermediate";
    if (rating > 4 && rating <= 5) return "Advanced";
    return "Unknown";
  };

  if (!profileData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No Profile Data Available</Text>
      </View>
    );
  }

  const {
    avatar,
    username,
    age,
    totalMatchesPlayed,
    preferredSport,
    overallRating,
  } = profileData;
  const skillLevel = getSkillLevel(overallRating);

  return (
    <View style={styles.container}>
      <Image
        source={require(`@/assets/images/${avatar}.PNG`)}
        style={styles.avatar}
      />
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.detail}>Age: {age}</Text>
      <Text style={styles.detail}>
        Total Matches Played: {totalMatchesPlayed}
      </Text>
      <Text style={styles.detail}>Preferred Sport: {preferredSport}</Text>
      <Text style={styles.detail}>
        Overall Rating: {overallRating || "Not Rated"}
      </Text>
      <Text style={styles.skillLevel}>Skill Level: {skillLevel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  skillLevel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2ecc71",
    marginTop: 20,
  },
});
