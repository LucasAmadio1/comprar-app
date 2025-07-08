import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";
import { styles } from "./styles";

interface FilterProps extends TouchableOpacityProps {
  status: FilterStatus;
  isActive: boolean;
}

export function Filter({ status, isActive, ...props }: FilterProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
      activeOpacity={0.8}
      {...props}
    >
      <StatusIcon status={status} />

      <Text style={styles.title}>
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  );
}
