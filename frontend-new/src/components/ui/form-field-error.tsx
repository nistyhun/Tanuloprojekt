type FormFieldErrorProps = {
  errors: Array<string | { message?: string } | undefined>;
};

export const FormFieldError = ({ errors }: FormFieldErrorProps) => {
  const messages = errors
    .map((error) => (typeof error === "string" ? error : error?.message))
    .filter(Boolean);

  if (messages.length === 0) {
    return null;
  }

  return (
    <p className="text-sm text-red-500" role="alert">
      {messages.join(", ")}
    </p>
  );
};
