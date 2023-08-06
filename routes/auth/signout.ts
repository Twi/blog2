import { Handlers } from "$fresh/server.ts";
import { signOut } from "https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts";

export const handler: Handlers = {
  async GET(req) {
    return await signOut(req);
  },
};
