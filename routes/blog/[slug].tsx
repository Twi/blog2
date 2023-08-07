import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import { loadPost, Post } from "@/utils/post.ts";
import { ServerCodePage } from "@/routes/_404.tsx";
import { Navbar, NavbarCrumb, NavbarLink } from "@/components/Navbar.tsx";
import MastodonShare from "@/islands/MastodonShare.tsx";
import Header from "@/components/Header.tsx";
import render from "@/utils/markdown.ts";
import { User } from "@/routes/_middleware.tsx";
import { getSessionId } from "https://deno.land/x/deno_kv_oauth@v0.2.4/mod.ts";
import Comments from "@/islands/Comments.tsx";
import { CommentsResponse, listCommentsWithUsers } from "@/utils/comment.ts";

const kv = await Deno.openKv();

interface Data {
  post: Post | null;
  user: User | null;
  comments: CommentsResponse | null;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const post = await loadPost(ctx.params.slug);
    let user: User | null = null;

    const sessionID = await getSessionId(req);
    if (sessionID) {
      const userInfo = await kv.get<User>(["userInfo", sessionID]);
      if (userInfo.value !== null) {
        user = userInfo.value;
      }
    }

    const comments = await listCommentsWithUsers(ctx.params.slug);

    return ctx.render({ ...ctx.state, post, user, comments });
  },
};

export default function BlogViewPage(props: PageProps) {
  const { post, user, comments } = props.data;
  const { slug } = props.params;

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
        <article>
          <div className="prose prose-slate dark:prose-invert prose-img:rounded-xl">
            <h1>{post.title}</h1>
          </div>
          {post.image
            ? (
              <img
                class="my-4 object-contain rounded-xl"
                src={asset(post.image)}
              />
            )
            : <></>}
          <div className="prose prose-slate dark:prose-invert prose-img:rounded-xl">
            <small>
              Published on {post.date.toLocaleDateString("en-US")} -{" "}
              {post.readingTime} ({post.wordCount} words)
            </small>
            <span
              dangerouslySetInnerHTML={{ __html: render(post.content) }}
            />
          </div>
        </article>
        <MastodonShare title={post.title} />
        <Comments defaultComments={comments} slug={slug} user={user} />
      </>
    )
    : (
      <>
        <ServerCodePage
          serverCode={404}
          codeDescription={"We couldn't find the post you're looking for."}
        />
      </>
    );
}
