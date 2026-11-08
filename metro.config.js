const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// inlineRem: 16 faz 1rem = 16px no celular (o padrão do NativeWind é 14),
// assim h-12 = 48px, p-6 = 24px etc., igual ao Tailwind da web.
module.exports = withNativeWind(config, {
  input: "./global.css",
  inlineRem: 16,
});
