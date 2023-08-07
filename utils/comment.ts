import { ulid } from "https://deno.land/x/ulid@v0.2.2/mod.ts";
import render from "@/utils/markdown.ts";
import { User } from "@/routes/_middleware.tsx";

const kv = await Deno.openKv();

export interface Comment {
  id: string;
  postSlug: string;
  creator: number;
  createdAt: Date;
  content: string;
  contentHTML: string;
}

export interface APIComment extends Omit<Comment, "createdAt"> {
  createdAt: string;
}

export interface CommentsResponse {
  users: Record<string, User>;
  comments: APIComment[];
}

export const listCommentsWithUsers = async (
  postSlug: string,
): Promise<CommentsResponse> => {
  const comments = await listComments(postSlug);
  const users: Record<string, User> = {};

  for (const comment of comments) {
    const entry = await kv.get<User>([
      "github",
      "user",
      `${comment.creator}`,
    ]);
    entry.value && (users[comment.creator] = entry.value);
  }

  return {
    comments: comments.map((comment) => ({
      ...comment,
      createdAt: comment.createdAt.toISOString(),
    })),
    users,
  };
};

export const listComments = async (postSlug: string): Promise<Comment[]> => {
  const result: Comment[] = [];
  for await (
    const entry of kv.list<Comment>({ prefix: ["comment", postSlug] })
  ) {
    const comment = entry.value;
    if (comment) {
      result.push(comment);
    }
  }
  return result;
};

export const createComment = async (
  postSlug: string,
  creator: number,
  content: string,
): Promise<Comment> => {
  const id = ulid();
  const createdAt = new Date();
  const contentHTML = render(content);
  const comment = { id, postSlug, creator, createdAt, content, contentHTML };
  await kv.set(["comment", postSlug, id], comment);
  return comment;
};
