import { useCryptoStore } from "@/store/cryptoStore";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { Text } from "@/components/ui/text";

import Header from "@/components/Header";

import { CoinListItem } from "@/components/CoinListItem";
import Loading from "@/components/Loading";

export default function HomeScreen() {
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
        <ActivityIndicator size="small" />
      </View>
    );
  };

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-center mb-4">Error: {error}</Text>
        <Text className="text-blue-500 text-center" onPress={refreshCoins}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
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
        ListEmptyComponent={<Loading />}
        onRefresh={refreshCoins}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
