import { ComponentPropsWithoutRef } from "react";

export const Button = ({
  variant = "primary",
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
}) => {
  return (
    <button
      className={variant === "primary" ? "bg-amber-600" : "bg-blue-700"}
      {...props}
    />
  );
};
