import type { ReactNode } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5",
        className
      )}
    >
      {children}
    </div>
  );
}
