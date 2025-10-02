import { ActivityIndicator, View } from "react-native";

export const renderFooter = () => {
  if (!loading && !refreshing) return null;
  return (
    <View className="py-4">
      <ActivityIndicator size="small" />
    </View>
  );
};
