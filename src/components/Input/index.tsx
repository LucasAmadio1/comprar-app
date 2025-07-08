import { TextInput, type TextInputProps } from "react-native";
import { styles } from "./styles";

export function Input({ ...props }: TextInputProps) {
  return (
    <TextInput
      style={styles.container}
      placeholderTextColor="#74798B"
      {...props}
    />
  );
}
