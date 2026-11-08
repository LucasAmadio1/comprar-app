import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AddButton } from "@/components/AddButton";
import { type AddItemData, AddItemSheet } from "@/components/AddItemSheet";
import { EmptyState } from "@/components/EmptyState";
import { Filter } from "@/components/Filter";
import { Header } from "@/components/Header";
import { Item } from "@/components/Item";
import { type InviteData, ShareSheet } from "@/components/ShareSheet";
import { Summary } from "@/components/Summary";
import { Toast } from "@/components/Toast";
import { type ItemStorage, itemsStorage } from "@/storage/itemsStorage";
import { type MemberStorage, membersStorage } from "@/storage/membersStorage";
import { FilterStatus } from "@/types/FilterStatus";
import { Permission } from "@/types/Permission";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
const TOAST_DURATION = 2400;

type Sheet = "add" | "share" | null;

function sumItems(items: ItemStorage[]) {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
}

export function Home() {
  const insets = useSafeAreaInsets();

  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [items, setItems] = useState<ItemStorage[]>([]);
  const [members, setMembers] = useState<MemberStorage[]>([]);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const pendingItems = items.filter(
    (item) => item.status === FilterStatus.PENDING,
  );
  const doneItems = items.filter((item) => item.status === FilterStatus.DONE);
  const visibleItems =
    filter === FilterStatus.PENDING ? pendingItems : doneItems;
  const counts = {
    [FilterStatus.PENDING]: pendingItems.length,
    [FilterStatus.DONE]: doneItems.length,
  };

  function showToast(message: string) {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), TOAST_DURATION);
  }

  async function handleAddItem(data: AddItemData) {
    try {
      const newItem: ItemStorage = {
        id: Math.random().toString(36).substring(2),
        status: FilterStatus.PENDING,
        ...data,
      };

      setItems(await itemsStorage.addItem(newItem));
      setFilter(FilterStatus.PENDING);
      setSheet(null);
      showToast(`${data.description} adicionado como pendente`);
    } catch (error) {
      console.log(error);
      Alert.alert("Adicionar", "Não foi possível adicionar o item.");
    }
  }

  async function handleToggleItemStatus(id: string) {
    const item = items.find((current) => current.id === id);

    try {
      setItems(await itemsStorage.toggleStatus(id));

      if (item) {
        showToast(
          item.status === FilterStatus.DONE
            ? `${item.description} voltou para pendentes`
            : `${item.description} foi para comprados`,
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar o status");
    }
  }

  async function handleRemoveItem(id: string) {
    const item = items.find((current) => current.id === id);

    try {
      setItems(await itemsStorage.removeItem(id));

      if (item) {
        showToast(`${item.description} removido da lista`);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não foi possível remover");
    }
  }

  async function handleInvite(data: InviteData) {
    try {
      const newMember: MemberStorage = {
        id: Math.random().toString(36).substring(2),
        ...data,
      };

      setMembers(await membersStorage.add(newMember));
      showToast(
        `Convite enviado · ${data.permission === Permission.EDIT ? "pode editar" : "apenas visualizar"}`,
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Compartilhar", "Não foi possível enviar o convite.");
    }
  }

  async function handleRemoveMember(id: string) {
    try {
      setMembers(await membersStorage.remove(id));
      showToast("Acesso removido");
    } catch (error) {
      console.log(error);
      Alert.alert("Compartilhar", "Não foi possível remover o acesso.");
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const [storedItems, storedMembers] = await Promise.all([
          itemsStorage.get(),
          membersStorage.get(),
        ]);

        setItems(storedItems);
        setMembers(storedMembers);
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível carregar a lista.");
      }
    }

    loadData();

    return () => clearTimeout(toastTimer.current);
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      <View
        className="flex-1"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <Header
          itemsCount={items.length}
          members={members}
          onSharePress={() => setSheet("share")}
        />

        <View className="mx-5 mb-3 flex-row gap-1 rounded-[14px] bg-gray-200 p-1">
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              count={counts[status]}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}
        </View>

        <View className="flex-1">
          <FlatList
            data={visibleItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Item
                data={item}
                onStatus={() => handleToggleItemStatus(item.id)}
                onRemove={() => handleRemoveItem(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="h-2.5" />}
            contentContainerClassName="px-5 pt-1 pb-24"
            ListEmptyComponent={() =>
              filter === FilterStatus.PENDING ? (
                <EmptyState
                  title="Tudo comprado!"
                  description="Não há produtos pendentes. Toque em + para adicionar mais."
                />
              ) : (
                <EmptyState
                  title="Nada no carrinho ainda"
                  description="Toque no círculo de um produto pendente para movê-lo para cá."
                />
              )
            }
          />

          <AddButton
            className="absolute right-5 bottom-4"
            onPress={() => setSheet("add")}
          />
        </View>

        <Summary
          itemsCount={items.reduce((total, item) => total + item.quantity, 0)}
          total={sumItems(items)}
          inCart={sumItems(doneItems)}
        />
      </View>

      {toast ? (
        <View
          className="absolute inset-x-5 z-30"
          style={{ top: insets.top + 16 }}
        >
          <Toast message={toast} />
        </View>
      ) : null}

      <AddItemSheet
        visible={sheet === "add"}
        onClose={() => setSheet(null)}
        onSubmit={handleAddItem}
      />

      <ShareSheet
        visible={sheet === "share"}
        members={members}
        onClose={() => setSheet(null)}
        onInvite={handleInvite}
        onRemoveMember={handleRemoveMember}
      />
    </View>
  );
}
