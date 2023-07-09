import { HandlerContext } from "$fresh/server.ts";
import { author } from "@/data/site.ts";

export const handler = (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  return new Response(JSON.stringify({ did: author.atproto.did }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
