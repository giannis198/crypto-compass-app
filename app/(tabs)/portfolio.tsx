import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

const { width, height } = Dimensions.get("window");

export default function Portfolio() {
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
          Portfolio
        </Text>
        <Text
          className={`
          mt-2
          ${isDark ? "text-indigo-300" : "text-indigo-600"}
        `}
        >
          Track and manage your cryptocurrency investments
        </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("@/assets/images/under-construction.avif")}
            style={{ width: width * 0.8, height: height * 0.4 }}
            resizeMode="contain"
            className="mb-8"
          />
          <Text
            className={`
            text-2xl font-bold text-center mb-4
            ${isDark ? "text-indigo-100" : "text-indigo-900"}
          `}
          >
            🚧 Portfolio Coming Soon
          </Text>
          <Text
            className={`
            text-base text-center leading-6
            ${isDark ? "text-indigo-300" : "text-indigo-600"}
          `}
          >
            Were working hard to bring you a comprehensive portfolio tracker!
            {"\n"}
            Track your investments, view performance, and manage your assets.
            {"\n"}
            Please check back in the next update.
          </Text>

          {/* Feature Preview Section */}
          <View
            className={`
            mt-8 p-6 rounded-xl border
            ${
              isDark
                ? "bg-gray-800 border-indigo-600"
                : "bg-white border-indigo-300"
            }
          `}
          >
            <Text
              className={`
              text-lg font-semibold text-center mb-4
              ${isDark ? "text-indigo-100" : "text-indigo-900"}
            `}
            >
              Planned Features
            </Text>

            <View className="space-y-3">
              <View className="flex-row items-center">
                <Text
                  className={`
                  text-lg mr-2
                  ${isDark ? "text-indigo-300" : "text-indigo-600"}
                `}
                >
                  •
                </Text>
                <Text
                  className={`
                  text-sm
                  ${isDark ? "text-indigo-300" : "text-indigo-600"}
                `}
                >
                  Real-time portfolio valuation
                </Text>
              </View>

              <View className="flex-row items-center">
                <Text
                  className={`
                  text-lg mr-2
                  ${isDark ? "text-indigo-300" : "text-indigo-600"}
                `}
                >
                  •
                </Text>
                <Text
                  className={`
                  text-sm
                  ${isDark ? "text-indigo-300" : "text-indigo-600"}
                `}
                >
                  Investment performance analytics
                </Text>
              </View>

              <View className="flex-row items-center">
                <Text
                  className={`
                  text-lg mr-2
                  ${isDark ? "text-indigo-300" : "text-indigo-600"}
                `}
                >
                  •
                </Text>
                <Text
                  className={`
                  text-sm
                  ${isDark ? "text-indigo-300" : "text-indigo-600"}
                `}
                >
                  Profit/loss tracking
                </Text>
              </View>

              <View className="flex-row items-center">
                <Text
                  className={`
                  text-lg mr-2
                  ${isDark ? "text-indigo-300" : "text-indigo-600"}
                `}
                >
                  •
                </Text>
                <Text
                  className={`
                  text-sm
                  ${isDark ? "text-indigo-300" : "text-indigo-600"}
                `}
                >
                  Asset allocation charts
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
