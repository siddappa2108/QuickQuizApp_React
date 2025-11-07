import React, { useState } from "react";
import { getUsers, saveUsers } from "./utils/api";

export default function Register({ onRegistered }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const users = await getUsers();
      if (users.some((u) => u.email === email)) {
        setMsg("⚠️ Email already exists!");
        return;
      }
      const newUser = { name, email, password, score: 0 };
      await saveUsers([...users, newUser]);
      setMsg("✅ Registered successfully! You can login now.");
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => onRegistered(), 1500);
    } catch (err) {
      setMsg("❌ Error connecting to server.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="grid gap-3">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded p-2 w-full" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded p-2 w-full" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded p-2 w-full" required />
          <button type="submit" className="bg-purple-600 text-white rounded py-2 hover:bg-purple-700 transition">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">{msg}</p>
      </div>
    </div>
  );
}
