"use client"

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    let hasError = false;

    setEmailError("");
    setPasswordError("");
    setLoginError("");

    if (!email.trim()){
      setEmailError("Az email cím megadása kötelező");
      hasError = true;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Érvénytelen email cím.");
      hasError = true;
    }

    if (!password) {
    setPasswordError("A jelszó megadása kötelező.");
    hasError = true;
    }

    if (hasError){
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);

    setIsLoading(true);

    try{
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers:{
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });
    console.log(response)
  } catch(error) {
    console.log(error);
    setLoginError("Nem sikerült kapcsolódni a szerverhez.");
  } finally {
    setIsLoading(false);
  }
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold">Bejelentkezés</h1>
        <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="pelda@valami.hu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`rounded-md border border-gray-300 px-3 py-2 outline-none transition-colors ${
                emailError
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
              />
            { emailError && (
              <p className="text-sm text-red-600">
                {emailError}
              </p>
          )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Jelszó</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`rounded-md border border-gray-300 px-3 py-2 outline-none transition-colors ${
                passwordError
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
            />
          </div>
          { passwordError && (
            <p className="text-sm text-red-600">
              {passwordError}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer rounded-md bg-blue-600 px-3 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400">
            {isLoading ? "Bejelentkezés..." : "Bejelentkezés"}
          </button>
          {loginError && (
            <p className="text-sm text-red-600">
              {loginError}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
