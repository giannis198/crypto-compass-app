// app/(tabs)/settings.tsx
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeStore } from "@/store/themeStore";
import { Check } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ThemePreference = "system" | "light" | "dark";

export default function Settings() {
  const systemColorScheme = useColorScheme();
  const { themePreference, setThemePreference } = useThemeStore();

  // Calculate current theme using indigo color scheme
  const isDark =
    themePreference === "system"
      ? systemColorScheme === "dark"
      : themePreference === "dark";

  const ThemeOption = ({
    value,
    label,
    description,
  }: {
    value: ThemePreference;
    label: string;
    description: string;
  }) => (
    <TouchableOpacity
      onPress={() => setThemePreference(value)}
      className={`
        flex-row items-center justify-between p-4 rounded-lg mb-2 border
        ${
          isDark
            ? "bg-gray-800 border-indigo-600"
            : "bg-white border-indigo-300"
        }
      `}
    >
      <View className="flex-1">
        <Text
          className={`
          font-medium
          ${isDark ? "text-indigo-100" : "text-indigo-900"}
        `}
        >
          {label}
        </Text>
        <Text
          className={`
          text-sm mt-1
          ${isDark ? "text-indigo-300" : "text-indigo-600"}
        `}
        >
          {description}
        </Text>
      </View>
      {themePreference === value && (
        <Check size={20} color={isDark ? "#818CF8" : "#4F46E5"} />
      )}
    </TouchableOpacity>
  );

  const getCurrentThemeText = () => {
    if (themePreference === "system") {
      return `System (${systemColorScheme === "dark" ? "Dark" : "Light"})`;
    }
    return themePreference === "dark" ? "Dark" : "Light";
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}>
          {/* Header Section */}
          <View
            className={
              isDark ? "bg-gray-800 px-10 py-4" : "bg-indigo-50 px-10 py-4"
            }
          >
            <Text
              className={`
          text-2xl font-bold
          ${isDark ? "text-indigo-100" : "text-indigo-900"}
        `}
            >
              Settings
            </Text>
            <Text
              className={`
          mt-2
          ${isDark ? "text-indigo-300" : "text-indigo-600"}
        `}
            >
              Customize your app experience
            </Text>
          </View>

          {/* Theme Selection Section */}
          <View className="mx-4 my-6">
            <Text
              className={`
          text-lg font-semibold mb-4
          ${isDark ? "text-indigo-100" : "text-indigo-900"}
        `}
            >
              Appearance
            </Text>

            <View
              className={`
          rounded-xl p-4 border
          ${
            isDark
              ? "bg-gray-800 border-indigo-600"
              : "bg-white border-indigo-300"
          }
        `}
            >
              <ThemeOption
                value="system"
                label="System Default"
                description="Follow your device theme settings"
              />
              <ThemeOption
                value="light"
                label="Light Mode"
                description="Always use light theme"
              />
              <ThemeOption
                value="dark"
                label="Dark Mode"
                description="Always use dark theme"
              />
            </View>
          </View>

          {/* Current Theme Info */}
          <View
            className={`
        mx-4 my-4 rounded-xl p-4 border
        ${
          isDark
            ? "bg-indigo-950 border-indigo-600"
            : "bg-indigo-50 border-indigo-300"
        }
      `}
          >
            <Text
              className={`
          text-sm
          ${isDark ? "text-indigo-300" : "text-indigo-700"}
        `}
            >
              Current theme: {getCurrentThemeText()}
            </Text>
          </View>

          {/* Additional Settings Sections */}
          <View
            className={`
        mx-4 my-2 rounded-xl p-4 border
        ${
          isDark
            ? "bg-gray-800 border-indigo-600"
            : "bg-white border-indigo-300"
        }
      `}
          >
            <Text
              className={`
          text-lg font-semibold
          ${isDark ? "text-indigo-100" : "text-indigo-900"}
        `}
            >
              Notifications
            </Text>
            <Text
              className={`
          text-sm mt-1
          ${isDark ? "text-indigo-300" : "text-indigo-600"}
        `}
            >
              Manage your notification preferences
            </Text>
          </View>

          <View
            className={`
        mx-4 my-2 rounded-xl p-4 border
        ${
          isDark
            ? "bg-gray-800 border-indigo-600"
            : "bg-white border-indigo-300"
        }
      `}
          >
            <Text
              className={`
          text-lg font-semibold
          ${isDark ? "text-indigo-100" : "text-indigo-900"}
        `}
            >
              Currency
            </Text>
            <Text
              className={`
          text-sm mt-1
          ${isDark ? "text-indigo-300" : "text-indigo-600"}
        `}
            >
              Set your preferred currency (USD, EUR, GBP)
            </Text>
          </View>

          {/* App Info Section */}
          <View
            className={`
        mx-4 my-2 rounded-xl p-4 border
        ${
          isDark
            ? "bg-gray-800 border-indigo-600"
            : "bg-white border-indigo-300"
        }
      `}
          >
            <Text
              className={`
          text-lg font-semibold
          ${isDark ? "text-indigo-100" : "text-indigo-900"}
        `}
            >
              About
            </Text>
            <Text
              className={`
          text-sm mt-1
          ${isDark ? "text-indigo-300" : "text-indigo-600"}
        `}
            >
              Crypto Compass v1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
