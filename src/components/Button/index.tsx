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
      className={`h-14 w-full items-center justify-center rounded-2xl bg-primary ${className ?? ""}`}
    >
      <Text className="font-sans-extrabold text-base text-white">{title}</Text>
    </TouchableOpacity>
  );
}
