import { Handlers } from "$fresh/server.ts";
import { signIn } from "https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts";
import { oauth2Client } from "@/utils/oauth2_client.ts";

export const handler: Handlers = {
  async GET(req) {
    return await signIn(req, oauth2Client);
  },
};
