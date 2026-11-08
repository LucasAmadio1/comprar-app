import { X } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { MemberStorage } from "@/storage/membersStorage";
import { colors } from "@/theme/colors";
import { Permission } from "@/types/Permission";
import { getInitials } from "@/utils/getInitials";
import { Avatar } from "../Avatar";
import { BottomSheet } from "../BottomSheet";
import { Button } from "../Button";
import { Input } from "../Input";
import { PermissionOption } from "../PermissionOption";

export interface InviteData {
  contact: string;
  permission: Permission;
}

interface ShareSheetProps {
  visible: boolean;
  members: MemberStorage[];
  onClose: () => void;
  onInvite: (data: InviteData) => void;
  onRemoveMember: (id: string) => void;
}

export function ShareSheet({
  visible,
  members,
  onClose,
  onInvite,
  onRemoveMember,
}: ShareSheetProps) {
  const [contact, setContact] = useState("");
  const [permission, setPermission] = useState(Permission.EDIT);
  const [error, setError] = useState("");

  function handleInvite() {
    const value = contact.trim();

    if (value.length < 5) {
      return setError("Digite um e-mail ou telefone.");
    }

    const alreadyHasAccess = members.some(
      (member) => member.contact.toLowerCase() === value.toLowerCase(),
    );

    if (alreadyHasAccess) {
      return setError("Essa pessoa já tem acesso.");
    }

    onInvite({ contact: value, permission });

    setContact("");
    setPermission(Permission.EDIT);
    setError("");
  }

  return (
    <BottomSheet
      visible={visible}
      title="Compartilhar lista"
      subtitle="Compras do mês"
      onClose={onClose}
    >
      <Input
        label="Com quem você quer compartilhar?"
        placeholder="E-mail ou telefone"
        value={contact}
        onChangeText={(value) => {
          setContact(value);
          setError("");
        }}
        autoCapitalize="none"
        autoComplete="off"
      />

      <View className="gap-2">
        <Text className="mb-1 font-sans-bold text-[13px] text-ink">
          Essa pessoa pode editar a lista?
        </Text>

        <PermissionOption
          title="Pode editar"
          description="Adiciona, remove e marca produtos como comprados"
          selected={permission === Permission.EDIT}
          onPress={() => setPermission(Permission.EDIT)}
        />
        <PermissionOption
          title="Apenas visualizar"
          description="Vê a lista e o total, mas não altera nada"
          selected={permission === Permission.VIEW}
          onPress={() => setPermission(Permission.VIEW)}
        />
      </View>

      {error ? (
        <Text
          accessibilityRole="alert"
          className="font-sans-semibold text-sm text-danger"
        >
          {error}
        </Text>
      ) : null}

      <Button title="Enviar convite" onPress={handleInvite} />

      <View className="gap-1 border-gray-200 border-t pt-3.5">
        <Text className="font-sans-bold text-[13px] text-ink">
          Pessoas com acesso
        </Text>

        <View className="min-h-12 flex-row items-center gap-3">
          <Avatar initials="EU" variant="owner" />
          <Text className="flex-1 font-sans-bold text-[15px] text-ink">
            Você
          </Text>
          <Text className="font-sans-bold text-xs text-gray-600">
            Dono da lista
          </Text>
        </View>

        {members.map((member) => {
          const canEdit = member.permission === Permission.EDIT;

          return (
            <View
              key={member.id}
              className="min-h-12 flex-row items-center gap-3"
            >
              <Avatar initials={getInitials(member.contact)} />
              <Text
                numberOfLines={1}
                className="flex-1 font-sans-bold text-[15px] text-ink"
              >
                {member.contact}
              </Text>

              <View
                className={`rounded-full px-2.5 py-1 ${canEdit ? "bg-primary-light" : "bg-gray-100"}`}
              >
                <Text
                  className={`font-sans-bold text-xs ${canEdit ? "text-primary-dark" : "text-ink"}`}
                >
                  {canEdit ? "Pode editar" : "Só visualiza"}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => onRemoveMember(member.id)}
                accessibilityLabel={`Remover acesso de ${member.contact}`}
                className="-mr-2.5 h-11 w-11 items-center justify-center"
              >
                <X size={18} color={colors.gray[400]} strokeWidth={2.2} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </BottomSheet>
  );
}
