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
      <h1 class="whitespace-nowrap text-3xl font-bold text-gray-800 dark:text-gray-400 mb-4">
        Twilight Sparkle's Friendship Castle
      </h1>
      <img class="mb-4 rounded-xl" src="/images/landscape.jpg" />
      <section>
        <h2 class="text-2xl font-bold mb-4">Welcome</h2>

        <p class="mb-4">
          Hi everypony! Welcome to Twilight Sparkle's Friendship Castle! We're
          going to have so much fun learning fun things about such fun topics!
        </p>

        <p class="mb-4">
          This is my hot take zone. Reader discretion advised. Before commenting
          on one of these articles, take a moment to consider if you're being an
          asshat because I won't read asshat comments.
        </p>
      </section>
    </>
  );
}
