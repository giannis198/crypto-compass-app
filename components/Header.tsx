import { Image, Text, View } from "react-native";

export default function Header() {
  return (
    <View className="w-2 h-4">
      <Image
        source={require("../assets/images/crypto-compass-logo.png")}
        // className="w-10 h-10"
        // resizeMode="contain"
      />
      <Text className="text-xl font-bold ml-2.5">CryptoCompass</Text>
    </View>
  );
}
