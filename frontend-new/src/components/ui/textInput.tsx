"use client";
import { ComponentPropsWithoutRef } from "react";

export const TextInput = ({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"input">) => {
  return (
    <input
      {...props}
      className={`
        w-full rounded-md border border-gray-300
        bg-white px-3 py-2 text-gray-900
        placeholder:text-gray-400
        focus:border-blue-500 focus:outline-none
        ${className}
      `}
    />
  );
};
