import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "./ui/text";
import { useAppTheme } from "@/hooks/use-app-theme";

const Header = () => {
  const { isDark } = useAppTheme();

  return (
    <SafeAreaView
      edges={["top"]}
      className={isDark ? "bg-gray-900" : "bg-gray-300"}
    >
      {/* Logo Section */}
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
                ? "text-indigo-200 text-xl font-bold ml-2"
                : "text-indigo-700 text-xl font-bold ml-2"
            }
          >
            Crypto Compass
          </Text>
        </View>
      </View>

      {/* Title Section */}
      <View
        className={
          isDark
            ? "bg-gray-800 px-4 py-4 border-b border-indigo-600"
            : "bg-gray-100 px-4 py-4 border-b border-t border-indigo-300"
        }
      >
        <Text
          className={
            isDark
              ? "text-indigo-100 text-2xl font-bold"
              : "text-indigo-900 text-2xl font-bold"
          }
        >
          Cryptocurrencies
        </Text>
        <Text
          className={isDark ? "text-indigo-400 mt-1" : "text-indigo-600 mt-1"}
        >
          Top coins by market cap
        </Text>
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
