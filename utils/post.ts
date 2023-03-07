import { extract } from "std/encoding/front_matter/any.ts";

export interface Post {
  slug: string;
  title: string;
  date: Date;
  content: string;
  image: string;
}

export async function loadPost(slug: string): Promise<Post | null> {
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
  return {
    slug,
    title: params.title,
    date,
    content: body,
    image: params.image,
  };
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
