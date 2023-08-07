import type { ComponentChildren } from "preact";

export interface CardProps {
  children: ComponentChildren;
  id?: string;
}

export default function Card({ children, id }: CardProps) {
  return (
    <div id={id} class="rounded-xl m-2 shadow-md bg-slate-50">
      <div class="px-4 py-2">
        {children}
      </div>
    </div>
  );
}
