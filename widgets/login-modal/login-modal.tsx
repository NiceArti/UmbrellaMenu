"use client";

import { sha256Hex } from "@/shared/utils/auth";
import { useState } from "react";

export function LoginModal({ onSuccess }: { onSuccess?: () => void }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const passwordHash = sha256Hex(password);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password: passwordHash }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Ошибка авторизации");
        return;
      }
      onSuccess?.();
    } catch (e) {
      setError("Сетевая ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 mx-4">
      <div className="w-full max-w-sm rounded-md bg-[#101010] p-6 shadow-xl">
        <h2 className="mb-4 text-lg text-center font-semibold">
          Вход в админку
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Логин</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full text-black rounded border border-gray-300 p-2 focus:border-black focus:outline-none"
              placeholder="Введите логин"
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black rounded border border-gray-300 p-2 focus:border-black focus:outline-none"
              placeholder="Введите пароль"
            />
          </div>
          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
