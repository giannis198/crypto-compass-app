import { View, Image, Text } from "react-native";

export default function Header() {
  return (
    <View className="h-20 bg-white px-5 flex-row items-center z-10 border-b border-gray-200">
      <Image
        source={require("../assets/images/crypto-compass-logo.png")}
        className="w-10 h-10"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold ml-2.5">CryptoCompass</Text>
    </View>
  );
}
