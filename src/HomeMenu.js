import React from "react";

export default function HomeMenu({
  user,
  onStartQuiz,
  onLeaderboard,
  onProfile,
  onLogout,
  onDashboard, // ✅ add this
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white px-4">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-700">
          Welcome, {user.name}! 🎉
        </h2>
        <p className="text-gray-600 mb-6">Choose an option below:</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={onStartQuiz}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            ▶️ Start Quiz
          </button>
          <button
            onClick={onLeaderboard}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            🏆 View Leaderboard
          </button>
          <button
            onClick={onProfile}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            👤 My Profile
          </button>
          <button
            onClick={onDashboard}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            📊 Performance Dashboard
          </button>
          <button
            onClick={onLogout}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
