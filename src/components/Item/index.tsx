import { Trash2 } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/theme/colors";
import { FilterStatus } from "@/types/FilterStatus";
import { formatCurrency } from "@/utils/currency";
import { StatusIcon } from "../StatusIcon";

interface ItemData {
  status: FilterStatus;
  description: string;
  quantity: number;
  price: number;
}

interface ItemProps {
  data: ItemData;
  onStatus: () => void;
  onRemove: () => void;
}

export function Item({ data, onStatus, onRemove }: ItemProps) {
  const isDone = data.status === FilterStatus.DONE;

  return (
    <View
      className={`min-h-[68px] flex-row items-center gap-2.5 rounded-[18px] border border-gray-200 px-3.5 py-2 ${isDone ? "bg-gray-100" : "bg-white"}`}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onStatus}
        accessibilityLabel={
          isDone
            ? `Voltar ${data.description} para pendentes`
            : `Marcar ${data.description} como comprado`
        }
        className="-ml-1.5 h-11 w-11 items-center justify-center"
      >
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <View className="flex-1 gap-0.5">
        <Text
          numberOfLines={1}
          className={`font-sans-bold text-base ${isDone ? "text-gray-600 line-through" : "text-ink"}`}
        >
          {data.description}
        </Text>
        <Text className="font-sans-medium text-[13px] text-gray-600">
          {`${data.quantity} × ${formatCurrency(data.price)}`}
        </Text>
      </View>

      <Text
        className={`font-sans-extrabold text-[15px] ${isDone ? "text-gray-600" : "text-ink"}`}
      >
        {formatCurrency(data.quantity * data.price)}
      </Text>

      <TouchableOpacity
        onPress={onRemove}
        accessibilityLabel={`Remover ${data.description}`}
        className="-mr-2.5 h-11 w-11 items-center justify-center"
      >
        <Trash2 size={18} color={colors.gray[400]} />
      </TouchableOpacity>
    </View>
  );
}
