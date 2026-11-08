import { ShoppingCart } from "lucide-react-native";
import { Text, View } from "react-native";
import { colors } from "@/theme/colors";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View className="items-center gap-2.5 px-6 py-12">
      <View className="h-14 w-14 items-center justify-center rounded-[18px] bg-primary-light">
        <ShoppingCart size={26} color={colors.primary.DEFAULT} />
      </View>

      <Text className="font-sans-bold text-base text-ink">{title}</Text>
      <Text className="max-w-[240px] text-center font-sans-medium text-sm text-gray-600">
        {description}
      </Text>
    </View>
  );
}
