// src/Leaderboard.js
import React, { useEffect, useState } from "react";
import { getUsers } from "./utils/api";

export default function Leaderboard({ onBack }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        // Sort users by score descending
        const sorted = [...data].sort((a, b) => b.score - a.score);
        setUsers(sorted);
      } catch (err) {
        console.error("❌ Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
        Loading leaderboard...
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
          🏆 Leaderboard
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="py-2 px-3 rounded-tl-lg">Rank</th>
              <th className="py-2 px-3 text-left">Name</th>
              <th className="py-2 px-3 text-left">Email</th>
              <th className="py-2 px-3 rounded-tr-lg text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No players yet 😢
                </td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr
                  key={u.email}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } hover:bg-purple-50 transition`}
                >
                  <td className="py-2 px-3 font-semibold text-center">
                    #{index + 1}
                  </td>
                  <td className="py-2 px-3">{u.name}</td>
                  <td className="py-2 px-3 text-gray-600 text-sm">
                    {u.email}
                  </td>
                  <td className="py-2 px-3 text-right font-semibold text-purple-700">
                    {u.score}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="text-center mt-6">
          <button
            onClick={onBack}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            ← Back to Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
