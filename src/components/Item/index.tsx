import { Trash2 } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/theme/colors";
import type { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";

interface ItemData {
  status: FilterStatus;
  description: string;
}

interface ItemProps {
  data: ItemData;
  onStatus: () => void;
  onRemove: () => void;
}

export function Item({ data, onStatus, onRemove }: ItemProps) {
  return (
    <View className="flex-row items-center gap-[7px]">
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text className="flex-1 text-sm font-semibold">{data.description}</Text>

      <TouchableOpacity onPress={onRemove}>
        <Trash2 size={18} color={colors.gray[400]} />
      </TouchableOpacity>
    </View>
  );
}
