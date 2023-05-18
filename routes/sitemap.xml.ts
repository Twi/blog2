import { Handlers } from "$fresh/server.ts";
import manifest from "../fresh.gen.ts";
import { SitemapContext } from "https://deno.land/x/fresh_seo@0.2.1/mod.ts";
import { listPosts } from "@/utils/post.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const posts = await listPosts();

    const sitemap = new SitemapContext(
      "https://friendshipcastle.zip",
      manifest,
    );

    posts.forEach((p) => {
      sitemap.add("/blog/" + p.slug, {
        lastmod: p.date,
        changefreq: "weekly",
        priority: "0.7",
      });
    });

    // You can add additional page here
    return sitemap.render();
  },
};
