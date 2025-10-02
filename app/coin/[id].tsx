import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import {
  formatCurrency,
  formatDate,
  formatLargeNumber,
  formatNumber,
  formatPercentage,
} from "@/lib/utils";
import Loading from "@/components/Loading";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { Coin } from "@/types/crypto";
import { getCoinImageUrl } from "@/actions/get-coin-image-url";

type CoinDetailParams = {
  id: string;
};

export default function CoinDetailScreen() {
  const { id } = useLocalSearchParams<CoinDetailParams>();
  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        setError(null);
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

  // const handleRetry = () => {
  //   setError(null);
  //   if (id) {
  //     useEffect(() => {
  //       const fetchCoin = async () => {
  //         try {
  //           setLoading(true);
  //           const response = await fetch(
  //             `https://api.coinpaprika.com/v1/tickers/${id}`
  //           );
  //           if (!response.ok)
  //             throw new Error(`Failed to fetch: ${response.status}`);
  //           const coinData = await response.json();
  //           setCoin(coinData);
  //         } catch (e: any) {
  //           setError(e.message);
  //         } finally {
  //           setLoading(false);
  //         }
  //       };
  //       fetchCoin();
  //     }, []);
  //   }
  // };

  if (loading) {
    return <Loading />;
  }

  // if (error) {
  //   return (
  //     <ErrorDisplay
  //       title="Failed to Load Coin"
  //       message={error}
  //       onRetry={handleRetry}
  //       retryButtonText="Reload Coin"
  //     />
  //   );
  // }

  if (!coin) {
    return (
      <View className="flex-1 p-4 justify-center items-center">
        <Text>No coin data found.</Text>
      </View>
    );
  }

  const priceChange24h = formatPercentage(coin.quotes.USD.percent_change_24h);
  const priceChange7d = formatPercentage(coin.quotes.USD.percent_change_7d);
  const priceChange30d = formatPercentage(coin.quotes.USD.percent_change_30d);
  const athChange = formatPercentage(coin.quotes.USD.percent_from_price_ath);

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
    >
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
          <CardContent className="space-y-3">
            <Text className="text-3xl font-bold">
              {formatCurrency(coin.quotes.USD.price)}
            </Text>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">24h Change</Text>
              <Text className={priceChange24h.color}>
                {priceChange24h.value}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">7d Change</Text>
              <Text className={priceChange7d.color}>{priceChange7d.value}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">30d Change</Text>
              <Text className={priceChange30d.color}>
                {priceChange30d.value}
              </Text>
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

            <View className="flex-row justify-between">
              <Text className="text-gray-600">Market Cap Change (24h)</Text>
              <Text
                className={
                  coin.quotes.USD.market_cap_change_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {formatPercentage(coin.quotes.USD.market_cap_change_24h).value}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">Volume Change (24h)</Text>
              <Text
                className={
                  coin.quotes.USD.volume_24h_change_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {formatPercentage(coin.quotes.USD.volume_24h_change_24h).value}
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Supply Information */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Supply Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Circulating Supply</Text>
              <Text className="font-semibold">
                {formatNumber(coin.circulating_supply)} {coin.symbol}
              </Text>
            </View>

            {coin.total_supply > 0 && (
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Total Supply</Text>
                <Text className="font-semibold">
                  {formatNumber(coin.total_supply)} {coin.symbol}
                </Text>
              </View>
            )}

            {coin.max_supply > 0 && (
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Max Supply</Text>
                <Text className="font-semibold">
                  {formatNumber(coin.max_supply)} {coin.symbol}
                </Text>
              </View>
            )}

            {coin.max_supply > 0 && (
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Circulation %</Text>
                <Text className="font-semibold">
                  {((coin.circulating_supply / coin.max_supply) * 100).toFixed(
                    1
                  )}
                  %
                </Text>
              </View>
            )}
          </CardContent>
        </Card>

        {/* All-Time High Information */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>All-Time High</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">ATH Price</Text>
              <Text className="font-semibold">
                {formatCurrency(coin.quotes.USD.ath_price)}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">ATH Date</Text>
              <Text className="font-semibold">
                {formatDate(coin.quotes.USD.ath_date)}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">From ATH</Text>
              <Text className={athChange.color}>{athChange.value}</Text>
            </View>
          </CardContent>
        </Card>

        {/* Additional Performance Metrics */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">1h Change</Text>
              <Text
                className={
                  formatPercentage(coin.quotes.USD.percent_change_1h).color
                }
              >
                {formatPercentage(coin.quotes.USD.percent_change_1h).value}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">6h Change</Text>
              <Text
                className={
                  formatPercentage(coin.quotes.USD.percent_change_6h).color
                }
              >
                {formatPercentage(coin.quotes.USD.percent_change_6h).value}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">12h Change</Text>
              <Text
                className={
                  formatPercentage(coin.quotes.USD.percent_change_12h).color
                }
              >
                {formatPercentage(coin.quotes.USD.percent_change_12h).value}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">1y Change</Text>
              <Text
                className={
                  formatPercentage(coin.quotes.USD.percent_change_1y).color
                }
              >
                {formatPercentage(coin.quotes.USD.percent_change_1y).value}
              </Text>
            </View>
          </CardContent>
        </Card>

        {/* Additional Coin Info */}
        <Card>
          <CardHeader>
            <CardTitle>About {coin.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="text-gray-600 mb-3">
              {coin.name} ({coin.symbol}) is currently ranked #{coin.rank} by
              market capitalization with a circulating supply of{" "}
              {formatNumber(coin.circulating_supply)} {coin.symbol}.
            </Text>
            <Text className="text-gray-600 mb-3">
              The current price is {formatCurrency(coin.quotes.USD.price)} with
              a{priceChange24h.isPositive ? " gain" : " loss"} of{" "}
              {coin.quotes.USD.percent_change_24h.toFixed(2)}% in the last 24
              hours.
            </Text>
            <Text className="text-gray-600 text-xs">
              Last updated: {formatDate(coin.last_updated)}
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
