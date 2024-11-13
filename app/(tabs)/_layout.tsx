import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { Tabs } from "expo-router"

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { height: 60 },
                tabBarLabelStyle: { marginBottom: 5 },
            }}
        >
            <Tabs.Screen name="home" options={{ title: "Home",
                tabBarIcon: ({ color, size }) => (
                    <TabBarIcon name={"home"} color={color} size={size} />
                ),
                headerShown: false,
             }} />
            <Tabs.Screen name="mylobbies" options={{ title: "My Lobbies",
                tabBarIcon: ({ color, size }) => (
                    <TabBarIcon name={"list"} color={color} size={size} />
                ),
                headerShown: false,
             }} />
        </Tabs>
    );
}