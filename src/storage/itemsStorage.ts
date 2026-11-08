import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = "@comprar:items";

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
  quantity: number;
  price: number;
};

// Itens salvos antes de existirem quantidade e valor não têm esses campos.
type StoredItem = Omit<ItemStorage, "quantity" | "price"> &
  Partial<Pick<ItemStorage, "quantity" | "price">>;

async function get(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
    const items: StoredItem[] = storage ? JSON.parse(storage) : [];

    return items.map((item) => ({
      ...item,
      quantity: item.quantity ?? 1,
      price: item.price ?? 0,
    }));
  } catch (error) {
    throw new Error(`ITEMS_GET: ${error}`);
  }
}

async function save(items: ItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error(`ITEMS_SAVE: ${error}`);
  }
}

async function addItem(newItem: ItemStorage): Promise<ItemStorage[]> {
  const items = await get();
  const updatedItems = [newItem, ...items];

  await save(updatedItems);

  return updatedItems;
}

async function removeItem(id: string): Promise<ItemStorage[]> {
  const items = await get();
  const updatedItems = items.filter((item) => item.id !== id);

  await save(updatedItems);

  return updatedItems;
}

async function toggleStatus(id: string): Promise<ItemStorage[]> {
  const items = await get();

  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          status:
            item.status === FilterStatus.PENDING
              ? FilterStatus.DONE
              : FilterStatus.PENDING,
        }
      : item,
  );

  await save(updatedItems);

  return updatedItems;
}

export const itemsStorage = {
  get,
  addItem,
  removeItem,
  toggleStatus,
};
