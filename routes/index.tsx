import Header from "../components/Header.tsx";
import { Navbar, NavbarLink } from "../components/Navbar.tsx";

export default function Home() {
  return (
    <>
      <Header />
      <Navbar>
        <NavbarLink title="Home" />
        <NavbarLink title="Blog" target="/blog" />
      </Navbar>
      <section class="prose prose-slate dark:prose-invert max-w-none">
        <h1>Twilight Sparkle's Friendship Castle</h1>
        <img class="rounded-xl" src="/images/landscape.jpg" />

        <span class="flex flex-col items-center bg-white border border-gray-200 rounded-xl shadow md:flex-row max-w-full dark:border-gray-700 dark:bg-gray-800">
          <span class="pl-4"></span>
          <img
            class="max-w-24 max-h-24 rounded-full"
            src="/images/avatar.jpg"
            alt=""
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <span class="font-extrabold text-xl">Twilight Sparkle</span>
            <span>
              Blogger, shitposter, wife, tech worker, noun. Twi works tirelessly
              to make sure that technology doesn't enslave you. This blog
              contains her musings and wisdom.
            </span>
          </div>
        </span>

        <h2 class="font-bold">Welcome</h2>

        <p>
          Hi everypony! Welcome to Twilight Sparkle's Friendship Castle! We're
          going to have so much fun learning fun things about such fun
          topics!<br />
          <br />

          This is my hot take zone. Reader discretion advised. Before commenting
          on one of these articles, take a moment to consider if you're being an
          asshat because I won't read asshat comments.
        </p>
      </section>
    </>
  );
}
