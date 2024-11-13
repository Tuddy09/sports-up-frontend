import { UserProvider } from "@/hooks/contexts/userContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack initialRouteName="signin">
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="lobbyDetails/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="createlobby" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}
