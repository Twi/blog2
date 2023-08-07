import { createGitHubOAuth2Client } from "https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts";

export const oauth2Client = createGitHubOAuth2Client({
  redirectUri: Deno.env.get("GITHUB_CALLBACK_URL") ||
    "http://localhost:8000/auth/callback",
});
