import { ComponentChildren } from "preact";

export interface NavbarLinkProps {
  title: string;
  target?: string; // if undefined, disable
}

export const NavbarLink = ({ title, target }: NavbarLinkProps) => {
  return (
    <>
      <li class="mx-2">
        {target
          ? (
            <a
              class="text-blue-400 transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700"
              href={target}
            >
              {/* dark:text-blue-400 dark:hover:text-blue-500 dark:focus:text-blue-500 dark:active:text-blue-600" */}
              {title}
            </a>
          )
          : (
            <span class="text-gray-500 ">
              {/*" dark:text-gray-300">*/}
              {title}
            </span>
          )}
      </li>
    </>
  );
};

export const NavbarCrumb = () => (
  <li>
    <span class="text-gray-500">
      {/* dark:text-gray-300"> */}/
    </span>
  </li>
);

export interface NavbarProps {
  children: ComponentChildren;
}

export const Navbar = ({ children }: NavbarProps) => {
  return (
    <>
      <nav class="w-full rounded-md bg-gray-100 px-2 py-2 mb-4">
        {/* dark:bg-gray-600">*/}
        <ul class="flex">
          <>{children}</>
          <span class="m-auto"></span>
          <NavbarLink title="Fediverse" target="https://tech.lgbt/@twi" />
          <NavbarLink title="Email" target="mailto:twipony.ts@gmail.com" />
        </ul>
      </nav>
    </>
  );
};
