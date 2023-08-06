import { MiddlewareHandlerContext } from "$fresh/server.ts";
import {
  getSessionAccessToken,
  getSessionId,
} from "https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts";
import { oauth2Client } from "@/utils/oauth2_client.ts";

const kv = await Deno.openKv();

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

export interface State {
  user: User | null;
  accessToken: string | null;
}

const fetchGithubUserInfo = async (accessToken: string): Promise<User> => {
  const resp = await fetch("https://api.github.com/user", {
    headers: {
      authorization: `bearer ${accessToken}`,
    },
  });
  if (!resp.ok) {
    throw new Error(
      `can't fetch github user info: ${resp.status}\n\n${await resp.text()}`,
    );
  }
  const user: User = await resp.json();
  return user;
};

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const sessionID = await getSessionId(req);
  if (!sessionID) {
    return await ctx.next();
  }

  const accessToken = await getSessionAccessToken(oauth2Client, sessionID);
  if (!accessToken) {
    return await ctx.next();
  }
  let user: User | null = null;

  const userInfo = await kv.get<User>(["userInfo", sessionID]);
  if (userInfo.value === null) {
    user = await fetchGithubUserInfo(accessToken as string);
    await kv.set(["userInfo", sessionID], user);
  } else {
    user = userInfo.value;
  }

  ctx.state = {
    user,
    accessToken,
  };

  const resp = await ctx.next();
  return resp;
}
