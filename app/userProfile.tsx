import React, {useContext, useEffect, useState} from "react";
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
import {UserContext} from "@/hooks/contexts/userContext";
import Background from "@/components/Background";


export default function UserProfile() {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(UserContext);

    useEffect(() => {
        // Fetch data from backend
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `${baseApi}/Users/Profile/${user?.userId}`
                );
                setProfileData(response.data);
            } catch (error) {
                Alert.alert("Error", "Failed to fetch profile data");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Calculate skill level based on overall rating
    const getSkillLevel = (rating: number) => {
        if (!rating) return "Unknown";
        if (rating >= 1 && rating <= 2) return "Beginner";
        if (rating > 2 && rating <= 4) return "Intermediate";
        if (rating > 4 && rating <= 5) return "Advanced";
        return "Unknown";
    };

    if (loading) {
        return (
            <ActivityIndicator size="large" color="#3498db" style={styles.loader}/>
        );
    }

    if (!profileData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>No Profile Data Available</Text>
            </View>
        );
    }

    const {
        username,
        age,
        avatarId,
        totalMatchesPlayed,
        preferredSport,
        overallRating,
    } = profileData;
    const skillLevel = getSkillLevel(overallRating);

    const avatarImages = {
        1: require('../assets/images/1.png'),
        2: require('../assets/images/2.png'),
        3: require('../assets/images/3.png'),
        4: require('../assets/images/4.png'),
        5: require('../assets/images/5.png'),
    };

    return (
        <Background>
            <View style={styles.container}>
                <Image source={avatarImages[avatarId]} style={styles.avatar}/>
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
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
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
        color: "#1c9a66",
        marginTop: 20,
    },
});
