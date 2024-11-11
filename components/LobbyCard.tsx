import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

interface LobbyCardProps {
  lobby: Lobby;
  onPress: () => void;
}

export default function LobbyCard({ lobby, onPress }: LobbyCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.sportType}>{lobby.sport}</Text>
        <Text style={styles.skillLevel}>{lobby.skillLevel}</Text>
      </View>
      
      {/* Thumbnail Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: lobby.latitude,
            longitude: lobby.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
        >
          <Marker coordinate={{ latitude: lobby.latitude, longitude: lobby.longitude }} />
        </MapView>
      </View>

      {/* Location String */}
      <Text style={styles.locationText}>{lobby.location}</Text>

      <View style={styles.details}>
        <View style={styles.row}>
          <FontAwesome name="calendar" size={20} color="#2ecc71" />
          <Text style={styles.infoText}>{lobby.date}</Text>
        </View>
        
        <View style={styles.row}>
          <FontAwesome name="clock-o" size={20} color="#2ecc71" />
          <Text style={styles.infoText}>{lobby.time}</Text>
        </View>
        
        <View style={styles.row}>
          <FontAwesome name="user-o" size={20} color="#2ecc71" />
          <Text style={styles.infoText}>
            {lobby.availableSpots}/{lobby.totalSpots} Spots
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 18,
    borderRadius: 15,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sportType: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2ecc71',  // Matching gradient start color
  },
  skillLevel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3498db',  // Matching gradient end color
  },
  mapContainer: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 12,
  },
  details: {
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#34495e',
    fontWeight: '500',
  },
});
