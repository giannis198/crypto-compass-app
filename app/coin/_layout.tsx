import { useColorScheme } from "@/hooks/use-color-scheme";
import { Stack } from "expo-router";

export default function CoinLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#111827" : "#ffffff",
        },
        headerTintColor: isDark ? "#f9fafb" : "#111827",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
        headerBackTitle: "Back",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Coin Details",
        }}
      />
    </Stack>
  );
}
