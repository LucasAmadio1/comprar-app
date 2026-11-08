import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Permission } from "@/types/Permission";

const MEMBERS_STORAGE_KEY = "@comprar:members";

export type MemberStorage = {
  id: string;
  contact: string;
  permission: Permission;
};

async function get(): Promise<MemberStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(MEMBERS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error(`MEMBERS_GET: ${error}`);
  }
}

async function save(members: MemberStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
  } catch (error) {
    throw new Error(`MEMBERS_SAVE: ${error}`);
  }
}

async function add(newMember: MemberStorage): Promise<MemberStorage[]> {
  const members = await get();

  const alreadyExists = members.some(
    (member) =>
      member.contact.toLowerCase() === newMember.contact.toLowerCase(),
  );

  if (alreadyExists) {
    throw new Error("MEMBERS_ADD: contato já tem acesso");
  }

  const updatedMembers = [...members, newMember];

  await save(updatedMembers);

  return updatedMembers;
}

async function remove(id: string): Promise<MemberStorage[]> {
  const members = await get();
  const updatedMembers = members.filter((member) => member.id !== id);

  await save(updatedMembers);

  return updatedMembers;
}

export const membersStorage = {
  get,
  add,
  remove,
};
