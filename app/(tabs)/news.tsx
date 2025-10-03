import { View, Text, Image, Dimensions } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

const { width, height } = Dimensions.get("window");

export default function News() {
  const { isDark } = useAppTheme();

  return (
    <View className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}>
      {/* Header Section */}
      <View className={isDark ? "bg-gray-800 p-6" : "bg-indigo-50 p-6"}>
        <Text
          className={`
          text-2xl font-bold
          ${isDark ? "text-indigo-100" : "text-indigo-900"}
        `}
        >
          Crypto News
        </Text>
        <Text
          className={`
          mt-2
          ${isDark ? "text-indigo-300" : "text-indigo-600"}
        `}
        >
          Stay updated with the latest cryptocurrency news
        </Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-6">
        <Image
          source={require("@/assets/images/under-construction.avif")}
          style={{ width: width * 0.8, height: height * 0.5 }}
          resizeMode="contain"
          className="mb-8"
        />
        <Text
          className={`
          text-2xl font-bold text-center mb-4
          ${isDark ? "text-indigo-100" : "text-indigo-900"}
        `}
        >
          🚧 Under Construction
        </Text>
        <Text
          className={`
          text-base text-center leading-6
          ${isDark ? "text-indigo-300" : "text-indigo-600"}
        `}
        >
          We are working hard to bring you something amazing!{"\n"}
          Please check back soon.
        </Text>
      </View>
    </View>
  );
}
