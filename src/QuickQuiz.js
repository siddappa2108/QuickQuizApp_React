import React, { useState, useEffect } from "react";
import { getUsers, saveUsers } from "./utils/api";
import { getQuestions } from "./utils/questionApi";

export default function QuickQuiz({ user, category, onLogout, onShowLeaderboard }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [selected, setSelected] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Load questions dynamically and filter by category
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      console.log("📥 Loading questions for category:", category);

      const allQuestions = await getQuestions();
      console.log("🧩 All questions fetched:", allQuestions);

      // 🧠 Filter by category (case-insensitive)
      const filtered = allQuestions.filter(
        (q) => q.category?.toLowerCase() === category?.toLowerCase()
      );

      console.log("✅ Filtered questions:", filtered);

      setQuestions(filtered.sort(() => Math.random() - 0.5));
      setLoading(false);
    };

    if (category) load();
  }, [category]); // 👈 Re-run when category changes

  // Timer logic
  useEffect(() => {
    if (showResult || loading) return;
    if (timer === 0) next();
    const t = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, showResult, loading]);

  const answer = (opt) => {
    setSelected(opt);
    if (opt === questions[index].answer) setScore((s) => s + 1);
  };

  const next = async () => {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setSelected("");
      setTimer(15);
    } else {
      setShowResult(true);
      const users = await getUsers();
      const updated = users.map((u) =>
        u.email === user.email ? { ...u, score: Math.max(u.score, score) } : u
      );
      await saveUsers(updated);
    }
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setSelected("");
    setTimer(15);
    setShowResult(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
        Loading questions for <b>{category}</b>...
      </div>
    );

  if (!questions.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700 text-lg">
        ⚠️ No questions found for <b>{category}</b> category!
        <button
          onClick={onLogout}
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white px-4">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        {!showResult ? (
          <>
            <h2 className="text-xl font-bold mb-2">
              {user.name}, Question {index + 1}/{questions.length}
            </h2>
            <p className="mb-4">{questions[index].question}</p>

            <div className="grid gap-3 mb-6">
              {questions[index].options.map((o, i) => (
                <button
                  key={i}
                  onClick={() => answer(o)}
                  disabled={!!selected}
                  className={`px-4 py-2 rounded-lg border transition ${
                    selected
                      ? o === questions[index].answer
                        ? "bg-green-500 text-white"
                        : o === selected
                        ? "bg-red-500 text-white"
                        : "bg-gray-200"
                      : "bg-gray-100 hover:bg-purple-100"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>

            <div className="text-sm mb-4 text-gray-600">
              ⏱ {timer}s remaining
            </div>

            <button
              onClick={next}
              disabled={!selected && timer > 0}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              {index + 1 === questions.length ? "Finish" : "Next"}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">🎉 Quiz Completed!</h2>
            <p className="text-lg mb-2">
              Score: {score}/{questions.length}
            </p>

            <button
              onClick={restart}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition mb-3"
            >
              Restart
            </button>
            <button
              onClick={onShowLeaderboard}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition mb-3 ml-2"
            >
              View Leaderboard 🏆
            </button>
            <button
              onClick={onLogout}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
