import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";

export default {
  selfURL: import.meta.url,
  setup: {
    theme: {
      listStyleType: {
        none: "disc",
        disc: "disc",
      },
      darkMode: "class",
      colors: {
        yellow: colors.yellow,
        transparent: "transparent",
        "black": "black",
        "white": "white",
        "gray": {
          50: "#faf9f8",
          100: "#f6f4f2",
          200: "#E6E4E2",
          300: "#D6D2CC",
          400: "#B6B0AD",
          500: "#9F9995",
          600: "#666361",
          700: "#474645",
          800: "#343433",
          900: "#242424",
        },
      },
    },
  },
} as Options;
