import { HandlerContext } from "$fresh/server.ts";
import { encode } from "npm:gpt-3-encoder";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const body = await req.text();
  return new Response(JSON.stringify(encode(body)), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};