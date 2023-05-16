import { HandlerContext } from "$fresh/server.ts";
import { author, site } from "@/data/site.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  return new Response(JSON.stringify({ did: author.atprotoDID }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
