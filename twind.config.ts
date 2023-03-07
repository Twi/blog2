import { defineConfig } from "@twind/core";
import presetAutoprefix from "@twind/preset-autoprefix";
import presetTailwind from "@twind/preset-tailwind";
import presetTailwindForms from "@twind/preset-tailwind-forms";
import presetTypography from "@twind/preset-typography";

// Twind v1 configuration
// Learn more at https://twind.style/installation
export default defineConfig({
  presets: [
    presetAutoprefix(),
    presetTailwind(),
    presetTailwindForms(),
    presetTypography(),
  ],
  theme: {},
  preflight: {
    "body": { "background-color": "rgb(249 250 251)" },
    "::selection": {
      "background-color": "#000",
      "color": "#fff",
    },
    "@media (prefers-color-scheme: dark)": {
      "body": { "background-color": "rgb(31 41 55)" },
      "::selection": {
        "background-color": "#fff",
        "color": "#000",
      },
    },
  },
});

// Make sure you export your config's URL
// so that it can referenced in islands
export const configURL = import.meta.url;
