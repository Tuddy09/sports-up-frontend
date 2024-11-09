import Background from "@/components/Background";
import Logo from "@/components/Logo";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <Background>
      <View style={styles.contentContainer}>
        <Logo />
        <Text style={styles.text}>Welcome to the Home screen!</Text>
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