import { CircleCheck, CircleDashed } from "lucide-react-native";
import { FilterStatus } from "@/types/FilterStatus";

interface StatusIconProps {
  status: FilterStatus;
}

export function StatusIcon({ status }: StatusIconProps) {
  return status === FilterStatus.DONE ? (
    <CircleCheck size={18} />
  ) : (
    <CircleDashed size={18} />
  );
}
