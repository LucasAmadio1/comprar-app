import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} {...props}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
