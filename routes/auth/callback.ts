import { Handlers } from "$fresh/server.ts";
import { handleCallback } from "https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts";
import { oauth2Client } from "@/utils/oauth2_client.ts";

export const handler: Handlers = {
  async GET(req) {
    // Return object also includes `accessToken` and `sessionId` properties.
    const { response } = await handleCallback(
      req,
      oauth2Client,
      "/auth/whoami",
    );

    return response;
  },
};
