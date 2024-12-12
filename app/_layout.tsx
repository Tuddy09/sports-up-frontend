import { UserProvider } from "@/hooks/contexts/userContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack initialRouteName="signin">
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen
          name="lobbyDetails/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="createlobby" options={{ headerShown: false }} />
        <Stack.Screen
          name="managelobby/[id]"
          options={{ headerTitle: "Manage lobby" }}
        />
        <Stack.Screen
          name="lobby/[id]/messages" //TODO: change 'id' to '[id]'
          options={{ headerTitle: "Messages" }}
        />
        <Stack.Screen
          name="lobby/[id]/rating"
          options={{ headerTitle: "Rate lobby players" }}
        />
        <Stack.Screen
          name="lobby/[id]/rating/[userToRateId]"
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
            name="userProfile"
            options={{ headerTitle: "Back to lobbies" }}
        />
      </Stack>

    </UserProvider>
  );
}
