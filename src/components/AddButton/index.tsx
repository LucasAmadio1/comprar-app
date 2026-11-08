import { Plus } from "lucide-react-native";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { colors } from "@/theme/colors";

export function AddButton({ className, ...props }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessibilityLabel="Adicionar produto"
      {...props}
      className={`h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-primary ${className ?? ""}`}
    >
      <Plus size={26} color={colors.white} strokeWidth={2.6} />
    </TouchableOpacity>
  );
}
