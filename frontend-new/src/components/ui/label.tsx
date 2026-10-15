import { ComponentPropsWithoutRef } from "react";

export const Label = ({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"label">) => {
  return (
    <label
      {...props}
      className={`text-sm font-medium text-gray-700 ${className}`}
    />
  );
};
