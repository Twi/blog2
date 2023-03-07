import { MiddlewareHandlerContext } from "$fresh/server.ts";

interface State {
  data: string;
}

export async function handler(
  _: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const resp = await ctx.next();
  resp.headers.set("Cache-Control", "public, max-age=21600");
  return resp;
}
