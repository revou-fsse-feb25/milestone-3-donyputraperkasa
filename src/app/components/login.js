import { Route, User } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      setLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Email tidak valid");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login gagal");

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      alert("Login berhasil!");
      onLoginSuccess?.(email); // Kirim username ke parent
      router.push("/cart");
      onClose?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <div>
          <p> email : john@mail.com</p>
          <p> password : changeme</p>
        </div>
      </form>
    </>
  );
}