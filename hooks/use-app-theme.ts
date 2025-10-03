// hooks/use-app-theme.ts
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeStore } from "@/store/themeStore";

export function useAppTheme() {
  const colorScheme = useColorScheme();
  const { themePreference } = useThemeStore();

  const isDark =
    themePreference === "system"
      ? colorScheme === "dark"
      : themePreference === "dark";

  return {
    isDark,
    themePreference,
    // Helper properties for easy consumption
    backgroundColor: isDark ? "#111827" : "#F9FAFB",
    textColor: isDark ? "#F9FAFB" : "#111827",
  };
}
