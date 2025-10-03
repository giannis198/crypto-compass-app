import "react-native-reanimated";
import "../global.css";

import { useAppTheme } from "@/hooks/use-app-theme";
import { BackgroundProvider } from "@/provider/BackgroundProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";

// Custom indigo themes
const IndigoDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#818CF8",
    background: "#111827",
    card: "#111827",
    text: "#E0E7FF",
    border: "#4F46E5",
    notification: "#818CF8",
  },
};

const IndigoLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4F46E5",
    background: "#F9FAFB",
    card: "#F9FAFB",
    text: "#3730A3",
    border: "#A5B4FC",
    notification: "#4F46E5",
  },
};

export default function RootLayout() {
  const { isDark } = useAppTheme();

  // Determine which theme to use
  const currentTheme = isDark ? IndigoDarkTheme : IndigoLightTheme;

  return (
    <BackgroundProvider>
      <ThemeProvider value={currentTheme}>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: currentTheme.colors.background,
            },
            headerStyle: {
              backgroundColor: currentTheme.colors.card,
            },
            headerTintColor: currentTheme.colors.primary,
            headerTitleStyle: {
              color: currentTheme.colors.text,
              fontWeight: "600",
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="coin" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </BackgroundProvider>
  );
}
