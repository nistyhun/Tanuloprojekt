import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

const variants = {
  primary: "bg-blue-900 text-white hover:bg-blue-950",
  primaryAlt: "bg-blue-700 text-white hover:bg-blue-800",
  secondary: "bg-gray-500 text-white hover:bg-gray-600",
};

type Variant = keyof typeof variants;

const baseStyles =
  "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors cursor-pointer";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
};

export const Button = ({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={`
      ${baseStyles}
      ${variants[variant]}
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}
    `}
  />
);

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: Variant;
};

export const ButtonLink = ({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) => (
  <Link
    {...props}
    className={`
      ${baseStyles}
      ${variants[variant]}
      ${className}
    `}
  />
);
