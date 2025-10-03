import { useCryptoStore } from "@/store/cryptoStore";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { Text } from "@/components/ui/text";
import Header from "@/components/Header";
import { CoinListItem } from "@/components/CoinListItem";
import Loading from "@/components/Loading";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function HomeScreen() {
  const { isDark } = useAppTheme();

  const {
    coins,
    loading,
    error,
    fetchCoins,
    loadCoinsFromStorage,
    fetchMoreCoins,
    refreshing,
    refreshCoins,
  } = useCryptoStore();

  useEffect(() => {
    loadCoinsFromStorage();
    fetchCoins();
  }, [fetchCoins, loadCoinsFromStorage]);

  const renderFooter = () => {
    if (!loading && !refreshing) return null;
    return (
      <View className="py-4">
        <ActivityIndicator
          size="small"
          color={isDark ? "#818CF8" : "#4F46E5"} // indigo-400 / indigo-600
        />
      </View>
    );
  };

  // For initial load (full screen)
  if (loading && coins.length === 0) {
    return (
      <View className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}>
        <Header />
        <Loading fullScreen={true} />
      </View>
    );
  }

  if (error && coins.length === 0) {
    return (
      <View className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}>
        <Header />
        <View className="flex-1 justify-center items-center p-4">
          <Text
            className={
              isDark
                ? "text-red-400 text-center mb-4"
                : "text-red-500 text-center mb-4"
            }
          >
            Error: {error}
          </Text>
          <Text
            className={
              isDark
                ? "text-indigo-400 text-center"
                : "text-indigo-600 text-center"
            }
            onPress={refreshCoins}
          >
            Tap to retry
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className={isDark ? "flex-1 bg-gray-900" : "flex-1 bg-gray-50"}>
      {/* Header */}
      <Header />

      {/* Coin List */}
      <FlatList
        data={coins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CoinListItem coin={item} />}
        onEndReached={fetchMoreCoins}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={() => <Loading fullScreen={false} />}
        onRefresh={refreshCoins}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: isDark ? "#111827" : "#F9FAFB",
        }}
      />
    </View>
  );
}
