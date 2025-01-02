import Background from "@/components/Background";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import HeaderLogo from "@/components/HeaderLogo";
import { Feather } from '@expo/vector-icons';
import baseApi from "@/constants/BaseApi";
import axios from "axios";
import { Lobby } from "@/interfaces/Lobby";
import { router, useLocalSearchParams } from "expo-router";
import { UserContext } from "@/hooks/contexts/userContext";

interface InfoItemProps {
    icon: keyof typeof Feather.glyphMap;
    label: string;
    value: string;
}

export default function LobbyDetails() {
    const [lobby, setLobby] = useState<Lobby>();
    const [owner, setOwner] = useState<User>();
    const { user } = useContext(UserContext);
    const lobbyId = useLocalSearchParams().id;
    const showJoinButton = useLocalSearchParams().showJoinButton === 'true';

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        const fetchLobbyDetails = async () => {
            try {
                const response = await axios.get(`${baseApi}/lobbies/${lobbyId}`);
                setLobby(response.data);
                const ownerResponse = await axios.get(`${baseApi}/users/${response.data.ownerId}`);
                setOwner(ownerResponse.data);
            } catch (error) {
                console.error("Error fetching lobby details:", error);
            }
        };

        fetchLobbyDetails();
    }, [lobbyId]);

    const owner_text = owner ? owner.username : "Loading..."

    const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
        <View style={styles.infoItem}>
            <Feather name={icon} size={24} color="#4F46E5" />
            <View style={styles.infoTextContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );

    const requestToJoin = () => {
        if (!lobby || !user) {
            console.error("Lobby or user information is missing.");
            return;
        }

        axios.post(`${baseApi}/LobbyPlayers/Request`, { userId: user.userId, lobbyId: lobby.lobbyId })
            .then(response => {
                console.log("Successfully requested to join the lobby:", response.data);
                alert("Successfully requested to join the lobby.");
                router.push('/(tabs)/home');
            })
            .catch(error => {
                alert(`${error.response?.data}`);
            });
    };

    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.logoContainer}>
                        <HeaderLogo />
                    </View>

                    <View style={styles.rightHeaderContainer}>
                        <TouchableOpacity style={styles.iconButton}>
                            <FontAwesome name="user" size={24} color="#333" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconButton}>
                            <FontAwesome name="cog" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.mainContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.card}>
                            {/* Title */}
                            <View style={styles.header}>
                                <Text style={styles.title}>{lobby?.sport} Game Session</Text>
                            </View>

                            <View style={styles.content}>
                                {/* Date and Time Section */}
                                <View style={styles.dateTimeContainer}>
                                    <InfoItem
                                        icon="calendar"
                                        label="Date"
                                        value={formatDate(lobby?.date || '')}
                                    />
                                    <InfoItem
                                        icon="clock"
                                        label="Time"
                                        value={lobby?.time || ''}
                                    />
                                </View>

                                {/* Location */}
                                <InfoItem
                                    icon="map-pin"
                                    label="Location"
                                    value={lobby?.location || ''}
                                />

                                {/* Players Info */}
                                <InfoItem
                                    icon="users"
                                    label="Players"
                                    value={`${(lobby?.totalSpots || 0) - (lobby?.availableSpots || 0)} / ${lobby?.totalSpots || 0} spots filled (${lobby?.availableSpots || 0} available)`}
                                />

                                {/* Skill Level */}
                                <InfoItem
                                    icon="award"
                                    label="Skill Level"
                                    value={lobby?.skillLevel || ''}
                                />

                                {/* Created Info */}
                                <InfoItem
                                    icon="user"
                                    label="Created By"
                                    value={`Owner #${owner_text} on ${lobby ? new Date(lobby.createdAt).toLocaleString() : ''}`}
                                />
                            </View>
                        </View>
                    </ScrollView>

                    {showJoinButton ? (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.joinButton}
                                onPress={requestToJoin}
                            >
                                <Text style={styles.joinButtonText}>Request to Join</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.chatButton}
                                onPress={() => router.push(`/lobby/${lobbyId}/messages`)}
                            >
                                <Text style={styles.chatButtonText}>Go to Chat</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 75,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rightHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'rgba(0, 122, 255, 0.5)',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        paddingTop: 32,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 8,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4338CA',
        textAlign: 'center',
    },
    content: {
        padding: 16,
        gap: 16,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8, // Reduced gap
        minWidth: '45%', // Ensure items take up reasonable space
        flexShrink: 1, // Allow shrinking if needed
    },
    infoTextContainer: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#6B7280',
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    mainContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    scrollView: {
        flex: 1,
        padding: 16,
        marginBottom: -20, // Pulls content up
    },
    scrollViewContent: {
        flexGrow: 1,
        padding: 16,
    },
    joinButton: {
        backgroundColor: '#4F46E5', // Indigo color to match the icons
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    joinButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    // Add a pressed state style if you want
    joinButtonPressed: {
        backgroundColor: '#4338CA', // Slightly darker when pressed
        transform: [{ scale: 0.98 }],
    },
    buttonContainer: {
        padding: 16,
        marginTop: -20, // Moves button up
        backgroundColor: 'transparent',
    },
    chatButton: {
        backgroundColor: '#3498db',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: "center",
    },
    chatButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});