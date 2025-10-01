import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { formatCurrency, formatLargeNumber } from "@/lib/utils";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

type CoinDetailParams = {
  id: string;
};

export default function CoinDetailScreen() {
  const { id } = useLocalSearchParams<CoinDetailParams>();
  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCoinImageUrl = (coinId: string, size: string = "64x64") => {
    return `https://static.coinpaprika.com/coin/${coinId}/logo.png?size=${size}`;
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coinpaprika.com/v1/tickers/${id}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch coin data: ${response.status}`);
        }
        const coinData = await response.json();
        setCoin(coinData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCoin();
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 p-4 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4">Loading coin data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 p-4 justify-center items-center">
        <Text className="text-red-500 text-center">Error: {error}</Text>
      </View>
    );
  }

  if (!coin) {
    return (
      <View className="flex-1 p-4 justify-center items-center">
        <Text>No coin data found.</Text>
      </View>
    );
  }

  const isPositiveChange = coin.quotes.USD.percent_change_24h > 0;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* Header Card with Coin Image */}
        <Card className="mb-4">
          <CardHeader className="items-center">
            <Image
              source={{ uri: getCoinImageUrl(coin.id, "128x128") }}
              style={styles.coinImage}
              resizeMode="contain"
            />
            <CardTitle className="text-2xl text-center mt-2">
              {coin.name}
            </CardTitle>
            <CardDescription className="text-lg">{coin.symbol}</CardDescription>
          </CardHeader>
        </Card>

        {/* Price Card */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Price</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="text-3xl font-bold mb-2">
              {formatCurrency(coin.quotes.USD.price)}
            </Text>
            <View
              className={`flex-row items-center ${
                isPositiveChange ? "text-green-500" : "text-red-500"
              }`}
            >
              <Text
                className={isPositiveChange ? "text-green-500" : "text-red-500"}
              >
                {isPositiveChange ? "↗" : "↘"}{" "}
                {coin.quotes.USD.percent_change_24h.toFixed(2)}%
              </Text>
              <Text className="text-gray-500 ml-2">(24h)</Text>
            </View>
          </CardContent>
        </Card>

        {/* Market Stats Card */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Market Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Rank</Text>
              <Text className="font-semibold">#{coin.rank}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">Market Cap</Text>
              <Text className="font-semibold">
                {formatLargeNumber(coin.quotes.USD.market_cap)}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">24h Volume</Text>
              <Text className="font-semibold">
                {formatLargeNumber(coin.quotes.USD.volume_24h)}
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Additional Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>About {coin.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="text-gray-600">
              {coin.name} ({coin.symbol}) is currently ranked #{coin.rank} by
              market capitalization. The current price is{" "}
              {formatCurrency(coin.quotes.USD.price)} with a
              {isPositiveChange ? " gain" : " loss"} of{" "}
              {coin.quotes.USD.percent_change_24h.toFixed(2)}% in the last 24
              hours.
            </Text>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  coinImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
