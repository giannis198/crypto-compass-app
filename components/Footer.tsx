import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Import from here
import { Text } from "./ui/text";

const Footer = () => (
  <SafeAreaView edges={["bottom"]} className="bg-gray-800">
    <View className="p-3">
      <Text className="text-white">© 2025 Crypto Compass</Text>
    </View>
  </SafeAreaView>
);

export default Footer;
