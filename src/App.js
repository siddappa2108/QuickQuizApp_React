import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import QuickQuiz from "./QuickQuiz";
import Leaderboard from "./Leaderboard";
import Profile from "./Profile";
import HomeMenu from "./HomeMenu";
import CategorySelect from "./CategorySelect";
import PerformanceDashboard from "./PerformanceDashboard"; // 👈 new import

export default function App() {
  const [user, setUser] = useState(null);
  const [registerMode, setRegisterMode] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setPage("home");
  };

  if (!user)
    return registerMode ? (
      <Register onRegistered={() => setRegisterMode(false)} />
    ) : (
      <Login onLogin={setUser} onRegisterClick={() => setRegisterMode(true)} />
    );

  if (page === "leaderboard")
    return <Leaderboard onBack={() => setPage("home")} />;

  if (page === "profile")
    return <Profile user={user} onBack={() => setPage("home")} />;

  if (page === "dashboard")
    return <PerformanceDashboard user={user} onBack={() => setPage("home")} />; // ✅ New page

  if (page === "category")
    return (
      <CategorySelect
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setPage("quiz");
        }}
        onBack={() => setPage("home")}
      />
    );

  if (page === "quiz")
    return (
      <QuickQuiz
        user={user}
        category={selectedCategory}
        onLogout={handleLogout}
        onShowLeaderboard={() => setPage("leaderboard")}
      />
    );

  return (
    <HomeMenu
      user={user}
      onStartQuiz={() => setPage("category")}
      onLeaderboard={() => setPage("leaderboard")}
      onProfile={() => setPage("profile")}
      onLogout={handleLogout}
      onDashboard={() => setPage("dashboard")} // 👈 pass dashboard handler
    />
  );
}
