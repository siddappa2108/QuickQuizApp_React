import React, { useState } from "react";
import { getUsers } from "./utils/api";

export default function Login({ onLogin, onRegisterClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const users = await getUsers();
      console.log("🔍 Users fetched:", users); // 👈 See what comes from JSONBin

      const foundUser = users.find(
        (u) =>
          u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
          u.password.trim() === password.trim()
      );

      if (foundUser) {
        console.log("✅ User found:", foundUser);
        onLogin(foundUser);
      } else {
        setError("❌ Invalid email or password!");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("⚠️ Error connecting to server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="grid gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white rounded py-2 hover:bg-purple-700 transition"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        <p className="text-sm text-center mt-4 text-gray-600">
          New here?{" "}
          <button
            onClick={onRegisterClick}
            className="text-purple-600 underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}
