import { Head } from "$fresh/runtime.ts";
import { site } from "@/data/site.ts";

export interface HeaderProps {
  title?: string;
  description?: string;
  image?: string;
}

export default function Header(props: HeaderProps) {
  const title = props.title ? props.title : site.title;
  const desc = props.summary ? props.summary : site.description;
  const image = props.image ? props.image : site.ogImage;
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={desc} />
      {/* Theme */}
      <meta name="theme-color" content="#000" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={desc} />
      <meta property="twitter:image" content={image} />

      {/* RSS feed */}
      <link rel="alternate" type="application/rss+xml" href="/blog.rss" />
    </Head>
  );
}
