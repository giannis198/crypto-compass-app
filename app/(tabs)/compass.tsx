import { View, Text, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Compass() {
  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center">
        <Image
          source={require("@/assets/images/under-construction.avif")}
          style={{ width: width * 0.8, height: height * 0.5 }}
          resizeMode="contain"
          className="mb-8"
        />
        <Text className="text-2xl font-bold text-center text-gray-900 mb-4">
          🚧 Under Construction
        </Text>
        <Text className="text-base text-center text-gray-600 leading-6">
          Were working hard to bring you something amazing!{"\n"}
          Please check back soon.
        </Text>
      </View>
    </View>
  );
}
