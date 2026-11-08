import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface QuantityStepperProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export function QuantityStepper({
  label,
  value,
  onChange,
}: QuantityStepperProps) {
  const current = Number.parseInt(value, 10) || 0;

  return (
    <View className="w-full gap-1.5">
      {label ? (
        <Text className="font-sans-bold text-[13px] text-ink">{label}</Text>
      ) : null}

      <View className="h-[52px] flex-row items-center overflow-hidden rounded-[14px] border-[1.5px] border-gray-300 bg-gray-50">
        <TouchableOpacity
          accessibilityLabel="Diminuir quantidade"
          onPress={() => onChange(String(Math.max(1, current - 1)))}
          className="h-full w-11 items-center justify-center"
        >
          <Text className="font-sans-bold text-[22px] text-primary">−</Text>
        </TouchableOpacity>

        <TextInput
          value={value}
          onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
          accessibilityLabel="Quantidade"
          className="h-full min-w-0 flex-1 text-center font-sans-bold text-[17px] text-ink"
        />

        <TouchableOpacity
          accessibilityLabel="Aumentar quantidade"
          onPress={() => onChange(String(current + 1))}
          className="h-full w-11 items-center justify-center"
        >
          <Text className="font-sans-bold text-[22px] text-primary">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
