import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, className, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      className={`h-12 w-full items-center justify-center rounded-lg bg-primary ${className ?? ""}`}
    >
      <Text className="text-sm font-semibold text-white">{title}</Text>
    </TouchableOpacity>
  );
}
