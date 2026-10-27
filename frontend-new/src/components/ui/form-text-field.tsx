import type { ComponentPropsWithoutRef } from "react";
import { FormFieldError } from "./form-field-error";
import { Label } from "./label";
import { TextInput } from "./text-input";

type FormTextFieldProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  errors: (string | { message?: string } | undefined)[];
};

export const FormTextField = ({
  label,
  errors,
  id,
  ...props
}: FormTextFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>

      <TextInput id={id} aria-invalid={errors.length > 0} {...props} />

      <FormFieldError errors={errors} />
    </div>
  );
};
