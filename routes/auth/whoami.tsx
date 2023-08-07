import { Handlers, PageProps } from "$fresh/server.ts";
import {
  getSessionAccessToken,
  getSessionId,
} from "https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts";
import { oauth2Client } from "@/utils/oauth2_client.ts";
import { Navbar, NavbarLink } from "@/components/Navbar.tsx";
import { fetchGithubUserInfo, State, User } from "@/routes/_middleware.tsx";

const kv = await Deno.openKv();

export const handler: Handlers<User | null> = {
  async GET(req, ctx) {
    const sessionID = await getSessionId(req);

    if (!sessionID) {
      return ctx.render(null);
    }

    let user: User | null = null;

    const accessToken = await getSessionAccessToken(oauth2Client, sessionID);

    const userInfo = await kv.get<User>(["userInfo", sessionID]);
    if (userInfo.value === null) {
      user = await fetchGithubUserInfo(accessToken as string);
      await kv.set(["userInfo", sessionID], user);
    } else {
      user = userInfo.value;
    }

    return ctx.render(user);
  },
};

export default function Page({ data }: PageProps<User | null>) {
  if (!data) {
    return (
      <>
        <Navbar>
          <NavbarLink title="Home" target="/" />
          <NavbarLink title="Blog" target="/blog" />
        </Navbar>
        <a href="/auth/signin">Sign In</a>
      </>
    );
  }

  return (
    <>
      <Navbar>
        <NavbarLink title="Home" target="/" />
        <NavbarLink title="Blog" target="/blog" />
      </Navbar>
      <div class="max-w-sm">
        <h1 class="text-xl font-extrabold">Hello {data.name}!</h1>
        <img src={data.avatar_url} width={64} height={64} />
        <p class="font-extrabold text-lg">@{data.login}</p>
        <p>{data.login}</p>
        <a href="/auth/signout">Sign Out</a>
      </div>
    </>
  );
}
