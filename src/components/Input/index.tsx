import { Text, TextInput, type TextInputProps, View } from "react-native";
import { colors } from "@/theme/colors";

interface InputProps extends TextInputProps {
  label?: string;
  prefix?: string;
}

export function Input({ label, prefix, className, ...props }: InputProps) {
  return (
    <View className="w-full gap-1.5">
      {label ? (
        <Text className="font-sans-bold text-[13px] text-ink">{label}</Text>
      ) : null}

      <View className="h-[52px] w-full flex-row items-center gap-1.5 rounded-[14px] border-[1.5px] border-gray-300 bg-gray-50 px-3.5">
        {prefix ? (
          <Text className="font-sans-bold text-[15px] text-gray-600">
            {prefix}
          </Text>
        ) : null}

        <TextInput
          placeholderTextColor={colors.gray[600]}
          {...props}
          className={`h-full flex-1 font-sans-medium text-base text-ink ${className ?? ""}`}
        />
      </View>
    </View>
  );
}
