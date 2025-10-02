import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Text } from "./ui/text";

const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center py-20">
      <ActivityIndicator size="large" />
      <Text className="text-gray-500 mt-4">Loading cryptocurrencies...</Text>
    </View>
  );
};

export default Loading;
