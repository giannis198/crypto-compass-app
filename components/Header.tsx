import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "./ui/text";

export const Header = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView
      edges={["top"]}
      className={isDark ? "bg-gray-900" : "bg-gray-800"}
    >
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center">
          <Image
            source={require("../assets/images/logo.png")}
            className="h-10 w-10"
            resizeMode="contain"
          />
          <Text
            className={
              isDark
                ? "text-white text-lg font-bold ml-2"
                : "text-white text-lg font-bold ml-2"
            }
          >
            Crypto Compass
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
