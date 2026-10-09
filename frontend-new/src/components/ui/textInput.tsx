"use client";
import { ComponentPropsWithoutRef } from "react";

export const TextInput = (props: ComponentPropsWithoutRef<"input">) => {
  return <input {...props} />;
};
