import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/me", {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(console.error);
  }, []);

  if (!user) return <p>Loading dashboard...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <p>Your role: {user.role}</p>

      {user.role === "tutor" && (
        <div className="mt-4">
          <Link
            to="/add-course"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add New Course
          </Link>
        </div>
      )}
    </div>
  );
}
