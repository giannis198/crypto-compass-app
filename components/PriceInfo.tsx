// components/coin/PriceInfo.tsx
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { formatCurrency } from "@/lib/utils";

interface PriceInfoProps {
  price: number;
  percentChange24h: number;
}

export function PriceInfo({ price, percentChange24h }: PriceInfoProps) {
  const isPositive = percentChange24h > 0;

  return (
    <View className="items-end">
      <Text className="font-semibold text-gray-900 mb-1">
        {formatCurrency(price)}
      </Text>
      <Text
        className={`text-xs font-medium ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? "+" : ""}
        {percentChange24h?.toFixed(2)}%
      </Text>
    </View>
  );
}
