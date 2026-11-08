import { Text, View } from "react-native";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";
import { colors } from "@/theme/colors";

interface LogoProps {
  size?: number;
}

export function Logo({ size = 40 }: LogoProps) {
  return (
    <View
      accessibilityLabel="listup"
      accessibilityRole="image"
      className="flex-row items-center gap-2.5"
    >
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Defs>
          <LinearGradient id="logoBg" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={colors.primary.bright} />
            <Stop offset="1" stopColor={colors.primary.dark} />
          </LinearGradient>
          <ClipPath id="logoClip">
            <Rect width="48" height="48" rx="14" />
          </ClipPath>
        </Defs>

        <Rect width="48" height="48" rx="14" fill="url(#logoBg)" />

        {/* brilho suave no canto, cortado pelo formato do ícone */}
        <Circle
          cx="42"
          cy="4"
          r="24"
          fill={colors.white}
          opacity={0.1}
          clipPath="url(#logoClip)"
        />

        {/* alça da sacola */}
        <Path
          d="M18 19.5v-2a6 6 0 0 1 12 0v2"
          stroke={colors.white}
          strokeWidth={2.6}
          strokeLinecap="round"
          fill="none"
        />

        {/* corpo da sacola */}
        <Path
          d="M14.2 19h19.6a2 2 0 0 1 2 2.2l-1.5 14a3 3 0 0 1-3 2.6H16.7a3 3 0 0 1-3-2.6l-1.5-14a2 2 0 0 1 2-2.2z"
          fill={colors.white}
        />

        {/* check da lista */}
        <Path
          d="M19.2 28.6l3.6 3.6 6.6-7.2"
          stroke={colors.primary.DEFAULT}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>

      <Text className="font-sans-extrabold text-[24px] text-ink">
        list<Text className="text-primary">up</Text>
      </Text>
    </View>
  );
}
