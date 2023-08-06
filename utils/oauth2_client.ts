import { createGitHubOAuth2Client } from "https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts";

export const oauth2Client = createGitHubOAuth2Client({
  redirectUri: "https://blog2.orca-kokanue.ts.net/auth/callback",
});
