import { extract } from "std/encoding/front_matter/any.ts";
import TTL from "$ttl";

export interface Post {
  slug: string;
  title: string;
  date: Date;
  content: string;
  image?: string;
  desc?: string;
}

const ttl = new TTL<Post>(
  Deno.env.get("NODE_ENV") == "production" ? 10_000_000 : 10_000,
);

ttl.addEventListener("set", ({ key }: { key: string }) => {
  console.log(`[cache] set ${key}`);
});
ttl.addEventListener("expired", ({ key }: { key: string }) => {
  console.log(`[cache] expired ${key}`);
});

export async function loadPost(slug: string): Promise<Post | null> {
  if (ttl.has(slug)) {
    const post = ttl.get(slug);
    return post ? post : null;
  }

  let text: string;
  try {
    text = await Deno.readTextFile(
      `./data/posts/${decodeURIComponent(slug)}.md`,
    );
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return null;
    }
    throw err;
  }
  const { attrs, body } = extract(text);
  const params = attrs as Record<string, string>;
  const date = new Date(params.date);
  const result = {
    slug,
    title: params.title,
    date,
    content: body,
    image: params.image,
  };
  ttl.set(slug, result);
  return result;
}

export async function listPosts(): Promise<Post[]> {
  const promises = [];
  for await (const entry of Deno.readDir("./data/posts")) {
    const slug = entry.name.replace(".md", "");
    promises.push(loadPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return posts;
}
