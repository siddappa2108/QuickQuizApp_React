// src/CategorySelect.js
import React, { useState, useEffect } from "react";
import { getQuestions } from "./utils/questionApi";

export default function CategorySelect({ onSelectCategory, onBack }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const allQuestions = await getQuestions();
      const uniqueCategories = [
        ...new Set(allQuestions.map((q) => q.category)),
      ];
      setCategories(uniqueCategories);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const handleRandomCategory = () => {
    if (categories.length === 0) return;
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    alert(`🎲 You got category: ${randomCategory}`);
    onSelectCategory(randomCategory);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
        Loading categories...
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white px-4">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">
          🧠 Choose a Quiz Category
        </h2>

        <div className="flex flex-col gap-3">
          {categories.length === 0 ? (
            <p>No categories found 😢</p>
          ) : (
            categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => onSelectCategory(cat)}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                {cat}
              </button>
            ))
          )}
        </div>

        <hr className="my-5 border-gray-300" />

        <button
          onClick={handleRandomCategory}
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition mb-4"
        >
          🎲 Random Category
        </button>

        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
