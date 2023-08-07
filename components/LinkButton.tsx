import { JSX } from "preact";

export default function LinkButton(
  props: JSX.HTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <a
      {...props}
      class={`inline-block cursor-pointer px-3 py-2 bg-blue-200 dark:bg-blue-800 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
        props.class ?? ""
      }`}
    />
  );
}
