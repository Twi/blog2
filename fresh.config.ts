import { defineConfig } from "$fresh/server.ts";

import freshwind from "@freshwind";
import config, { configURL } from "./twind.config.ts";

export default defineConfig({
  plugins: [freshwind(config, configURL)],
});
