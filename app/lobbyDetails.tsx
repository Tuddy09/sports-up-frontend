import Background from "@/components/Background";
import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView,Text, Button } from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import HeaderLogo from "@/components/HeaderLogo";
import { mockLobby } from "@/constants/mockLobby";
import { Feather } from '@expo/vector-icons';
import baseApi from "@/constants/BaseApi";
import axios from "axios";

interface InfoItemProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
}

type Owner = {
  userId: number;
  username: string;
  email: string;
  password: string;
  ownedLobbies: number[];
  lobbyPlayers: number[];
  ratingsGiven: number[];
  ratingsReceived: number[];
  sentMessages: number[];
};

export default function LobbyDetails() {
  //ar trebui sa primesc lobby ca si parametru de la home page
  const [lobby, setLobby] = useState(mockLobby);
  const [owner, setOwner] = useState<Owner>();

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

    useEffect(() => {
      const getOwnerById = async (oid: number) => {
        const url = baseApi + '/Users/' + oid;
        try{
          await axios.get(url).then(response => {
            setOwner(response.data);
          });
        }catch(error) {console.error("Error fetching owner:", error)}

    }
    getOwnerById(lobby.ownerId);
  }, [lobby.ownerId]);

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


  return (
    <Background>

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
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          {/* Title */}
          <View style={styles.header}>
            <Text style={styles.title}>{mockLobby.sport} Game Session</Text>
          </View>

          <View style={styles.content}>
            {/* Date and Time Section */}
            <View style={styles.dateTimeContainer}>
            <InfoItem
                icon="calendar"
                label="Date"
                value={formatDate(lobby.date)}
              />
              <InfoItem
                icon="clock"
                label="Time"
                value={lobby.time}
              />
            </View>

            {/* Location */}
            <InfoItem
              icon="map-pin"
              label="Location"
              value={lobby.location}
            />

            {/* Players Info */}
            <InfoItem
              icon="users"
              label="Players"
              value={`${lobby.totalSpots - lobby.availableSpots} / ${lobby.totalSpots} spots filled (${lobby.availableSpots} available)`}
            />

            {/* Skill Level */}
            <InfoItem
              icon="award"
              label="Skill Level"
              value={lobby.skillLevel}
            />

            {/* Created Info */}
            <InfoItem
              icon="user"
              label="Created By"
              value={`Owner #${owner_text} on ${new Date(lobby.createdAt).toLocaleString()}`}
            />
          </View>
        </View>
      </ScrollView>

        <View>
          <TouchableOpacity 
            style={styles.joinButton}
            onPress={() => {
              console.log('Join button pressed');
            }}
          >
            <Text style={styles.joinButtonText}>Join Lobby</Text>
          </TouchableOpacity>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    padding: 16,
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
    gap: 12,
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
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 24, // Add extra padding at bottom
    backgroundColor: 'transparent',
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
});