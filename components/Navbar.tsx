import { ComponentChildren } from "preact";
import { author } from "@/data/site.ts";

export interface NavbarLinkProps {
  title: string;
  target?: string; // if undefined, disable
  relme?: boolean;
}

export const NavbarLink = ({ title, target, relme }: NavbarLinkProps) => {
  return (
    <>
      <li class="mx-2">
        {target
          ? (
            <a
              class="text-blue-400 transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700 dark:text-blue-200 dark:hover:text-blue-400 dark:focus:text-blue-500 dark:active:text-blue-500"
              href={target}
              rel={relme ? "me" : undefined}
            >
              {title}
            </a>
          )
          : (
            <span class="text-gray-500 dark:text-gray-100">
              {title}
            </span>
          )}
      </li>
    </>
  );
};

export const NavbarCrumb = () => (
  <li>
    <span class="text-gray-500 dark:text-gray-300">/</span>
  </li>
);

export interface NavbarProps {
  children: ComponentChildren;
}

export const Navbar = ({ children }: NavbarProps) => {
  return (
    <>
      <nav class="w-full h-full rounded-md bg-gray-100 px-2 py-2 dark:bg-gray-600 mb-4">
        <ul class="flex">
          <img
            class="w-6 h-6 rounded-full"
            src="/images/avatar.jpg"
            alt="Twi's avatar"
          />
          <>{children}</>
          <span class="m-auto"></span>
          <NavbarLink title="Fediverse" relme target={author.mastodon.link} />
          <NavbarLink title="Email" target={"mailto:" + author.email} />
        </ul>
      </nav>
    </>
  );
};
