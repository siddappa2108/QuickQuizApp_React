// src/Profile.js
import React, { useEffect, useState } from "react";
import { getUsers } from "./utils/api";

export default function Profile({ user, onBack }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await getUsers();
        const current = users.find((u) => u.email === user.email);
        setUserData(current || user);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };
    fetchUser();
  }, [user]);

  if (!userData)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
        Loading profile...
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-700">
          👤 My Profile
        </h2>

        <div className="text-left space-y-4 text-gray-700">
          <p>
            <span className="font-semibold text-purple-600">Name:</span>{" "}
            {userData.name}
          </p>
          <p>
            <span className="font-semibold text-purple-600">Email:</span>{" "}
            {userData.email}
          </p>
          <p>
            <span className="font-semibold text-purple-600">Best Score:</span>{" "}
            {userData.score}
          </p>
        </div>

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
