import {
  Comment,
  createComment,
  listCommentsWithUsers,
} from "@/utils/comment.ts";
import { HandlerContext, Handlers } from "$fresh/server.ts";
import { User } from "@/routes/_middleware.tsx";
import { getSessionId } from "https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts";

const kv = await Deno.openKv();

export interface ResponseData {
  comments: Comment[];
  users: Record<string, User>;
}

export interface DeleteRequest {
  id: string;
}

export const handler: Handlers<User | null> = {
  async DELETE(req: Request, ctx: HandlerContext<User | null>) {
    const { slug } = ctx.params;
    const id = new URL(req.url).searchParams.get("id") || "";

    if (id === "") {
      return new Response(JSON.stringify({ "error": "invalid request" }), {
        status: 400,
      });
    }

    const sessionID = await getSessionId(req)!;
    if (!sessionID) {
      console.error("no sessionID");
      return new Response(JSON.stringify({ "error": "unauthorized" }), {
        status: 401,
      });
    }

    const entry = await kv.get<User>(["userInfo", sessionID]);
    if (!entry.value) {
      console.error("no entry");
      return new Response(JSON.stringify({ "error": "unauthorized" }), {
        status: 401,
      });
    }

    const user = entry.value.id;

    const comment = await kv.get<Comment>(["comment", slug, id]);
    if (!comment.value) {
      return new Response(
        JSON.stringify({ "error": "target comment not found" }),
        {
          status: 400,
        },
      );
    }

    if (comment.value.creator !== user && entry.value.login !== "Twi") {
      return new Response(JSON.stringify({ "error": "unauthorized" }), {
        status: 401,
      });
    }

    await kv.delete(["comment", slug, id]);

    const { comments, users } = await listCommentsWithUsers(slug);

    return new Response(JSON.stringify({ comments, users }), {
      headers: { "content-type": "application/json" },
    });
  },
  async POST(req: Request, ctx: HandlerContext<User | null>) {
    const { slug } = ctx.params;
    const sessionID = await getSessionId(req)!;
    if (!sessionID) {
      console.error("no sessionID");
      return new Response(JSON.stringify({ "error": "unauthorized" }), {
        status: 401,
      });
    }
    const entry = await kv.get<User>(["userInfo", sessionID]);
    if (!entry.value) {
      console.error("no entry");
      return new Response(JSON.stringify({ "error": "unauthorized" }), {
        status: 401,
      });
    }

    const creator = entry.value.id;

    const body: Partial<Comment> = await req.json();
    if (!body.content || typeof body.content !== "string") {
      return new Response(JSON.stringify({ "error": "invalid request" }), {
        status: 400,
      });
    }

    await createComment(slug, creator, body.content);

    const { comments, users } = await listCommentsWithUsers(slug);

    return new Response(JSON.stringify({ comments, users }), {
      headers: { "content-type": "application/json" },
    });
  },
  async GET(_req: Request, ctx: HandlerContext<User | null>) {
    const { slug } = ctx.params;
    const { comments, users } = await listCommentsWithUsers(slug);

    return new Response(JSON.stringify({ comments, users }), {
      headers: { "content-type": "application/json" },
    });
  },
};
