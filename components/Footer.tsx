import { Container } from "@/components/Container.tsx";
import { site } from "@/data/site.ts";
export function Footer() {
  return (
    <footer class="w-full pt-10 pb-4">
      <Container>
        <div class="text-center">
          <p>
            &copy; {new Date().getFullYear()} {site.copyrightName} •{" "}
            <a class="hover:text-underline" href={site.viewSourceURL}>
              View Source
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
