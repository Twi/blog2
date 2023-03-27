import { HandlerContext } from "$fresh/server.ts";
import { decode } from "npm:gpt-3-encoder@1.1.4";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const body = await req.json();
  return new Response(decode(body), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
