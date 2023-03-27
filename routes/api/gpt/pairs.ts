import { HandlerContext } from "$fresh/server.ts";
import { decode, encode } from "npm:gpt-3-encoder@1.1.4";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const body = await req.text();
  const encoded = encode(body);

  const result = [];

  for (const token of encoded) {
    result.push({ token, string: decode([token]) });
  }

  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
