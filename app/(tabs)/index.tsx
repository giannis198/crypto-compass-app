import { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Image,
  Pressable,
} from "react-native";
import { useCryptoStore } from "@/store/cryptoStore";
import { Link } from "expo-router";
import { Text } from "@/components/ui/text";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Coin } from "@/types/crypto";
import { getCoinImageUrl } from "@/actions/get-coin-image-url";
import { formatCurrency, formatMarketCap } from "@/lib/utils";

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

  // Define columns
  const columns = useMemo<ColumnDef<Coin>[]>(
    () => [
      {
        accessorKey: "rank",
        header: "#",
        cell: ({ getValue }) => (
          <Text className="text-gray-500 text-sm font-medium w-8">
            #{getValue<number>()}
          </Text>
        ),
        size: 40,
      },
      {
        accessorKey: "name",
        header: "Coin",
        cell: ({ row }) => (
          <View className="flex-row items-center flex-1">
            <Image
              source={{ uri: getCoinImageUrl(row.original.id, "32x32") }}
              style={styles.coinImage}
              resizeMode="contain"
            />
            <View className="ml-3">
              <Text className="font-semibold text-gray-900">
                {row.original.name}
              </Text>
              <Text className="text-gray-500 text-xs">
                {row.original.symbol}
              </Text>
            </View>
          </View>
        ),
        size: 150,
      },
      {
        accessorKey: "quotes.USD.price",
        header: "Price",
        cell: ({ getValue }) => (
          <Text className="font-semibold text-gray-900 text-right">
            {formatCurrency(getValue<number>())}
          </Text>
        ),
        size: 100,
      },
      {
        accessorKey: "quotes.USD.percent_change_24h",
        header: "24h %",
        cell: ({ getValue }) => {
          const value = getValue<number>();
          const isPositive = value > 0;
          return (
            <Text
              className={`font-medium text-right ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : ""}
              {value?.toFixed(2)}%
            </Text>
          );
        },
        size: 80,
      },
      {
        accessorKey: "quotes.USD.market_cap",
        header: "Market Cap",
        cell: ({ getValue }) => (
          <Text className="text-gray-600 text-right text-xs">
            {formatMarketCap(getValue<number>())}
          </Text>
        ),
        size: 100,
      },
    ],
    []
  );

  // Create table instance
  const table = useReactTable({
    data: coins,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderFooter = () => {
    if (!loading && !refreshing) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="small" />
      </View>
    );
  };

  const renderHeader = () => (
    <View className="bg-white px-4 py-4 border-b border-gray-200">
      <Text className="text-2xl font-bold text-gray-900">Cryptocurrencies</Text>
      <Text className="text-gray-500 mt-1">Top coins by market cap</Text>
    </View>
  );

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
      {renderHeader()}

      {/* Table Header */}
      <View className="flex-row bg-gray-100 px-4 py-3 border-b border-gray-200">
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <View
              key={header.id}
              style={{ width: header.getSize() }}
              className="px-2"
            >
              <Text className="text-gray-600 text-sm font-medium">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Text>
            </View>
          ))
        )}
      </View>

      {/* Table Body */}
      <FlatList
        data={table.getRowModel().rows}
        keyExtractor={(row) => row.original.id}
        renderItem={({ item: row }) => (
          <Link href={`/coin/${row.original.id}`} asChild>
            <Pressable className="bg-white border-b border-gray-100 active:bg-gray-50">
              <View className="flex-row px-4 py-3 items-center">
                {row.getVisibleCells().map((cell) => (
                  <View
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className="px-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </View>
                ))}
              </View>
            </Pressable>
          </Link>
        )}
        onEndReached={fetchMoreCoins}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" />
            <Text className="text-gray-500 mt-4">
              Loading cryptocurrencies...
            </Text>
          </View>
        )}
        onRefresh={refreshCoins}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  coinImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
