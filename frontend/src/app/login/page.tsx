"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { LoginResponse } from "../types/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoginError("");
    let isValid = true;

    if (email.trim() === "") {
      setEmailError("Az email megadása kötelező");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Érvénytelen email cím");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("A jelszó megadása kötelező");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log(email);
      console.log(password);

      if (response.status === 401) {
        setLoginError("Hibás email cím vagy jelszó");
        return;
      }

      if (!response.ok) {
        setLoginError("Hiba történt a bejelentkezés során");
        return;
      }

      const data: LoginResponse = await response.json();

      localStorage.setItem("token", data.token);

      router.push("/orders");

      console.log(data);
    } catch (error) {
      console.error(error);
      setLoginError("Nem sikerült kapcsolódni a szerverhez");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Bejelentkezés</h1>

        <p className="mt-2 text-sm text-gray-500">Jelentkezz be a fiókodba</p>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className="w-full rounded-lg border border-gray-700 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Jelszó
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              className="w-full rounded-lg border border-gray-700 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
            />
            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          {loginError && <p className="text-sm text-red-600">{loginError}</p>}
          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Bejelentkezés
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default LoginPage;
