import { Handlers } from "$fresh/server.ts";
import {
  getSessionId,
  signOut,
} from "https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts";

const kv = await Deno.openKv();

export const handler: Handlers = {
  async GET(req) {
    const sessionID = await getSessionId(req);
    if (sessionID) {
      await kv.delete(["userInfo", sessionID]);
    }
    return await signOut(req);
  },
};
