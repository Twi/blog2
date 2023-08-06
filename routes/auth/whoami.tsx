import { Handlers, PageProps } from "$fresh/server.ts";
import {
  getSessionAccessToken,
  getSessionId,
} from "https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts";
import { oauth2Client } from "@/utils/oauth2_client.ts";

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

export const handler: Handlers<User | null> = {
  async GET(req, ctx) {
    const sessionId = await getSessionId(req);

    if (!sessionId) {
      return ctx.render(null);
    }

    const accessToken = await getSessionAccessToken(oauth2Client, sessionId);
    const response = await fetch("https://api.github.com/user", {
      headers: {
        authorization: `bearer ${accessToken}`,
      },
    });
    const user: User = await response.json();
    return ctx.render(user);
  },
};

export default function Page({ data }: PageProps<User | null>) {
  if (!data) {
    return <a href="/signin">Sign In</a>;
  }

  return (
    <div>
      <img src={data.avatar_url} width={64} height={64} />
      <h1>{data.name}</h1>
      <p>{data.login}</p>
      <a href="/signout">Sign Out</a>
    </div>
  );
}
