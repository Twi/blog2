import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Footer } from "../components/Footer.tsx";
import { site } from "../data/site.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <div class="p-4 mx-auto max-w-screen-md rounded-xl bg-white my-4 dark:bg-gray-800 dark:text-gray-50">
        <Component />
        <Footer />
      </div>
    </>
  );
}
