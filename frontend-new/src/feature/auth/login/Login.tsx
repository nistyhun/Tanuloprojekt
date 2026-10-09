"use client";

import { Button } from "@/components/ui/button";
import { TextInput } from "../../../components/ui/textInput";
import { useLogin } from "./useLogin";

export const Login = () => {
  const { onSubmit, username, onUsernameChange, password, onPasswordChange } =
    useLogin();

  return (
    <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1>Bejelentkezés</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <TextInput
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder="username"
        />
        <TextInput
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="password"
        />
        <Button type="submit">Login</Button>
        <Button variant="secondary" type="button">
          Forgot password
        </Button>
      </form>
    </section>
  );
};
