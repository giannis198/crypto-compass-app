// components/coin/CoinInfo.tsx
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { formatMarketCapPrecise } from "@/lib/utils";

interface CoinInfoProps {
  name: string;
  symbol: string;
  marketCap: number;
}

export function CoinInfo({ name, symbol, marketCap }: CoinInfoProps) {
  return (
    <View className="flex-1">
      <Text className="font-semibold text-gray-900">{name}</Text>
      <Text className="text-gray-500 text-sm">{symbol}</Text>
      <Text className="text-gray-600 text-xs mb-1">
        {formatMarketCapPrecise(marketCap)}
      </Text>
    </View>
  );
}
