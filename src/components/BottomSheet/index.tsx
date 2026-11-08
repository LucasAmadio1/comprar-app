import { X } from "lucide-react-native";
import { type ReactNode, useEffect } from "react";
import {
  BackHandler,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";

interface BottomSheetProps {
  visible: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({
  visible,
  title,
  subtitle,
  onClose,
  children,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  // Botão voltar do Android fecha a folha.
  useEffect(() => {
    if (!visible) {
      return;
    }

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onClose();
        return true;
      },
    );

    return () => subscription.remove();
  }, [visible, onClose]);

  if (!visible) {
    return null;
  }

  return (
    <View className="absolute inset-0 z-20 justify-end bg-ink/40">
      <Pressable
        accessibilityLabel="Fechar"
        className="absolute inset-0"
        onPress={onClose}
      />

      <KeyboardAvoidingView behavior="padding">
        <View
          className="gap-4 rounded-t-[28px] bg-white px-5 pt-3"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          <View className="h-[5px] w-10 self-center rounded-full bg-gray-300" />

          <View className="flex-row items-center justify-between">
            <View className="gap-0.5">
              <Text className="font-sans-extrabold text-[22px] text-ink">
                {title}
              </Text>
              {subtitle ? (
                <Text className="font-sans-medium text-sm text-gray-600">
                  {subtitle}
                </Text>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={onClose}
              accessibilityLabel="Fechar"
              className="-mr-2 h-11 w-11 items-center justify-center"
            >
              <X size={22} color={colors.ink} strokeWidth={2.2} />
            </TouchableOpacity>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: height * 0.7 }}
            contentContainerClassName="gap-4"
          >
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
