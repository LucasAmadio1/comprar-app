import { useState } from "react";
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
import { FilterStatus } from "@/types/FilterStatus";
import { styles } from "./styles";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
// const ITEMS = [
//   { id: "1", status: FilterStatus.DONE, description: "1 pacote de café" },
//   {
//     id: "2",
//     status: FilterStatus.PENDING,
//     description: "3 pacotes de macarrão",
//   },
//   { id: "3", status: FilterStatus.PENDING, description: "3 cebolas" },
//   { id: "4", status: FilterStatus.DONE, description: "2 litros de leite" },
//   { id: "5", status: FilterStatus.PENDING, description: "1 saco de arroz" },
//   { id: "6", status: FilterStatus.DONE, description: "1 kg de feijão preto" },
//   { id: "7", status: FilterStatus.PENDING, description: "5 tomates" },
//   { id: "8", status: FilterStatus.DONE, description: "1 pote de margarina" },
//   { id: "9", status: FilterStatus.PENDING, description: "1 dúzia de ovos" },
//   { id: "10", status: FilterStatus.DONE, description: "1 kg de açúcar" },
//   { id: "11", status: FilterStatus.PENDING, description: "1 garrafa de óleo" },
//   {
//     id: "12",
//     status: FilterStatus.DONE,
//     description: "1 pacote de farinha de trigo",
//   },
//   { id: "14", status: FilterStatus.DONE, description: "1 pacote de sal" },

//   { id: "16", status: FilterStatus.DONE, description: "1 kg de batata" },
// ];

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<any>([]);

  function handleAddItem() {
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

    // setItems((prevState) => [...prevState, newItem]);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />

      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={(value) => setDescription(value)}
        />

        <Button title="Adicionar" onPress={handleAddItem} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => console.log("Status")}
              onRemove={() => console.log("remover")}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Sua lista está vazia.</Text>
          )}
        />
      </View>
    </View>
  );
}
