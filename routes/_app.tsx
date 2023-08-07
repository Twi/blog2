import { AppProps } from "$fresh/server.ts";
import { Footer } from "@/components/Footer.tsx";

export default function App({ Component, state }: AppProps) {
  return (
    <>
      <div class="bg-gray-50 dark:bg-gray-800 dark:text-gray-50">
        <div class="p-4 mx-auto max-w-screen-md">
          <Component />
          <Footer />
        </div>
      </div>
    </>
  );
}
