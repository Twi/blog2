import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Navbar, NavbarCrumb, NavbarLink } from "@/components/Navbar.tsx";
import { State } from "@/utils/state.ts";
import { listPosts, Post } from "@/utils/post.ts";
import Header from "@/components/Header.tsx";

interface Data {
  posts: Post[];
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    return ctx.render({ ...ctx.state, posts });
  },
};

export default function BlogIndex(props: PageProps<Data>) {
  const { posts } = props.data;
  return (
    <>
      <Header title="Blog" />
      <Navbar>
        <NavbarLink title="Home" target="/" />
        <NavbarCrumb />
        <NavbarLink title="Blog" />
      </Navbar>
      <section class="prose prose-slate dark:prose-invert max-w-none">
        <h1>Blog</h1>
        <p>Here you can find my wisdom.</p>
        <ul>
          {posts.map((post) => (
            <li>
              {post.date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
              {" - "}
              <a
                class="text-blue-400 transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 dark:focus:text-blue-500 dark:active:text-blue-600"
                href={`/blog/${post.slug}`}
              >
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
