import { Check } from "lucide-react-native";
import { View } from "react-native";
import { colors } from "@/theme/colors";
import { FilterStatus } from "@/types/FilterStatus";

interface StatusIconProps {
  status: FilterStatus;
}

export function StatusIcon({ status }: StatusIconProps) {
  return status === FilterStatus.DONE ? (
    <View className="h-[26px] w-[26px] items-center justify-center rounded-full bg-primary">
      <Check size={15} color={colors.white} strokeWidth={3} />
    </View>
  ) : (
    <View className="h-[26px] w-[26px] rounded-full border-2 border-gray-400" />
  );
}
