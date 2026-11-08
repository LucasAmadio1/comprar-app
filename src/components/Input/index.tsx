import { TextInput, type TextInputProps } from "react-native";
import { colors } from "@/theme/colors";

export function Input({ className, ...props }: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={colors.gray[600]}
      {...props}
      className={`h-12 w-full rounded-lg border border-gray-300 bg-white px-4 ${className ?? ""}`}
    />
  );
}
