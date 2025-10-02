import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "./ui/text";

const Header = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <SafeAreaView
      edges={["top"]}
      className={isDark ? "bg-gray-900" : "bg-gray-300"}
    >
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center">
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text
            className={
              isDark
                ? "text-white text-xl font-bold ml-2 "
                : "text-white text-xl font-bold ml-2"
            }
          >
            Crypto Compass
          </Text>
        </View>
      </View>
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Cryptocurrencies
        </Text>
        <Text className="text-gray-500 mt-1">Top coins by market cap</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
  },
});

export default Header;
