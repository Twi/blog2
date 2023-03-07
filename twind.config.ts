import { defineConfig } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";
import presetTypography from "@twind/preset-typography";

// Twind v1 configuration
// Learn more at https://twind.style/installation
export default defineConfig({
  presets: [
    presetAutoprefix(),
    presetTailwind(),
    presetTypography(),
  ],
  theme: {},
});

// Make sure you export your config's URL
// so that it can referenced in islands
export const configURL = import.meta.url;
