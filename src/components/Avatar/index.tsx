import { Text, View } from "react-native";

interface AvatarProps {
  initials: string;
  variant?: "owner" | "guest";
  size?: "sm" | "md";
  className?: string;
}

export function Avatar({
  initials,
  variant = "guest",
  size = "md",
  className,
}: AvatarProps) {
  const isOwner = variant === "owner";
  const box =
    size === "sm" ? "h-[30px] w-[30px] border-2 border-white" : "h-9 w-9";
  const text = size === "sm" ? "text-[11px]" : "text-xs";

  return (
    <View
      className={`items-center justify-center rounded-full ${box} ${isOwner ? "bg-primary" : "bg-primary-light"} ${className ?? ""}`}
    >
      <Text
        className={`font-sans-extrabold ${text} ${isOwner ? "text-white" : "text-primary-dark"}`}
      >
        {initials}
      </Text>
    </View>
  );
}
