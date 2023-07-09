import { Handlers } from "$fresh/server.ts";
import { site } from "@/data/site.ts";
import { listPosts } from "@/utils/post.ts";

function formatDateToRFC2822(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = days[date.getUTCDay()];
  const dateNumber = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  return `${day}, ${dateNumber} ${month} ${year} ${padZero(hours)}:${
    padZero(minutes)
  }:${padZero(seconds)} GMT`;
}

function padZero(value) {
  return value.toString().padStart(2, "0");
}

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const posts = await listPosts();

    let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
<link>https://friendshipcastle.zip</link>
<title>${site.title}</title>
<description>${site.description}</description>
<generator>blog2 https://github.com/Twi/blog2</generator>
<ttl>1440</ttl>
`;

    posts.forEach((p) => {
      rss += `<item>
<guid>https://friendshipcastle.zip/blog/${p.slug}</guid>
<title>${p.title}</title>
<link>https://friendshipcastle.zip/blog/${p.slug}</link>
<pubDate>${formatDateToRFC2822(p.date)}</pubDate>
</item>
`;
    });

    rss += `</channel>
</rss>`;

    return new Response(rss, {
      headers: {
        "Content-Type": "application/rss+xml",
      },
    });
  },
};
