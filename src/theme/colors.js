/**
 * Cores do app (tons de azul e branco). Usadas pelo tailwind.config.js
 * (classes como bg-primary, text-gray-600) e importadas nos componentes
 * quando é preciso o valor hex (ex.: placeholderTextColor, cor de ícones).
 */
const colors = {
  white: "#FFFFFF",
  background: "#D0D2D8",
  ink: "#1C2033",
  danger: "#B3261E",
  primary: {
    DEFAULT: "#2C46B1",
    bright: "#5A74E8",
    dark: "#22378C",
    light: "#E6EAF8",
    soft: "#F2F4FC",
    muted: "#A9B8EC",
  },
  gray: {
    50: "#F7F8FB",
    100: "#EEF0F5",
    200: "#E4E6EC",
    300: "#C3C5CB",
    400: "#828282",
    500: "#808080",
    600: "#74798B",
  },
};

module.exports = { colors };
