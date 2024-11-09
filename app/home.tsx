import Background from "@/components/Background";
import Logo from "@/components/Logo";
import { UserContext } from "@/hooks/contexts/userContext";
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <Background>
      <View style={styles.contentContainer}>
        <Logo />
        <Text style={styles.text}>Welcome to the Home screen, {user?.username}!</Text>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});