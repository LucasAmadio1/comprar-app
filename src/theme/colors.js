/**
 * Cores do app. Usadas pelo tailwind.config.js (classes como bg-primary,
 * text-gray-400) e importadas nos componentes quando é preciso o valor hex
 * (ex.: placeholderTextColor, cor de ícones).
 */
const colors = {
  background: "#D0D2D8",
  primary: "#2C46B1",
  gray: {
    100: "#EEF0F5",
    200: "#E4E6EC",
    300: "#C3C5CB",
    400: "#828282",
    500: "#808080",
    600: "#74798B",
  },
};

module.exports = { colors };
