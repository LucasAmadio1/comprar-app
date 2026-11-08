import { useState } from "react";
import { Text, View } from "react-native";
import { formatCurrency, parseCurrency } from "@/utils/currency";
import { BottomSheet } from "../BottomSheet";
import { Button } from "../Button";
import { Input } from "../Input";
import { QuantityStepper } from "../QuantityStepper";

export interface AddItemData {
  description: string;
  quantity: number;
  price: number;
}

interface AddItemSheetProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: AddItemData) => void;
}

export function AddItemSheet({
  visible,
  onClose,
  onSubmit,
}: AddItemSheetProps) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const parsedQuantity = Number.parseInt(quantity, 10);
  const parsedPrice = parseCurrency(price);
  const subtotal =
    parsedQuantity >= 1 && parsedPrice !== null
      ? parsedQuantity * parsedPrice
      : 0;

  function handleSubmit() {
    if (!description.trim()) {
      return setError("Informe o nome do produto.");
    }

    if (!(parsedQuantity >= 1)) {
      return setError("A quantidade precisa ser pelo menos 1.");
    }

    if (parsedPrice === null || parsedPrice < 0) {
      return setError("Informe um valor válido, ex.: 12,90.");
    }

    onSubmit({
      description: description.trim(),
      quantity: parsedQuantity,
      price: parsedPrice,
    });

    setDescription("");
    setQuantity("1");
    setPrice("");
    setError("");
  }

  return (
    <BottomSheet visible={visible} title="Novo produto" onClose={onClose}>
      <Input
        label="Produto"
        placeholder="Ex.: Arroz integral 5kg"
        value={description}
        onChangeText={(value) => {
          setDescription(value);
          setError("");
        }}
        autoComplete="off"
      />

      <View className="flex-row gap-3">
        <View className="flex-1">
          <QuantityStepper
            label="Quantidade"
            value={quantity}
            onChange={(value) => {
              setQuantity(value);
              setError("");
            }}
          />
        </View>

        <View className="flex-1">
          <Input
            label="Valor unitário"
            prefix="R$"
            placeholder="0,00"
            keyboardType="decimal-pad"
            value={price}
            onChangeText={(value) => {
              setPrice(value.replace(/[^0-9,.]/g, ""));
              setError("");
            }}
          />
        </View>
      </View>

      <View className="flex-row items-center justify-between rounded-[14px] bg-primary-light px-4 py-3.5">
        <Text className="font-sans-semibold text-sm text-primary-dark">
          Subtotal do produto
        </Text>
        <Text className="font-sans-extrabold text-lg text-primary-dark">
          {formatCurrency(subtotal)}
        </Text>
      </View>

      {error ? (
        <Text
          accessibilityRole="alert"
          className="font-sans-semibold text-sm text-danger"
        >
          {error}
        </Text>
      ) : null}

      <Text className="font-sans-medium text-[13px] text-gray-600">
        O produto entra na lista como{" "}
        <Text className="font-sans-bold text-ink">pendente</Text>.
      </Text>

      <Button title="Adicionar à lista" onPress={handleSubmit} />
    </BottomSheet>
  );
}
