import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";

interface FilterProps extends TouchableOpacityProps {
  status: FilterStatus;
  isActive: boolean;
}

export function Filter({ status, isActive, ...props }: FilterProps) {
  return (
    <TouchableOpacity
      className={`flex-row items-center gap-[5px] ${isActive ? "opacity-100" : "opacity-50"}`}
      activeOpacity={0.8}
      {...props}
    >
      <StatusIcon status={status} />

      <Text className="text-xs font-semibold">
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  );
}
