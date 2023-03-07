import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost, Post } from "../../utils/post.ts";
import { ServerCodePage } from "../_404.tsx";
import { Navbar, NavbarCrumb, NavbarLink } from "../../components/Navbar.tsx";
import * as gfm from "$gfm";
import Header from "../../components/Header.tsx";

interface Data {
  post: Post | null;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const post = await loadPost(ctx.params.slug);
    return ctx.render({ ...ctx.state, post });
  },
};

export default function BlogViewPage(props: PageProps) {
  const { post } = props.data;

  return post
    ? (
      <>
        <Header title={post.title} description={post.desc} image={post.image} />
        <Navbar>
          <NavbarLink title="Home" target="/" />
          <NavbarCrumb />
          <NavbarLink title="Blog" target="/blog" />
          <NavbarCrumb />
          <NavbarLink title={post.slug} />
        </Navbar>
        <style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
        <article className="markdown-body">
          <h1>{post.title}</h1>
          {post.image
            ? <img class="pb-1 object-contain" src={post.image} />
            : <></>}
          <small>Published on {post.date.toLocaleDateString("en-US")}</small>
          <span
            dangerouslySetInnerHTML={{ __html: gfm.render(post.content) }}
          />
        </article>
      </>
    )
    : (
      <>
        <div class="p-4 mx-auto max-w-screen-md">
          <ServerCodePage
            serverCode={404}
            codeDescription={"We couldn't find the post you're looking for."}
          />
        </div>
      </>
    );
}
