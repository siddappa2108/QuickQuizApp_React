// src/PerformanceDashboard.js
import React, { useEffect, useState } from "react";
import { getUsers } from "./utils/api";
import { getQuestions } from "./utils/questionApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceDashboard({ user, onBack }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const users = await getUsers();
        const questions = await getQuestions();

        // Find logged-in user
        const currentUser = users.find((u) => u.email === user.email);

        // Group questions by category count
        const categoryCounts = questions.reduce((acc, q) => {
          acc[q.category] = (acc[q.category] || 0) + 1;
          return acc;
        }, {});

        // Create dummy accuracy (we’ll extend later for actual stats)
        const chartData = Object.keys(categoryCounts).map((cat) => ({
          category: cat,
          score: currentUser?.score || 0,
          total: categoryCounts[cat],
          accuracy: Math.min(
            Math.round(((currentUser?.score || 0) / categoryCounts[cat]) * 100),
            100
          ),
        }));

        setData(chartData);
      } catch (err) {
        console.error("❌ Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
        Loading dashboard...
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white px-4">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-purple-700">
          📊 Performance Dashboard
        </h2>

        {data.length === 0 ? (
          <p>No data available yet 😢</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" fill="#8b5cf6" name="Accuracy (%)" />
            </BarChart>
          </ResponsiveContainer>
        )}

        <p className="mt-6 text-gray-600">
          <b>{user.name}</b>’s latest quiz performance overview
        </p>

        <button
          onClick={onBack}
          className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
