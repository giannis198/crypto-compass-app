import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: isDark ? "#60a5fa" : "#007bff",
          tabBarInactiveTintColor: isDark ? "#9ca3af" : "#6b7280",
          tabBarStyle: {
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderTopColor: isDark ? "#374151" : "#e5e7eb",
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="portfolio"
          options={{
            title: "Portfolio",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wallet" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="compass"
          options={{
            title: "Compass",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="compass" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
