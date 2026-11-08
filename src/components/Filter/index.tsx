import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from "react-native";
import { FilterStatus } from "@/types/FilterStatus";

interface FilterProps extends TouchableOpacityProps {
  status: FilterStatus;
  isActive: boolean;
  count: number;
}

export function Filter({ status, isActive, count, ...props }: FilterProps) {
  return (
    <TouchableOpacity
      className={`h-11 flex-1 flex-row items-center justify-center gap-2 rounded-[11px] ${isActive ? "bg-white" : "bg-transparent"}`}
      activeOpacity={0.8}
      {...props}
    >
      <Text
        className={`font-sans-bold text-[15px] ${isActive ? "text-ink" : "text-gray-600"}`}
      >
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>

      <View
        className={`h-[22px] min-w-[22px] items-center justify-center rounded-full px-1.5 ${isActive ? "bg-primary" : "bg-gray-300"}`}
      >
        <Text
          className={`font-sans-extrabold text-xs ${isActive ? "text-white" : "text-ink"}`}
        >
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
