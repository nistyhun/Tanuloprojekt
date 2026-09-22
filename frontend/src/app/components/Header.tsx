"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import type { User } from "../types/auth";

const Header = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const fetchUser = async (token: string) => {
    const response = await fetch("http://localhost:8080/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }

    if (!response.ok) {
      throw new Error("Nem sikerült lekérni a felhasználót");
    }

    const data: User = await response.json();

    setUser(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchUser(token);
  }, [router]);

  return (
    <header className="bg-gray-900 px-8 py-4 text-white">
      <div className="flex items-start justify-between">
        <p>Fejléc</p>
        {user && (
          <div className="text-right">
            <p className="font-medium text-white">
              {user.firstName} {user.lastName}
            </p>

            <p className="text-sm text-gray-500">{user.role}</p>
            <button
              onClick={handleLogout}
              className="mt-2 text-sm text-red-600 hover:text-red-700"
            >
              Kijelentkezés
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
