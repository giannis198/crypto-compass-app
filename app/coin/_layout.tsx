import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function CoinLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "black" : "white",
        },
        headerTintColor: colorScheme === "dark" ? "white" : "black",
      }}
    />
  );
}
