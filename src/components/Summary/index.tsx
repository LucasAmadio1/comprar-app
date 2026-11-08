import { Text, View } from "react-native";
import { formatCurrency } from "@/utils/currency";

interface SummaryProps {
  itemsCount: number;
  total: number;
  inCart: number;
}

export function Summary({ itemsCount, total, inCart }: SummaryProps) {
  return (
    <View
      accessibilityLabel="Resumo da compra"
      className="mx-3 mb-3 gap-3.5 rounded-[26px] bg-primary px-5 pt-5 pb-[18px]"
    >
      <View className="flex-row items-end justify-between gap-3">
        <View className="gap-0.5">
          <Text className="font-sans-semibold text-xs text-primary-light">
            ITENS NA COMPRA
          </Text>
          <Text className="font-sans-extrabold text-[26px] text-white">
            {itemsCount}{" "}
            <Text className="font-sans-semibold text-sm text-primary-light">
              {itemsCount === 1 ? "item" : "itens"}
            </Text>
          </Text>
        </View>

        <View className="items-end gap-0.5">
          <Text className="self-stretch text-right font-sans-semibold text-xs text-primary-light">
            VALOR TOTAL
          </Text>
          <Text className="font-sans-extrabold text-[26px] text-white">
            {formatCurrency(total)}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between">
        <Text className="font-sans-semibold text-[13px] text-primary-light">
          No carrinho:{" "}
          <Text className="text-white">{formatCurrency(inCart)}</Text>
        </Text>
        <Text className="font-sans-semibold text-[13px] text-primary-light">
          Falta:{" "}
          <Text className="text-white">{formatCurrency(total - inCart)}</Text>
        </Text>
      </View>
    </View>
  );
}
