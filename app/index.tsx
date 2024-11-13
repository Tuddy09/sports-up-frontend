import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
      This is the Screen Navigator screen!
      </Text>
      <Link href="/signin">
      <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: 'bold' }}>Sign In</Text>
      </Link>
      <Link href="/register">
      <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: 'bold' }}>Register</Text>
      </Link>
      <Link href="/lobbyDetails/1">
      <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: 'bold' }}>Lobby Details</Text>
      </Link>
      <Link href="/(tabs)/home">
      <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: 'bold' }}>Home</Text>
      </Link>
      <Link href="/(tabs)/mylobbies">
      <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: 'bold' }}>My Lobbies</Text>
      </Link>
    </View>
  );
}
