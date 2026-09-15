"use client";

import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === "") {
      setEmailError("Az email megadása kötelező");
    } else if (!emailRegex.test(email)) {
      setEmailError("Érvénytelen email cím");
    }
    if (password.trim() === "") {
      setPasswordError("A jelszó megadása kötelező");
    }
  };

  console.log(email);
  console.log(password);

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
