"use client";

import { RemoteAuthRepository } from "@/repository/auth/RemoteAuthRepository";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogin = () => {
  const router = useRouter();
  const [username, onUsernameChange] = useState("");
  const [password, onPasswordChange] = useState("");

  const onSubmit = () => {
    const response = new RemoteAuthRepository().login({
      username,
      password,
    });

    if (response?.accessToken) {
      console.log("got token");
      localStorage.setItem("token", response.accessToken);
      router.push("/");
    }
  };

  return {
    onSubmit,
    username,
    onUsernameChange,
    password,
    onPasswordChange,
  };
};
