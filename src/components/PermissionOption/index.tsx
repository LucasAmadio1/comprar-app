import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from "react-native";

interface PermissionOptionProps extends TouchableOpacityProps {
  title: string;
  description: string;
  selected: boolean;
}

export function PermissionOption({
  title,
  description,
  selected,
  ...props
}: PermissionOptionProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      {...props}
      className={`w-full flex-row items-center gap-3.5 rounded-2xl border-2 px-4 py-3.5 ${selected ? "border-primary bg-primary-soft" : "border-gray-200 bg-white"}`}
    >
      <View
        className={`h-[22px] w-[22px] rounded-full bg-white ${selected ? "border-[7px] border-primary" : "border-2 border-gray-400"}`}
      />

      <View className="flex-1 gap-0.5">
        <Text className="font-sans-extrabold text-[15px] text-ink">
          {title}
        </Text>
        <Text className="font-sans-medium text-[13px] text-gray-600">
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
