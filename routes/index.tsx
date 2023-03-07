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
        <h2 class="font-bold">Welcome</h2>

        <p>
          Hi everypony! Welcome to Twilight Sparkle's Friendship Castle! We're
          going to have so much fun learning fun things about such fun topics!
        </p>

        <p>
          This is my hot take zone. Reader discretion advised. Before commenting
          on one of these articles, take a moment to consider if you're being an
          asshat because I won't read asshat comments.
        </p>
      </section>
    </>
  );
}
