import { Share2 } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import type { MemberStorage } from "@/storage/membersStorage";
import { colors } from "@/theme/colors";
import { getInitials } from "@/utils/getInitials";
import { Avatar } from "../Avatar";
import { Logo } from "../Logo";

interface HeaderProps {
  itemsCount: number;
  members: MemberStorage[];
  onSharePress: () => void;
}

export function Header({ itemsCount, members, onSharePress }: HeaderProps) {
  const peopleCount = members.length + 1;
  const subtitle = `${itemsCount} ${itemsCount === 1 ? "produto" : "produtos"} · compartilhada com ${peopleCount} ${peopleCount === 1 ? "pessoa" : "pessoas"}`;

  return (
    <View className="gap-[18px] px-5 pt-4 pb-3">
      <View className="flex-row items-center justify-between">
        <Logo />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onSharePress}
          accessibilityLabel="Compartilhar lista"
          className="h-11 flex-row items-center gap-2 rounded-full border border-gray-200 bg-white pr-3.5 pl-1.5"
        >
          <View className="flex-row">
            <Avatar initials="EU" variant="owner" size="sm" />
            {members.slice(0, 2).map((member) => (
              <Avatar
                key={member.id}
                initials={getInitials(member.contact)}
                size="sm"
                className="-ml-2.5"
              />
            ))}
          </View>
          <Share2 size={18} color={colors.ink} />
          <Text className="font-sans-bold text-sm text-ink">Compartilhar</Text>
        </TouchableOpacity>
      </View>

      <View className="gap-1">
        <Text className="font-sans-extrabold text-3xl text-ink">
          Compras do mês
        </Text>
        <Text className="font-sans-medium text-sm text-gray-600">
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
