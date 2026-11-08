import { Check } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "@/theme/colors";

interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  return (
    <View
      accessibilityRole="alert"
      className="flex-row items-center gap-2.5 rounded-[14px] bg-ink px-4 py-3.5"
    >
      <Check size={18} color={colors.white} strokeWidth={3} />
      <Text className="flex-1 font-sans-semibold text-sm text-white">
        {message}
      </Text>
    </View>
  );
}
