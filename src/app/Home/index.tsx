import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { Input } from "@/components/Input";
import { Item } from "@/components/Item";
import { type ItemStorage, itemsStorage } from "@/storage/itemsStorage";
import { FilterStatus } from "@/types/FilterStatus";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function handleAddItem() {
    if (!description.trim()) {
      return Alert.alert(
        "Adicionar",
        "Ínforme a descrição para adicionar um item.",
      );
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    };

    await itemsStorage.addItem(newItem);
    await itemsByStatus();

    setFilter(FilterStatus.PENDING);
    setDescription("");
  }

  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter);

      setItems(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possivel filtrar os itens.");
    }
  }

  async function handleRemoveItem(id: string) {
    try {
      await itemsStorage.removeItem(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não foi possível remover");
    }
  }

  async function onClear() {
    try {
      await itemsStorage.clear();
      setItems([]);
    } catch (error) {
      console.log(error);
      Alert.alert("Limpar", "Não foi possível remover todos os itens");
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja realmente remover todos os itens?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onClear() },
    ]);
  }

  async function handleToggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar o status");
    }
  }

  useEffect(() => {
    itemsByStatus();
  }, [filter]);

  return (
    <View className="flex-1 items-center bg-background pt-[62px]">
      <Image
        className="h-[34px] w-[134px]"
        source={require("@/assets/logo.png")}
      />

      <View className="mt-[42px] w-full gap-[7px] px-4">
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={(value) => setDescription(value)}
          value={description}
        />

        <Button title="Adicionar" onPress={handleAddItem} />
      </View>

      <View className="mt-6 w-full flex-1 rounded-t-3xl bg-white p-6 pt-8">
        <View className="w-full flex-row gap-3 border-b border-gray-200 pb-3">
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity className="ml-auto" onPress={handleClear}>
            <Text className="text-xs font-semibold text-gray-400">Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => handleToggleItemStatus(item.id)}
              onRemove={() => handleRemoveItem(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View className="my-4 h-px w-full bg-gray-100" />
          )}
          contentContainerClassName="pt-6 pb-[62px]"
          ListEmptyComponent={() => (
            <Text className="text-center text-sm text-gray-500">
              Sua lista está vazia.
            </Text>
          )}
        />
      </View>
    </View>
  );
}
