import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";
import "../global.css";

import Footer from "@/components/Footer";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "@/components/Header";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Header />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="coin" options={{ headerShown: true }} />
        </Stack>
        {/* <Footer /> */}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
