import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "danger" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-orange-400 text-white hover:bg-orange-500 active:bg-orange-600 disabled:bg-orange-200",
  secondary:
    "bg-orange-50 text-orange-600 hover:bg-orange-100 active:bg-orange-200",
  danger: "bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200",
  ghost: "bg-transparent text-gray-500 hover:bg-gray-100",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-medium transition-colors disabled:cursor-not-allowed",
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
